import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/article/:category?`,
    categories: [`university`],
    example: `/hitsz/article/id-74`,
    parameters: { category: `分类名，默认为校园动态` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `新闻中心`,
    maintainers: [`xandery-geek`],
    handler: o,
    description: `| 校区要闻 | 媒体报道 | 综合新闻 | 校园动态 | 讲座论坛 | 热点专题 | 招标信息 | 重要关注 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| id-116   | id-80    | id-75    | id-77    | id-78    | id-79    | id-81    | id-124   |`,
};
async function o(a) {
    let o = `https://www.hitsz.edu.cn`,
        s = `${o}/article/${a.req.param(`category`) ?? `id-77`}.html`,
        c = i((await n(s)).data),
        l = c(`div.title_page`).text().trim(),
        u = c(`.mainside_news ul li`)
            .toArray()
            .map((e) => ({ title: c(`a`, e).text().trim(), link: `${o}${c(`a`, e).attr(`href`)}`, pubDate: r(t(c(`span[class=date]`, e).text()), 8) })),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n.get(a.link)).data);
                    return ((a.description = e(`div.edittext`).html().trim()), (a.pubDate = r(t(e(`.item`).first().text().replace(`发布时间：`, ``)), 8)), a);
                })
            )
        );
    return { title: `哈尔滨工业大学（深圳）-` + l, link: s, description: `哈尔滨工业大学（深圳）-` + l, item: d };
}
export { a as route };
