import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/developer/blog`,
    categories: [`blog`],
    example: `/gs/developer/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`developer.gs.com/blog/posts`], target: `/developer/blog` }],
    name: `Goldman Sachs Developer Blog`,
    zh: { name: `高盛开发者博客` },
    maintainers: [`chesha1`],
    handler: r,
};
async function r() {
    let n = t(await e(`https://developer.gs.com/blog/posts`));
    return {
        title: `Goldman Sachs Developer Blog`,
        link: `https://developer.gs.com/blog/posts`,
        item: n(`div[data-cy="blog-card-grid"] a`)
            .toArray()
            .map((e) => {
                let t = `https://developer.gs.com` + n(e).attr(`href`);
                return { title: n(e).find(`span`).eq(1).text(), link: t, author: n(e).find(`span`).eq(2).text(), description: n(e).find(`span`).eq(3).text(), pubDate: n(e).find(`span`).eq(0).text() };
            }),
    };
}
export { n as route };
