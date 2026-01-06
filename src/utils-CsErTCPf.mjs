import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = (e) =>
        e(`4gamers:categories`, async () => {
            let { data: e } = await t(`https://www.4gamers.com.tw/site/api/news/category`);
            return e.data.map((e) => ({ id: e.id, name: e.name }));
        }),
    l = (t) => t.map((t) => ({ title: t.title, author: t.author.nickname, intro: t.intro, pubDate: e(t.createPublishedAt, `x`), link: t.canonicalUrl, category: [...new Set([t.category.name, ...t.tags])], articleId: t.id })),
    u = async (e) => {
        let { data: r } = await t(`https://www.4gamers.com.tw/site/api/news/find-section`, { searchParams: { sub: e.articleId } });
        return (
            (e.description = d(
                e.intro,
                r.data.contentSection.sections
                    .map((t) => {
                        switch (t[`@type`]) {
                            case `ContentAdsSection`:
                            case `ScrollerAdsSection`:
                            case `textScrollerAdsSection`:
                                return ``;
                            case `RawHtmlSection`:
                                return t.html;
                            case `ImageGroupSection`:
                                return f(t.items);
                            default:
                                throw new n(`Unhandled section type: ${t[`@type`]} on ${e.link}`);
                        }
                    })
                    .join(``)
            )),
            e
        );
    },
    d = (e, t) => o(a(r, { children: [i(`blockquote`, { children: e }), i(`br`, {}), s(t)] })),
    f = (e) => o(i(r, { children: e.map((e) => a(r, { children: [i(`img`, { src: e.url, alt: e.alt }), i(`br`, {})] })) }));
export { u as n, l as r, c as t };
