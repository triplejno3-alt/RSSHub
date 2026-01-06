import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './const-CU9_zb95.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/category/:category`,
    categories: [`picture`],
    example: `/everia/category/cosplay`,
    parameters: { category: `Category of the image stream` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`everia.club/category/:category`], target: `/category/:category` }],
    name: `Images with category`,
    maintainers: [`KTachibanaM`, `AiraNadih`],
    handler: s,
};
async function s(o) {
    let s = Number.parseInt(o.req.query(`limit`)) || 20,
        c = o.req.param(`category`),
        l = `${n}category/${c}/`,
        u = a((await t(l)).body),
        d = u(`article.blog-entry`).slice(0, s).toArray();
    return {
        title: `${i} - Category: ${c}`,
        link: l,
        item: await Promise.all(
            d.map((t) => {
                let n = u(t).find(`h2.entry-title a`).attr(`href`);
                return e.tryGet(n, () => r(n));
            })
        ),
    };
}
export { o as route };
