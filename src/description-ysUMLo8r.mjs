import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = (i, a) => r(n(e, { children: [i, a?.length ? a.map((e) => t(`img`, { src: e })) : null] }));
export { i as t };
