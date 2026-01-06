import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
const r = {
    path: `/cloud/developer/column/:categoryId?`,
    categories: [`programming`],
    example: `/tencent/cloud/developer/column/1`,
    parameters: { categoryId: `categoryId from page url` },
    radar: [{ source: [`cloud.tencent.com/developer/column`] }],
    name: `腾讯云开发者社区专栏`,
    maintainers: [`lyling`],
    handler: async (t) => {
        let r = t.req.param(`categoryId`) ?? 0,
            a = (await e(`https://cloud.tencent.com/developer/api/home/article-list`, { method: `POST`, headers: { 'Content-Type': `application/json` }, body: { classifyId: r, page: 1, pagesize: 20, type: `` } })).list.map((e) => ({
                title: e.title,
                link: `https://cloud.tencent.com/developer/article/${e.articleId}`,
                description: e.summary,
                pubDate: n(e.createTime * 1e3),
                author: e.author.nickname,
                category: e.tags.map((e) => e.tagName),
            })),
            o = await i(r),
            s = o ? o.name : ``;
        return { title: s, description: `${s} - 腾讯云开发者社区`, item: a };
    },
};
async function i(n) {
    let r = `https://cloud.tencent.com/developer/api/column/get-classify-list-by-scene`;
    return (await t.tryGet(r, async () => await e(r, { method: `POST`, headers: { 'Content-Type': `application/json` }, body: { scene: 0 } }))).list.find((e) => e.id === Number(n));
}
export { r as route };
