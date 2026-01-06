import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { a, t as o } from './utils-cMJuIYwm.mjs';
const s = {
    path: `/category/:caty`,
    categories: [`multimedia`],
    view: i.Videos,
    example: `/pornhub/category/popular-with-women`,
    parameters: { caty: `category, see [categories](https://www.pornhub.com/webmasters/categories)` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Category`,
    maintainers: [`nczitzk`],
    handler: c,
};
async function c(i) {
    let s = i.req.param(`caty`),
        c = await t.tryGet(`pornhub:categories`, async () => {
            let { data: e } = await r(`${o}/webmasters/categories`);
            return e.categories;
        }),
        l = Number.isNaN(s) ? c.find((e) => e.category === s)?.id : s,
        u = Number.isNaN(s) ? s : c.find((e) => e.id === Number.parseInt(s)).category,
        d = await t.tryGet(
            `pornhub:category:${u}`,
            async () => {
                let { data: e } = await r(`${o}/webmasters/search?category=${u}`);
                return e;
            },
            e.cache.routeExpire,
            !1
        );
    if (d.code) throw Error(d.message);
    let f = d.videos.map((e) => ({ title: e.title, link: e.url, description: a({ thumbs: e.thumbs }), pubDate: n(e.publish_date), category: [...new Set([...e.tags.map((e) => e.tag_name), ...e.categories.map((e) => e.category)])] }));
    return { title: `Pornhub - ${u}`, link: `${o}/video?c=${l}`, item: f };
}
export { s as route };
