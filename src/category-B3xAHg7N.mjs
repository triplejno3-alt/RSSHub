import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { n as t, r as n, t as r } from './const-DK9MNLDY.mjs';
const i = {
    path: `/category/:category`,
    categories: [`picture`],
    example: `/4khd/category/cosplay`,
    parameters: { category: `Category` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`www.4khd.com/pages/:category`], target: `/category/:category` }],
    name: `Category`,
    maintainers: [`AiraNadih`],
    handler: a,
    url: `www.4khd.com/`,
};
async function a(i) {
    let a = Number.parseInt(i.req.query(`limit`)) || 20,
        o = i.req.param(`category`),
        s = `${t}pages/${o}/`,
        {
            data: [{ id: c }],
        } = await e(`${t}wp-json/wp/v2/categories?slug=${o === `album` ? `photo` : o}`),
        { data: l } = await e(`${t}wp-json/wp/v2/posts?categories=${c}&per_page=${a}`);
    return { title: `${r} - Category: ${o}`, link: s, item: l.map((e) => n(e)) };
}
export { i as route };
