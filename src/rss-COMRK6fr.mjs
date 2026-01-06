import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './rss-parser-CKuAfhVS.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/rss/:cat?`,
    categories: [`traditional-media`],
    view: n.Articles,
    example: `/nytimes/rss/HomePage`,
    parameters: { cat: { description: `Category name, corresponding to the last segment of [official feed's](https://www.nytimes.com/rss) url.` } },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`nytimes.com/`], target: `` }],
    name: `News`,
    maintainers: [`HenryQW`, `pseudoyu`, `dzx-dzx`],
    handler: o,
    url: `nytimes.com/`,
    description: `Enhance the official EN RSS feed`,
};
async function o(n) {
    let a = `https://rss.nytimes.com/services/xml/rss/nyt/${n.req.param(`cat`)}.xml`,
        o = await r.parseURL(a);
    return {
        ...o,
        item: await Promise.all(
            o.items.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = i(await e(n.link, { headers: { 'User-Agent': `Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)` }, referer: `https://www.google.com/` }));
                    return { ...n, description: t(`[name='articleBody']`).html(), author: t(`meta[name="byl"]`).attr(`content`) };
                })
            )
        ),
    };
}
export { a as route };
