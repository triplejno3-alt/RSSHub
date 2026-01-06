import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, o as r, u as i } from './util-DXi5kr31.mjs';
const a = {
    path: `/briefcolumn/:id`,
    categories: [`new-media`],
    example: `/huxiu/briefcolumn/1`,
    parameters: { id: `简报 id，可在对应简报页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !0, supportPodcast: !0, supportScihub: !1 },
    name: `简报`,
    maintainers: [`Fatpandac`, `nczitzk`],
    handler: o,
};
async function o(a) {
    let o = a.req.param(`id`),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 20,
        c = new URL(`briefColumn/getContentListByCategoryId`, n).href,
        { data: l } = await t.post(c, { form: { platform: `www`, brief_column_id: o, pagesize: s } });
    return (a.set(`json`, l.data.datalist), { item: await i(l.data.datalist, s, e.tryGet), ...(await r(o)) });
}
export { a as route };
