import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './config-not-found-DGyG6Tbz.mjs';
import { jsx as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = ({ link: e, poster: t }) => r(n(`a`, { href: e, children: n(`img`, { src: t }) })),
    a = new Set([`91porn.com`, `www.91porn.com`, `0122.91p30.com`, `www.91zuixindizhi.com`, `w1218.91p46.com`]),
    o = (n) => {
        if (!e.feature.allow_user_supply_unsafe_domain && !a.has(n)) throw new t(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);
    };
export { i as n, o as t };
