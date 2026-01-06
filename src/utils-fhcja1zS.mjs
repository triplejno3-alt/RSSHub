import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import s from 'markdown-it';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = s({ html: !0 }),
    d = `https://utgd.net`,
    f = `https://api.utgd.net`,
    p = (e, t) =>
        e
            .slice(0, t)
            .map((e) => ({ id: e.id, title: e.title, link: `${d}/article/${e.id}`, author: e.article_author_displayname, pubDate: r(n(e.article_published_time), 8), category: e.article_category.map((e) => e.category_name) })),
    m = (n) =>
        t.tryGet(`untag-${n.id}`, async () => {
            let t = await e(`${f}/api/v2/article/${n.id}/`);
            return ((n.description = h(t.article_image, t.article_for_membership, u.render(t.article_content))), (n.category = [...t.article_category.map((e) => e.category_name), ...t.article_tag.map((e) => e.tag_name)]), n);
        }),
    h = (e, t, n) => c(o(i, { children: [e ? o(i, { children: [a(`img`, { src: e }), a(`br`, {})] }) : null, t ? o(i, { children: [a(`br`, {}), `UNTAG Premium`] }) : null, n ? l(n) : null] }));
export { d as i, m as n, p as r, f as t };
