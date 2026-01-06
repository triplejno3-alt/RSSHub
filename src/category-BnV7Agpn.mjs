import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { n as t, o as n, t as r } from './utils-DUC2PxJz.mjs';
const i = {
    path: `/category/:category`,
    categories: [`programming`],
    example: `/juejin/category/frontend`,
    parameters: { category: `分类名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`juejin.cn/:category`] }],
    name: `分类`,
    maintainers: [`DIYgod`],
    handler: a,
    description: `| 后端    | 前端     | Android | iOS | 人工智能 | 开发工具 | 代码人生 | 阅读    |
| ------- | -------- | ------- | --- | -------- | -------- | -------- | ------- |
| backend | frontend | android | ios | ai       | freebie  | career   | article |`,
};
async function a(i) {
    let a = i.req.param(`category`),
        o = (await t()).find((e) => e.category_url === a);
    if (!o) throw Error(`分类不存在`);
    let s = o.category_id,
        c = await r(n((await e(`https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed`, { method: `POST`, body: { id_type: 2, sort_type: 300, cate_id: s, cursor: `0`, limit: 20 } })).data));
    return { title: `掘金 ${o.category_name}`, link: `https://juejin.cn/${a}`, description: `掘金 ${o.category_name}`, item: c };
}
export { i as route };
