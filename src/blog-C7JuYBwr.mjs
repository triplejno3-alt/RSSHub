import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = async (r) => {
        let a = Number.parseInt(r.req.query(`limit`) ?? `5`, 10),
            o = `https://aflcio.org`,
            s = new URL(`blog`, o).href,
            c = i(await e(s)),
            l = c(`html`).attr(`lang`) ?? `en`,
            u = [];
        ((u = c(`article.article`)
            .slice(0, a)
            .toArray()
            .map((e) => {
                let t = c(e),
                    r = t.find(`header.container h1 a`).first(),
                    i = r.text(),
                    a = t.find(`div.section`).html() ?? ``,
                    s = t.find(`div.date-timeline time`).attr(`datetime`),
                    u = r.attr(`href`),
                    d = t
                        .find(`div.date-timeline a.user`)
                        .toArray()
                        .map((e) => {
                            let t = c(e);
                            return { name: t.text(), url: t.attr(`href`) ? new URL(t.attr(`href`), o).href : void 0, avatar: void 0 };
                        }),
                    f = t.find(`div.section img`).first().attr(`src`) ? new URL(t.find(`div.section img`).first().attr(`src`), o).href : void 0,
                    p = s;
                return { title: i, description: a, pubDate: s ? n(s) : void 0, link: u ? new URL(u, o).href : void 0, author: d, content: { html: a, text: a }, image: f, banner: f, updated: p ? n(p) : void 0, language: l };
            })),
            (u = (
                await Promise.all(
                    u.map((r) =>
                        r.link
                            ? t.tryGet(r.link, async () => {
                                  let t = i(await e(r.link)),
                                      a = t(`header.article-header h1`).text(),
                                      s = t(`div.section-article-body`).html() ?? ``,
                                      c = t(`time`).attr(`datetime`),
                                      u = t(`div.byline a[property="schema:name"]`)
                                          .toArray()
                                          .map((e) => {
                                              let n = t(e);
                                              return { name: n.text(), url: n.attr(`href`) ? new URL(n.attr(`href`), o).href : void 0, avatar: void 0 };
                                          }),
                                      d = t(`meta[property="og:image"]`).attr(`content`),
                                      f = c,
                                      p = { title: a, description: s, pubDate: c ? n(c) : r.pubDate, author: u, content: { html: s, text: s }, image: d, banner: d, updated: f ? n(f) : r.updated, language: l };
                                  return { ...r, ...p };
                              })
                            : r
                    )
                )
            ).filter((e) => !0)));
        let d = c(`title`).text();
        return { title: d, description: d, link: s, item: u, allowEmpty: !0, image: c(`img.main-logo`).attr(`src`) ? new URL(c(`img.main-logo`).attr(`src`), o).href : void 0, author: d.split(/\|/).pop(), language: l, id: s };
    },
    o = {
        path: `/blog`,
        name: `Blog`,
        url: `aflcio.org`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/aflcio/blog`,
        parameters: void 0,
        description: void 0,
        categories: [`other`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`aflcio.org/blog`], target: `/blog` }],
        view: r.Articles,
    };
export { a as handler, o as route };
