import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './utils-CGxy1qK9.mjs';
import { load as a } from 'cheerio';
import o from 'p-map';
const s = {
    path: `/sitemap/:route`,
    categories: [`traditional-media`],
    example: `/apnews/sitemap/ap-sitemap-latest`,
    view: r.Articles,
    parameters: { route: { description: 'Route for sitemap, excluding the `.xml` extension' } },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`apnews.com/`] }],
    name: `Sitemap`,
    maintainers: [`zoenglinghou`, `mjysci`, `TonyRL`, `dzx-dzx`],
    handler: c,
};
async function c(r) {
    let s = r.req.param(`route`),
        c = a(await e(`https://apnews.com/${s}.xml`)),
        l = c(`urlset url`)
            .toArray()
            .map((e) => {
                let r = new Map([
                        [`eng`, `en`],
                        [`spa`, `es`],
                    ]),
                    i = c(e)
                        .find(String.raw`news\:title`)
                        .text(),
                    a = t(
                        c(e)
                            .find(String.raw`news\:publication_date`)
                            .text()
                    ),
                    o = n(t(c(e).find(`lastmod`).text()), -4),
                    s = r.get(
                        c(e)
                            .find(String.raw`news\:language`)
                            .text()
                    ),
                    l = { link: c(e).find(`loc`).text() };
                return (
                    i && (l = Object.assign(l, { title: i })),
                    a.toString() !== `Invalid Date` && (l = Object.assign(l, { pubDate: a })),
                    s && (l = Object.assign(l, { language: s })),
                    o.toString() !== `Invalid Date` && (l = Object.assign(l, { lastmod: o })),
                    l
                );
            })
            .filter((e) => !!e.link && !new URL(e.link).pathname.split(`/`).includes(`hub`))
            .toSorted((e, t) => (e.pubDate && t.pubDate ? t.pubDate - e.pubDate : t.lastmod - e.lastmod))
            .slice(0, r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 20),
        u = r.req.query(`fulltext`) === `true` ? await o(l, (e) => i(e), { concurrency: 20 }) : l;
    return { title: `AP News sitemap:${s}`, item: u, link: `https://apnews.com` };
}
export { s as route };
