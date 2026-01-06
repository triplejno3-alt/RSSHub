import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/channel/:id/:nav?`,
    categories: [`social-media`],
    example: `/douban/channel/30168934/hot`,
    parameters: { id: `频道id`, nav: `专题分类，可选，默认为 default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `频道专题`,
    maintainers: [`umm233`],
    handler: n,
    description: `| 默认    | 热门 | 最新 |
| ------- | ---- | ---- |
| default | hot  | new  |`,
};
async function n(t) {
    let n = t.req.param(`id`),
        r = t.req.param(`nav`) || `default`,
        i = `https://www.douban.com/channel/${n}`,
        a = await e({ method: `get`, url: `https://m.douban.com/rexxar/api/v2/elessar/channel/${n}`, headers: { Referer: i } }),
        o = await e({ method: `get`, url: `https://m.douban.com/rexxar/api/v2/lembas/channel/${n}/feed?ck=null&for_mobile=1&start=0&count=20&nav=${r}`, headers: { Referer: i } }),
        s = a.data.title,
        c = o.data.items,
        l = ``;
    switch (r) {
        case `hot`:
            l = `热门`;
            break;
        case `new`:
            l = `最新`;
            break;
        default:
            l = `默认`;
            break;
    }
    return {
        title: `豆瓣${s}频道-${l}动态`,
        link: i,
        description: `豆瓣${s}频道专题下的${l}动态`,
        item: c
            .map((e) => {
                if (e.external_payload.items === void 0) {
                    let t = `作者：${e.author.name} | ${e.create_time} <br><br> ${e.abstract}">`;
                    return { title: e.title, description: t, pubDate: new Date(e.create_time), link: e.url };
                } else return null;
            })
            .filter(Boolean),
        allowEmpty: !0,
    };
}
export { t as route };
