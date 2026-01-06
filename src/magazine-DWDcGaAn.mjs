import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ images: e, intro: t, description: n }) =>
        c(
            o(i, {
                children: [
                    e?.length ? e.map((e) => (e?.src ? a(`figure`, { children: e.alt ? a(`img`, { src: e.src, alt: e.alt }) : a(`img`, { src: e.src }) }) : null)) : null,
                    t ? a(`blockquote`, { children: t }) : null,
                    n ? l(n) : null,
                ],
            })
        ),
    d = async (r) => {
        let i = Number.parseInt(r.req.query(`limit`) ?? `12`, 10),
            a = `https://magazine.raspberrypi.com`,
            o = new URL(`issues`, a).href,
            c = s(await e(o)),
            l = c(`html`).attr(`lang`) ?? `en`,
            d = [],
            f = c(`meta[property="og:site_name"]`).attr(`content`);
        return (
            (d = c(`div.o-grid--equal div.o-grid__col`)
                .slice(0, i)
                .toArray()
                .map((e) => {
                    let t = c(e),
                        r = t.find(`h2.rspec-issue-card-heading a.c-link`),
                        i = r.text()?.trim(),
                        o = t.find(`div.o-media__fixed a.c-link img`).attr(`src`),
                        s = u({ images: o ? [{ src: o, alt: i }] : void 0, intro: t.find(`p.rspec-issue-card-summary`).text() }),
                        d = t.find(`time`).attr(`datetime`),
                        p = r.attr(`href`),
                        m = d;
                    return { title: i, description: s, pubDate: d ? n(d) : void 0, link: p ? new URL(p, a).href : void 0, author: f, content: { html: s, text: s }, image: o, banner: o, updated: m ? n(m) : void 0, language: l };
                })),
            (d = (
                await Promise.all(
                    d.map((r) =>
                        r.link
                            ? t.tryGet(r.link, async () => {
                                  let t = s(await e(r.link)),
                                      i = t(`h1.rspec-issue__heading`).text().split(/-/).pop()?.trim() ?? r.title,
                                      o = r.description + u({ description: t(`div.rspec-issue__description`).html() || void 0 }),
                                      c = t(`time.rspec-issue__publication-month`).attr(`datetime`),
                                      d = t(`img.c-figure__image`).attr(`src`),
                                      p = c,
                                      m = { title: i, description: o, pubDate: c ? n(c) : r.pubDate, author: f, content: { html: o, text: o }, image: d, banner: d, updated: p ? n(p) : r.updated, language: l },
                                      h = new URL(`pdf/download`, `${r.link}/`).href,
                                      g = s(await e(h))(`a.c-link`).first(),
                                      _ = g.attr(`href`) ? new URL(g.attr(`href`), a).href : void 0;
                                  return (_ && (m = { ...m, enclosure_url: _, enclosure_type: `application/pdf`, enclosure_title: i, enclosure_length: void 0 }), { ...r, ...m });
                              })
                            : r
                    )
                )
            ).filter((e) => !0)),
            {
                title: c(`title`).text(),
                description: c(`meta[property="og:description"]`).attr(`content`),
                link: o,
                item: d,
                allowEmpty: !0,
                image: c(`meta[property="og:image"]`).attr(`content`),
                author: c(`meta[property="og:site_name"]`).attr(`content`),
                language: l,
                id: c(`meta[property="og:url"]`).attr(`content`),
            }
        );
    },
    f = {
        path: `/magazine`,
        name: `Official Magazine`,
        url: `magazine.raspberrypi.com`,
        maintainers: [`nczitzk`],
        handler: d,
        example: `/raspberrypi/magazine`,
        parameters: void 0,
        categories: [`programming`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`magazine.raspberrypi.com`], target: `/raspberrypi/magazine` }],
        view: r.Articles,
    };
export { d as handler, f as route };
