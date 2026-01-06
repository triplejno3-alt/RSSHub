import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = (e) =>
        a(
            i(n, {
                children: [
                    r(`img`, { src: `https://img-eshop.cdn.nintendo.net/i/${e.iurl}.jpg` }),
                    r(`br`, {}),
                    r(`strong`, { children: `发售日期：` }),
                    e.pdate,
                    r(`br`, {}),
                    r(`strong`, { children: `价格：` }),
                    e.dprice,
                    `円`,
                    r(`br`, {}),
                    r(`br`, {}),
                    e.hcopy ? e.hcopy.map((e) => i(n, { children: [r(`b`, { children: e }), r(`br`, {})] })) : null,
                    r(`br`, {}),
                    e.text
                        ? r(n, {
                              children: o(
                                  e.text.replaceAll(
                                      `
`,
                                      `<br>`
                                  )
                              ),
                          })
                        : null,
                ],
            })
        ),
    c = { path: `/eshop/jp`, radar: [{ source: [`nintendo.co.jp/software/switch/index.html`, `nintendo.co.jp/`] }], name: `Unknown`, maintainers: [], handler: l, url: `nintendo.co.jp/software/switch/index.html` };
async function l(n) {
    return {
        title: `Nintendo eShop（日服）新游戏`,
        link: `https://www.nintendo.co.jp/software/switch/index.html`,
        description: `Nintendo eShop（日服）新上架的游戏`,
        item: (
            await t(`https://search.nintendo.jp/nintendo_soft/search.json`, {
                searchParams: {
                    opt_sshow: 1,
                    fq: `ssitu_s:onsale OR ssitu_s:preorder OR memo_bg:forced`,
                    limit: n.req.query(`limit`) ? Number(n.req.query(`limit`)) : 24,
                    page: 1,
                    c: `50310840317994813`,
                    opt_osale: 1,
                    opt_hard: `1_HAC`,
                    sort: `sodate desc,score`,
                },
            })
        ).data.result.items.map((t) => ({ title: t.title, description: s(t), link: `https://ec.nintendo.com/JP/ja/titles/${t.id}`, pubDate: e(t.pdate) })),
    };
}
export { c as route };
