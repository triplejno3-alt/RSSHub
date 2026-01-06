import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ pic: r, abs: i }) => n(e, { children: [r ? t(`img`, { src: r }) : null, i ? t(`p`, { children: i }) : null] }),
    a = (e) => r(t(i, { ...e }));
export { a as t };
