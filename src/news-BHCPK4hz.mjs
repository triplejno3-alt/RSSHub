import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
import a from 'iconv-lite';
async function o(e) {
    let a = (await n.get(e)).data,
        o = i(a),
        s = r(
            t(
                o(`.article`)
                    .text()
                    .match(/\d{4}(?:\/\d{2}){2}/)
            ),
            8
        );
    return { description: o(`.article_con`).html(), pubDate: s, title: o(`h2`).text() };
}
var s = {
    ProcessFeed: (e, t, n) =>
        Promise.all(
            t.map((t) => {
                let r = i(t)(`a`),
                    a = new URL(r.attr(`href`), e).href;
                return n.tryGet(a, async () => {
                    let { description: e, pubDate: t, title: n } = await o(a);
                    return { title: r.text().includes(`...`) ? n : r.text(), link: a, author: `绿色新闻网`, description: e, pubDate: t };
                });
            })
        ),
};
const c = {
    path: `/news/:type`,
    categories: [`university`],
    example: `/bjfu/news/lsyw`,
    parameters: { type: `新闻栏目` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`news.bjfu.edu.cn/:type/index.html`] }],
    name: `绿色新闻网`,
    maintainers: [`markmingjie`],
    handler: l,
    description: `| 绿色要闻 | 校园动态 | 教学科研 | 党建思政 | 一周排行 |
| -------- | -------- | -------- | -------- | -------- |
| lsyw     | xydt     | jxky     | djsz     | yzph     |`,
};
async function l(t) {
    let r = t.req.param(`type`),
        o,
        c;
    switch (r) {
        case `xydt`:
            ((o = `校园动态`), (c = `lsxy/`));
            break;
        case `jxky`:
            ((o = `教学科研`), (c = `jxky/`));
            break;
        case `djsz`:
            ((o = `党建思政`), (c = `djsz/`));
            break;
        case `yzph`:
            ((o = `一周排行`), (c = `yzph/`));
            break;
        case `lsyw`:
        default:
            ((o = `绿色要闻`), (c = `lsyw/`));
    }
    let l = `http://news.bjfu.edu.cn/` + c,
        u = (await n({ method: `get`, responseType: `buffer`, url: l })).data,
        d = i(a.decode(u, `utf-8`)),
        f = d(`meta[http-equiv="Content-Type"]`)
            .attr(`content`)
            .match(/charset=(.*)/)?.[1];
    f?.toLowerCase() !== `utf-8` && (d = i(a.decode(u, f ?? `utf-8`)));
    let p = d(`.news_ul li`).slice(0, 12).toArray(),
        m = await s.ProcessFeed(l, p, e);
    return { title: `北林新闻- ` + o, link: `http://news.bjfu.edu.cn/` + c, description: `绿色新闻网 - ` + o, item: m };
}
export { c as route };
