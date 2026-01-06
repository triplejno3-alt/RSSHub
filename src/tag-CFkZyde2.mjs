import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { c as n, d as r, u as i } from './util-DXi5kr31.mjs';
const a = {
    path: `/tag/:id`,
    categories: [`new-media`],
    example: `/huxiu/tag/291`,
    parameters: { id: `标签 id，可在对应标签页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !0, supportPodcast: !0, supportScihub: !1 },
    name: `标签`,
    maintainers: [`xyqfer`, `HenryQW`, `nczitzk`],
    handler: o,
    description: `更多标签请参见 [标签](https://www.huxiu.com/tags)`,
};
async function o(a) {
    let o = a.req.param(`id`),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 10,
        c = new URL(`v2_action/tag_article_list`, r).href,
        l = new URL(`tags/${o}.html`, r).href,
        { data: u } = await t.post(c, { form: { tag_id: o } });
    return { item: await i(u.data, s, e.tryGet), ...(await n(l)) };
}
export { a as route };
