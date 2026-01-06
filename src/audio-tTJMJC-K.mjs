import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/audio/:id`,
    categories: [`social-media`],
    example: `/bilibili/audio/10624`,
    parameters: { id: `歌单 id, 可在歌单页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `歌单`,
    maintainers: [`LogicJake`],
    handler: n,
};
async function n(t) {
    let n = Number.parseInt(t.req.param(`id`)),
        r = `https://www.bilibili.com/audio/am${n}`,
        i = `https://www.bilibili.com/audio/music-service-c/web/menu/info?sid=${n}`,
        a = (await e.get(i)).data.data,
        o = a.intro,
        s = a.title,
        c = `https://www.bilibili.com/audio/music-service-c/web/song/of-menu?sid=${n}&pn=1&ps=100`;
    return {
        title: s,
        link: r,
        description: o,
        item: (await e.get(c)).data.data.data.map((e) => {
            let t = e.title,
                n = `https://www.bilibili.com/audio/au` + e.statistic.sid,
                r = e.author,
                i = e.intro + `<br><img src="${e.cover}">`;
            return { title: t, link: n, author: r, pubDate: new Date(e.passtime * 1e3).toUTCString(), description: i };
        }),
    };
}
export { t as route };
