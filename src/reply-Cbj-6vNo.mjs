import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import './utils-Bu8-ZFdB.mjs';
import { t } from './cache-BV7o58Cb.mjs';
const n = {
    path: `/video/reply/:bvid`,
    categories: [`social-media`],
    example: `/bilibili/video/reply/BV1vA411b7ip`,
    parameters: { bvid: `可在视频页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `视频评论`,
    maintainers: [`Qixingchen`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`bvid`),
        i;
    r.startsWith(`BV`) || ((i = r), (r = null));
    let a = await t.getVideoNameFromId(i, r);
    i ||= await t.getAidFromBvid(r);
    let o = `https://www.bilibili.com/video/${r || `av${i}`}`,
        s = await t.getCookie(),
        c = (await e({ method: `get`, url: `https://api.bilibili.com/x/v2/reply?type=1&oid=${i}&sort=0`, headers: { Referer: o, Cookie: s } })).data.data.replies;
    return {
        title: `${a} 的 评论`,
        link: o,
        description: `${a} 的评论`,
        item: c.map((e) => ({ title: `${e.member.uname} : ${e.content.message}`, description: `${e.member.uname} : ${e.content.message}`, pubDate: new Date(e.ctime * 1e3).toUTCString(), link: `${o}/#reply${e.rpid}` })),
    };
}
export { n as route };
