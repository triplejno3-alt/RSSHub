import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { a as e, i as t, n, r, t as i } from './util-DNQyQkO7.mjs';
const a = {
    path: `/article`,
    categories: [`new-media`],
    example: `/foresightnews/article`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`foresightnews.pro/`] }],
    name: `文章`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `foresightnews.pro/`,
};
async function o(a) {
    let o = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 50,
        s = new URL(`v1/articles`, i).href,
        { items: c } = await t(s, o);
    return { item: c, title: `Foresight News - 文章`, link: e, description: `文章 - Foresight News`, language: `zh-cn`, image: r, icon: n, logo: n, subtitle: `文章`, author: `Foresight News` };
}
export { a as route };
