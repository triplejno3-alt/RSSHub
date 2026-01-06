import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { i as t, n, r, t as i } from './utils-fhcja1zS.mjs';
const a = {
    path: `/category/:category?`,
    categories: [`new-media`],
    example: `/utgd/category/method`,
    parameters: { category: `分类，可在对应分类页的 URL 中找到，默认为方法` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`utgd.net/category/s/:category`, `utgd.net/`], target: `/category/:category` }],
    name: `分类`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| 方法   | 观点    |
| ------ | ------- |
| method | opinion |`,
};
async function o(a) {
    let o = a.req.param(`category`) ?? `method`,
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 9,
        c = `${i}/api/v2/categories`,
        l = `${t}/category/s/${o}`,
        u = await e(`${i}/api/v2/category/slug/${o}/`),
        d = r((await e(`${c}/${u.id}/related_articles`, { query: { page: 1, page_size: s } })).results, s),
        f = await Promise.all(d.map((e) => n(e)));
    return { title: `UNTAG - ${u.category_name}`, link: l, item: f, image: u.category_image, description: u.category_description };
}
export { a as route };
