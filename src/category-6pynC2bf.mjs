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
    path: `/:category/:fulltext?`,
    categories: [`programming`],
    example: `/anquanke/week`,
    parameters: { category: `分类订阅`, fulltext: '是否获取全文，如需获取全文参数传入 `quanwen` 或 `fulltext`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `分类订阅`,
    maintainers: [`qwertyuiop6`],
    handler: o,
    description: `| 360 网络安全周报 | 活动     | 知识      | 资讯 | 招聘 | 工具 |
| ---------------- | -------- | --------- | ---- | ---- | ---- |
| week             | activity | knowledge | news | job  | tool |`,
};
async function o(a) {
    let o = a.req.param(`category`),
        s = a.req.param(`fulltext`),
        c = (await n(`https://api.anquanke.com/data/v1/posts?size=10&page=1&category=${o}`)).data.data,
        l = await Promise.all(
            c.map(async (a) => {
                let c = `https://www.anquanke.com/${o === `week` ? `week` : `post`}/id/${a.id}`;
                return {
                    title: a.title,
                    description:
                        s === `fulltext` || s === `quanwen`
                            ? await e.tryGet(c, async () => {
                                  let { data: e } = await n(c);
                                  return i(e)(`#js-article`).html();
                              })
                            : a.desc,
                    pubDate: r(t(a.date), 8),
                    link: c,
                    author: a.author.nickname,
                };
            })
        );
    return { title: `安全客-${c[0].category_name}`, link: `https://www.anquanke.com/${o === `week` ? `week-list` : o}`, item: l };
}
export { a as route };
