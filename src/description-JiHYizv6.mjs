import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ pdfUrl: r, kimiUrl: i, authors: a, summary: o }) =>
        n(e, {
            children: [
                r ? t(`a`, { href: r, children: `[PDF]` }) : null,
                i ? t(`a`, { href: i, children: `[Kimi]` }) : null,
                a?.length ? n(`p`, { children: [t(`b`, { children: `Authors:` }), a.map((r) => n(e, { children: [t(`a`, { href: r.url, children: r.name }), `,`] }))] }) : null,
                o ? t(`p`, { children: o }) : null,
            ],
        }),
    a = (e) => r(t(i, { ...e }));
export { a as t };
