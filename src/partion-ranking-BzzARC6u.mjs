import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { r as t } from './utils-Bu8-ZFdB.mjs';
const n = e.extend({ headers: { Referer: `https://www.bilibili.com/` } });
function r(e) {
    let t = e.getFullYear(),
        n = e.getMonth() + 1,
        r = e.getDate();
    return t + `` + (n >= 10 ? n : `0` + n) + (r >= 10 ? r : `0` + r);
}
const i = {
    path: `/partion/ranking/:tid/:days?/:embed?`,
    categories: [`social-media`],
    example: `/bilibili/partion/ranking/171/3`,
    parameters: { tid: `分区 id, 见上方表格`, days: `缺省为 7, 指最近多少天内的热度排序`, embed: `默认为开启内嵌视频, 任意值为关闭` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `分区视频排行榜`,
    maintainers: [`lengthmin`],
    handler: a,
};
async function a(e) {
    let i = e.req.param(`tid`),
        a = e.req.param(`days`) ?? 7,
        o = !e.req.param(`embed`),
        s = `https://api.bilibili.com/x/web-interface/newlist?ps=15&rid=${i}&_=${Date.now()}`,
        c = await n.get(s),
        l = [],
        u = `未知`,
        d = {};
    ((d = c.data.data.archives), d && d[0] && d[0].tname && (u = d[0].tname));
    let f = `https://s.search.bilibili.com/cate/search?main_ver=v3&search_type=video&view_type=hot_rank&cate_id=${i}&time_from=${r(new Date(Date.now() - 1e3 * 60 * 60 * 24 * a))}&time_to=${r(new Date())}&_=${Date.now()}`,
        p = (await n.get(f)).data.result;
    for (let e of p)
        ((e = {
            title: e.title,
            description: t.renderUGCDescription(o, e.pic, `${e.description} - ${e.tag}`, e.id, void 0, e.bvid),
            pubDate: new Date(e.pubdate).toUTCString(),
            link: e.pubdate > t.bvidTime && e.bvid ? `https://www.bilibili.com/video/${e.bvid}` : `https://www.bilibili.com/video/av${e.id}`,
            author: e.author,
        }),
            l.push(e));
    return { title: `bilibili ${u} 最热视频`, link: `https://www.bilibili.com`, description: `bilibili ${u}分区 最热视频`, item: l };
}
export { i as route };
