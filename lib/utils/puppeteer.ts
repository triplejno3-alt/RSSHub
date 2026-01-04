/* eslint-disable unicorn/prefer-ternary */
import { anonymizeProxy } from 'proxy-chain';
import type { Browser, Page } from 'rebrowser-puppeteer';
import puppeteer from 'rebrowser-puppeteer';

// Always use @sparticuz/chromium in Vercel-like environments
// Note: FORCE_VERCEL_CHROMIUM is only for testing, should not be used in production
const isVercel = !!(process.env.VERCEL || process.env.LAMBDA_TASK_ROOT || process.env.VERCEL_ENV || process.env.VERCEL_URL) ||
                 (process.env.FORCE_VERCEL_CHROMIUM && process.platform === 'linux');

// Cache the Chromium executable path to avoid re-downloading on subsequent requests
let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

/**
 * Downloads and caches the Chromium executable path.
 * Uses a download promise to prevent concurrent downloads.
 */
async function getChromiumPath(): Promise<string> {
    // Return cached path if available
    if (cachedExecutablePath) return cachedExecutablePath;

    // Prevent concurrent downloads by reusing the same promise
    if (!downloadPromise) {
        const chromium = (await import('@sparticuz/chromium')).default;
        // URL to the Chromium binary package hosted in /src for Vercel
        const CHROMIUM_PACK_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/chromium-pack.tar`
            : undefined;

        downloadPromise = chromium
            .executablePath(CHROMIUM_PACK_URL)
            .then((path) => {
                cachedExecutablePath = path;
                console.log('Chromium path resolved:', path);
                return path;
            })
            .catch((error) => {
                console.error('Failed to get Chromium path:', error);
                downloadPromise = null; // Reset on error to allow retry
                throw error;
            });
    }

    return downloadPromise;
}

import { config } from '@/config';

import logger from './logger';
import proxy from './proxy';

/**
 * @deprecated use getPage instead
 * @returns Puppeteer browser
 */
const outPuppeteer = async () => {
    const options = {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--window-position=0,0',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            `--user-agent=${config.ua}`,
        ],
        headless: true,
        ignoreHTTPSErrors: true,
    };

    const insidePuppeteer: typeof puppeteer = puppeteer;

    const currentProxy = proxy.getCurrentProxy();
    if (currentProxy && proxy.proxyObj.url_regex === '.*') {
        if (currentProxy.urlHandler?.username || currentProxy.urlHandler?.password) {
            // only proxies with authentication need to be anonymized
            if (currentProxy.urlHandler.protocol === 'http:') {
                options.args.push(`--proxy-server=${await anonymizeProxy(currentProxy.uri)}`);
            } else {
                logger.warn('SOCKS/HTTPS proxy with authentication is not supported by puppeteer, continue without proxy');
            }
        } else {
            // Chromium cannot recognize socks5h and socks4a, so we need to trim their postfixes
            options.args.push(`--proxy-server=${currentProxy.uri.replace('socks5h://', 'socks5://').replace('socks4a://', 'socks4://')}`);
        }
    }
    let browser: Browser;
    if (config.puppeteerWSEndpoint) {
        browser = await insidePuppeteer.connect({
            browserWSEndpoint: config.puppeteerWSEndpoint,
        });
    } else if (isVercel) {
        logger.info(`Using Vercel-compatible Chromium in outPuppeteer (isVercel: ${isVercel})`);
        try {
            // @ts-ignore
            const { default: chromium } = await import('@sparticuz/chromium');
            // @ts-ignore
            const { default: puppeteerCore } = await import('puppeteer-core');

            const executablePath = await getChromiumPath();
            logger.info(`Chromium executable path: ${executablePath}`);

            // @ts-ignore
            browser = await puppeteerCore.launch({
                executablePath,
                args: [...chromium.args, ...options.args],
                headless: options.headless,
                // @ts-ignore
                ignoreHTTPSErrors: options.ignoreHTTPSErrors,
            });
            logger.info('Vercel Chromium browser launched successfully in outPuppeteer');
        } catch (error) {
            logger.error('Failed to launch Vercel Chromium in outPuppeteer:', error);
            throw error;
        }
    } else {
        browser = await insidePuppeteer.launch(
            config.chromiumExecutablePath
                ? {
                      executablePath: config.chromiumExecutablePath,
                      ...options,
                  }
                : options
        );
    }
    setTimeout(async () => {
        await browser.close();
    }, 30000);

    return browser;
};

export default outPuppeteer;

// No-op in Node.js environment (used by Worker build via alias)

export const setBrowserBinding = (_binding: any) => {};

/**
 * @returns Puppeteer page
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
    const options = {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--window-position=0,0',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            `--user-agent=${config.ua}`,
        ],
        headless: true,
        ignoreHTTPSErrors: true,
    };

    const insidePuppeteer: typeof puppeteer = puppeteer;

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
            // only proxies with authentication need to be anonymized
            if (currentProxy.urlHandler.protocol === 'http:') {
                const urlObj = new URL(currentProxy.uri);
                urlObj.username = '';
                urlObj.password = '';
                options.args.push(`--proxy-server=${urlObj.toString().replace(/\/$/, '')}`);
                hasProxy = true;
            } else {
                logger.warn('SOCKS/HTTPS proxy with authentication is not supported by puppeteer, continue without proxy');
            }
        } else {
            // Chromium cannot recognize socks5h and socks4a, so we need to trim their postfixes
            options.args.push(`--proxy-server=${currentProxy.uri.replace('socks5h://', 'socks5://').replace('socks4a://', 'socks4://')}`);
            hasProxy = true;
        }
    }
    let browser: Browser;
    if (config.puppeteerWSEndpoint) {
        const endpointURL = new URL(config.puppeteerWSEndpoint);
        endpointURL.searchParams.set('launch', JSON.stringify(options));
        endpointURL.searchParams.set('stealth', 'true');
        const endpoint = endpointURL.toString();
        browser = await insidePuppeteer.connect({
            browserWSEndpoint: endpoint,
        });
    } else {
        // Vercel-compatible launch
        // eslint-disable-next-line unicorn/prefer-ternary
        if (isVercel) {
            logger.info(`Using Vercel-compatible Chromium (isVercel: ${isVercel})`);
            try {
                // @ts-ignore
                const { default: chromium } = await import('@sparticuz/chromium');
                // @ts-ignore
                const { default: puppeteerCore } = await import('puppeteer-core');

                const executablePath = await getChromiumPath();
                logger.info(`Chromium executable path: ${executablePath}`);

                // @ts-ignore
                browser = await puppeteerCore.launch({
                    executablePath,
                    args: [...chromium.args, ...options.args],
                    headless: options.headless,
                    // @ts-ignore
                    ignoreHTTPSErrors: options.ignoreHTTPSErrors,
                });
                logger.info('Vercel Chromium browser launched successfully');
            } catch (error) {
                logger.error('Failed to launch Vercel Chromium:', error);
                throw error;
            }
        } else {
            browser = await insidePuppeteer.launch(
                config.chromiumExecutablePath
                    ? {
                          executablePath: config.chromiumExecutablePath,
                          ...options,
                      }
                    : options
            );
        }
    }

    setTimeout(async () => {
        await browser.close();
    }, 30000);

    const page = await browser.newPage();

    if (hasProxy && currentProxyState) {
        logger.debug(`Proxying request in puppeteer via ${currentProxyState.uri}: ${url}`);
    }

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
            if (hasProxy && currentProxyState && proxy.multiProxy) {
                logger.warn(`Puppeteer navigation failed with proxy ${currentProxyState.uri}, marking as failed: ${error}`);
                proxy.markProxyFailed(currentProxyState.uri);
                throw error;
            }
            throw error;
        }
    }

    return {
        page,
        destory: async () => {
            await browser.close();
        },
        browser,
    };
};
