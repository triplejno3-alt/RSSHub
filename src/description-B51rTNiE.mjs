import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
import { raw as i } from 'hono/html';
const a = ({ images: a, description: o }) =>
    r(n(e, { children: [a?.length ? a.map((e) => (e?.src ? t(`figure`, { children: e.alt ? t(`img`, { src: e.src, alt: e.alt }) : t(`img`, { src: e.src }) }) : null)) : null, o ? i(o) : null] }));
export { a as t };
