import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { t as a } from './description-2kGjfn-0.mjs';
import { load as o } from 'cheerio';
const s = async (i) => {
        let s = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            c = `https://www.adquan.com`,
            l = o(await e(c)),
            u = l(`html`).attr(`lang`) ?? `zh-CN`,
            d = [];
        return (
            (d = l(`div.article_1`)
                .slice(0, s)
                .toArray()
                .map((e) => {
                    let t = l(e),
                        r = t.find(`p.article_2_p`).text(),
                        i = a({ intro: t.find(`div.article_1_fu p`).first().text() }),
                        o = t.find(`div.article_1_fu p`).last().text(),
                        s = t.find(`a.article_2_href`).attr(`href`),
                        c = t.find(`div.article_4`).text(),
                        d = t.find(`img.article_1_img`).attr(`src`),
                        f = o;
                    return { title: r, description: i, pubDate: o ? n(o) : void 0, link: s, author: c, content: { html: i, text: i }, image: d, banner: d, updated: f ? n(f) : void 0, language: u };
                })),
            (d = (
                await Promise.all(
                    d.map((i) =>
                        i.link
                            ? t.tryGet(i.link, async () => {
                                  let t = o(await e(i.link)),
                                      s = t(`p.infoTitle_left`).text(),
                                      c = a({ description: t(`div.articleContent`).html() ?? void 0 }),
                                      l = t(`p.time`).text().split(/：/).pop(),
                                      d = t(`span.article_5`).toArray(),
                                      f = [...new Set(d.map((e) => t(e).text()).filter(Boolean))],
                                      p = t(`div.infoTitle_right span`).text(),
                                      m = l,
                                      h = { title: s, description: c, pubDate: l ? r(n(l), 8) : i.pubDate, category: f, author: p, content: { html: c, text: c }, updated: m ? r(n(m), 8) : i.updated, language: u };
                                  return { ...i, ...h };
                              })
                            : i
                    )
                )
            ).filter((e) => !0)),
            {
                title: l(`title`).text(),
                description: l(`meta[name="description"]`).attr(`content`),
                link: c,
                item: d,
                allowEmpty: !0,
                image: l(`img.navi_logo`).attr(`src`),
                author: l(`meta[name="author"]`).attr(`content`),
                language: u,
                id: c,
            }
        );
    },
    c = {
        path: `/`,
        name: `最新文章`,
        url: `www.adquan.com`,
        maintainers: [`nczitzk`],
        handler: s,
        example: `/adquan`,
        parameters: void 0,
        description: void 0,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.adquan.com`], target: `/` }],
        view: i.Articles,
    };
export { s as handler, c as route };
