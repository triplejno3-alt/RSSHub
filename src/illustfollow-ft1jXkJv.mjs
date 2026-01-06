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
function l(e) {
    return o(`https://app-api.pixiv.net/v2/illust/follow`, { headers: { ...i, Authorization: `Bearer ` + e }, searchParams: c.stringify({ restrict: `public` }) });
}
const u = {
    path: `/user/illustfollows`,
    categories: [`social-media`],
    example: `/pixiv/user/illustfollows`,
    parameters: {},
    features: { requireConfig: [{ name: `PIXIV_REFRESHTOKEN`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`www.pixiv.net/bookmark_new_illust.php`] }],
    name: `Following timeline`,
    maintainers: [`ClarkeCheng`],
    handler: d,
    url: `www.pixiv.net/bookmark_new_illust.php`,
    description: `::: warning
  Only for self-hosted
:::`,
};
async function d() {
    if (!e.pixiv || !e.pixiv.refreshToken) throw new r(`pixiv RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let i = await a(t.tryGet);
    if (!i) throw new r(`pixiv not login`);
    return {
        title: `Pixiv关注的新作品`,
        link: `https://www.pixiv.net/bookmark_new_illust.php`,
        description: `Pixiv关注的画师们的最新作品`,
        item: (await l(i)).data.illusts.map((e) => {
            let t = s.getImgs(e);
            return {
                title: e.title,
                author: e.user.name,
                pubDate: n(e.create_date),
                description: `${e.caption}<br><p>画师：${e.user.name} - 阅览数：${e.total_view} - 收藏数：${e.total_bookmarks}</p>${t.join(``)}`,
                link: `https://www.pixiv.net/artworks/${e.id}`,
                category: e.tags.map((e) => e.name),
            };
        }),
    };
}
export { u as route };
