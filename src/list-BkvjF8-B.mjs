import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import a from 'xxhash-wasm';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
    path: `/list/:id`,
    categories: [`new-media`],
    example: `/tophub/list/Om4ejxvxEN`,
    parameters: { id: `榜单id，可在 URL 中找到` },
    features: { requireConfig: [{ name: `TOPHUB_COOKIE`, optional: !0, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`tophub.today/n/:id`] }],
    name: `榜单列表`,
    maintainers: [`akynazh`],
    handler: c,
    description: `::: tip
将榜单条目集合到一个列表中，且有热度排序，可避免推送大量条目。
:::`,
};
async function c(s) {
    let { h64ToString: c } = await a(),
        l = `https://tophub.today/n/${s.req.param(`id`)}`,
        u = i(await e(l, { headers: { Referer: `https://tophub.today`, Cookie: t.tophub?.cookie ?? `` } })),
        d = u(`.tt h3`).text().trim(),
        f = u(`.rank-all-item:not(.history-content) .jc-c tr`)
            .toArray()
            .map((e) => ({ title: u(e).find(`td a`).text().trim(), link: u(e).find(`td a`).attr(`href`), heatRate: u(e).find(`td:nth-child(3)`).text().trim() })),
        p = f.map((e) => e.title).join(``),
        m = o(
            r(`table`, {
                children: [
                    n(`thead`, { children: r(`tr`, { children: [n(`th`, { children: `排名` }), n(`th`, { children: `标题` }), n(`th`, { children: `热度` })] }) }),
                    n(`tbody`, { children: f.map((e, t) => r(`tr`, { children: [n(`td`, { children: t + 1 }), n(`td`, { children: n(`a`, { href: e.link, children: e.title }) }), n(`td`, { children: e.heatRate })] })) }),
                ],
            })
        );
    return { title: d, description: u(`.tt p`).text().trim(), image: u(`.ii img`).attr(`src`), link: l, item: [{ title: d, link: l, description: m, guid: c(p) }] };
}
export { s as route };
