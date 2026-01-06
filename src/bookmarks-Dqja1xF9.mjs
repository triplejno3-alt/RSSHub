import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/bookmarks/:slug`,
    categories: [`new-media`],
    example: `/sspai/bookmarks/urfp0d9i`,
    parameters: { slug: `用户 slug，可在个人主页URL中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sspai.com/u/:slug/bookmark_posts`] }],
    name: `用户收藏`,
    maintainers: [`curly210102`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`slug`),
        i = `https://sspai.com/u/${r}/bookmark_posts`,
        a = (await t({ method: `get`, url: `https://sspai.com/api/v1/article/user/favorite/public/page/get?limit=10&offset=0&slug=${r}&type=all`, headers: { Referer: i } })).data.data,
        { nickname: o } = (await t({ method: `get`, url: `https://sspai.com/api/v1/user/slug/info/get?slug=${r}`, headers: { Referer: i } })).data.data;
    return {
        title: `${o} 的全部收藏 - 少数派`,
        link: i,
        description: `少数派用户「${o}」的全部收藏`,
        item: a.map((t) => ({ title: t.title, description: t.summary, link: `https://sspai.com/post/${t.id}`, pubDate: e(t.released_time * 1e3), author: t.author.nickname })),
    };
}
export { n as route };
