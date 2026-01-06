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
        o(i, { children: [e?.map((e) => (e?.src ? a(`figure`, { children: a(`img`, { src: e.src, alt: e.alt, width: e.width, height: e.height }) }) : null)), t ? a(`blockquote`, { children: t }) : null, n ? l(n) : null] }),
    d = (e) => c(a(u, { ...e })),
    f = async (r) => {
        let i = Number.parseInt(r.req.query(`limit`) ?? `10`, 10),
            a = `https://www.ornl.gov`,
            o = new URL(`all-news`, a).href,
            c = s(await e(o)),
            l = c(`html`).attr(`lang`) ?? `en`,
            u = [];
        return (
            (u = c(`div.view-rows-main div.list-item-wrapper`)
                .slice(0, i)
                .toArray()
                .map((e) => {
                    let t = c(e),
                        r = t.find(`div.list-item-title h2 a`),
                        i = t.find(`div.list-item-thumbnail-wrapper img`),
                        o = r.text(),
                        s = i.attr(`src`),
                        u = d({ images: s ? [{ src: s, alt: i.attr(`alt`) || o, width: Number(i.attr(`width`)) || void 0, height: Number(i.attr(`height`)) || void 0 }] : void 0, intro: t.find(`div.list-item-desc p`).text() }),
                        f = t.find(`div.list-item-date`).attr(`datetime`),
                        p = r.attr(`href`),
                        m = f;
                    return { title: o, description: u, pubDate: f ? n(f) : void 0, link: p ? new URL(p, a).href : void 0, content: { html: u, text: u }, image: s, banner: s, updated: m ? n(m) : void 0, language: l };
                })),
            (u = await Promise.all(
                u.map((r) =>
                    r.link
                        ? t.tryGet(r.link, async () => {
                              let t = s(await e(r.link)),
                                  i = t(`div.image-landscape img`),
                                  o = t(`h1.page-title`).text(),
                                  c = i.attr(`src`),
                                  u = d({
                                      images: c ? [{ src: c, alt: i.attr(`alt`) || o, width: Number(i.attr(`width`)) || void 0, height: Number(i.attr(`height`)) || void 0 }] : void 0,
                                      description: t(`div.image-description`).html(),
                                  }),
                                  f = t(`div.publish-date time`).attr(`datetime`),
                                  p = t(`div.related-researcher-container`)
                                      .toArray()
                                      .map((e) => {
                                          let n = t(e).find(`div.related-researcher-name a`);
                                          return {
                                              name: n.text(),
                                              url: n.attr(`href`) ? new URL(n.attr(`href`), a).href : void 0,
                                              avatar: n.find(`div.related-researcher-photo img`).attr(`src`) ? new URL(n.find(`div.related-researcher-photo img`).attr(`src`), a).href : void 0,
                                          };
                                      }),
                                  m = f,
                                  h = { title: o, description: u, pubDate: f ? n(f) : r.pubDate, author: p, content: { html: u, text: u }, image: c, banner: c, updated: m ? n(m) : r.updated, language: l };
                              return { ...r, ...h };
                          })
                        : r
                )
            )),
            {
                title: c(`title`).text(),
                description: c(`meta[name="description"]`).attr(`content`),
                link: o,
                item: u,
                allowEmpty: !0,
                image: c(`meta[name="twitter:image"]`).attr(`content`),
                author: c(`meta[property="og:site_name"]`).attr(`content`),
                language: l,
                id: c(`meta[property="og:url"]`).attr(`content`),
            }
        );
    },
    p = {
        path: `/all-news`,
        name: `All News`,
        url: `www.ornl.gov`,
        maintainers: [`nczitzk`],
        handler: f,
        example: `/ornl/all-news`,
        parameters: void 0,
        description: void 0,
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.ornl.gov/all-news`], target: `/all-news` }],
        view: r.Articles,
    };
export { f as handler, p as route };
