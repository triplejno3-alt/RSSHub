import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = new URL(`https://openai.com`),
    d = async (t) => {
        let n = s(await e(t)),
            r = n(`#main article`),
            i = n(`h1`)
                .prev()
                .find(`a[href]`)
                .toArray()
                .map((e) => n(e).text());
        return (n(r.find(`h1`).parents().get(4)).remove(), r.children().last().remove(), r.find(`#citations`).remove(), { content: r.html() ?? void 0, categories: i, image: n(`meta[property="og:image"]`).attr(`content`) });
    },
    f = async (r) => {
        let i = s(await e(`https://openai.com/news/rss.xml`, { responseType: `text`, headers: { 'User-Agent': t.ua } }), { xml: !0 });
        return Promise.all(
            i(`item`)
                .toArray()
                .slice(0, r)
                .map((e) => {
                    let t = i(e).find(`guid`).text();
                    return n.tryGet(`openai:news:${t}`, async () => {
                        let n = i(e).find(`title`).text(),
                            r = i(e).find(`pubDate`).text(),
                            a = i(e).find(`link`).text(),
                            { content: o, categories: s } = await d(a);
                        return { guid: t, title: n, link: a, pubDate: r, description: o, category: s };
                    });
                })
        );
    },
    p = async () => {
        let e = (await r({ method: `get`, url: `https://openai.com/blog` })).data
            .toString()
            .match(/(?<=TWILL_API_BASE:").+?(?=")/)[0]
            .replaceAll(String.raw`\u002F`, `/`);
        return new URL(e);
    },
    m = (e, t, u) =>
        n.tryGet(u.slug, async () => {
            let e = `${t}/${u.slug}`,
                n = s((await r({ method: `get`, url: e })).data),
                d = n(`[aria-labelledby="metaAuthorsHeading"] > li > a > span > span`)
                    .toArray()
                    .map((e) => n(e).text())
                    .join(`, `);
            (n(`*`)
                .contents()
                .filter(function () {
                    return this.nodeType === 8;
                })
                .remove(),
                (n = n(`#content`)));
            let f = u.seo.ogImageSrc,
                p = u.seo.ogImageAlt,
                m = c(o(i, { children: [a(`img`, { src: f ?? ``, alt: p ?? `` }), l(n.toString())] }));
            return ((u.tags = u.tags || []), { title: u.title, author: d, description: m, pubDate: u.createdAt, category: u.tags.map((e) => e.title), link: e });
        });
export { m as i, f as n, p as r, u as t };
