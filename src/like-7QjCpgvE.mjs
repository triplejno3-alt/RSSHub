import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { r as n } from './utils-Bu8-ZFdB.mjs';
import { t as r } from './cache-BV7o58Cb.mjs';
const i = {
    path: `/user/like/:uid/:embed?`,
    categories: [`social-media`],
    example: `/bilibili/user/like/208259`,
    parameters: { uid: `用户 id, 可在 UP 主主页中找到`, embed: `默认为开启内嵌视频, 任意值为关闭` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`space.bilibili.com/:uid`], target: `/user/like/:uid` }],
    name: `UP 主点赞视频`,
    maintainers: [`ygguorun`],
    handler: a,
};
async function a(i) {
    let a = i.req.param(`uid`),
        o = !i.req.param(`embed`),
        s = await r.getUsernameFromUID(a),
        { data: c, code: l, message: u } = (await t({ url: `https://api.bilibili.com/x/space/like/video?vmid=${a}`, headers: { Referer: `https://space.bilibili.com/${a}/` } })).data;
    if (l) throw Error(u ?? l);
    return {
        title: `${s} 的 bilibili 点赞视频`,
        link: `https://space.bilibili.com/${a}`,
        description: `${s} 的 bilibili 点赞视频`,
        item: c.list.map((t) => ({
            title: t.title,
            description: n.renderUGCDescription(o, t.pic, t.desc, t.aid, void 0, t.bvid),
            pubDate: e(t.pubdate * 1e3),
            link: t.pubdate > n.bvidTime && t.bvid ? `https://www.bilibili.com/video/${t.bvid}` : `https://www.bilibili.com/video/av${t.aid}`,
            author: t.owner.name,
        })),
    };
}
export { i as route };
