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
                    e?.length ? e.map((e) => (e?.src ? a(`figure`, { children: a(`img`, { src: e.src, alt: e.alt, width: e.width, height: e.height }) }) : null)) : null,
                    t ? a(`blockquote`, { children: t }) : null,
                    n ? l(n) : null,
                ],
            })
        ),
    d = async (r) => {
        let { category: i = `news-events/latest-news` } = r.req.param(),
            a = Number.parseInt(r.req.query(`limit`) ?? `12`, 10),
            o = `https://www.semiconductors.org`,
            c = new URL(i.endsWith(`/`) ? i : `${i}/`, o).href,
            l = s(await e(c)),
            d = l(`html`).attr(`lang`) ?? `en`,
            f = [];
        return (
            (f = l(`div.col-sm-8`)
                .slice(0, a)
                .toArray()
                .map((e) => {
                    let t = l(e),
                        r = t.find(`a`).first(),
                        i = r.text(),
                        a = t
                            .prev()
                            .find(`img`)
                            .attr(`src`)
                            ?.replace(/-\d+x\d+\./, `.`),
                        s = u({ images: a ? [{ src: a, alt: i }] : void 0, intro: r.next().text() }),
                        c = t.find(`div.resource-item-meta`).text().split(/:\s+/).pop(),
                        f = r.attr(`href`),
                        p = t.find(`div.resource-item-category span.ric`).toArray(),
                        m = [...new Set(p.map((e) => l(e).text()).filter(Boolean))],
                        h = c;
                    return {
                        title: i,
                        description: s,
                        pubDate: c ? n(c, `DD/MM/YY`) : void 0,
                        link: f ? new URL(f, o).href : void 0,
                        category: m,
                        content: { html: s, text: s },
                        image: a,
                        banner: a,
                        updated: h ? n(h, `DD/MM/YY`) : void 0,
                        language: d,
                    };
                })),
            (f = await Promise.all(
                f.map((r) =>
                    r.link
                        ? t.tryGet(r.link, async () => {
                              let t = s(await e(r.link)),
                                  i = t(`h1`).text();
                              (t(`h1`).remove(), t(`main#main`).contents().first().remove(), t(`main#main p`).first().remove(), t(`div.newshr`).remove());
                              let a = t(`meta[property="og:image"]`)
                                      .attr(`content`)
                                      ?.replace(/-scaled\./, `.`),
                                  o = u({ images: a ? [{ src: a, alt: i }] : void 0, description: t(`main#main`).html() || void 0 }),
                                  c = t(`meta[property="article:published_time"]`).attr(`content`),
                                  l = t(`meta[name="author"]`)
                                      .toArray()
                                      .map((e) => ({ name: t(e).attr(`content`), url: void 0, avatar: void 0 })),
                                  f = t(`meta[property="article:modified_time"]`).attr(`content`),
                                  p = { title: i, description: o, pubDate: c ? n(c) : r.pubDate, author: l, content: { html: o, text: o }, image: a, banner: a, updated: f ? n(f) : r.updated, language: d };
                              return { ...r, ...p };
                          })
                        : r
                )
            )),
            {
                title: l(`title`).text(),
                description: l(`meta[property="og:description"]`).attr(`content`),
                link: c,
                item: f,
                allowEmpty: !0,
                image: l(`meta[property="og:image"]`).attr(`content`),
                author: l(`meta[property="og:site_name"]`).attr(`content`),
                language: d,
                id: l(`meta[property="og:url"]`).attr(`content`),
            }
        );
    },
    f = {
        path: `/:category{.+}?`,
        name: `Latest News`,
        url: `www.semiconductors.org`,
        maintainers: [`nczitzk`],
        handler: d,
        example: `/semiconductors/news-events/latest-news`,
        parameters: { category: { description: 'Category, `news-events/latest-news` by default' } },
        description:
            ':::tip\nTo subscribe to [Latest News](https://www.semiconductors.org/news-events/latest-news/), where the source URL is `https://www.semiconductors.org/news-events/latest-news/`, extract the certain parts from this URL to be used as parameters, resulting in the route as [`/semiconductors/news-events/latest-news`](https://rsshub.app/semiconductors/news-events/latest-news).\n:::',
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.semiconductors.org/:category`], target: `/:category` }],
        view: r.Articles,
    };
export { d as handler, f as route };
