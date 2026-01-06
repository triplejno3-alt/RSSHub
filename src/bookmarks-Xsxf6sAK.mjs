import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
import { i, n as a, r as o, t as s } from './utils-BI_C1viF.mjs';
import c from 'query-string';
function l(e, t) {
    return o(`https://app-api.pixiv.net/v1/user/bookmarks/illust`, { headers: { ...i, Authorization: `Bearer ` + t }, searchParams: c.stringify({ user_id: e, restrict: `public` }) });
}
function u(e, t) {
    return o(`https://app-api.pixiv.net/v1/user/detail`, { headers: { ...i, Authorization: `Bearer ` + t }, searchParams: c.stringify({ user_id: e }) });
}
const d = {
    path: `/user/bookmarks/:id`,
    categories: [`social-media`],
    example: `/pixiv/user/bookmarks/15288095`,
    parameters: { id: `user id, available in user's homepage URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`www.pixiv.net/users/:id/bookmarks/artworks`, `www.pixiv.net/en/users/:id/bookmarks/artworks`] }],
    name: `User Bookmark`,
    maintainers: [`EYHN`],
    handler: f,
};
async function f(i) {
    if (!e.pixiv || !e.pixiv.refreshToken) throw new r(`pixiv RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let o = i.req.param(`id`),
        c = await a(t.tryGet);
    if (!c) throw new r(`pixiv not login`);
    let [d, f] = await Promise.all([l(o, c), u(o, c)]),
        p = d.data.illusts,
        m = f.data.user.name;
    return {
        title: `${m} 的收藏`,
        link: `https://www.pixiv.net/users/${o}/bookmarks/artworks`,
        description: `${m} 的 pixiv 最新收藏`,
        item: p.map((e) => {
            let t = s.getImgs(e);
            return {
                title: e.title,
                author: e.user.name,
                pubDate: n(e.create_date),
                description: `${e.caption}<br><p>画师：${e.user.name} - 阅览数：${e.total_view} - 收藏数：${e.total_bookmarks}</p>${t.join(``)}`,
                link: `https://www.pixiv.net/artworks/${e.id}`,
            };
        }),
    };
}
export { d as route };
