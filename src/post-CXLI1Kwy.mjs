import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ content: i, images: a = [] }) => r(n(e, { children: [i ? t(`p`, { children: i }) : null, a.map((e) => t(`img`, { src: e.src }))] }));
export { i as t };
