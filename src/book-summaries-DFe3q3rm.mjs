import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { n as t, r as n, t as r } from './utils-BhdW3mOu.mjs';
const i = {
    path: `/book-summaries`,
    view: e.Articles,
    categories: [`blog`],
    example: `/jamesclear/book-summaries`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`jamesclear.com/book-summaries`], target: `/book-summaries` }],
    name: `Book Summaries`,
    maintainers: [`Rjnishant530`],
    handler: a,
};
async function a() {
    let e = (await r(`book-summaries`)).map((e) => t(e));
    return { title: `James Clear - Book Summaries`, description: `Book summaries by James Clear`, link: `${n}/book-summaries`, item: e, language: `en`, icon: `${n}/favicon.ico` };
}
export { i as route };
