import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = async (n) => {
        let c = Number.parseInt(n.req.query(`limit`) ?? `10`, 10),
            l = `https://windsurf.com`,
            u = new URL(`blog`, l).href,
            d = new URL(`api/blog`, l).href,
            f = await e(d, { query: { paginate: c, cursor: 0 } }),
            p = o(await e(u)),
            m = p(`html`).attr(`lang`) ?? `en`,
            h = p(`title`).first().text(),
            g = h.split(/\|/).pop()?.trim(),
            _ = f.posts.slice(0, c).map((e) => {
                let n = e.title,
                    o = e.images?.[0],
                    c = s(a(r, { children: [o ? i(`figure`, { children: i(`img`, { src: o, alt: n }) }) : null, e.summary ? i(`blockquote`, { children: e.summary }) : null] })),
                    u = e.date,
                    d = e.slug,
                    f = e.tags,
                    p = e.authors.map((e) => ({ name: e, url: void 0, avatar: void 0 })),
                    h = e.slug ? `windsurf-blog-${e.slug}` : void 0,
                    g = u;
                return {
                    title: n,
                    description: c,
                    pubDate: u ? t(u) : void 0,
                    link: d ? new URL(`blog/${d}`, l).href : void 0,
                    category: f,
                    author: p,
                    guid: h,
                    id: h,
                    content: { html: c, text: c },
                    image: o,
                    banner: o,
                    updated: g ? t(g) : void 0,
                    language: m,
                };
            });
        return {
            title: h,
            description: p(`meta[property="og:description"]`).attr(`content`),
            link: u,
            item: _,
            allowEmpty: !0,
            image: p(`meta[property="og:image"]`).attr(`content`),
            author: g,
            language: m,
            id: p(`meta[property="og:url"]`).attr(`content`),
        };
    },
    l = {
        path: `/blog`,
        name: `Blog`,
        url: `windsurf.com`,
        maintainers: [`nczitzk`],
        handler: c,
        example: `/windsurf/blog`,
        parameters: void 0,
        description: void 0,
        categories: [`programming`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`windsurf.com/blog`], target: `/blog` }],
        view: n.Articles,
    };
export { c as handler, l as route };
