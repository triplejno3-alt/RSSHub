import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ description: i, image: a }) => r(n(e, { children: [i, a ? t(`img`, { src: a }) : null] }));
export { i as t };
