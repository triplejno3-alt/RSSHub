import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
import { raw as i } from 'hono/html';
const a = ({ images: r, description: a }) => n(e, { children: [r?.map((e, n) => (e?.src ? t(`figure`, { children: t(`img`, { src: e.src, alt: e.alt }) }, `${e.src}-${n}`) : null)), a ? t(e, { children: i(a) }) : null] }),
    o = (e) => r(t(a, { ...e }));
export { o as t };
