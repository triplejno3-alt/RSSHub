import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/papers/:category?/:time?/:cited?`,
    categories: [`journal`],
    example: `/trendingpapers/papers`,
    parameters: {
        category: 'Category of papers, can be found in URL. `All categories` by default.',
        time: 'Time like `24 hours` to specify the duration of ranking, can be found in URL. `Since beginning` by default.',
        cited: 'Cited or uncited papers, can be found in URL. `Cited and uncited papers` by default.',
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Trending Papers on arXiv`,
    maintainers: [`CookiePieWw`],
    handler: r,
};
async function r(n) {
    let { time: r = `Since beginning`, cited: i = `Cited and uncited papers`, category: a = `All categories` } = n.req.param(),
        o = `https://trendingpapers.com/api/papers?p=1&o=pagerank_growth&pd=${r}&cc=${i}&c=${a}`,
        s = (await e(o)).data.map((e) => ({ title: e.title, description: e.abstract, link: e.url, guid: e.arxiv_id, pubDate: t(e.pub_date), category: e.summary_categories }));
    return { title: `Trending Papers on arXiv.org | ${a} | ${r} | ${i} | `, link: o, item: s };
}
export { n as route };
