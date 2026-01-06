import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = `https://www.snowpeak.com`,
    s = {
        path: `/us/new-arrivals`,
        categories: [`shopping`],
        example: `/snowpeak/us/new-arrivals`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`snowpeak.com/collections/new-arrivals`, `snowpeak.com/`] }],
        name: `New Arrivals(USA)`,
        maintainers: [`EthanWng97`],
        handler: c,
        url: `snowpeak.com/collections/new-arrivals`,
    };
async function c() {
    let s = (await e({ method: `get`, url: `${o}/collections/new-arrivals` })).data,
        c = i(s),
        l = c(`.element.product-tile`)
            .toArray()
            .map((e) => {
                let i = {},
                    s = c(e).find(`.product-data`).data(`product`);
                return (
                    (i.title = s.title),
                    (i.link = `${o}/products/${s.handle}`),
                    (i.pubDate = new Date(s.published_at).toUTCString()),
                    (i.category = s.tags),
                    (i.variants = s.variants.map((e) => e.name)),
                    (i.description = s.description + a(r(`div`, { children: [`Variant:`, n(`br`, {}), s.variants.map((e) => r(t, { children: [e.name, n(`br`, {})] })), s.images.map((e) => n(`img`, { src: e }))] }))),
                    i
                );
            });
    return {
        title: `Snow Peak - New Arrivals`,
        link: `${o}/new-arrivals`,
        description: `Snow Peak - New Arrivals`,
        item: l.map((e) => ({ title: e.title, category: e.category, description: e.description, pubDate: e.pubDate, link: e.link })),
    };
}
export { s as route };
