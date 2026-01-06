import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './config-not-found-DGyG6Tbz.mjs';
import './puppeteer-BbZGb8cd.mjs';
import './utils-Bu8-ZFdB.mjs';
import { t as r } from './cache-BV7o58Cb.mjs';
const i = {
    path: `/followings/article/:uid`,
    categories: [`social-media`],
    example: `/bilibili/followings/article/99800931`,
    parameters: { uid: `用户 id` },
    features: {
        requireConfig: [
            {
                name: `BILIBILI_COOKIE_*`,
                description:
                    'BILIBILI_COOKIE_{uid}: 用于用户关注动态系列路由，对应 uid 的 b 站用户登录后的 Cookie 值，`{uid}` 替换为 uid，如 `BILIBILI_COOKIE_2267573`，获取方式：\n    1.  打开 [https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=0&type=8](https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=0&type=8)\n    2.  打开控制台，切换到 Network 面板，刷新\n    3.  点击 dynamic_new 请求，找到 Cookie\n    4.  视频和专栏，UP 主粉丝及关注只要求 `SESSDATA` 字段，动态需复制整段 Cookie',
            },
        ],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `用户关注专栏`,
    maintainers: [`woshiluo`],
    handler: a,
    description: `::: warning
  用户动态需要 b 站登录后的 Cookie 值，所以只能自建，详情见部署页面的配置模块。
:::`,
};
async function a(i) {
    let a = String(i.req.param(`uid`)),
        o = await r.getUsernameFromUID(a),
        s = e.bilibili.cookies[a];
    if (s === void 0) throw new n(`缺少对应 uid 的 Bilibili 用户登录后的 Cookie 值`);
    let c = await t({ method: `get`, url: `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=${a}&type=64`, headers: { Referer: `https://space.bilibili.com/${a}/`, Cookie: s } });
    if (c.data.code === -6) throw new n(`对应 uid 的 Bilibili 用户的 Cookie 已过期`);
    let l = c.data.data.cards,
        u = await Promise.all(
            l.map(async (e) => {
                let t = JSON.parse(e.card),
                    { url: n, description: i } = await r.getArticleDataFromCvid(t.id, a);
                return { title: t.title, description: i, pubDate: new Date(t.publish_time * 1e3).toUTCString(), link: n, author: e.desc.user_profile.info.uname };
            })
        );
    return { title: `${o} 关注专栏动态`, link: `https://t.bilibili.com/?tab=64`, item: u };
}
export { i as route };
