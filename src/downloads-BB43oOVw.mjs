import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = `https://www.sony.com`,
    r = {
        path: `/downloads/:productType/:productId`,
        categories: [`program-update`],
        example: `/sony/downloads/product/nw-wm1am2`,
        parameters: { productType: `product type`, productId: `product id` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`sony.com/electronics/support/:productType/:productId/downloads`] }],
        name: `Software Downloads`,
        maintainers: [`EthanWng97`],
        handler: i,
        description:
            '::: tip\n  Open `https://www.sony.com/electronics/support` and search for the corresponding product, such as `Sony A7M4`, the website corresponding to which is `https://www.sony.com/electronics/support/e-mount-body-ilce-7-series/ilce-7m4/downloads`, where `productType` is `e-mount-body-ilce-7-series` and `productId` is `ilce-7m4`.\n:::',
    };
async function i(r) {
    let { productType: i, productId: a } = r.req.param(),
        o = `${n}/electronics/support/${i}/${a}/downloads`,
        s = (await e({ method: `get`, url: o })).data,
        c = t(s)(`script:contains("window.__PRELOADED_STATE__.downloads")`)
            .text()
            .match(/window\.__PRELOADED_STATE__\.downloads\s*=\s*({.*?});\s*window\.__PRELOADED_STATE__/s),
        l = {};
    c && (l = JSON.parse(c[1]).searchResults.results);
    let u = l.map((e) => {
        let t = { title: e.title, pubDate: e.publicationDate },
            r = e.url;
        return (r.startsWith(`http`) ? (t.url = r) : r.startsWith(`//`) ? (t.url = `https:` + r) : (t.url = n + r), t);
    });
    return { title: `Sony - ${a.toUpperCase()}`, link: o, description: `Sony - ${a.toUpperCase()}`, item: u.map((e) => ({ title: e.title, guid: e.title + ` - ` + e.url, link: e.url, pubDate: e.pubDate })) };
}
export { r as route };
