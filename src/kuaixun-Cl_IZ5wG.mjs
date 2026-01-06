import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { load as c } from 'cheerio';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
const d = ({ intro: e, description: t }) => l(s(a, { children: [e ? o(`blockquote`, { children: e }) : null, t ? u(t) : null] })),
    f = async (i) => {
        let a = Number.parseInt(i.req.query(`limit`) ?? `50`, 10),
            o = new URL(`kuaixun/`, `https://www.eeo.com.cn`).href,
            s = await e(`https://app.eeo.com.cn`, { query: { app: `article`, controller: `index`, action: `getMoreArticle`, catid: 3690, uuid: `b048c7211db949eeb7443cd5b9b3bfe3`, page: 1, pageSize: a } }),
            l = c(await e(o)),
            u = l(`html`).attr(`lang`) ?? `en`,
            f = [];
        return (
            (f = s.data.slice(0, a).map((e) => {
                let t = e.title,
                    i = d({ intro: e.description, description: e.content }),
                    a = e.published,
                    o = e.url,
                    s = [e.catname].filter(Boolean),
                    c = e.author,
                    l = e.contentid ? `eeo-${e.contentid}` : ``,
                    f = e.thumb,
                    p = a;
                return {
                    title: t,
                    description: i,
                    pubDate: a ? r(n(a), 8) : void 0,
                    link: o,
                    category: s,
                    author: c,
                    guid: l,
                    id: l,
                    content: { html: i, text: i },
                    image: f,
                    banner: f,
                    updated: p ? r(n(p), 8) : void 0,
                    language: u,
                };
            })),
            (f = await Promise.all(
                f.map((i) =>
                    i.link
                        ? t.tryGet(i.link, async () => {
                              let t = c(await e(i.link)),
                                  a = t(`h1`).first().text() || t(`h2.title`).text() || i.title,
                                  o = i.description + d({ description: t(`div.xx_boxsing, div#mainBody`).html() || void 0 }),
                                  s = t(`h1`).next().find(`span`).first().text() || t(`div.from`).text(),
                                  l = t(`h1`).next().contents().first().text() || t(`span.showMoreAuthor`).text() || i.author,
                                  f = s,
                                  p = { title: a, description: o, pubDate: s ? r(n(s), 8) : i.pubDate, author: l, content: { html: o, text: o }, updated: f ? r(n(f), 8) : i.updated, language: u };
                              return { ...i, ...p };
                          })
                        : i
                )
            )),
            {
                title: l(`title`).text(),
                description: l(`meta[name="description"]`).attr(`content`),
                link: o,
                item: f,
                allowEmpty: !0,
                image: l(`div.logo img`).attr(`src`),
                author: l(`meta[name="author"]`).attr(`content`),
                language: u,
                id: l(`meta[property="og:url"]`).attr(`content`),
            }
        );
    },
    p = {
        path: `/kuaixun`,
        name: `快讯`,
        url: `www.eeo.com.cn`,
        maintainers: [`nczitzk`],
        handler: f,
        example: `/eeo/kuaixun`,
        parameters: void 0,
        description: void 0,
        categories: [`finance`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.eeo.com.cn/kuaixun/`], target: `/kuaixun` }],
        view: i.Articles,
    };
export { f as handler, p as route };
