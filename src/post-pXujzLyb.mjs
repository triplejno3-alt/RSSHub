import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
import { raw as i } from 'hono/html';
const a = ({ medias: r, post: a }) =>
        n(e, { children: [r?.map((e) => t(`figure`, { class: `thumbnail`, children: t(`img`, { width: e.media_details?.width, height: e.media_details?.height, src: e.source_url }) })), a ? i(a) : null] }),
    o = (e) => r(t(a, { ...e }));
export { o as t };
