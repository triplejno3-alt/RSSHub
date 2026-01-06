import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { a as n, c as r, d as i, l as a, u as o } from './util-DXi5kr31.mjs';
const s = {
    path: `/search/:keyword`,
    categories: [`new-media`],
    example: `/huxiu/search/生活`,
    parameters: { keyword: `关键字` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !0, supportPodcast: !0, supportScihub: !1 },
    radar: [{ source: [`huxiu.com/`] }],
    name: `搜索`,
    maintainers: [`xyqfer`, `HenryQW`, `nczitzk`],
    handler: c,
    url: `huxiu.com/`,
};
async function c(s) {
    let c = s.req.param(`keyword`),
        l = s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`), 10) : 20,
        u = new URL(`api/article`, n).href,
        d = i,
        { data: f } = await t.post(u, { searchParams: { platform: `www`, s: c, sort: ``, page: 1, pagesize: l, appid: `hx_search_202303`, ...a() } }),
        p = await o(f.data.datalist, l, e.tryGet),
        m = await r(d);
    return ((m.title = `${c}-搜索结果-${m.title}`), s.set(`json`, f.data.datalist), { item: p, ...m });
}
export { s as route };
