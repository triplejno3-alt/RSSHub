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
import l from 'iconv-lite';
const u = {
    path: `/tieba/search/:qw/:routeParams?`,
    categories: [`bbs`],
    example: `/baidu/tieba/search/neuro`,
    parameters: { qw: `搜索关键词`, routeParams: `额外参数；请参阅以下说明和表格` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `贴吧搜索`,
    maintainers: [`JimenezLi`],
    handler: d,
    description: `| 键           | 含义                                                       | 接受的值      | 默认值 |
| ------------ | ---------------------------------------------------------- | ------------- | ------ |
| kw           | 在名为 kw 的贴吧中搜索                                     | 任意名称 / 无 | 无     |
| only_thread  | 只看主题帖，默认为 0 关闭                                  | 0/1           | 0      |
| rn           | 返回条目的数量                                             | 1-20          | 20     |
| sm           | 排序方式，0 为按时间顺序，1 为按时间倒序，2 为按相关性顺序 | 0/1/2         | 1      |

  用例：\`/baidu/tieba/search/neuro/kw=neurosama&only_thread=1&sm=2\``,
};
async function d(u) {
    let d = u.req.param(`qw`),
        f = new URLSearchParams(u.req.param(`routeParams`));
    (f.set(`ie`, `utf-8`), f.set(`qw`, d), f.set(`rn`, f.get(`rn`) || `20`));
    let p = `https://tieba.baidu.com/f/search/res?${f.toString()}`,
        m = await t.get(p, { headers: { Referer: `https://tieba.baidu.com` }, responseType: `buffer` }),
        h = o(l.decode(m.data, `gbk`)),
        g = h(`div.s_post`);
    return {
        title: `${d} - ${f.get(`kw`) || `百度贴`}吧搜索`,
        link: p,
        item: g.toArray().map((t) => {
            let o = h(t),
                l = o.find(`.p_title a`),
                u = l.text().trim(),
                d = l.attr(`href`),
                f = o.find(`.p_date`).text().trim(),
                p = o.find(`.p_content`).text().trim(),
                m = o
                    .find(`.p_mediaCont img`)
                    .toArray()
                    .map((e) => `<img src="${h(e).attr(`original`)}">`)
                    .join(``),
                g = o.find(`a.p_forum`).text().trim(),
                _ = o.find(`a`).last().text().trim();
            return {
                title: u,
                description: s(a(r, { children: [i(`p`, { children: p }), i(`p`, { children: c(m) }), a(`p`, { children: [`贴吧：`, g, i(`br`, {}), `作者：`, _] })] })),
                author: _,
                pubDate: n(e(f, `YYYY-MM-DD HH:mm`), 8),
                link: d,
            };
        }),
    };
}
export { u as route };
