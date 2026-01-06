import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = `https://www.jpmorganchase.com`,
    a = `${i}/institute/all-topics`,
    o = `${i}/services/json/v1/dynamic-grid.service/parent=jpmorganchase/global/US/en/home/institute/all-topics&comp=root/content-parsys/dynamic_grid&page=p1.json`,
    s = {
        path: `/`,
        example: `/jpmorganchase`,
        categories: [`finance`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`jpmorganchase.com/institute/all-topics`], target: `/` }],
        name: `Research Topics`,
        maintainers: [`dousha`],
        handler: u,
        url: `www.jpmorganchase.com/institute/all-topics`,
    };
async function c() {
    let t = await e(o);
    if (!(`meta` in t)) return [];
    let n = t.meta,
        r = Number(n[`partition-size`]);
    return t.items.slice(0, r);
}
function l(a) {
    let o = `${i}${a.link}`;
    return t.tryGet(o, async () => {
        let t = [],
            i = ``,
            s = [],
            c = a.date,
            l = await e(o);
        if (l.length > 0) {
            let e = r(l);
            ((s = [e(`.eyebrow`).text()]),
                (t = e(`.author-name`)
                    .toArray()
                    .map((t) => e(t).text().trim())),
                (c = e(`.date`).text().trim() || a.date),
                (i = e(`.root`).children(`div`).children(`div:eq(1)`).html() || ``));
        }
        return { category: s, author: t.join(`, `), title: a.title, description: i, link: o, pubDate: n(c) };
    });
}
async function u() {
    let e = await c();
    return { title: `All Topics - JPMorganChase Institute`, link: a, item: await Promise.all(e.map((e) => l(e))) };
}
export { s as route };
