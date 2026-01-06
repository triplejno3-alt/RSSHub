import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { i as n, n as r, t as i } from './content-DXmMltMC.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = { path: `/thread/:id`, radar: [{ source: [`lkong.com/thread/:id`, `lkong.com/`] }], name: `Unknown`, maintainers: [`nczitzk`, `ma6254`], handler: d };
async function d(a) {
    let s = a.req.param(`id`),
        l = `https://www.lkong.com`,
        u = `https://api.lkong.com/api`,
        d = `${l}/thread/${s}`,
        p = await t({ method: `post`, url: u, json: r(s) });
    if (p.data.errors) throw Error(p.data.errors[0].message);
    let m = await t({ method: `post`, url: u, json: n(s, Math.ceil(p.data.data.thread.replies / 20)) }),
        h = m.data.data.posts.map((t) => ({
            guid: t.pid,
            author: t.user.name,
            title: `#${t.lou} ${t.user.name}`,
            link: `${l}/thread/${s}?pid=${t.pid}`,
            pubDate: e(t.dateline),
            description: (t.quote ? c(o(f, { target: `${l}/thread/${s}?pid=${t.quote.pid}`, author: t.quote.author.name, content: i(JSON.parse(t.quote.content)) })) : ``) + i(JSON.parse(t.content)),
        }));
    return { title: `${m.data.data.thread.title} - 龙空`, link: d, item: h };
}
const f = ({ target: e, author: t, content: n }) =>
    s(a, {
        children: [
            s(`div`, {
                class: `quote`,
                children: [
                    s(`a`, {
                        href: e,
                        class: `quote-link`,
                        children: [
                            o(`svg`, {
                                xmlns: `http://www.w3.org/2000/svg`,
                                width: `13.16`,
                                height: `12`,
                                viewBox: `0 0 13.16 12`,
                                class: `css-1f5j0lz`,
                                children: o(`path`, { d: `M5.71,0,0,5l5.71,5V6.57S13.63,4,12,12c0,0,5.11-9.71-6.42-9L5.71,0Z` }),
                            }),
                            t,
                        ],
                    }),
                    `:`,
                    l(n),
                ],
            }),
            o(`style`, {
                children: `
.quote {
    margin: 15px 0px 15px;
    width: 100%;
    border: 1px solid #eee;
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 8px 14px;
    cursor: pointer;
}

.quote-link {
    color: #1890ff;
    text-decoration: none;
}
`,
            }),
        ],
    });
export { u as route };
