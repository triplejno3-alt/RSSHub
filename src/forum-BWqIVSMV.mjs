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
const l = {
    path: [`/tieba/forum/good/:kw/:cid?/:sortBy?`, `/tieba/forum/:kw/:sortBy?`],
    categories: [`bbs`],
    example: `/baidu/tieba/forum/good/女图`,
    parameters: { kw: `吧名`, cid: '精品分类，默认为 `0`（全部分类），如果不传 `cid` 则获取全部分类', sortBy: '排序方式：`created`, `replied`。默认为 `created`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `精品帖子`,
    maintainers: [`u3u`],
    handler: u,
};
async function u(l) {
    let { kw: u, cid: d = `0`, sortBy: f = `created` } = l.req.param(),
        p = { kw: encodeURIComponent(u) };
    (l.req.path.includes(`good`) && (p.tab = `good`), d && (p.cid = d));
    let { data: m } = await t(`https://tieba.baidu.com/f`, { headers: { Referer: `https://tieba.baidu.com/` }, searchParams: p }),
        h = o(
            o(m)(`code[id="pagelet_html_frs-list/pagelet/thread_list"]`)
                .contents()
                .filter((e) => e.nodeType === `8`).prevObject[0].data
        ),
        g = h(`#thread_list > .j_thread_list[data-field]`)
            .toArray()
            .map((t) => {
                let o = h(t),
                    { id: l, author_name: u } = o.data(`field`),
                    d = f === `created` ? o.find(`.is_show_create_time`).text().trim() : o.find(`.threadlist_reply_date`).text().trim(),
                    p = o.find(`a.j_th_tit`).text().trim(),
                    m = o.find(`.threadlist_abs`).text().trim(),
                    g = o
                        .find(`.threadlist_media img`)
                        .toArray()
                        .map((e) => `<img src="${h(e).attr(`bpic`)}">`)
                        .join(``);
                return {
                    title: p,
                    description: s(a(r, { children: [i(`p`, { children: m }), i(`p`, { children: c(g) }), a(`p`, { children: [`作者：`, u] })] })),
                    pubDate: n(e(d, [`HH:mm`, `M-D`, `YYYY-MM`], !0), 8),
                    link: `https://tieba.baidu.com/p/${l}`,
                };
            });
    return { title: `${u}吧`, description: o(m)(`meta[name="description"]`).attr(`content`), link: `https://tieba.baidu.com/f?kw=${encodeURIComponent(u)}`, item: g };
}
export { l as route };
