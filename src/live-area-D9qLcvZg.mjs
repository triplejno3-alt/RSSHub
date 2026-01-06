import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/live/area/:areaID/:order`,
    categories: [`live`],
    example: `/bilibili/live/area/207/online`,
    parameters: { areaID: `分区 ID 分区增删较多, 可通过 [分区列表](https://api.live.bilibili.com/room/v1/Area/getList) 查询`, order: `排序方式, live_time 开播时间, online 人气` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `直播分区`,
    maintainers: [`Qixingchen`],
    handler: n,
    description: `::: warning
  由于接口未提供开播时间，如果直播间未更换标题与分区，将视为一次。如果直播间更换分区与标题，将视为另一项
:::`,
};
async function n(t) {
    let n = t.req.param(`areaID`),
        r = t.req.param(`order`),
        i = ``;
    switch (r) {
        case `live_time`:
            i = `最新开播`;
            break;
        case `online`:
            i = `人气直播`;
            break;
    }
    let a = await e({ method: `get`, url: `https://api.live.bilibili.com/room/v1/Area/getList`, headers: { Referer: `https://link.bilibili.com/p/center/index` } }),
        o = ``,
        s = ``,
        c = ``,
        l = ``;
    for (let e of a.data.data)
        for (let t of e.list)
            if (t.id === n) {
                ((o = e.name), (s = e.id), (c = t.name), (l = `https://live.bilibili.com/p/eden/area-tags?parentAreaId=${s}&areaId=${n}`));
                break;
            }
    let u = (await e({ method: `get`, url: `https://api.live.bilibili.com/room/v1/area/getRoomList?area_id=${n}&sort_type=${r}&page_size=30&page_no=1`, headers: { Referer: `https://live.bilibili.com/p/eden/area-tags` } })).data.data;
    return {
        title: `哔哩哔哩直播-${o}·${c}分区-${i}`,
        link: l,
        description: `哔哩哔哩直播-${o}·${c}分区-${i}`,
        item: u.map((e) => ({
            title: `${e.uname} ${e.title}`,
            description: `${e.uname} ${e.title}`,
            pubDate: new Date().toUTCString(),
            guid: `https://live.bilibili.com/${e.roomid} ${e.title}`,
            link: `https://live.bilibili.com/${e.roomid}`,
        })),
    };
}
export { t as route };
