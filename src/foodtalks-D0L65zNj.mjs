import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { a as t, i as n, n as r, r as i, t as a } from './utils-D8aO0FBr.mjs';
const o = { path: `/`, categories: t.categories, example: `/foodtalks`, radar: [{ source: [`www.foodtalks.cn`] }], name: `最新资讯`, maintainers: [`Geraldxm`], handler: s, url: `www.foodtalks.cn` };
async function s(o) {
    let s = await n(i((await e(`${a}/news/news/page?current=1&size=${Number.parseInt(o.req.query(`limit`), 10) || 15}&isLatest=1&language=ZH`, { headers: { referer: `${r}/` } })).data.records));
    return { title: t.name, description: t.description, link: `https://` + t.url, item: s, image: `${r}/favicon.ico` };
}
export { o as route };
