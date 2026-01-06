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
const u = async (r) => {
        let u = Number.parseInt(r.req.query(`limit`) ?? `30`, 10),
            d = `https://www.thebrain.com`,
            f = new URL(`blog`, d).href,
            p = s(await e(f)),
            m = p(`html`).attr(`lang`) ?? `en`,
            h = [];
        return (
            (h = p(`div.blog-row`)
                .slice(0, u)
                .toArray()
                .map((e) => {
                    let t = p(e),
                        r = t.find(`h4 a`),
                        s = r.text(),
                        u = t.find(`div.round-corner-images img`).attr(`src`) ? `https:${t.find(`div.round-corner-images img`).attr(`src`)?.split(/\?/)[0]}` : void 0,
                        f = c(o(i, { children: [u ? a(`figure`, { children: a(`img`, { src: u, alt: s }) }) : null, t.find(`p.small-text`).next().html() ? l(t.find(`p.small-text`).next().html()) : null] })),
                        h = t.find(`p.small-text`).text(),
                        g = r.attr(`href`),
                        _ = h;
                    return { title: s, description: f, pubDate: h ? n(h) : void 0, link: g ? new URL(g, d).href : void 0, content: { html: f, text: f }, image: u, banner: u, updated: _ ? n(_) : void 0, language: m };
                })),
            (h = await Promise.all(
                h.map((r) =>
                    r.link
                        ? t.tryGet(r.link, async () => {
                              let t = s(await e(r.link)),
                                  i = t(`h2.gradient-heading`).text() || t(`h1.gradient-heading`).text();
                              (t(`h2.gradient-heading`).remove(), t(`div#shareDiv`).remove());
                              let a = t(`div.blog-content`).html() || t(`div.docs-section`).html() || void 0,
                                  o = t(`div.blog-meta`).text(),
                                  c = t(`a.under-category`).toArray(),
                                  l = [...new Set(c.map((e) => t(e).text()).filter(Boolean))],
                                  u = t(`img.avatar`)
                                      .toArray()
                                      .map((e) => {
                                          let n = t(e).parent().next().find(`a`);
                                          return { name: n.text(), url: n.attr(`href`) ? new URL(n.attr(`href`), d).href : void 0, avatar: `https:${t(e).attr(`src`)?.split(/\?/)[0]}` };
                                      }),
                                  f = o,
                                  p = { title: i, description: a, pubDate: o ? n(o) : r.pubDate, category: l, author: u, content: { html: a, text: a }, updated: f ? n(f) : r.updated, language: m };
                              return { ...r, ...p };
                          })
                        : r
                )
            )),
            { title: p(`title`).text(), link: f, item: h, allowEmpty: !0, image: p(`img.navbar-logo`).attr(`src`) ? new URL(p(`img.navbar-logo`).attr(`src`), d).href : void 0, language: m, id: f }
        );
    },
    d = {
        path: `/blog`,
        name: `Blog`,
        url: `www.thebrain.com`,
        maintainers: [`nczitzk`],
        handler: u,
        example: `/thebrain/blog`,
        parameters: void 0,
        description: void 0,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.thebrain.com/blog`], target: `/blog` }],
        view: r.Articles,
    };
export { u as handler, d as route };
