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
    path: `/category/:category?`,
    categories: [`programming`],
    example: `/secrss/category/产业趋势`,
    parameters: { category: `N` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `分类`,
    maintainers: [`XinRoom`, `SunBK201`],
    handler: o,
};
async function o(a) {
    let { category: o = `` } = a.req.param(),
        s = (await n(`https://www.secrss.com/api/articles?tag=${o}`)).data.data,
        c = await Promise.all(
            s.map((a) => {
                let o = `https://www.secrss.com/articles/${a.id}`;
                return e.tryGet(o, async () => {
                    let e = i((await n(o)).data)(`.article-body`)
                        .html()
                        .trim();
                    return { title: a.title, link: o, pubDate: r(t(a.published_at), 8), description: e, author: a.source_author, category: a.tags.map((e) => e.title) };
                });
            })
        );
    return { title: `安全内参-${o}`, link: `https://www.secrss.com`, item: c };
}
export { a as route };
