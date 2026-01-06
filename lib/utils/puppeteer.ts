import chromium from '@sparticuz/chromium-min';
import { anonymizeProxy } from 'proxy-chain';
import type { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';

import { config } from '@/config';

import logger from './logger';
import proxy from './proxy';

// 缓存 Chromium 执行路径以提升冷启动性能
let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

/**
 * 智能获取 Chromium 执行路径
 * 使用缓存机制避免重复下载，提升性能
 */
async function getChromiumPath(): Promise<string> {
  // 返回缓存路径如果可用
  if (cachedExecutablePath) {
    return cachedExecutablePath;
  }

  // 防止并发下载，重用相同的 Promise
  if (!downloadPromise) {
    downloadPromise = chromium
      .executablePath()
      .then((path) => {
        cachedExecutablePath = path;
        logger.debug('Chromium path resolved:', path);
        return path;
      })
      .catch((error) => {
        logger.error('Failed to get Chromium path:', error);
        downloadPromise = null; // 出错时重置以允许重试
        throw error;
      });
  }

  return downloadPromise;
}

/**
 * 检测当前环境是否为 Vercel
 */
function isVercel(): boolean {
  return !!process.env.VERCEL_ENV || !!process.env.VERCEL;
}

/**
 * 智能获取 Puppeteer 实例和启动配置
 */
async function getPuppeteerInstance() {
  const isProduction = isVercel();
  let puppeteerInstance: any;
  let launchOptions: any = {
    headless: true,
    ignoreHTTPSErrors: true,
  };

  if (isProduction) {
    // 生产环境：使用 puppeteer-core + @sparticuz/chromium-min
    const puppeteerCore = await import('puppeteer-core');
    puppeteerInstance = puppeteerCore;
    const executablePath = await getChromiumPath();

    launchOptions = {
      ...launchOptions,
      args: chromium.args,
      executablePath,
    };

    logger.debug('Production mode: Using puppeteer-core with cached Chromium');
  } else {
    // 开发环境：使用完整 Puppeteer（包含内置 Chromium）
    puppeteerInstance = puppeteer;
    logger.debug('Development mode: Using regular puppeteer with bundled Chromium');
  }

  return { puppeteerInstance, launchOptions };
}

/**
 * 配置代理支持
 */
function configureProxy(chromiumOptions: any, url: string) {
  let allowProxy = false;
  const proxyRegex = new RegExp(proxy.proxyObj.url_regex);
  let urlHandler;

  try {
    urlHandler = new URL(url);
  } catch {
    // ignore
  }

  if (proxyRegex.test(url) && url.startsWith('http') && !(urlHandler && urlHandler.host === proxy.proxyUrlHandler?.host)) {
    allowProxy = true;
  }

  let hasProxy = false;
  let currentProxyState: any = null;
  const currentProxy = proxy.getCurrentProxy();

  if (currentProxy && allowProxy) {
    currentProxyState = currentProxy;
    if (currentProxy.urlHandler?.username || currentProxy.urlHandler?.password) {
      // 只有带认证的代理需要匿名化
      if (currentProxy.urlHandler.protocol === 'http:') {
        const urlObj = new URL(currentProxy.uri);
        urlObj.username = '';
        urlObj.password = '';
        chromiumOptions.args.push(`--proxy-server=${urlObj.toString().replace(/\/$/, '')}`);
        hasProxy = true;
      } else {
        logger.warn('SOCKS/HTTPS proxy with authentication is not supported by puppeteer, continue without proxy');
      }
    } else {
      // Chromium 无法识别 socks5h 和 socks4a，需要移除后缀
      chromiumOptions.args.push(`--proxy-server=${currentProxy.uri.replace('socks5h://', 'socks5://').replace('socks4a://', 'socks4://')}`);
      hasProxy = true;
    }
  }

  return { hasProxy, currentProxyState };
}

/**
 * @deprecated use getPuppeteerPage instead
 * @returns Puppeteer browser
 */
const outPuppeteer = async () => {
    const { puppeteerInstance, launchOptions } = await getPuppeteerInstance();

    // 配置代理
    const proxyConfig = configureProxy(launchOptions, 'http://example.com');
    if (proxyConfig.hasProxy && proxyConfig.currentProxyState) {
        logger.debug(`Using proxy: ${proxyConfig.currentProxyState.uri}`);
    }

    const currentProxy = proxy.getCurrentProxy();
    if (currentProxy && proxy.proxyObj.url_regex === '.*') {
        if (currentProxy.urlHandler?.username || currentProxy.urlHandler?.password) {
            // only proxies with authentication need to be anonymized
            if (currentProxy.urlHandler.protocol === 'http:') {
                launchOptions.args.push(`--proxy-server=${await anonymizeProxy(currentProxy.uri)}`);
            } else {
                logger.warn('SOCKS/HTTPS proxy with authentication is not supported by puppeteer, continue without proxy');
            }
        } else {
            // Chromium cannot recognize socks5h and socks4a, so we need to trim their postfixes
            launchOptions.args.push(`--proxy-server=${currentProxy.uri.replace('socks5h://', 'socks5://').replace('socks4a://', 'socks4://')}`);
        }
    }

    const browser = await (config.puppeteerWSEndpoint
        ? puppeteerInstance.connect({
              browserWSEndpoint: config.puppeteerWSEndpoint,
          })
        : puppeteerInstance.launch(
              config.chromiumExecutablePath
                  ? {
                        executablePath: config.chromiumExecutablePath,
                        args: launchOptions.args,
                        headless: true,
                        ignoreHTTPSErrors: true,
                    }
                  : launchOptions
          ));

    // 智能超时清理（可配置）
    const timeoutMs = (config as any).browserTimeout || 30000;
    setTimeout(async () => {
        await browser.close();
    }, timeoutMs);

    return browser;
};

/**
 * 获取 Puppeteer 页面实例（优化版本）
 * @returns 包含页面、浏览器和清理函数的对象
 */
export const getPuppeteerPage = async (
    url: string,
    instanceOptions: {
        onBeforeLoad?: (page: Page, browser?: Browser) => Promise<void> | void;
        gotoConfig?: {
            waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
        };
        noGoto?: boolean;
    } = {}
) => {
    const { puppeteerInstance, launchOptions } = await getPuppeteerInstance();

    // 配置代理
    const { hasProxy, currentProxyState } = configureProxy(launchOptions, url);

    if (hasProxy && currentProxyState) {
        logger.debug(`Proxying request via ${currentProxyState.uri}: ${url}`);
    }

    let browser: Browser;
    if (config.puppeteerWSEndpoint) {
        const endpointURL = new URL(config.puppeteerWSEndpoint);
        endpointURL.searchParams.set('launch', JSON.stringify(launchOptions));
        endpointURL.searchParams.set('stealth', 'true');
        const endpoint = endpointURL.toString();
        browser = await puppeteerInstance.connect({
            browserWSEndpoint: endpoint,
        });
    } else {
        browser = await puppeteerInstance.launch(
            config.chromiumExecutablePath
                ? {
                      executablePath: config.chromiumExecutablePath,
                      args: launchOptions.args,
                      headless: true,
                      ignoreHTTPSErrors: true,
                  }
                : launchOptions
        );
    }

    // 智能超时清理
    const timeoutMs = (config as any).browserTimeout || 30000;
    const timeoutId = setTimeout(async () => {
        await browser.close();
    }, timeoutMs);

    const page = await browser.newPage();

    if (hasProxy && currentProxyState && (currentProxyState.urlHandler?.username || currentProxyState.urlHandler?.password)) {
        await page.authenticate({
            username: currentProxyState.urlHandler?.username,
            password: currentProxyState.urlHandler?.password,
        });
    }

    if (instanceOptions.onBeforeLoad) {
        await instanceOptions.onBeforeLoad(page, browser);
    }

    if (!instanceOptions.noGoto) {
        try {
            await page.goto(url, instanceOptions.gotoConfig || { waitUntil: 'domcontentloaded' });
        } catch (error) {
            // 清理超时定时器
            clearTimeout(timeoutId);

            if (hasProxy && currentProxyState && proxy.multiProxy) {
                logger.warn(`Puppeteer navigation failed with proxy ${currentProxyState.uri}, marking as failed: ${error}`);
                proxy.markProxyFailed(currentProxyState.uri);
            }
            throw error;
        }
    }

    // 返回包含清理函数的对象
    return {
        page,
        browser,
        destroy: async () => {
            clearTimeout(timeoutId);
            await browser.close();
        },
    };
};

// 导出清理缓存的工具函数（用于测试或手动清理）
export const clearChromiumCache = () => {
    cachedExecutablePath = null;
    downloadPromise = null;
    logger.debug('Chromium path cache cleared');
};

export default outPuppeteer;
