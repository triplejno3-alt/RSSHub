import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
import { raw as i } from 'hono/html';
const a = ({ coverImage: a, description: o, md: s }) =>
    r(n(e, { children: [a ? n(e, { children: [t(`img`, { src: a }), t(`br`, {})] }) : null, o ? n(e, { children: [o, t(`br`, {})] }) : null, s ? t(e, { children: i(s) }) : null] }));
export { a as t };
