import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { path: `/news/:category{.+}?`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let { category: o = `xmxw` } = a.req.param(),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 30,
        c = `https://news.xmnn.cn`,
        l = new URL(`${o}/`, c).href,
        { data: u } = await n(l),
        d = i(u),
        f = d(`div#sort_body ul li a`)
            .slice(0, s)
            .toArray()
            .map((e) => ((e = d(e)), { title: e.find(`h1`).text().trim(), link: e.prop(`href`), description: e.find(`div.abstract`).html(), author: e.find(`div.source`).text(), pubDate: r(t(e.find(`div.time`).text()), 8) }));
    f = await Promise.all(
        f.map((a) =>
            e.tryGet(a.link, async () => {
                let { data: e } = await n(a.link),
                    o = i(e);
                return (
                    (a.title = o(`div.cont-h, div.tip h1`).text().trim()),
                    (a.description = o(`div.TRS_Editor`).html()),
                    (a.author = o(`span.cont-a-src a`)
                        .toArray()
                        .map((e) => o(e).text())),
                    (a.pubDate = r(t(o(`span.time, div.pubtime div.w`).contents().first().text().trim()), 8)),
                    a
                );
            })
        )
    );
    let p = d(`title`).text(),
        m = new URL(d(`link[rel="icon"]`).prop(`href`), c).href;
    return { item: f, title: p, link: l, description: d(`meta[name="description"]`).prop(`content`), language: `zh`, icon: m, logo: m, subtitle: d(`div.h`).text(), author: p.split(/_/).pop() };
}
export { a as route };
