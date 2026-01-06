import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { t } from './rss-parser-CKuAfhVS.mjs';
import { t as n } from './utils-CGxy1qK9.mjs';
const r = {
    path: `/rss/:category?`,
    categories: [`traditional-media`],
    example: `/apnews/rss/business`,
    view: e.Articles,
    parameters: { category: { description: 'Category from the first segment of the corresponding site, or `index` for the front page.', default: `index` } },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`apnews.com/:rss`], target: `/rss/:rss` }],
    name: `News`,
    maintainers: [`zoenglinghou`, `mjysci`, `TonyRL`],
    handler: i,
};
async function i(e) {
    let { rss: r = `index` } = e.req.param(),
        i = `https://apnews.com/${r}.rss`,
        a = await t.parseURL(i),
        o = e.req.query(`fulltext`) === `true` ? await Promise.all(a.items.map((e) => n(e))) : a;
    return { ...a, item: o };
}
export { r as route };
