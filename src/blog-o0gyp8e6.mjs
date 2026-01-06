import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = async (r) => {
        let l = Number.parseInt(r.req.query(`limit`) ?? `30`, 10),
            u = `https://mathpix.com`,
            d = new URL(`blog`, u).href,
            f = s(await e(d)),
            p = f(`html`).attr(`lang`) ?? `en`,
            m = {};
        f(`div.navbar-menu a.blog-category`).each((e, t) => {
            let n = f(t),
                r = n.attr(`data-category`),
                i = n.text()?.trim();
            r && i && (m[r] = i);
        });
        let h = [];
        return (
            (h = f(`li.articles__item`)
                .slice(0, l)
                .toArray()
                .map((e) => {
                    let t = f(e),
                        r = t.find(`a.articles__title`).text(),
                        s = t.find(`div.articles__image img`).attr(`srcset`) ? new URL(t.find(`div.articles__image img`).attr(`srcset`), u).href : void 0,
                        l = c(o(i, { children: [s ? a(`figure`, { children: a(`img`, { src: s, alt: r }) }) : null, t.find(`div.articles__text`).text() ? a(`blockquote`, { children: t.find(`div.articles__text`).text() }) : null] })),
                        d = t.find(`time.articles__date`).attr(`datetime`),
                        h = t.find(`a.articles__title`).attr(`href`),
                        g = (
                            t
                                .attr(`data-category`)
                                ?.split(/,\s/)
                                .map((e) => e.trim()) ?? []
                        )
                            .map((e) => m[e])
                            .filter(Boolean),
                        _ = d;
                    return { title: r, description: l, pubDate: d ? n(d) : void 0, link: h ? new URL(h, u).href : void 0, category: g, content: { html: l, text: l }, image: s, banner: s, updated: _ ? n(_) : void 0, language: p };
                })),
            (h = await Promise.all(
                h.map((n) =>
                    n.link
                        ? t.tryGet(n.link, async () => {
                              let t = s(await e(n.link)),
                                  r = t(`h1.article__title`).text(),
                                  i = t(`div#setText`).html(),
                                  a = { title: r, description: i, content: { html: i, text: i }, language: p };
                              return { ...n, ...a };
                          })
                        : n
                )
            )),
            {
                title: f(`title`).text(),
                description: f(`meta[property="og:description"]`).attr(`content`),
                link: d,
                item: h,
                allowEmpty: !0,
                image: f(`meta[property="og:image"]`).attr(`content`),
                language: p,
                id: f(`meta[property="og:url"]`).attr(`content`),
            }
        );
    },
    u = {
        path: `/blog`,
        name: `Blog`,
        url: `mathpix.com`,
        maintainers: [`nczitzk`],
        handler: l,
        example: `/mathpix/blog`,
        parameters: void 0,
        description: void 0,
        categories: [`blog`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`mathpix.com/blog`], target: `/blog` }],
        view: r.Articles,
    };
export { l as handler, u as route };
