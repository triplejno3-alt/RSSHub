import { load } from 'cheerio';

import type { Route } from '@/types';
import cache from '@/utils/cache';
import logger from '@/utils/logger';
import { parseDate } from '@/utils/parse-date';
import puppeteer from '@/utils/puppeteer';

export const route: Route = {
    path: '/life',
    categories: ['traditional-media'],
    example: '/vice/life',
    features: {
        requirePuppeteer: true,
        antiCrawler: true,
    },
    radar: [
        {
            source: ['www.vice.com/en/category/life'],
            target: '/life',
        },
    ],
    name: 'Life',
    maintainers: ['DIYgod'],
    handler: async () => {
        const browser = await puppeteer();
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            request.resourceType() === 'document' ? request.continue() : request.abort();
        });

        const link = 'https://www.vice.com/en/category/life';
        logger.http(`Requesting ${link}`);
        await page.goto(link, {
            waitUntil: 'domcontentloaded',
        });
        const response = await page.content();
        page.close();

        const $ = load(response);

        const list = $('li.wp-block-post')
            .toArray()
            .map((item) => {
                const $item = $(item);
                const title = $item.find('h3.wp-block-post-title a').text().trim();
                const link = $item.find('h3.wp-block-post-title a').attr('href');
                const description = $item.find('.wp-block-savage-platform-post-subheadline p').text().trim();
                const pubDate = $item.find('.wp-block-post-date time').attr('datetime');
                const author = $item.find('.wp-block-savage-platform-post-byline a').text().trim();

                return {
                    title,
                    link: link || '',
                    description,
                    pubDate: pubDate ? parseDate(pubDate) : undefined,
                    author,
                    category: ['Life'] as string[],
                };
            })
            .filter((item) => item.title && item.link);

        const items = await Promise.all(
            list.map((item) =>
                cache.tryGet(item.link, async () => {
                    // 重用浏览器实例并打开新标签页
                    const page = await browser.newPage();
                    // 设置请求拦截，仅允许 HTML 请求
                    await page.setRequestInterception(true);
                    page.on('request', (request) => {
                        request.resourceType() === 'document' ? request.continue() : request.abort();
                    });

                    logger.http(`Requesting ${item.link}`);
                    await page.goto(item.link, {
                        waitUntil: 'domcontentloaded',
                    });
                    const response = await page.content();
                    // 获取 HTML 内容后关闭标签页
                    page.close();

                    const $ = load(response);

                    // Extract full content from article
                    const articleContent: string[] = [];
                    $('.entry-content p').each((_, el) => {
                        const $el = $(el);
                        if ($el.text().trim()) {
                            articleContent.push(`${String($el.html())}`);
                        }
                    });

                    item.description = articleContent.map((content) => `<p>${content}</p>`).join('') || item.description;

                    return item;
                })
            )
        );

        // 所有请求完成后关闭浏览器实例
        browser.close();

        return {
            title: 'VICE | Life articles',
            link: 'https://www.vice.com/en/category/life',
            item: items,
        };
    },
};
