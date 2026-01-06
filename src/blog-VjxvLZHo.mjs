import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
import l from 'p-map';
const u = ({ image: e, description: t }) => s(a(r, { children: [e?.src ? i(`figure`, { children: e.alt ? i(`img`, { src: e.src, alt: e.alt }) : i(`img`, { src: e.src }) }) : null, t ? c(t) : null] })),
    d = { path: `/blog/:category{.+}?`, name: `Unknown`, maintainers: [], handler: f };
async function f(r) {
    let { category: i = `en` } = r.req.param(),
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 22,
        s = `https://www.tradingview.com`,
        c = new URL(`blog/${i.endsWith(`/`) ? i : `${i}/`}`, s).href,
        { data: d } = await n(c),
        f = o(d),
        p = await l(
            f(`article[id]`)
                .slice(0, a)
                .toArray()
                .map((e) => {
                    e = f(e);
                    let n = e.find(`div.title`).text();
                    return {
                        title: n,
                        link: e.find(`a.articles-grid-link`).prop(`href`),
                        description: u({
                            image: {
                                src: e
                                    .find(`div.articles-grid-img img`)
                                    .prop(`src`)
                                    .replace(/-\d+x\d+\./, `.`),
                                alt: n,
                            },
                        }),
                        category: e
                            .find(`a.section`)
                            .toArray()
                            .map((e) => f(e).text()),
                        guid: `tradingview-blog-${i}-${e.prop(`id`)}`,
                        pubDate: t(e.find(`div.date`).text(), `MMM D, YYYY`),
                    };
                }),
            (r) =>
                e.tryGet(r.link, async () => {
                    let { data: e } = await n(r.link),
                        i = o(e);
                    return (
                        i(`div.entry-content`)
                            .find(`img`)
                            .each((e, t) => {
                                i(t).replaceWith(
                                    u({
                                        image: {
                                            src: i(t)
                                                .prop(`src`)
                                                .replace(/-\d+x\d+\./, `.`),
                                        },
                                    })
                                );
                            }),
                        (r.title = i(`meta[property="og:title"]`).prop(`content`)),
                        (r.description = u({ image: { src: i(`meta[property="og:image"]`).prop(`content`), alt: r.title }, description: i(`div.entry-content`).html() })),
                        (r.author = i(`meta[property="og:site_name"]`).prop(`content`)),
                        (r.category = i(`div.sections a.section`)
                            .toArray()
                            .map((e) => i(e).text())),
                        (r.pubDate = t(i(`div.single-date`).text(), `MMM D, YYYY`)),
                        r
                    );
                }),
            { concurrency: 3 }
        ),
        m = new URL(f(`link[rel="icon"]`).prop(`href`), s).href;
    return { item: p, title: f(`title`).text(), link: c, description: f(`div.site-subtitle`).text(), language: f(`html`).prop(`lang`), icon: m, logo: m, subtitle: f(`h1.site-title`).text() };
}
export { d as route };
