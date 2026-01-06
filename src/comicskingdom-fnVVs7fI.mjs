import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
    path: `/:name`,
    categories: [`anime`],
    example: `/comicskingdom/pardon-my-planet`,
    parameters: { name: `URL path of the strip on comicskingdom.com` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`comicskingdom.com/:name/*`, `comicskingdom.com/:name`] }],
    name: `Archive`,
    maintainers: [`stjohnjohnson`],
    handler: c,
};
async function c(s) {
    let c = s.req.param(`name`),
        l = `https://comicskingdom.com/${c}/archive`,
        { data: u } = await n(l),
        d = a(u),
        f = d(`title`).text().replace(`Comics Kingdom - `, ``).trim(),
        p = d(`.feature-title h2`).text(),
        m = d(`div.tile`)
            .toArray()
            .map((e) => d(e).find(`a`).first().attr(`href`));
    if (m.length === 0) throw new r(`Comic Not Found - ${c}`);
    let h = await Promise.all(
        m.map((r) =>
            e.tryGet(r, async () => {
                let e = a((await n(r)).data);
                return {
                    title: e(`meta[property="og:description"]`).attr(`content`),
                    author: p,
                    category: `comic`,
                    description: o(i(`img`, { src: e(`meta[property="og:image"]`).attr(`content`) })),
                    pubDate: t(r.slice(r.lastIndexOf(`/`) + 1), `YYYY-MM-DD`),
                    link: r,
                };
            })
        )
    );
    return { title: f, link: l, image: d(`.feature-logo`).attr(`src`), item: h, language: `en-US` };
}
export { s as route };
