import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/recent-actions/:minrating?`,
    categories: [`programming`],
    example: `/codeforces/recent-actions`,
    parameters: { minrating: `The minimum blog/comment rating required. Default: 1` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`codeforces.com/recent-actions`], target: `/recent-actions` }],
    name: `Recent actions`,
    maintainers: [],
    handler: r,
    url: `codeforces.com/recent-actions`,
};
async function r(n) {
    let r = n.req.param(`minrating`) || 1;
    return {
        title: `Codeforces - Recent actions`,
        link: `https://codeforces.com/recent-actions`,
        item: (await e(`https://codeforces.com/api/recentActions?maxCount=100`)).result
            .map((e) => {
                let n = new Date(e.timeSeconds * 1e3),
                    r = e.blogEntry,
                    i = r.id,
                    a = t(r.title).text();
                if (e.comment) {
                    let r = e.comment;
                    return { title: `@${r.commentatorHandle} commented on "${a}"`, description: t(r.text).text(), pubDate: n, link: `https://codeforces.com/blog/entry/${i}?#comment-${r.id}`, rating: r.rating };
                }
                return { title: `@${r.authorHandle} posted "${a}"`, description: a, pubDate: n, link: `https://codeforces.com/blog/entry/${i}`, rating: r.rating };
            })
            .filter((e) => e.rating >= r)
            .map((e) => ({ title: e.title, description: e.description, pubDate: e.pubDate, link: e.link })),
    };
}
export { n as route };
