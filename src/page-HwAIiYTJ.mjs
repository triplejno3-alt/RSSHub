import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { r as t } from './utils-Bu8-ZFdB.mjs';
const n = {
    path: `/video/page/:bvid/:embed?`,
    categories: [`social-media`],
    example: `/bilibili/video/page/BV1i7411M7N9`,
    parameters: { bvid: `可在视频页 URL 中找到`, embed: `默认为开启内嵌视频, 任意值为关闭` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `视频选集列表`,
    maintainers: [`sxzz`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`bvid`),
        i;
    r.startsWith(`BV`) || ((i = r), (r = null));
    let a = !n.req.param(`embed`),
        o = `https://www.bilibili.com/video/${r || `av${i}`}`,
        s = await e({ method: `get`, url: `https://api.bilibili.com/x/web-interface/view?${r ? `bvid=${r}` : `aid=${i}`}`, headers: { Referer: o } }),
        c = s.data.data,
        { title: l, pages: u } = s.data.data;
    return {
        title: `视频 ${l} 的选集列表`,
        link: o,
        description: `视频 ${l} 的视频选集列表`,
        item: u
            .toSorted((e, t) => t.page - e.page)
            .slice(0, n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`)) : 10)
            .map((e) => ({ title: e.part, description: t.renderUGCDescription(a, c.pic, `${e.part} - ${l}`, c.aid, e.cid, c.bvid), link: `${o}?p=${e.page}` })),
    };
}
export { n as route };
