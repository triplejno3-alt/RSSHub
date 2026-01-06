import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = (e = `zh_CN`) => `X-UA=${encodeURIComponent(`V=1&PN=WebApp&VN=0.1.0&LANG=${e}&PLT=PC`)}`,
    c = (e = !1) => (e ? `https://www.taptap.io` : `https://www.taptap.cn`),
    l = (n, r = `zh_CN`, i = !1) => t.tryGet(`taptap:appDetail:${n}:${r}:${i}`, async () => (await e(`${c(i)}/webapiv2/group/v1/detail?app_id=${n}&${s(r)}`, { headers: { Referer: `${c(i)}/app/${n}` } })).data),
    u = (e) => o(r(n, { children: e.map((e) => r(`img`, { src: e.original_url || e.url })) })),
    d = async (t, n, r = `zh_CN`) => {
        let i = a((await e(`${c(!1)}/webapiv2/topic/v1/detail?id=${n}&${s(r)}`, { headers: { Referer: `${c(!1)}/app/${t}` } })).data.first_post.contents.text, null, !1);
        return (
            i(`img`).each((e, t) => {
                let n = i(t);
                (n.attr(`src`, n.attr(`data-origin-url`)), n.removeAttr(`data-origin-url`));
            }),
            i.html()
        );
    },
    f = (e) => o(i(n, { children: [r(`p`, { children: `Preview` }), r(`p`, { children: r(`img`, { src: e.thumbnail.original_url || e.thumbnail.url }) })] }));
export { d as a, u as i, l as n, f as o, c as r, s as t };
