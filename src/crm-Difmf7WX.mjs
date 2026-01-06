import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `纷享销客 CRM`,
    a = new Map([
        [`news`, `全部文章 - ${i}`],
        [`blog`, `文章干货 - ${i}`],
        [`articles`, `CRM 知识 - ${i}`],
        [`about-influence`, `纷享动态 - ${i}`],
        [`customers`, `签约喜报 - ${i}`],
    ]),
    o = {
        path: `/crm/:type`,
        categories: [`blog`],
        example: `/fxiaoke/crm/news`,
        parameters: { type: `文章类型, 见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `文章`,
        maintainers: [`akynazh`],
        handler: s,
        description: `| 全部文章 | 文章干货 | CRM 知识 | 纷享动态        | 签约喜报  |
| -------- | -------- | -------- | --------------- | --------- |
| news     | blog     | articles | about-influence | customers |`,
    };
async function s(i) {
    let o = i.req.param(`type`),
        s = a.get(o),
        c = `https://www.fxiaoke.com/crm/${o}/`,
        l = r((await n(c)).data),
        u = l(`.meeting`).text().trim(),
        d = l(`.content-item`)
            .toArray()
            .map((e) => {
                e = l(e);
                let t = e.find(`.baike-content-t1`),
                    n = e.find(`.baike-content-t3`).find(`span`);
                return { title: t.text().trim(), link: e.find(`a`).attr(`href`), author: n.last().text().trim() };
            });
    return (
        (d = await Promise.all(
            d.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n(i.link)).data),
                        a = e(`.body-wrapper-article`).first();
                    return (
                        a.find(`img`).each((t, n) => {
                            ((n = e(n)), n.attr(`zoomfile`) && (n.attr(`src`, n.attr(`zoomfile`)), n.removeAttr(`zoomfile`), n.removeAttr(`file`)), n.removeAttr(`onmouseover`));
                        }),
                        (i.description = a.html()),
                        (i.pubDate = t(e(`.month-day`).first().text().trim())),
                        i
                    );
                })
            )
        )),
        { title: s, link: c, description: u, item: d }
    );
}
export { o as route };
