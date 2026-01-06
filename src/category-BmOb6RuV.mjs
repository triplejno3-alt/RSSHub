import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './rss-parser-CKuAfhVS.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/category/:category`,
    categories: [`new-media`],
    example: `/qbitai/category/资讯`,
    parameters: { category: `分类名，见下表` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`qbitai.com/category/:category`] }],
    name: `分类`,
    maintainers: [`FuryMartin, Geraldxm`],
    handler: o,
    description: `| 资讯 | 数码     | 智能车 | 智库  | 活动    |
| ---- | -------- | ------ | ----- | ------- |
| 资讯 | ebandeng | auto   | zhiku | huodong |`,
};
async function o(a) {
    let o = a.req.param(`category`),
        s = encodeURI(`https://www.qbitai.com/category/${o}/feed`),
        c = (await r.parseURL(s)).items.map((e) => ({ title: e.title, pubDate: n(e.pubDate), link: e.link, author: `量子位`, category: e.categories, description: `` })),
        l = await Promise.all(
            c.map((n) =>
                t.tryGet(n.link, async () => {
                    try {
                        n.description = i(await e(n.link))(`.article`).html() || `No content found`;
                    } catch {
                        n.description = `Failed to fetch content`;
                    }
                    return n;
                })
            )
        );
    return { title: `量子位 - ${o}`, link: `https://www.qbitai.com/category/${o}`, item: l };
}
export { a as route };
