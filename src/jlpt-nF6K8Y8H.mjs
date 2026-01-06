import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = async (r) => {
        let a = Number.parseInt(r.req.query(`limit`) ?? `30`, 10),
            o = `https://jlpt.neea.cn`,
            s = new URL(`index.do`, o).href,
            c = i(await e(s)),
            l = c(`html`).attr(`lang`) ?? `zh-CN`,
            u = [];
        ((u = c(`div.indexcontent a`)
            .slice(0, a)
            .toArray()
            .map((e) => {
                let t = c(e),
                    r = t.text(),
                    i = r.match(/(\d{4}-\d{2}-\d{2})/)?.[1],
                    a = t.attr(`href`),
                    s = i;
                return { title: r, pubDate: i ? n(i) : void 0, link: a ? new URL(a, o).href : void 0, updated: s ? n(s) : void 0, language: l };
            })),
            (u = (
                await Promise.all(
                    u.map((n) =>
                        n.link
                            ? t.tryGet(n.link, async () => {
                                  let t = i(await e(n.link)),
                                      r = { title: t(`div.dvTitle`).text(), description: t(`div.dvContent`).html() ?? `` };
                                  return { ...n, ...r };
                              })
                            : n
                    )
                )
            ).filter((e) => !0)));
        let d = c(`title`).text();
        return {
            title: `${d.split(/-/).pop()} - ${c(`div.indexcontent h1`).text()}`,
            description: d,
            link: s,
            item: u,
            allowEmpty: !0,
            image: c(`div.header img`).attr(`arc`) ? new URL(c(`div.header img`).attr(`arc`), o).href : void 0,
            author: d.split(/-/)[0],
            language: l,
            id: s,
        };
    },
    o = {
        path: `/jlpt`,
        name: `日本语能力测试 JLPT 通知`,
        url: `jlpt.neea.cn`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/neea/jlpt`,
        parameters: void 0,
        description: void 0,
        categories: [`study`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`jlpt.neea.cn`], target: `/jlpt` }],
        view: r.Articles,
    };
export { a as handler, o as route };
