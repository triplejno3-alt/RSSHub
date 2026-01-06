import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { t as a } from './valid-host-Bsy2BS2p.mjs';
import { Fragment as o, jsx as s, jsxs as c } from 'hono/jsx/jsx-runtime';
import { load as l } from 'cheerio';
import { renderToString as u } from 'hono/jsx/dom/server';
import { raw as d } from 'hono/html';
const f = ({ images: e, intro: t, description: n }) =>
        u(c(o, { children: [e?.map((e) => (e?.src ? s(`figure`, { children: s(`img`, { src: e.src, alt: e.alt ?? void 0 }) }) : null)), t ? s(`blockquote`, { children: t }) : null, n ? s(o, { children: d(n) }) : null] })),
    p = { path: `/:id?/:category{.+}?`, name: `Unknown`, maintainers: [], handler: m };
async function m(o) {
    let { id: s = `news`, category: c = `china` } = o.req.param();
    if (!a(s)) throw new i(`Invalid id`);
    let u = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`), 10) : 30,
        d = `http://${s}.m4.cn`,
        p = new URL(c ? `/${c.replace(/\/$/, ``)}/` : `/`, d).href,
        { data: m } = await n(p),
        h = l(m),
        g = h(`div.articleitem0 div.aheader0`)
            .slice(0, u)
            .toArray()
            .map((e) => {
                e = h(e);
                let n = e.find(`a`).first();
                return {
                    title: n.text(),
                    link: n.prop(`href`),
                    description: f({ images: [{ src: e.parent().find(`div.aimg0 a img`).prop(`src`), alt: n.text() }] }),
                    category: e
                        .find(`a.aclass`)
                        .toArray()
                        .map((e) => h(e).text().replaceAll(`[]`, ``).trim()),
                    pubDate: r(t(e.find(`span.atime`).text()), 8),
                };
            });
    g = await Promise.all(
        g.map((i) =>
            e.tryGet(i.link, async () => {
                let { data: e } = await n(i.link),
                    a = l(e);
                return (
                    (i.title = a(`h1`).first().text()),
                    (i.description = f({ intro: a(`div.aintro1, p.cont-summary`).text(), description: a(`div.content0, div.cont-detail`).html() ?? void 0 })),
                    (i.category = a(`span.dd0 a, a[rel="category"]`)
                        .toArray()
                        .map((e) => a(e).text())
                        .slice(1)),
                    (i.pubDate = r(t(a(`span.atime1, span.post-time`).text()), 8)),
                    i
                );
            })
        )
    );
    let _ = h(`a.logo0_b img`).prop(`src`);
    return {
        item: g,
        title: h(`title`).text(),
        link: p,
        description: h(`meta[name="description"]`).prop(`content`),
        language: `zh`,
        image: _,
        subtitle: h(`meta[name="keywords"]`).prop(`content`),
        author: h(`meta[name="author"]`).prop(`content`),
        allowEmpty: !0,
    };
}
export { p as route };
