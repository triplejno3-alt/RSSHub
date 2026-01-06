import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = async (r) => {
        let a = Number.parseInt(r.req.query(`limit`) ?? `30`, 10),
            o = `https://kiro.dev`,
            s = new URL(`blog/`, o).href,
            c = i(await e(s)),
            l = c(`html`).attr(`lang`) ?? `en`,
            u = [];
        return (
            (u = c(`main a.group`)
                .slice(0, a)
                .toArray()
                .map((e) => {
                    let t = c(e),
                        r = t.find(`h4`).text(),
                        i = t.find(`time`).text(),
                        a = t.attr(`href`),
                        s = i;
                    return { title: r, pubDate: i ? n(i) : void 0, link: a ? new URL(a, o).href : void 0, updated: s ? n(s) : void 0, language: l };
                })),
            (u = await Promise.all(
                u.map((r) =>
                    r.link
                        ? t.tryGet(r.link, async () => {
                              let t = i(await e(r.link)),
                                  a = t(`header h1`).text(),
                                  o = t(`div.prose`).html() ?? void 0,
                                  s = t(`time`).text(),
                                  c = t(`img.aspect-square`).parent().parent(),
                                  u = [{ name: c.find(`p`).first().text(), url: void 0, avatar: c.find(`img`).attr(`src`) }],
                                  d = t(`meta[property="og:image"]`).attr(`content`),
                                  f = s,
                                  p = { title: a, description: o, pubDate: s ? n(s) : r.pubDate, author: u, content: { html: o, text: o }, image: d, banner: d, updated: f ? n(f) : r.updated, language: l };
                              return { ...r, ...p };
                          })
                        : r
                )
            )),
            {
                title: c(`title`).text(),
                description: c(`meta[property="og:description"]`).attr(`content`),
                link: s,
                item: u,
                allowEmpty: !0,
                image: c(`meta[property="og:image"]`).attr(`content`),
                author: c(`meta[property="og:site_name"]`).attr(`content`),
                language: l,
                id: s,
            }
        );
    },
    o = {
        path: `/blog`,
        name: `Blog`,
        url: `kiro.dev`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/kiro/blog`,
        parameters: void 0,
        description: void 0,
        categories: [`programming`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`kiro.dev`, `kiro.dev/blog/`], target: `/blog` }],
        view: r.Articles,
    };
export { a as handler, o as route };
