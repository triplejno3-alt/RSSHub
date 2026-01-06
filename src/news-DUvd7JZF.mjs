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
import c from 'sanitize-html';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
import d from 'p-map';
const f = (e, t) => (
        e(t)
            .find(`.fSpecCs`)
            .each((t, n) => {
                (n.parent.name === `nobr` && e(n).unwrap(), (n.name = `b`), (n.attribs = {}));
            }),
        t.html()
    ),
    p = (t, r) =>
        e.tryGet(r, async () => {
            let e = s((await n(r)).data),
                t = ``;
            return (
                e(`.content img`).each((e, n) => {
                    let r = n.attribs.src;
                    r && (t += t ? `<br><img src="${r}">` : `<img src="${r}">`);
                }),
                t
            );
        }),
    m = (t, r) =>
        e.tryGet(r, async () => {
            let e = s((await n(r)).data)(`script[type="text/javascript"]:not([src])`)
                .html()
                .match(/<[^>]*source[^>]+src[^>]+>/g);
            return (
                (e &&= e.map((e) => e.replaceAll(`'`, `"`).replaceAll(/src="([^"]+)"/g, `src="http://www.kcna.kp$1"`))),
                `<video controls preload="metadata">${e.join(`
`)}</video>`
            );
        }),
    h = {
        path: `/:lang/:category?`,
        categories: [`traditional-media`],
        example: `/kcna/en`,
        parameters: { lang: `Language, refer to the table below`, category: `Category, refer to the table below` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.kcna.kp/:lang`, `www.kcna.kp/:lang/category/articles/q/1ee9bdb7186944f765208f34ecfb5407.kcmsf`, `www.kcna.kp/:lang/category/articles.kcmsf`], target: `/:lang` }],
        name: `News`,
        maintainers: [`Rongronggg9`],
        handler: g,
        description:
            "| Language | 조선어 | English | 中国语 | Русский | Español | 日本語 |\n| -------- | ------ | ------- | ------ | ------- | ------- | ------ |\n| `:lang`  | `kp`   | `en`    | `cn`   | `ru`    | `es`    | `jp`   |\n\n| Category                                                         | `:category`                        |\n| ---------------------------------------------------------------- | ---------------------------------- |\n| WPK General Secretary **Kim Jong Un**'s Revolutionary Activities | `54c0ca4ca013a92cc9cf95bd4004c61a` |\n| Latest News (default)                                            | `1ee9bdb7186944f765208f34ecfb5407` |\n| Top News                                                         | `5394b80bdae203fadef02522cfb578c0` |\n| Home News                                                        | `b2b3bcc1b0a4406ab0c36e45d5db58db` |\n| Documents                                                        | `a8754921399857ebdbb97a98a1e741f5` |\n| World                                                            | `593143484cf15d48ce85c26139582395` |\n| Society-Life                                                     | `93102e5a735d03979bc58a3a7aefb75a` |\n| External                                                         | `0f98b4623a3ef82aeea78df45c423fd0` |\n| News Commentary                                                  | `12c03a49f7dbe829bceea8ac77088c21` |",
    };
async function g(h) {
    let { lang: g, category: _ = `1ee9bdb7186944f765208f34ecfb5407` } = h.req.param(),
        v = `http://www.kcna.kp`,
        y = `${v}/${g}/category/articles/q/${_}.kcmsf`,
        b = s((await n(y)).data);
    return {
        title: c(b(`head > title`).text(), { allowedTags: [], allowedAttributes: {} }),
        link: y,
        item: await d(
            b(`.article-link li a`)
                .toArray()
                .map((e) => {
                    e = b(e);
                    let n = e.find(`.publish-time`),
                        i = n.text().match(/\d+\.\d+\.\d+/);
                    return (n.remove(), { title: e.text(), link: v + e.attr(`href`), pubDate: r(t(i[0]), 9) });
                }),
            (c) =>
                e.tryGet(c.link, async () => {
                    let e = s((await n(c.link)).data);
                    c.title = e(`article-main-title`).text() || c.title;
                    let d = e(`.publish-time`),
                        g = d.text().match(/\d+\.\d+\.\d+/);
                    (d.remove(), (c.pubDate = g ? r(t(g[0]), 9) : c.pubDate));
                    let _ = f(e, e(`.article-content-body .content-wrapper`)),
                        y = e(`.media-icon a`)
                            .toArray()
                            .map((e) => v + e.attribs.href),
                        b,
                        x;
                    return (
                        await Promise.all(
                            y.map(async (e) => {
                                e.includes(`/photo/`) ? (b = await p(h, e)) : e.includes(`/video/`) && (x = await m(h, e));
                            })
                        ),
                        (c.description = l(o(i, { children: [_ ? u(_) : null, b ? o(i, { children: [a(`br`, {}), u(b)] }) : null, x ? o(i, { children: [a(`br`, {}), u(x)] }) : null] }))),
                        c
                    );
                }),
            { concurrency: 3 }
        ),
    };
}
export { h as route };
