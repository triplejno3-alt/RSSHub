import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = { 5: `全部公告`, 19: `产品发布`, 21: `规则变更`, 20: `维护公告`, 22: `其他公告` },
    i = {
        path: `/docs/:dirId?`,
        categories: [`programming`],
        example: `/jinritemai/docs/19`,
        parameters: { dirId: `公告分类, 可在页面URL获取 默认为全部` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `平台公告`,
        maintainers: [`blade0910`],
        handler: a,
        description: `| 类型    | type    |
| --------- | ---------- |
| 全部公告    | 5    |
| 产品发布    | 19   |
| 规则变更    | 21   |
| 维护公告    | 20   |
| 其他公告    | 22   |`,
    };
async function a(i) {
    let a = i.req.param(`dirId`) || `5`,
        o = (await n({ method: `get`, url: `https://op.jinritemai.com/doc/external/open/queryDocArticleList?pageIndex=0&pageSize=10&status=1&dirId=${a}&orderType=3` })).data.data.articles.map((e) => ({
            title: e.title,
            id: e.id,
            dirName: e.dirName,
            link: `https://op.jinritemai.com/docs/notice-docs/${a}/${e.id}`,
            pubDate: t(e.updateTime * 1e3),
        })),
        s = await Promise.all(
            o.map((t) =>
                e.tryGet(t.link, async () => ((t.description = (await n({ method: `get`, url: `https://op.jinritemai.com/doc/external/open/queryDocArticleDetail?articleId=${t.id}&onlyView=false` })).data.data.article.content), t))
            )
        );
    return { title: `抖店开放平台 - ${r[a] ?? `平台公告`}`, link: `https://op.jinritemai.com/docs/notice-docs/${a}`, item: s };
}
export { i as route };
