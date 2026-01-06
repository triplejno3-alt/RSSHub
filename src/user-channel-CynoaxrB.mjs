import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { r } from './utils-Bu8-ZFdB.mjs';
import { t as i } from './cache-BV7o58Cb.mjs';
const a = { title: `此 bilibili 频道不存在` },
    o = {
        path: `/user/channel/:uid/:sid/:embed?`,
        categories: [`social-media`],
        example: `/bilibili/user/channel/2267573/396050`,
        parameters: { uid: `用户 id, 可在 UP 主主页中找到`, sid: `频道 id, 可在频道的 URL 中找到`, embed: `默认为开启内嵌视频, 任意值为关闭` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `UP 主频道的视频列表`,
        maintainers: [`weirongxu`],
        handler: s,
    };
async function s(o) {
    let s = Number.parseInt(o.req.param(`uid`)),
        c = Number.parseInt(o.req.param(`sid`)),
        l = !o.req.param(`embed`),
        u = o.req.query(`limit`) ?? 25,
        d = `https://space.bilibili.com/${s}/channel/seriesdetail?sid=${c}`,
        f = `https://api.bilibili.com/x/series/series?series_id=${c}`,
        p = await e.tryGet(f, async () => (await n(f, { headers: { Referer: d } })).data.data);
    if (!p) return a;
    let [m, h] = await i.getUsernameAndFaceFromUID(s),
        g = (await n(`https://api.bilibili.com/x/series/archives?mid=${s}&series_id=${c}&only_normal=true&sort=desc&pn=1&ps=${u}`, { headers: { Referer: d } })).data.data;
    return g.archives
        ? {
              title: `${m} 的 bilibili 频道 ${p.meta.name}`,
              link: d,
              description: `${m} 的 bilibili 频道`,
              image: h,
              logo: h,
              icon: h,
              item: g.archives.map((e) => ({
                  title: e.title,
                  description: r.renderUGCDescription(l, e.pic, ``, e.aid, void 0, e.bvid),
                  pubDate: t(e.pubdate, `X`),
                  link: e.pubdate > r.bvidTime && e.bvid ? `https://www.bilibili.com/video/${e.bvid}` : `https://www.bilibili.com/video/av${e.aid}`,
                  author: m,
              })),
          }
        : a;
}
export { o as route };
