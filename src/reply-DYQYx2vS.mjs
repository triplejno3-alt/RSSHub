import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './cache-5PFzW9cU.mjs';
const n = {
    path: `/kg/reply/:playId`,
    categories: [`social-media`],
    example: `/qq/kg/reply/OhXHMdO1VxLWQOOm`,
    parameters: { playId: `音频页 ID, 可在对应页面的 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `用户作品评论动态`,
    maintainers: [`zhangxiang012`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`playId`),
        i = `https://node.kg.qq.com/play?s=${r}`,
        a = await t.getPlayInfo(n, r, ``);
    return {
        title: `${a.name} - ${a.author} 的评论`,
        link: i,
        image: a.itunes_item_image,
        allowEmpty: !0,
        item: a.comments.map((t) => ({ title: `${t.nick}：${t.content}`, pubDate: e(t.ctime * 1e3), link: i, guid: `ksong:${a.ksong_mid}:${t.comment_id}` })),
    };
}
export { n as route };
