import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = { path: `/memory`, categories: [`new-media`], example: `/houxu/memory`, radar: [{ source: [`houxu.app/memory`, `houxu.app/`] }], name: `跟踪`, maintainers: [`nczitzk`], handler: s, url: `houxu.app/memory` };
async function s(o) {
    let s = `https://houxu.app`,
        c = `${s}/api/1/lives/updated?limit=${o.req.query(`limit`) ?? 50}`;
    return {
        title: `后续 - 跟踪`,
        link: `${s}/memory`,
        item: (await t({ method: `get`, url: c })).data.results.map((t) => ({
            guid: `${s}/lives/${t.id}#${t.last.id}`,
            title: t.last.link.title,
            link: `${s}/lives/${t.id}`,
            author: t.last.link.source,
            category: [t.title],
            pubDate: e(t.last.create_at),
            description: a(
                i(n, {
                    children: [
                        r(`h1`, { children: t.title }),
                        i(`b`, { children: [r(`a`, { href: t.last.link.url, children: t.last.link.title }), t.last.link.source ? i(n, { children: [` (`, t.last.link.source, `)`] }) : null] }),
                        r(`p`, { children: t.last.link.description }),
                    ],
                })
            ),
        })),
    };
}
export { o as route };
