import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = {
    path: `/movie/weekly/:type?`,
    categories: [`social-media`],
    example: `/douban/movie/weekly`,
    parameters: { type: `分类，可在榜单页 URL 中找到，默认为一周口碑电影榜` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `一周口碑榜`,
    maintainers: [`numm233`, `nczitzk`],
    handler: o,
    description: `| 一周口碑电影榜      | 华语口碑剧集榜            |
| ------------------- | ------------------------- |
| movie_weekly_best | tv_chinese_best_weekly |`,
};
async function o(t) {
    let n = t.req.param(`type`) || `movie_weekly_best`,
        r = `https://m.douban.com/movie`,
        i = `https://m.douban.com/rexxar/api/v2/subject_collection/${n}`,
        a = await e({ method: `get`, url: `${i}/items?start=0&count=10`, headers: { Referer: r } }),
        o = await e({ method: `get`, url: i, headers: { Referer: r } }),
        c = a.data.subject_collection_items;
    return {
        title: o.data.title,
        link: `https://m.douban.com/subject_collection/${n}`,
        description: o.data.description,
        item: c.map(({ title: e, cover: t, cover_url: n, url: r, rating: i, null_rating_reason: a, description: o, card_subtitle: c, photos: l }) => {
            let u = i ? `${i.value.toFixed(1)}分` : a;
            return (t && t.url && (n = t.url), { title: e, description: s({ title: e, card_subtitle: c, description: o, rate: u, cover_url: n, photos: l }), link: r });
        }),
    };
}
const s = ({ title: e, rate: a, card_subtitle: o, description: s, cover_url: c, photos: l }) =>
    i(
        r(t, {
            children: [
                r(`p`, { children: [`标题：`, e] }),
                r(`p`, { children: [`评分：`, a] }),
                r(`p`, { children: [`标签：`, o] }),
                r(`p`, { children: [`影片信息：`, s] }),
                r(`p`, { children: [c ? n(`img`, { src: c }) : null, l?.map((e, t) => n(`img`, { src: e }, `${e}-${t}`))] }),
            ],
        })
    );
export { a as route };
