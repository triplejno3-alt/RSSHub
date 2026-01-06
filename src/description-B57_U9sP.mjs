import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ content: i, images: a, replies: o }) =>
    r(
        n(e, {
            children: [
                i ? t(e, { children: i }) : null,
                a?.map((e) => t(`img`, { src: e.url, width: e.size?.w, height: e.size?.h })),
                o?.length ? n(e, { children: [t(`h3`, { children: `回复` }), o.map((e) => n(`p`, { children: [t(`b`, { children: e.nickname }), ` `, n(`small`, { children: [`[`, e.time, `]`] }), `: `, e.content] }))] }) : null,
            ],
        })
    );
export { i as t };
