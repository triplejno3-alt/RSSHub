import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = async (i) => {
        let o = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            s = `https://www.stcn.com`,
            c = new URL(`article/list/kx.html`, s).href,
            l = new URL(`article/list.html`, s).href,
            u = await e(c),
            d = await e(l, { headers: { 'x-requested-with': `XMLHttpRequest` }, query: { type: `kx` } }),
            f = a(u),
            p = f(`html`).attr(`lang`) ?? `zh-CN`,
            m = [];
        return (
            (m = d.data.slice(0, o).map((e) => {
                let t = e.title,
                    r = e.content,
                    i = e.time,
                    a = e.url,
                    o = e.tags ? e.tags.map((e) => e.name) : [],
                    c = e.source,
                    l = e.share?.image,
                    u = i;
                return {
                    title: t,
                    description: r,
                    pubDate: i ? n(i, `X`) : void 0,
                    link: a ? new URL(a, s).href : void 0,
                    category: o,
                    author: c,
                    content: { html: r, text: e.content ?? r },
                    image: l,
                    banner: l,
                    updated: u ? n(u, `X`) : void 0,
                    language: p,
                };
            })),
            (m = (
                await Promise.all(
                    m.map((i) =>
                        i.link
                            ? t.tryGet(i.link, async () => {
                                  let t = a(await e(i.link)),
                                      o = t(`div.detail-title`).text(),
                                      s = t(`div.detail-content`).html() ?? ``,
                                      c = t(`div.detail-info span`).last().text().trim(),
                                      l = [...new Set([...i.category, ...(t(`meta[name="keywords"]`).attr(`content`)?.split(/,/) ?? [])])],
                                      u = t(`div.detail-info span`).first().text().split(/：/).pop(),
                                      d = c,
                                      f = { title: o, description: s, pubDate: c ? r(n(c), 8) : i.pubDate, category: l, author: u, content: { html: s, text: s }, updated: d ? r(n(d), 8) : i.updated, language: p };
                                  return { ...i, ...f };
                              })
                            : i
                    )
                )
            ).filter((e) => !0)),
            {
                title: f(`title`).text(),
                description: f(`meta[name="description"]`).attr(`content`),
                link: c,
                item: m,
                allowEmpty: !0,
                image: f(`img.stcn-logo`).attr(`src`),
                author: f(`meta[name="keywords"]`).attr(`content`)?.split(/,/)[0],
                language: p,
                id: c,
            }
        );
    },
    s = {
        path: `/article/list/kx`,
        name: `快讯`,
        url: `www.stcn.com`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/stcn/article/list/kx`,
        parameters: void 0,
        description: void 0,
        categories: [`finance`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.stcn.com/article/list/kx.html`], target: `/article/list/kx` }],
        view: i.Articles,
    };
export { o as handler, s as route };
