import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { o as e, r as t, t as n } from './utils-DUC2PxJz.mjs';
const r = {
    path: `/collection/:collectionId`,
    categories: [`programming`],
    example: `/juejin/collection/6845243180586123271`,
    parameters: { collectionId: `收藏夹唯一标志符, 在浏览器地址栏URL中能够找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`juejin.cn/collection/:collectionId`] }],
    name: `单个收藏夹`,
    maintainers: [`yang131323`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`collectionId`),
        a = await t(i),
        o = await n(e(a.article_list));
    return { title: `${a.detail.tag_name} - ${a.create_user.user_name}的收藏集 - 掘金`, link: `https://juejin.cn/collection/${i}`, description: `掘金，用户单个收藏夹`, item: o, allowEmpty: !0 };
}
export { r as route };
