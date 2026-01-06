import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ description: r, enclosure_url: i, enclosure_type: a }) =>
        n(e, { children: [r ? t(`p`, { children: r }) : null, i && a ? t(`audio`, { controls: `controls`, preload: `metadata`, children: t(`source`, { src: i, type: a }) }) : null] }),
    a = (e) => r(t(i, { ...e }));
export { a as t };
