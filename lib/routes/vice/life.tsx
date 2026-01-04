import { load } from 'cheerio';

import type { Route } from '@/types';
import logger from '@/utils/logger';
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
        let page;
        try {
            page = await browser.newPage();

            // Set user agent to avoid bot detection
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

            // Block unnecessary resources
            await page.setRequestInterception(true);
            page.on('request', (request) => {
                const resourceType = request.resourceType();
                if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
                    request.abort();
                } else {
                    request.continue();
                }
            });

            const link = 'https://www.vice.com/en/category/life';
            logger.http(`Requesting ${link}`);

            try {
                await page.goto(link, {
                    waitUntil: 'networkidle2',
                    timeout: 30000,
                });
                logger.info('Successfully navigated to VICE website');
            } catch (error: any) {
                logger.error('Failed to navigate to VICE website:', error.message);
                // If navigation fails, try with simpler options
                await page.goto(link, {
                    waitUntil: 'domcontentloaded',
                    timeout: 20000,
                });
                logger.info('Fallback navigation successful');
            }

            // Wait for content to load - try multiple approaches
            await page.waitForTimeout(3000); // Give extra time for dynamic content

            // Try to wait for common selectors
            await page.waitForSelector('article, .article-card, .post-item, .card, .story-card, a[href*="/article/"]', { timeout: 15000 }).catch(() => {
                logger.warn('No common selectors found, continuing anyway');
            });

            // Scroll down to trigger lazy loading
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight / 2);
            });
            await page.waitForTimeout(2000);

            const content = await page.content();
            logger.info(`Page content length: ${content.length}`);

            const $ = load(content);

            // Try multiple selectors for articles
            const articles: any[] = [];

            // Selector 1: Common article selectors
            $('article, .article-card, .post-item, .card, .story-card').each((_, element) => {
                const $el = $(element);
                const title = $el.find('h1, h2, h3, .title, .headline').first().text().trim() || $el.find('a').first().text().trim();
                const link = $el.find('a').first().attr('href');
                const description = $el.find('p, .excerpt, .summary, .teaser').first().text().trim();

                if (title && link) {
                    articles.push({
                        title,
                        link: link.startsWith('http') ? link : `https://www.vice.com${link}`,
                        description: description || title,
                        category: ['Life'] as string[],
                    });
                }
            });

            // If no articles found, try a more generic approach
            if (articles.length === 0) {
                logger.warn('No articles found with standard selectors, trying fallback');

                // Fallback: Look for any links that might be articles
                $('a[href*="/article/"], a[href*="/story/"]').each((_, element) => {
                    const $el = $(element);
                    const title = $el.text().trim();
                    const link = $el.attr('href');

                    if (title && link && title.length > 10) {
                        // Avoid short link texts
                        articles.push({
                            title,
                            link: link.startsWith('http') ? link : `https://www.vice.com${link}`,
                            description: title,
                            category: ['Life'] as string[],
                        });
                    }
                });
            }

            // Remove duplicates and limit to first 20
            const uniqueArticles = articles.filter((article, index, self) => index === self.findIndex((a) => a.link === article.link)).slice(0, 20);

            logger.info(`Found ${uniqueArticles.length} articles`);

            return {
                title: 'VICE | Life articles',
                link: 'https://www.vice.com/en/category/life',
                item: uniqueArticles,
                description: 'Latest life articles from VICE',
            };
        } catch (error) {
            logger.error('Error in vice/life handler:', error);
            throw error;
        } finally {
            if (page) {
                try {
                    await page.close();
                } catch (error) {
                    logger.warn('Error closing page:', error);
                }
            }
            try {
                await browser.close();
            } catch (error) {
                logger.warn('Error closing browser:', error);
            }
        }
    },
};
