import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { a as e, i as t, n, r, t as i } from './util-DNQyQkO7.mjs';
const a = { path: `/`, categories: [`new-media`], example: `/foresightnews`, radar: [{ source: [`foresightnews.pro/`], target: `` }], name: `精选资讯`, maintainers: [`nczitzk`], handler: o, url: `foresightnews.pro/` };
async function o(a) {
    let o = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 50,
        s = new URL(`v2/feed`, i).href,
        { items: c } = await t(s, o);
    return { item: c, title: `Foresight News - 精选资讯`, link: e, description: `FN精选 - Foresight News`, language: `zh-cn`, image: r, icon: n, logo: n, subtitle: `精选资讯`, author: `Foresight News` };
}
export { a as route };
