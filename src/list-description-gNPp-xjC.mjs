import { Fragment as e, jsx as t, jsxs as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ ranking_value: r, title: i, original_title: a, rate: o, card_subtitle: s, description: c, cover: l }) =>
        n(e, {
            children: [
                r ? t(`p`, { children: r }) : null,
                t(`p`, { children: i }),
                a ? t(`p`, { children: a }) : null,
                o ? t(`p`, { children: o }) : null,
                s ? t(`p`, { children: s }) : null,
                c ? t(`p`, { children: c }) : null,
                l ? t(`img`, { src: l }) : null,
            ],
        }),
    a = (e) => r(t(i, { ...e }));
export { a as t };
