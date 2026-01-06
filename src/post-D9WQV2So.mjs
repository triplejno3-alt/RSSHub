import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
async function l(e, n = 0, r = 7e6) {
    let { data: i } = await t(`https://tieba.baidu.com/p/${e}?see_lz=${n}&pn=${r}&ajax=1`, { headers: { Referer: `https://tieba.baidu.com/` } }),
        a = o(i),
        s = Number.parseInt(a(`[max-page]`).attr(`max-page`));
    return s > r ? l(e, s) : i;
}
const u = {
    path: [`/tieba/post/:id`, `/tieba/post/lz/:id`],
    categories: [`bbs`],
    example: `/baidu/tieba/post/686961453`,
    parameters: { id: `帖子 ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`tieba.baidu.com/p/:id`] }],
    name: `帖子动态`,
    maintainers: [`u3u`],
    handler: d,
};
async function d(t) {
    let u = t.req.param(`id`),
        d = t.req.path.includes(`lz`) ? 1 : 0,
        f = o(await l(u, d)),
        p = f(`.core_title_txt`).attr(`title`),
        m = f(`.p_postlist > [data-field]:not(:has(.ad_bottom_view))`);
    return {
        title: d ? `【只看楼主】${p}` : p,
        link: `https://tieba.baidu.com/p/${u}?see_lz=${d}`,
        description: `${p}的最新回复`,
        item: m.toArray().map((t) => {
            let o = f(t),
                { author: l, content: d } = o.data(`field`),
                m = o
                    .find(`.post-tail-wrap > .tail-info`)
                    .toArray()
                    .map((e) => f(e).text()),
                [h, g, _, v] = [``, ``, ``, ``];
            return (
                m.length === 0 && `date` in d
                    ? ((_ = `${d.post_no}楼`), (v = d.date), (h = o.find(`.j_d_post_content`).html()))
                    : m.length === 2
                      ? (([_, v] = m), (h = d.content))
                      : m.length === 3 && (([g, _, v] = m), (h = d.content)),
                {
                    title: `${l.user_name}回复了帖子《${p}》`,
                    description: s(a(r, { children: [i(`p`, { children: c(h) }), i(`br`, {}), `作者：`, l.user_name, i(`br`, {}), `楼层：`, _, i(`br`, {}), g] })),
                    pubDate: n(e(v, `YYYY-MM-DD hh:mm`), 8),
                    link: `https://tieba.baidu.com/p/${u}?pid=${d.post_id}#${d.post_id}`,
                }
            );
        }),
    };
}
export { u as route };
