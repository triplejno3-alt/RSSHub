import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/activity/:slug`,
    categories: [`new-media`],
    example: `/sspai/activity/urfp0d9i`,
    parameters: { slug: `作者 slug，可在作者主页URL中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sspai.com/u/:id/updates`], target: `/activity/:id` }],
    name: `作者动态`,
    maintainers: [`umm233`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`slug`),
        i = `https://sspai.com/u/${r}/updates`,
        a = await t({ method: `get`, url: `https://sspai.com/api/v1/information/user/activity/page/get?limit=10&offset=0&slug=${r}`, headers: { Referer: i } }),
        o = (await t({ method: `get`, url: `https://sspai.com/api/v1/user/slug/info/get?slug=${r}`, headers: { Referer: i } })).data.data.nickname,
        s = a.data.data,
        c = ``,
        l = ``,
        u = ``;
    return {
        title: `少数派用户「${o}」动态更新`,
        link: i,
        description: `少数派用户「${o}」的动态更新`,
        item: s.map((t) => {
            let n = t.data,
                i = [],
                a = [];
            switch (t.key) {
                case `follow_user`:
                    for (let e in n) ((i[e] = n[e].nickname), (a[e] = `<a href=https://sspai.com/u/${n[e].slug}/updates>${n[e].nickname}</a>`));
                    ((c = `${t.author.nickname}${t.action}：${i.join(`、`)}`), (l = `${t.author.nickname}${t.action}：${a.join(`、`)}`), (u = `https://sspai.com/u/${r}/follow`));
                    break;
                case `like_article`:
                    ((c = `${t.author.nickname}${t.action}：${n.title}`), (l = `文章简介：<br>${n.summary}`), (u = `https://sspai.com/post/${n.id}`));
                    break;
                case `comment_article`:
                    ((c = `${t.author.nickname}${t.action}：${n.article_title}`), (l = n.comment), (u = `https://sspai.com/post/${n.article_id}`));
                    break;
                case `release_article`:
                    ((c = `${t.author.nickname}${t.action}：${n.title}`), (l = n.summary), (u = `https://sspai.com/post/${n.id}`));
                    break;
                case `chosen_comment`:
                    ((c = `${t.author.nickname}在文章「${n.article_title}」下的${t.action}`), (l = n.comment), (u = n.comment));
                    break;
            }
            return { title: c, description: l, link: u, pubDate: e(t.created_at * 1e3) };
        }),
    };
}
export { n as route };
