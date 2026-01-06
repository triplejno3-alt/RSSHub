import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/:store`,
    categories: [`shopping`],
    example: `/shopback/shopee-mart`,
    parameters: { store: `Store, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`shopback.com.tw/:category`, `shopback.com.tw/`] }],
    name: `Store`,
    maintainers: [`nczitzk`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`store`),
        i = `https://www.shopback.com.tw`,
        a = `${i}/${r}`,
        o = t((await e({ method: `get`, url: a })).data);
    o(`table`).remove();
    let s = o(`div[data-content-name]`)
        .toArray()
        .map(
            (e) => (
                (e = o(e)),
                { title: e.attr(`data-content-name`), author: e.attr(`data-content-merchant`), description: `<p>${e.find(`.mb-3`).text()}</p>`, link: `${i}/login?redirect=/redirect/alink/${e.attr(`data-content-id`)}` }
            )
        );
    return { title: `${o(`h1`).text()} - ShopBack`, link: a, item: s };
}
export { n as route };
