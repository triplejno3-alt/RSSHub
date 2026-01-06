import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { n as r, r as i, t as a } from './utils-Crc9OdTy.mjs';
import { load as o } from 'cheerio';
const s = {
    path: `/thinktank/:id/:type?`,
    categories: [`reading`],
    example: `/aisixiang/thinktank/WuQine/论文`,
    parameters: { id: `专栏 ID，一般为作者拼音，可在URL中找到`, type: `栏目类型，参考下表，默认为全部` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `思想库（专栏）`,
    maintainers: [`hoilc`, `nczitzk`],
    handler: c,
    description: `| 论文 | 时评 | 随笔 | 演讲 | 访谈 | 著作 | 读书 | 史论 | 译作 | 诗歌 | 书信 | 科学 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |`,
};
async function c(s) {
    let { id: c, type: l = `` } = s.req.param(),
        u = s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`), 10) : 30,
        d = new URL(`thinktank/${c}.html`, i).href,
        { data: f } = await t(d),
        p = o(f),
        m = `${p(`h2`).first().text().trim()}${l}`,
        h = [],
        g = p(`h3`)
            .toArray()
            .filter((e) => (l ? p(e).text() === l : !0));
    if (!g) throw new n(`Not found ${l} in ${c}: ${d}`);
    for (let e of g) h = [...h, ...p(e).parent().find(`ul li a`).toArray()];
    return (
        (h = h.slice(0, u).map((e) => ((e = p(e)), { title: e.text().split(`：`).pop(), link: new URL(e.prop(`href`), i).href }))),
        { item: await a(u, e.tryGet, h), title: `爱思想 - ${m}`, link: d, description: p(`div.thinktank-author-description-box p`).text(), language: `zh-cn`, image: new URL(`images/logo_thinktank.jpg`, r).href, subtitle: m }
    );
}
export { s as route };
