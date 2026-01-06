import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import { i as n } from './helpers-C9wXLK0V.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { n as a, r as o } from './utils-Bu8-ZFdB.mjs';
import { t as s } from './cache-BV7o58Cb.mjs';
const c = {
    path: `/user/video/:uid/:embed?`,
    categories: [`social-media`],
    view: i.Videos,
    example: `/bilibili/user/video/2267573`,
    parameters: { uid: `用户 id, 可在 UP 主主页中找到`, embed: `默认为开启内嵌视频, 任意值为关闭` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`space.bilibili.com/:uid`], target: `/user/video/:uid` }],
    name: `UP 主投稿`,
    maintainers: [`DIYgod`, `Konano`, `pseudoyu`],
    handler: l,
};
async function l(i) {
    let c = i.req.query(`format`) === `json`,
        l = i.req.param(`uid`),
        u = !i.req.param(`embed`),
        d = await s.getCookie(),
        f = await s.getWbiVerifyString(),
        p = o.getDmImgList(),
        m = o.getDmImgInter(),
        h = await s.getRenderData(l),
        g = (
            await r(
                `https://api.bilibili.com/x/space/wbi/arc/search?${o.addWbiVerifyInfo(o.addRenderData(o.addDmVerifyInfoWithInter(`mid=${l}&ps=30&tid=0&pn=1&keyword=&order=pubdate&platform=web&web_location=1550101&order_avoided=true`, p, m), h), f)}`,
                { headers: { Referer: `https://space.bilibili.com/${l}`, origin: `https://space.bilibili.com`, Cookie: d } }
            )
        ).data;
    if (g.code) throw (t.error(JSON.stringify(g.data)), Error(`Got error code ${g.code} while fetching: ${g.message}`));
    let _ = await s.getUsernameAndFaceFromUID(l),
        v = _[0] || g.data.list.vlist[0]?.author,
        y = _[1];
    return {
        title: `${v} 的 bilibili 空间`,
        link: `https://space.bilibili.com/${l}`,
        description: `${v} 的 bilibili 空间`,
        image: y ?? void 0,
        logo: y ?? void 0,
        icon: y ?? void 0,
        item:
            g.data &&
            g.data.list &&
            g.data.list.vlist &&
            (await Promise.all(
                g.data.list.vlist.map(async (t) => {
                    let r = c && !e.bilibili.excludeSubtitles && t.bvid ? await s.getVideoSubtitleAttachment(t.bvid) : [];
                    return {
                        title: t.title,
                        description: o.renderUGCDescription(u, t.pic, t.description, t.aid, void 0, t.bvid),
                        pubDate: new Date(t.created * 1e3).toUTCString(),
                        link: t.created > o.bvidTime && t.bvid ? `https://www.bilibili.com/video/${t.bvid}` : `https://www.bilibili.com/video/av${t.aid}`,
                        author: v,
                        comments: t.comment,
                        attachments: t.bvid ? [{ url: a(t.bvid), mime_type: `text/html`, duration_in_seconds: n(t.length) }, ...r] : void 0,
                    };
                })
            )),
    };
}
export { c as route };
