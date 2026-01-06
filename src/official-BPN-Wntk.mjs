import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t as e } from './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = (e, t, n) => s(o(i, { children: [e ? t.map((e) => o(i, { children: [a(`img`, { src: e.url }), a(`br`, {})] })) : null, n ? a(i, { children: c(n) }) : null] })),
    u = { 1: `崩坏三`, 2: `原神`, 3: `崩坏二`, 4: `未定事件簿`, 6: `崩坏：星穹铁道`, 8: `绝区零` },
    d = { 1: `公告`, 2: `活动`, 3: `资讯` },
    f = { 1: `bh3`, 2: `ys`, 3: `bh2`, 4: `wd`, 6: `sr`, 8: `zzz` },
    p = { 1: `6`, 2: `28`, 3: `31`, 4: `33`, 6: `53`, 8: `58` };
var m = class extends Error {
    constructor(e) {
        (super(e), (this.name = `MiHoYoOfficialError`));
    }
};
const h = async ({ gids: e, type: t, page_size: n, last_id: i }) =>
        (await r({ method: `get`, url: `https://bbs-api-static.miyoushe.com/painter/wapi/getNewsList?${new URLSearchParams({ client_type: `4`, gids: e, type: t, page_size: n, last_id: i }).toString()}` }))?.data?.data?.list,
    g = async (e, i = `2`) => {
        let a = e.post,
            o = a.post_id,
            s = `https://bbs-api.miyoushe.com/post/wapi/getPostFull?${new URLSearchParams({ post_id: o }).toString()}`;
        return await t.tryGet(s, async () => {
            let t = await r(s),
                c = t?.data?.data?.post;
            if (!c) throw new m(`mihoyo/bbs/official: getPostContent failed: ${s} - ${JSON.stringify(t)}`);
            let u = c?.post?.game_id || i,
                d = c?.user?.nickname || ``,
                p = c?.post?.content || ``,
                h = c?.topics?.map((e) => e.name) || [],
                g = l(a.has_cover, e.cover_list, p);
            return { title: a.subject, link: `https://www.miyoushe.com/${f[u]}/article/${o}`, description: g, pubDate: n(a.created_at * 1e3), category: h, author: d };
        });
    },
    _ = (t, n = `2`) =>
        Promise.all(
            t.map((t) =>
                g(t, n).catch((t) => {
                    if (t instanceof m) return (e.error(t.message), null);
                    throw t;
                })
            )
        ).then((e) => e.filter(Boolean)),
    v = {
        path: `/bbs/official/:gids/:type?/:page_size?/:last_id?`,
        categories: [`game`],
        example: `/mihoyo/bbs/official/2/3/20/`,
        parameters: { gids: `游戏id`, type: `公告类型，默认为 2(即 活动)`, page_size: `分页大小，默认为 20 `, last_id: `跳过的公告数，例如指定为 40 就是从第 40 条公告开始，可用于分页` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `米游社 - 官方公告`,
        maintainers: [`CaoMeiYouRen`],
        handler: y,
        description: `游戏 id

| 崩坏三 | 原神 | 崩坏二 | 未定事件簿 | 星穹铁道 | 绝区零 |
| ------ | ---- | ------ | ---------- | -------- | ------ |
| 1      | 2    | 3      | 4          | 6        | 8      |

  公告类型

| 公告 | 活动 | 资讯 |
| ---- | ---- | ---- |
| 1    | 2    | 3    |`,
    };
async function y(e) {
    let { gids: t, type: n = `2`, page_size: r = `20`, last_id: i = `` } = e.req.param(),
        a = await _(await h({ gids: t, type: n, page_size: r, last_id: i }), t);
    return { title: `米游社 - ${u[t] || ``} - ${d[n] || ``}`, link: `https://www.miyoushe.com/${f[t]}/home/${p[t]}?type=${n}`, item: a };
}
export { v as route };
