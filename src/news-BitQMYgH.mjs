import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './description-Cg-6VxP0.mjs';
import { load as a } from 'cheerio';
const o = async (r) => {
        let o = Number.parseInt(r.req.query(`limit`) ?? `30`, 10),
            s = `https://asiafruitchina.net`,
            c = new URL(`category/news`, s).href,
            l = a(await e(c)),
            u = l(`html`).attr(`lang`) ?? `zh-CN`,
            d = [];
        ((d = l(`div.listBlocks ul li`)
            .slice(0, o)
            .toArray()
            .map((e) => {
                let t = l(e),
                    r = t.find(`div.storyDetails h3 a`),
                    a = r.text(),
                    o = i({
                        images:
                            t.find(`a.image img`).length > 0
                                ? t
                                      .find(`a.image img`)
                                      .toArray()
                                      .map((e) => {
                                          let t = l(e);
                                          return { src: t.attr(`src`), alt: t.attr(`alt`) };
                                      })
                                : void 0,
                    }),
                    c = t.find(`span.date`).text(),
                    d = r.attr(`href`),
                    f = t.find(`a.image img`).attr(`src`),
                    p = c;
                return { title: a, description: o, pubDate: c ? n(c) : void 0, link: d ? new URL(d, s).href : void 0, content: { html: o, text: o }, image: f, banner: f, updated: p ? n(p) : void 0, language: u };
            })),
            (d = (
                await Promise.all(
                    d.map((r) =>
                        r.link
                            ? t.tryGet(r.link, async () => {
                                  let t = a(await e(r.link)),
                                      o = t(`div.story_title h1`).text(),
                                      s = i({ description: t(`div.storytext`).html() ?? void 0 }),
                                      c = t(`span.date`).first().text().split(/：/).pop(),
                                      l =
                                          t(`meta[name="keywords"]`)
                                              .attr(`content`)
                                              ?.split(/,/)
                                              .map((e) => e.trim()) ?? [],
                                      d = t(`span.author`).first().text(),
                                      f = c,
                                      p = { title: o, description: s, pubDate: c ? n(c) : r.pubDate, category: l, author: d, content: { html: s, text: s }, updated: f ? n(f) : r.updated, language: u },
                                      m = t(`div.extrasStory ul li`)
                                          .toArray()
                                          .map((e) => {
                                              let n = t(e);
                                              return { url: n.find(`a`).attr(`href`), type: `related`, content_html: n.html() };
                                          })
                                          .filter((e) => !0);
                                  return (m && (p = { ...p, _extra: { links: m } }), { ...r, ...p });
                              })
                            : r
                    )
                )
            ).filter((e) => !0)));
        let f = l(`title`).text().trim();
        return { title: f, description: l(`meta[name="description"]`).attr(`content`), link: c, item: d, allowEmpty: !0, image: l(`img.logo`).attr(`src`), author: f.split(/-/).pop(), language: u, id: c };
    },
    s = {
        path: `/news`,
        name: `行业资讯`,
        url: `asiafruitchina.net`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/asiafruitchina/news`,
        parameters: void 0,
        description: void 0,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`asiafruitchina.net/category/news`], target: `/asiafruitchina/news` }],
        view: r.Articles,
    };
export { o as handler, s as route };
