import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = async () =>
        await e.tryGet(`jpxgmn:originUrl`, async () => {
            let e = i((await t(`http://mei8.vip/`)).data),
                n = e(`ul > li > span`);
            return `http://` + e(n[Math.floor(Math.random() * n.length)]).text();
        }),
    s = (e) =>
        e(`article > p img`)
            .toArray()
            .map((t) => e(t).attr(`src`)),
    c = async (e) => {
        let o = i((await t(e)).data),
            c = o(`div.pagination:first ul a`).length - 1;
        c === -1 && (c = 1);
        let l = s(o),
            u = await Promise.all([...Array.from({ length: c - 1 }).keys()].map(async (n) => s(i((await t(e.replace(`.html`, `_${n + 1}.html`))).data))));
        return a(r(n, { children: [...l, ...u.flat()].map((e) => r(`img`, { src: e })) }));
    };
export { o as n, c as t };
