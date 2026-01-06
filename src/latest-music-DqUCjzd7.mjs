import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/music/latest/:area?`,
    categories: [`social-media`],
    example: `/douban/music/latest/chinese`,
    parameters: { area: `区域类型，默认全部` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `最新增加的音乐`,
    maintainers: [`fengkx`, `xyqfer`],
    handler: r,
    description: `| 华语    | 欧美    | 日韩        |
| ------- | ------- | ----------- |
| chinese | western | japankorean |`,
};
async function r(n) {
    let { area: r = `` } = n.req.param(),
        i = `豆瓣最新增加的音乐`,
        a;
    if (r === ``) {
        let n = `https://music.douban.com/latest`,
            r = t((await e.get(n)).data);
        a = {
            title: i,
            link: n,
            item: r(`.dlist`)
                .toArray()
                .map((e) => ({ title: r(e).find(`.pl2`).text(), link: r(e).find(`.pl2`).attr(`href`), description: r(e).html() })),
        };
    } else {
        let t = `https://m.douban.com/music/`,
            n = { chinese: { name: `华语新碟榜`, path: `chinese` }, western: { name: `欧美新碟榜`, path: `occident` }, japankorean: { name: `日韩新碟榜`, path: `japan_korea` } },
            o = await e({ method: `get`, url: `https://m.douban.com/rexxar/api/v2/subject_collection/music_${n[r].path}/items?os=ios&callback=&start=0&count=20&loc_id=0&_=0`, headers: { Referer: t } });
        a = {
            title: `${i}-${n[r].name}`,
            link: `${t}new${r}`,
            item: o.data.subject_collection_items.map((e) => ({
                title: `${e.title}-${e.info}`,
                link: `https://music.douban.com/subject/${e.id}/`,
                description: `
                    <img src="${e.cover.url}" /><br>
                    ${e.recommend_comment}<br>
                    <strong>评分:</strong> ${e.rating.value.toFixed(1)}
                `,
                pubDate: new Date(e.pubdate[0]).toUTCString(),
            })),
        };
    }
    return a;
}
export { n as route };
