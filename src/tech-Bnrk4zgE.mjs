import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './rss-parser-CKuAfhVS.mjs';
import { load as r } from 'cheerio';
const i = `https://tech.meituan.com/`,
    a = {
        path: `/tech`,
        categories: [`programming`],
        example: `/meituan/tech`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, supportRadar: !0 },
        radar: [{ source: [`tech.meituan.com`] }],
        name: `技术团队博客`,
        url: `tech.meituan.com`,
        maintainers: [`ktKongTong`, `cscnk52`],
        handler: o,
    };
async function o() {
    let a = `${i}feed/`,
        o = await n.parseURL(a),
        s = await Promise.all(
            o.items.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link))(`div.content`).html();
                    return { title: n.title, link: n.link, pubDate: n.pubDate, author: n.creator, description: t };
                })
            )
        );
    return { title: o.title, link: i, description: o.description, language: o.language, item: s };
}
export { a as route };
