import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = (e) => a(r(t, { children: [e.img ? r(t, { children: [n(`img`, { src: e.img }), n(`br`, {})] }) : null, e.show ? e.show.map((e) => r(t, { children: [e, n(`br`, {})] })) : null, e.desc] })),
    s = {
        path: `/top/:board?`,
        categories: [`other`],
        example: `/baidu/top`,
        parameters: { board: '榜单，默认为 `realtime`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `热搜榜单`,
        maintainers: [`xyqfer`],
        handler: c,
        description: `| 热搜榜   | 小说榜 | 电影榜 | 电视剧榜 | 汽车榜 | 游戏榜 |
| -------- | ------ | ------ | -------- | ------ | ------ |
| realtime | novel  | movie  | teleplay | car    | game   |`,
    };
async function c(t) {
    let { board: n = `realtime` } = t.req.param(),
        r = `https://top.baidu.com/board?tab=${n}`,
        { data: a } = await e(r),
        s = i(a),
        { data: c } = JSON.parse(
            s(`#sanRoot`)
                .contents()
                .filter((e) => e.nodeType === 8)
                .prevObject[0].data.match(/s-data:(.*)/)[1]
        ),
        l = c.cards[0].content.map((e) => ({ title: e.word, description: o(e), link: e.rawUrl }));
    return { title: `${c.curBoardName} - 百度热搜`, description: s(`meta[name="description"]`).attr(`content`), link: r, item: l };
}
export { s as route };
