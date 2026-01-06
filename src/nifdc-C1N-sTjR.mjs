import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { path: `/nifdc/:path{.+}?`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let { path: o = `bshff/ylqxbzhgl/qxggtzh` } = a.req.param(),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 30,
        c = `https://www.nifdc.org.cn`,
        l = new URL(`nifdc/${o}/`, c).href,
        { data: u } = await n(l),
        d = i(u),
        f = d(`div.list ul li`)
            .slice(0, s)
            .toArray()
            .map((e) => {
                e = d(e);
                let n = e.find(`a`),
                    r = n.prop(`href`);
                return { title: n.prop(`title`) || n.text(), link: r.startsWith(`http`) ? r : new URL(r, l).href, pubDate: t(e.find(`span`).text().replaceAll(/\(|\)/g, ``)) };
            });
    f = await Promise.all(
        f.map((a) =>
            e.tryGet(a.link, async () => {
                try {
                    let { data: e } = await n(a.link),
                        o = i(e);
                    ((a.title = o(`.title`).text()),
                        (a.description = o(`div.text`).append(o(`div.fujian`)).html()),
                        (a.author = o(`meta[name="ContentSource"]`).prop(`content`)),
                        (a.category = [...new Set([o(`meta[name="ColumnName"]`).prop(`content`), o(`meta[name="ColumnType"]`).prop(`content`), ...(o(`meta[name="ColumnKeywords"]`).prop(`content`).split(/,|;/) ?? [])])].filter(
                            Boolean
                        )),
                        (a.pubDate = r(t(o(`meta[name="PubDate"]`).prop(`content`)), 8)),
                        (a.enclosure_url = o(`a.fujianClass`).first().prop(`href`)),
                        a.enclosure_url && ((a.enclosure_url = new URL(a.enclosure_url, c).href), (a.enclosure_type = `application/${a.enclosure_url.split(/\./).pop()}`)));
                } catch {}
                return a;
            })
        )
    );
    let p = new URL(d(`div.logo img`).prop(`src`), l).href,
        m = new URL(d(`link[rel="shortcut icon"]`).prop(`href`), l).href;
    return {
        item: f,
        title: d(`title`).text().replace(/----/, ` - `),
        link: l,
        description: d(`meta[name="ColumnDescription"]`).prop(`content`),
        language: `zh`,
        image: p,
        icon: m,
        logo: m,
        subtitle: d(`meta[ name="ColumnName"]`).prop(`content`),
        author: d(`meta[name="SiteName"]`).prop(`content`),
    };
}
export { a as route };
