import { Fragment as e, jsx as t } from 'hono/jsx/jsx-runtime';
import { renderToString as n } from 'hono/jsx/dom/server';
const r = (r) => n(t(e, { children: r.map((e) => t(`img`, { src: e })) }));
export { r as t };
