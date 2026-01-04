import puppeteer from './RSSHub/lib/utils/puppeteer.js';
import { load } from 'cheerio';

(async () => {
    const browser = await puppeteer();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        request.resourceType() === 'document' ? request.continue() : request.abort();
    });

    const link = 'https://www.vice.com/en/category/life';
    console.log(`Requesting ${link}`);
    await page.goto(link, {
        waitUntil: 'domcontentloaded',
    });
    const response = await page.content();

    const $ = load(response);

    console.log('Number of li.wp-block-post:', $('li.wp-block-post').length);

    const firstItem = $('li.wp-block-post').first();
    if (firstItem.length) {
        console.log('First item HTML structure:');
        console.log(firstItem.html().substring(0, 500) + '...'); // truncate for readability
    }

    console.log('Other potential elements:');
    console.log('div.article-card:', $('div.article-card').length);
    console.log('article:', $('article').length);
    console.log('h3 a:', $('h3 a').length);

    await browser.close();
})();
