import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/new/:country/:category`,
    categories: [`shopping`],
    example: `/uniqlo/new/sg/men`,
    parameters: { country: `currently only supports sg, us, jp`, category: 'supports `men` `women`, `kids`, `baby`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `New Arrivals`,
    maintainers: [`DIYgod`],
    handler: n,
};
async function n(t) {
    let { country: n, category: r } = t.req.param(),
        i = {
            sg: { url: `https://www.uniqlo.com/sg/api/commerce/v3/en/products`, withFlag: !0, path: { women: 5855, men: 5856, kids: 5857, baby: 5858 } },
            us: { url: `https://www.uniqlo.com/us/api/commerce/v5/en/products`, withFlag: !1, path: { women: 22210, men: 22211, kids: 22212, baby: 22213 } },
            jp: { url: `https://www.uniqlo.com/jp/api/commerce/v5/ja/products`, withFlag: !1, path: { women: 1071, men: 1072, kids: 1073, baby: 1074 }, lang: `ja` },
        },
        { data: a } = await e(i[n].url, { searchParams: { path: i[n].path[r], flagCodes: i[n].withFlag ? `salesStart newSKU,salesStart newSKU,salesStart newSKU` : void 0, sort: 1, limit: 24, offset: 0 } }),
        o = a.result.items.map((e) => ({
            title: e.name,
            link: `https://www.uniqlo.com/${n}/${i[n].lang || `en`}/products/${e.productId}`,
            description: `${e.longDescription || e.name}<br><br>Price: ${(e.prices.base || e.prices.promo).currency.symbol}${(e.prices.base || e.prices.promo).value}<br><br>${e.images.main.length ? e.images.main.map((e) => `<img src="${e.url || e.image}">`).join(``) : ``}${e.images.sub.map((e) => `<img src="${e.url || e.image}">`).join(``)}`,
        }));
    return { title: `Uniqlo ${r} new arrivals in ${n}`, link: `https://www.uniqlo.com/${n}/${i[n].lang || `en`}/feature/new/${r}`, item: o };
}
export { t as route };
