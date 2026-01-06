import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ author: i, company: a, content: o }) => r(n(e, { children: [t(`text`, { children: `作者：${i} ` }), t(`br`, {}), t(`text`, { children: `单位：${a} ` }), t(`br`, {}), t(`text`, { children: o })] }));
export { i as t };
