import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { a as r, c as i, i as a, o, r as s, s as c, t as l } from './utils-4UMbP2Qc.mjs';
const u = {
    path: `/:categoryId?/:lang?`,
    categories: [`finance`],
    view: n.Articles,
    example: `/followin`,
    parameters: {
        categoryId: {
            description: `Category ID`,
            options: [
                { value: `1`, label: `For You` },
                { value: `9`, label: `Market` },
                { value: `13`, label: `Meme` },
                { value: `14`, label: `BRC20` },
                { value: `3`, label: `NFT` },
                { value: `5`, label: `Thread` },
                { value: `6`, label: `In-depth` },
                { value: `8`, label: `Tutorials` },
                { value: `11`, label: `Videos` },
            ],
            default: `1`,
        },
        lang: {
            description: `Language`,
            options: [
                { value: `en`, label: `English` },
                { value: `zh-Hans`, label: `简体中文` },
                { value: `zh-Hant`, label: `繁體中文` },
                { value: `vi`, label: `Tiếng Việt` },
            ],
            default: `en`,
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Home`,
    maintainers: [`TonyRL`],
    handler: d,
    description: `Category ID

| For You | Market | Meme | BRC20 | NFT | Thread | In-depth | Tutorials | Videos |
| ------- | ------ | ---- | ----- | --- | ------ | -------- | --------- | ------ |
| 1       | 9      | 13   | 14    | 3   | 5      | 6        | 8         | 11     |

  Language

| English | 简体中文 | 繁體中文 | Tiếng Việt |
| ------- | -------- | -------- | ---------- |
| en      | zh-Hans  | zh-Hant  | vi         |`,
};
async function d(n) {
    let { categoryId: u = `1`, lang: d = `en` } = n.req.param(),
        { limit: f = 20 } = n.req.query(),
        p = await o(e.tryGet),
        m = a(d),
        { data: h } = await t.post(`${l}/feed/list/recommended`, { headers: { 'x-bparam': JSON.stringify(m), 'x-gtoken': p }, json: { category_id: Number.parseInt(u), count: Number.parseInt(f) } });
    if (h.code !== 2e3) throw Error(h.msg);
    let g = await r(e.tryGet),
        _ = i(h.data.list, d, g);
    return { title: `Followin`, link: `https://followin.io`, image: s, item: await Promise.all(_.map((t) => c(t, e.tryGet))) };
}
export { u as route };
