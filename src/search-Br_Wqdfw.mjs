import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
const i = {
    path: `/search/:keyword`,
    categories: [`finance`],
    view: r.Articles,
    example: `/eastmoney/search/web3`,
    parameters: { keyword: `关键词，可以设置为自己需要检索的关键词` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `搜索`,
    maintainers: [`drgnchan`],
    handler: a,
};
async function a(r) {
    let i = r.req.param(`keyword`),
        a = `https://so.eastmoney.com/News/s?KeyWord=${i}`,
        o = {
            uid: ``,
            keyword: i,
            type: [`cmsArticleWebOld`],
            client: `web`,
            clientType: `web`,
            clientVersion: `curr`,
            params: { cmsArticleWebOld: { searchScope: `default`, sort: `default`, pageIndex: 1, pageSize: 10, preTag: `<em>`, postTag: `</em>` } },
        },
        s = (await t(`https://search-api-web.eastmoney.com/search/jsonp`, { searchParams: { cb: `jQuery${(`3.5.1` + Math.random()).replaceAll(/\D/g, ``)}_${Date.now()}`, param: JSON.stringify(o) } })).data.match(
            /jQuery\d+_\d+\((.*)\)/
        )[1],
        c = JSON.parse(s).result.cmsArticleWebOld.map((t) => ({ title: t.title, description: t.content, pubDate: n(e(t.date), 8), link: t.url, author: t.mediaName }));
    return { title: `东方财富网 - 搜索'${i}'`, link: a, item: c };
}
export { i as route };
