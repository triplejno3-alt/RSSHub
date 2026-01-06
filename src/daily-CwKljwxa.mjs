import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import i from 'dayjs';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = `http://d.guduodata.com`,
    s = {
        collect: { name: `汇总榜`, categories: { drama: `连续剧`, variety: `综艺` } },
        bill: { name: `排行榜`, categories: { network_drama: `网络剧`, network_movie: `网络大电影`, network_variety: `网络综艺`, tv_drama: `电视剧`, tv_variety: `电视综艺`, anime: `国漫` } },
    },
    c = {
        path: `/daily`,
        categories: [`other`],
        example: `/guduodata/daily`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`guduodata.com/`] }],
        name: `日榜`,
        maintainers: [`Gem1ni`],
        handler: l,
        url: `guduodata.com/`,
    };
async function l() {
    let r = i().valueOf(),
        c = i().subtract(1, `day`).format(`YYYY-MM-DD`),
        l = (e) => a(n(u, { rows: e })),
        d = Object.keys(s).flatMap((e) =>
            Object.keys(s[e].categories).map((t) => ({ type: e, name: `[${c}] ${s[e].name} - ${s[e].categories[t]}`, category: t.toUpperCase(), url: `${o}/m/v3/billboard/list?type=DAILY&category=${t.toUpperCase()}&date=${c}` }))
        );
    return {
        title: `骨朵数据 - 日榜`,
        link: o,
        description: c,
        item: await Promise.all(
            d.map((n) =>
                e.tryGet(n.url, async () => {
                    let e = (await t.get(`${n.url}&t=${r}`, { headers: { Referer: `http://guduodata.com/` } })).data.data;
                    return { title: n.name, pubDate: c, link: n.url, description: l(e) };
                })
            )
        ),
    };
}
const u = ({ rows: e }) =>
    r(`table`, {
        border: `1`,
        cellpadding: `2`,
        cellspacing: `0`,
        children: [
            r(`thead`, {
                children: [
                    n(`th`, { children: `排名` }),
                    n(`th`, { children: `剧名` }),
                    n(`th`, { children: `播放平台` }),
                    n(`th`, { children: `上映时间` }),
                    n(`th`, { children: `评论数` }),
                    n(`th`, { children: `百度指数` }),
                    n(`th`, { children: `豆瓣评分` }),
                    n(`th`, { children: `全网热度` }),
                ],
            }),
            n(`tbody`, {
                children: e.map((e, t) =>
                    r(`tr`, {
                        children: [
                            n(`td`, { children: t + 1 }),
                            n(`td`, { children: e.name }),
                            n(`td`, { children: e.platforms }),
                            n(`td`, { children: e.release_date }),
                            n(`td`, { children: e.comment || `` }),
                            n(`td`, { children: e.baidu_index || `` }),
                            n(`td`, { children: e.douban || `` }),
                            n(`td`, { children: e.gdi }),
                        ],
                    })
                ),
            }),
        ],
    });
export { c as route };
