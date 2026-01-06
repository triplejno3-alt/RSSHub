import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { n as i, r as a, t as o } from './utils-Crc9OdTy.mjs';
import { load as s } from 'cheerio';
const c = {
    path: `/column/:id`,
    categories: [`reading`],
    example: `/aisixiang/column/722`,
    parameters: { id: `栏目 ID, 可在对应栏目 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `栏目`,
    maintainers: [`HenryQW`, `nczitzk`],
    handler: l,
};
async function l(c) {
    let l = c.req.param(`id`),
        u = c.req.query(`limit`) ? Number.parseInt(c.req.query(`limit`), 10) : 30,
        d = new URL(`/data/search?column=${l}`, a).href,
        { data: f } = await n(d),
        p = s(f),
        m = p(`div.article-title a`).first().text().replaceAll(`[]`, ``),
        h = p(`div.article-title`)
            .slice(0, u)
            .toArray()
            .map((e) => {
                e = p(e);
                let n = e.find(`a[title]`);
                return { title: n.text(), link: new URL(n.prop(`href`), a).href, author: n.text().split(`：`)[0], pubDate: r(t(e.find(`span`).text()), 8) };
            });
    return { item: await o(u, e.tryGet, h), title: `爱思想 - ${m}`, link: d, description: p(`div.tips`).text(), language: `zh-cn`, image: new URL(`images/logo.jpg`, i).href, subtitle: m };
}
export { c as route };
