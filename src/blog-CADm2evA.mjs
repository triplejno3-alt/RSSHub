import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
async function i() {
    let { data: i } = await t(`https://cloudnative.to/blog/`),
        a = r(i);
    return a(`div.page-body .stream-item`)
        .toArray()
        .map((t) => {
            let r = a(t).find(`.article-title > a`),
                i = a(t).find(`.summary-link`),
                o = a(t).find(`.stream-meta .article-metadata`),
                s = o.find(`.article-date`).text().replace(`发布于`, ``);
            return { title: r.text(), link: r.attr(`href`), description: i.text(), pubDate: n(e(s, `YYYY-MM-DD`), 8), author: o.find(`span`).eq(0).find(`a`).text(), category: o.find(`.article-categories a`).text() };
        });
}
const a = {
    path: `/blog`,
    categories: [`blog`],
    example: `/cloudnative/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `博客`,
    maintainers: [`aneasystone`],
    handler: o,
};
async function o() {
    return { title: `博客 | 云原生社区（中国）`, link: `https://cloudnative.to/blog/`, item: await i() };
}
export { a as route };
