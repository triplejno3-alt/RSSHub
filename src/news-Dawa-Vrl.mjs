import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { i as r, r as i, t as a } from './utils-_9QXQWc7.mjs';
const o = {
    path: `/news`,
    categories: [`finance`],
    example: `/ainvest/news`,
    parameters: {},
    view: n.Articles,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ainvest.com/news`] }],
    name: `Latest News`,
    maintainers: [`TonyRL`],
    handler: s,
    url: `ainvest.com/news`,
};
async function s(n) {
    let o = r(16),
        { data: s } = await t(`https://api.ainvest.com/gw/news_f10/v1/newsFlash/getNewsData`, {
            headers: i(o),
            searchParams: { terminal: `web`, tab: `all`, page: 1, size: n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 50, lastId: ``, timestamp: Date.now() },
        }),
        { data: c } = JSON.parse(a(s, o));
    return {
        title: `AInvest - Latest News`,
        link: `https://www.ainvest.com/news`,
        language: `en`,
        item: c.content.map((t) => ({
            title: t.title,
            description: t.content,
            link: t.sourceUrl,
            pubDate: e(t.publishTime, `x`),
            category: t.tagList.map((e) => e.nameEn),
            author: t.userInfo.nickname,
            upvotes: t.likeCount,
            comments: t.commentCount,
        })),
    };
}
export { o as route };
