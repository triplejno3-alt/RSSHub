import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { path: `/suzhou/fg/:category{.+}?`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let { category: o = `szfgw/ggl/nav_list` } = a.req.param(),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 30,
        c = `https://fg.suzhou.gov.cn`,
        l = new URL(`${o}.shtml`, c).href,
        { data: u } = await n(l),
        d = i(u),
        f = d(`h4 a[title]`)
            .slice(0, s)
            .toArray()
            .map((e) => ((e = d(e)), { title: e.prop(`title`) || e.text(), link: new URL(e.prop(`href`), c).href, author: e.find(`.author`).text(), pubDate: t(e.parent().find(`span.time`).text().trim()) }));
    f = await Promise.all(
        f.map((a) =>
            e.tryGet(a.link, async () => {
                let { data: e } = await n(a.link),
                    o = i(e);
                return ((a.title = o(`ucaptitle`).text().trim()), (a.description = o(`ucapcontent`).html()), (a.author = o(`span.ly b`).text().trim()), (a.pubDate = r(t(o(`meta[name="PubDate"]`).prop(`content`)), 8)), a);
            })
        )
    );
    let p = d(`meta[name="SiteName"]`).prop(`content`),
        m = d(`meta[name="ColumnName"]`).prop(`content`),
        h = new URL(d(`div.logo img`).prop(`src`), c).href;
    return { item: f, title: `${p} - ${m}`, link: l, description: d(`meta[name="ColumnDescription"]`).prop(`content`), language: d(`html`).prop(`lang`), image: h, subtitle: m, author: p };
}
export { a as route };
