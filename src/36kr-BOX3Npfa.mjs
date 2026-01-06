import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { r as n } from './common-utils-uYpL50sT.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { n as i, t as a } from './utils-Cp8Cx08_.mjs';
import { load as o } from 'cheerio';
const s = {
        '/information': `/information/web_news`,
        '/information/latest': `/information/web_news`,
        '/information/recommend': `/information/web_recommend`,
        '/information/life': `/information/happy_life`,
        '/information/estate': `/information/real_estate`,
        '/information/workplace': `/information/web_zhichang`,
    },
    c = {
        path: `/:category/:subCategory?/:keyword?`,
        categories: [`new-media`],
        example: `/36kr/newsflashes`,
        parameters: { category: `分类，必填项`, subCategory: `子分类，选填项，目的是为了兼容老逻辑`, keyword: `关键词，选填项，仅搜索文章/快讯时有效` },
        name: `资讯, 快讯, 用户文章, 主题文章, 专题文章, 搜索文章, 搜索快讯`,
        maintainers: [`nczitzk`, `fashioncj`],
        description: `| 最新资讯频道 | 快讯 | 推荐资讯 | 生活 | 房产 | 职场 | 搜索文章 | 搜索快讯 |
| ------- | -------- | -------- | -------- | -------- | --------| -------- | -------- |
| news | newsflashes | recommend | life | estate | workplace | search/articles/关键词 | search/articles/关键词 |`,
        handler: l,
    };
async function l(c) {
    let l = n(c)
            .replace(/^\/news(?!flashes)/, `/information`)
            .replace(/\/search\/article/, `/search/articles`),
        u = `${i}${Object.hasOwn(s, l) ? s[l] : l}`,
        d = await r({ method: `get`, url: u }),
        f = o(d.data),
        p = JSON.parse(d.data.match(/"itemList":(\[.*?])/)[1])
            .slice(0, c.req.query(`limit`) ? Number.parseInt(c.req.query(`limit`)) : 30)
            .filter((e) => e.itemType !== 0)
            .map(
                (e) => (
                    (e = e.templateMaterial ?? e),
                    { title: e.widgetTitle.replaceAll(/<\/?em>/g, ``), author: e.author, pubDate: t(e.publishTime), link: `${i}/${l === `/newsflashes` ? `newsflashes` : `p`}/${e.itemId}`, description: e.widgetContent ?? e.content }
                )
            );
    return (/^\/(search|newsflashes)/.test(l) || (p = await Promise.all(p.map((t) => a(t, e.tryGet)))), { title: `36氪 - ${f(`title`).text().split(`_`)[0]}`, link: u, item: p });
}
export { c as route };
