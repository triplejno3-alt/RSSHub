import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import { i as t } from './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { n as r, r as i } from './utils-Bu8-ZFdB.mjs';
import { t as a } from './cache-BV7o58Cb.mjs';
const o = {
    path: `/weekly/:embed?`,
    categories: [`social-media`],
    example: `/bilibili/weekly`,
    parameters: { embed: `默认为开启内嵌视频, 任意值为关闭` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `B 站每周必看`,
    maintainers: [`ttttmr`],
    handler: s,
};
async function s(o) {
    let s = o.req.query(`format`) === `json`,
        c = !o.req.param(`embed`),
        l = await n({ method: `get`, url: `https://app.bilibili.com/x/v2/show/popular/selected/series?type=weekly_selected`, headers: { Referer: `https://www.bilibili.com/h5/weekly-recommend` } }),
        u = l.data.data[0].number,
        d = l.data.data[0].name;
    return {
        title: `B站每周必看`,
        link: `https://www.bilibili.com/h5/weekly-recommend`,
        description: `B站每周必看`,
        item: (
            await n({ method: `get`, url: `https://app.bilibili.com/x/v2/show/popular/selected?type=weekly_selected&number=${u}`, headers: { Referer: `https://www.bilibili.com/h5/weekly-recommend?num=${u}&navhide=1` } })
        ).data.data.list.map(async (n) => {
            let o = s && !e.bilibili.excludeSubtitles && n.bvid ? await a.getVideoSubtitleAttachment(n.bvid) : [];
            return {
                title: n.title,
                description: i.renderUGCDescription(c, n.cover, `${d} ${n.title} - ${n.rcmd_reason}`, n.param, void 0, n.bvid),
                link: u > 60 && n.bvid ? `https://www.bilibili.com/video/${n.bvid}` : `https://www.bilibili.com/video/av${n.param}`,
                attachments: n.bvid ? [{ url: r(n.bvid), mime_type: `text/html`, duration_in_seconds: t(n.cover_right_text_1) }, ...o] : void 0,
            };
        }),
    };
}
export { o as route };
