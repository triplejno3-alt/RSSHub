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
const l = ({ images: e, description: t }) => s(a(r, { children: [e?.length ? e.map((e) => (e?.src ? i(`figure`, { children: i(`img`, { src: e.src, alt: e.alt }) }, e.src) : null)) : null, t ? i(r, { children: c(t) }) : null] })),
    u = {
        path: `/:category?`,
        categories: [`blog`],
        example: `/ianspriggs/portraits`,
        parameters: { category: `Category, see below, 3D PORTRAITS by default` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Category`,
        maintainers: [`nczitzk`],
        handler: d,
        description: `| 3D PORTRAITS | CHARACTERS |
| ------------ | ---------- |
| portraits    | characters |`,
    };
async function d(r) {
    let { category: i = `portraits` } = r.req.param(),
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 30,
        s = `Ian Spriggs`,
        c = `https://ianspriggs.com`,
        u = new URL(i, c).href,
        { data: d } = await n(u),
        f = o(d),
        p = f(`div.work-item`)
            .slice(0, a)
            .toArray()
            .map((e) => {
                e = f(e);
                let n = e.find(`img`).first();
                return {
                    title: e.find(`div.work-info`).text(),
                    link: e.find(`a`).prop(`href`),
                    description: l({ images: n?.prop(`src`) ? [{ src: n.prop(`src`).replace(/_thumbnail\./, `.`), alt: n.prop(`alt`) }] : void 0 }),
                    author: s,
                    pubDate: t(e.find(`div.work-info p`).last(), `YYYY`),
                    enclosure_url: n?.prop(`src`) ?? void 0,
                    enclosure_type: n?.prop(`src`) ? `image/jpeg` : void 0,
                };
            });
    p = await Promise.all(
        p.map((r) =>
            e.tryGet(r.link, async () => {
                let { data: e } = await n(r.link),
                    i = o(e),
                    a = i(`div.work-item img`)
                        .toArray()
                        .map((e) => ((e = i(e)), { src: e.prop(`src`).replace(/-\d+x\d+\./, `.`), alt: e.prop(`alt`) }));
                return ((r.title = i(`div.project-title`).text()), (r.description += l({ images: a, description: i(`div.nectar-fancy-ul`).html() })), (r.pubDate = t(i(`span.subheader`).last().text(), `YYYY`)), r);
            })
        )
    );
    let m = new URL(`favicon.ico`, c).href;
    return {
        item: p,
        title: f(`title`).text(),
        link: u,
        description: f(`meta[property="og:description"]`).prop(`content`),
        language: f(`html`).prop(`lang`),
        icon: m,
        logo: m,
        subtitle: f(`a[aria-current="page"] span.menu-title-text`).text(),
        author: s,
    };
}
export { u as route };
