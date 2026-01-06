import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { jsx as t } from 'hono/jsx/jsx-runtime';
import { load as n } from 'cheerio';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = `https://www.patagonia.com`,
    a = { mens: [`mens-new`, `mens-new-arrivals`], womens: [`womens-new`, `womens-new-arrivals`], kids: [`kids-new-arrivals`, `kids-baby-new-arrivals`], luggage: [`luggage-new-arrivals`, `luggage-new-arrivals`] };
function o(e) {
    let t = new URL(e),
        n = t.searchParams.get(`sfrm`);
    return ((t.search = new URLSearchParams({ sfrm: n }).toString()), t.toString());
}
const s = {
    path: `/new-arrivals/:category`,
    categories: [`shopping`],
    example: `/patagonia/new-arrivals/mens`,
    parameters: { category: `category, see below` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `New Arrivals`,
    maintainers: [],
    handler: c,
    description: `| Men's | Women's | Kids' & Baby | Packs & Gear |
| ----- | ------- | ------------ | ------------ |
| mens  | womens  | kids         | luggage      |`,
};
async function c(s) {
    let c = s.req.param(`category`),
        l = (await e({ method: `get`, url: `${i}/on/demandware.store/Sites-patagonia-us-Site/en_US/Search-LazyGrid`, searchParams: { cgid: a[c][0], isLazyGrid: !0 } })).data,
        u = n(l),
        d = u(`.product`)
            .toArray()
            .map((e) => {
                let n = { title: u(e).find(`.product-tile`).data(`tealium`).product_name[0], link: i + `/` + u(e).find(`[itemprop="url"]`).attr(`href`), description: ``, category: u(e).find(`[itemprop="category"]`).attr(`content`) },
                    a = new URL(u(e).find(`[itemprop="image"]`).attr(`content`));
                return ((a = o(a)), (n.description = u(e).find(`[itemprop="price"]`).eq(0).text() + r(t(`div`, { children: t(`img`, { src: a }) }))), n);
            });
    return { title: `Patagonia - New Arrivals - ${c.toUpperCase()}`, link: `${i}/shop/${a[c][1]}`, description: `Patagonia - New Arrivals - ${c.toUpperCase()}`, item: d };
}
export { s as route };
