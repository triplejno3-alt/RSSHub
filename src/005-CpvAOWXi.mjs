import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = async (l) => {
        let { category: u = `zx` } = l.req.param(),
            d = l.req.query(`limit`) ? Number.parseInt(l.req.query(`limit`), 10) : 20,
            f = `https://005.tv`,
            p = new URL(u ? `${u}/` : ``, f).href,
            { data: m } = await n(p),
            h = s(m),
            g = h(`html`).prop(`lang`),
            _ = h(`div.article-list ul li`)
                .slice(0, d)
                .toArray()
                .map((e) => {
                    e = h(e);
                    let n = e.find(`h3`).text(),
                        r = e.find(`img`).prop(`src`),
                        s = c(o(i, { children: [r ? a(`figure`, { children: a(`img`, { src: r, alt: n }) }) : null, e.find(`div.p-row`).text() ? a(`blockquote`, { children: e.find(`div.p-row`).text() }) : null] }));
                    return {
                        title: n,
                        description: s,
                        pubDate: t(e.find(`span.time`).text()),
                        link: new URL(e.find(`h3 a`).prop(`href`), f).href,
                        content: { html: s, text: e.find(`div.p-row`).text() },
                        image: r,
                        banner: r,
                        language: g,
                    };
                });
        _ = await Promise.all(
            _.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = s(e),
                        o = a(`h1.articleTitle-name`).text(),
                        c = a(`div.articleContent`).html();
                    return (
                        (i.title = o),
                        (i.description = c),
                        (i.pubDate = r(t(a(`.time`).text()), 8)),
                        (i.category = a(`meta[name="keywords"]`).prop(`content`).split(/,/)),
                        (i.content = { html: c, text: a(`div.articleContent`).text() }),
                        (i.language = g),
                        i
                    );
                })
            )
        );
        let v = h(`title`).text(),
            y = new URL(`templets/muban/style/images/logo.png`, f).href;
        return { title: v, description: v.split(/_/)[0], link: p, item: _, allowEmpty: !0, image: y, author: v.split(/,/).pop(), language: g };
    },
    u = {
        path: `/:category?`,
        name: `资讯`,
        url: `005.tv`,
        maintainers: [`nczitzk`],
        handler: l,
        example: `/005/zx`,
        parameters: { category: `分类，可在对应分类页 URL 中找到，默认为二次元资讯` },
        description: `
| 二次元资讯 | 慢慢说 | 道听途说 | 展会资讯 |
| ---------- | ------ | -------- | -------- |
| zx         | zwh    | dtts     | zh       |
    `,
        categories: [`anime`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`005.tv/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/005${t ? `/${t}` : ``}`;
                },
            },
            { title: `二次元资讯`, source: [`005.tv/zx/`], target: `/005/zx` },
            { title: `慢慢说`, source: [`005.tv/zwh/`], target: `/005/zwh` },
            { title: `道听途说`, source: [`005.tv/dtts/`], target: `/005/dtts` },
            { title: `展会资讯`, source: [`005.tv/zh/`], target: `/005/zh` },
        ],
    };
export { l as handler, u as route };
