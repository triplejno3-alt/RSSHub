import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/event/hot/:locationId`,
    categories: [`social-media`],
    example: `/douban/event/hot/118172`,
    parameters: { locationId: '位置 id, [同城首页](https://www.douban.com/location)打开控制台执行 `window.__loc_id__` 获取' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `热门同城活动`,
    maintainers: [`xyqfer`],
    handler: n,
};
async function n(t) {
    let { locationId: n = 0 } = t.req.param(),
        r = `https://m.douban.com/app_topic/event_hot`,
        i = await e({ method: `get`, url: `https://m.douban.com/rexxar/api/v2/subject_collection/event_hot/items?os=ios&for_mobile=1&callback=&start=0&count=20&loc_id=${n}`, headers: { Referer: r } });
    return {
        title: `豆瓣同城-热门活动-${n}`,
        link: r,
        item: i.data.subject_collection_items.map(({ title: e, url: t, cover: n, subtype: r, info: i, price_range: a }) => ({
            title: e,
            description: `<img src="${n.url}"><br>
              ${i}/${r}/${a}
            `,
            link: t,
        })),
    };
}
export { t as route };
