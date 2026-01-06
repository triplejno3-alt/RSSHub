import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import c from 'markdown-it';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
const d = c({ html: !0 }),
    f = (e) =>
        l(
            a(i, {
                children: e?.map((e) =>
                    o(`div`, {
                        children: [
                            a(`h1`, { children: e.category_name }),
                            e.items?.map((e) =>
                                o(`div`, {
                                    children: [
                                        a(`h2`, { children: a(`a`, { href: e.github_url, children: e.name }) }),
                                        a(`table`, {
                                            children: o(`tbody`, {
                                                children: [
                                                    o(`tr`, { children: [a(`th`, { children: `Stars` }), a(`td`, { children: e.stars })] }),
                                                    o(`tr`, { children: [a(`th`, { children: `Forks` }), a(`td`, { children: e.forks })] }),
                                                    o(`tr`, { children: [a(`th`, { children: `Watch` }), a(`td`, { children: e.watch })] }),
                                                ],
                                            }),
                                        }),
                                        a(`p`, { children: e.description ? u(d.render(e.description)) : null }),
                                        e.image_url ? a(`figure`, { children: a(`img`, { src: e.image_url }) }) : null,
                                    ],
                                })
                            ),
                        ],
                    })
                ),
            })
        ),
    p = { path: `/volume`, example: `/hellogithub/volume`, name: `月刊`, maintainers: [`moke8`, `nczitzk`, `CaoMeiYouRen`], handler: m };
async function m(i) {
    let a = Number.parseInt(i.req.query(`limit`)) || 10,
        o = `https://hellogithub.com`,
        c = (await r({ method: `get`, url: `https://api.hellogithub.com/v1/periodical/` })).data.volumes.slice(0, a);
    return {
        title: `HelloGithub - 月刊`,
        link: `https://hellogithub.com/periodical`,
        item: await Promise.all(
            c.map(async (i) => {
                let a = i.num,
                    c = i.lastmod,
                    l = `${o}/periodical/volume/${a}`,
                    u = `hellogithub:${l}`;
                return await t.tryGet(
                    u,
                    async () => {
                        let e = s((await r({ method: `get`, url: l })).data)(`#__NEXT_DATA__`).text(),
                            t = JSON.parse(e).props,
                            i = t.pageProps.volume.current_num;
                        return { title: `《HelloGitHub》第 ${i} 期`, link: `${o}/periodical/volume/${i}`, description: f(t.pageProps.volume.data), pubDate: n(c) };
                    },
                    e.cache.routeExpire,
                    !1
                );
            })
        ),
    };
}
export { p as route };
