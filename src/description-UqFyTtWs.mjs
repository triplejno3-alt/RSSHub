import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
import { raw as i } from 'hono/html';
const a = ({ image: a, intro: o, video: s, description: c }) =>
    r(
        n(e, {
            children: [
                !s?.src && a?.src ? t(`figure`, { children: t(`img`, { src: a.src, alt: a.alt ?? void 0, width: a.width ?? void 0, height: a.height ?? void 0 }) }) : null,
                o ? t(`p`, { children: o }) : null,
                s?.src ? n(`video`, { poster: s.poster ?? a?.src ?? void 0, controls: !0, children: [t(`source`, { src: s.src, type: s.type ?? void 0 }), t(`object`, { data: s.src, children: t(`embed`, { src: s.src }) })] }) : null,
                c ? t(e, { children: i(c) }) : null,
            ],
        })
    );
export { a as t };
