import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import o from 'dayjs';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: `/stats/daily/:country`,
    categories: [`other`],
    example: `/iknowwhatyoudownload/stats/daily/CN`,
    url: `iknowwhatyoudownload.com`,
    name: `Daily Torrents Statistics`,
    maintainers: [`p3psi-boo`],
    parameters: { country: `the country of the stats. ISO 3166-1 alpha-2 code.` },
    handler: u,
};
async function u(l) {
    let { country: u } = l.req.param(),
        d = `https://iknowwhatyoudownload.com/en/stat/${u}/daily/q?statDate=`,
        f = Array.from({ length: 7 }, (e, t) => o().subtract(t, `day`)),
        p = (
            await Promise.all(
                f.map((o) => {
                    let l = o.format(`YYYY-MM-DD`),
                        f = `${d}${l}`;
                    return e.tryGet(f, async () => {
                        let e = await t({ method: `get`, url: f });
                        if (!e) return {};
                        let d = a(e.data),
                            p = [];
                        d(`.usePercent`).each((e, t) => {
                            p.push({ percent: d(t).text(), desc: d(t).parent().find(`span`).last().text() });
                        });
                        let m = [],
                            h = e.data.match(/data:\s*\[([\d",\s]+)\]/),
                            g = e.data.match(/labels:\s*\[(.*?)\]/);
                        if (h?.[1] && g?.[1]) {
                            let e = h[1].split(`,`).map((e) => e.trim().replaceAll(`"`, ``)),
                                t = g[1]
                                    .split(`,`)
                                    .map((e) => e.replaceAll(`"`, ``).trim())
                                    .filter((e) => e !== ``);
                            for (let n in t) {
                                let r = t[n],
                                    i = e[n],
                                    [a, o] = r.split(` `);
                                m.push({ key: a, count: i, percent: o });
                            }
                        }
                        let _ = d(`.tab-pane`)
                                .toArray()
                                .map((e) => ({ title: d(e).attr(`id`)?.toUpperCase(), content: d(e).find(`ul`).toString() })),
                            v = s(
                                i(`article`, {
                                    children: [
                                        i(`div`, {
                                            class: `stats`,
                                            children: [r(`h1`, { children: `Torrent download statistics` }), r(`ul`, { children: p.map((e) => i(`li`, { children: [r(`span`, { children: e.percent }), ` `, e.desc] })) })],
                                        }),
                                        i(`div`, {
                                            class: `table-view`,
                                            children: [
                                                r(`h1`, { children: `Table View` }),
                                                m
                                                    ? i(`table`, {
                                                          children: [
                                                              i(`tr`, { children: [r(`th`, { children: `Category` }), r(`th`, { children: `Count` }), r(`th`, { children: `Percent` })] }),
                                                              m.map((e) => i(`tr`, { children: [r(`td`, { children: e.key }), r(`td`, { children: e.count }), r(`td`, { children: e.percent })] })),
                                                          ],
                                                      })
                                                    : null,
                                            ],
                                        }),
                                        i(`div`, { class: `top-list`, children: [r(`h1`, { children: `Top List` }), _.map((e) => i(n, { children: [r(`h2`, { children: e.title }), c(e.content)] }))] }),
                                    ],
                                })
                            );
                        return { title: `Daily Torrents Statistics in ${u} for ${l}`, link: f, description: v, pubDate: o.toDate() };
                    });
                })
            )
        ).filter((e) => Object.keys(e).length > 0);
    return { title: `Daily Torrents Statistics in ${u} - iknownwhatyoudownload`, link: `https://iknowwhatyoudownload.com`, item: p };
}
export { l as route };
