import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { r as i } from './utils-Bu8-ZFdB.mjs';
import { t as a } from './cache-BV7o58Cb.mjs';
const o = {
    path: `/followings/video/:uid/:embed?`,
    categories: [`social-media`],
    example: `/bilibili/followings/video/2267573`,
    parameters: { uid: `用户 id`, embed: `默认为开启内嵌视频，任意值为关闭` },
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
    name: `用户关注视频动态`,
    maintainers: [`LogicJake`],
    handler: s,
    description: `::: warning
  用户动态需要 b 站登录后的 Cookie 值，所以只能自建，详情见部署页面的配置模块。
:::`,
};
async function s(o) {
    let s = String(o.req.param(`uid`)),
        c = !o.req.param(`embed`),
        l = await a.getUsernameFromUID(s),
        u = e.bilibili.cookies[s];
    if (u === void 0) throw new r(`缺少对应 uid 的 Bilibili 用户登录后的 Cookie 值`);
    let d = (await n({ method: `get`, url: `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=${s}&type=8`, headers: { Referer: `https://space.bilibili.com/${s}/`, Cookie: u } })).data;
    if (d.code) throw (t.error(JSON.stringify(d)), d.code === -6 || d.code === 41e5 ? new r(`对应 uid 的 Bilibili 用户的 Cookie 已过期`) : Error(`Got error code ${d.code} while fetching: ${d.message}`));
    let f = d.data.cards.map((e) => {
        let t = JSON.parse(e.card);
        return {
            title: t.title,
            description: i.renderUGCDescription(c, t.pic, t.desc, t.aid, void 0, e.desc.bvid),
            pubDate: new Date(t.pubdate * 1e3).toUTCString(),
            link: t.pubdate > i.bvidTime && e.desc.bvid ? `https://www.bilibili.com/video/${e.desc.bvid}` : `https://www.bilibili.com/video/av${t.aid}`,
            author: e.desc.user_profile.info.uname,
        };
    });
    return { title: `${l} 关注视频动态`, link: `https://t.bilibili.com/?tab=8`, item: f };
}
export { o as route };
