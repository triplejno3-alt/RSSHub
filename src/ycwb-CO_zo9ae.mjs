import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = {
    path: `/:node`,
    categories: [`traditional-media`],
    example: `/ycwb/1`,
    parameters: { node: `栏目 id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `新闻`,
    maintainers: [`TimWu007`],
    handler: u,
    description: `注：小部分栏目的 URL 会给出 nodeid。如未给出，可打开某条新闻链接后，查看网页源代码，搜索 nodeid 的值。

  常用栏目节点：

| 首页 | 中国 | 国际 | 体育 | 要闻 | 珠江评论 | 民生观察 | 房产 | 金羊教育 | 金羊财富 | 金羊文化 | 金羊健康 | 金羊汽车 |
| ---- | ---- | ---- | ---- | ---- | -------- | -------- | ---- | -------- | -------- | -------- | -------- | -------- |
| 1    | 14   | 15   | 16   | 22   | 1875     | 21773    | 222  | 5725     | 633      | 5281     | 21692    | 223      |

| 广州 | 广州 - 广州要闻 | 广州 - 社会百态 | 广州 - 深读广州 | 广州 - 生活服务 | 今日大湾区 | 广东 - 政经热闻 | 广东 - 民生视点 | 广东 - 滚动新闻 |
| ---- | --------------- | --------------- | --------------- | --------------- | ---------- | --------------- | --------------- | --------------- |
| 18   | 5261            | 6030            | 13352           | 83422           | 100418     | 13074           | 12252           | 12212           |`,
};
async function u(l) {
    let { data: u } = await n(`https://6api.ycwb.com/app_if/jy/getArticles?nodeid=${l.req.param(`node`) ?? 1}&pagesize=15`),
        d = u.artiles.map((e) => ({
            title: e.TITLE,
            description: c(
                o(i, {
                    children: [
                        e.PICLINKS ? o(i, { children: [a(`img`, { src: e.PICLINKS }), a(`br`, {})] }) : null,
                        e.ABSTRACT ? o(i, { children: [a(`blockquote`, { children: a(`p`, { children: e.ABSTRACT }) }), a(`br`, {})] }) : null,
                    ],
                })
            ),
            pubDate: r(t(e.PUBTIME), 8),
            link: e.PUBURL,
            nodeName: e.NODENAME,
        })),
        f = ``,
        p = ``,
        m = await Promise.all(
            d.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = s((await n({ method: `get`, url: t.link })).data);
                    (e(`.main_article`)
                        .contents()
                        .filter(function () {
                            return this.nodeType === 8;
                        })
                        .each(function () {
                            (/audioPlayer|audio-box/.test(this.data) && (this.data = ``), /author/.test(this.data) && (t.author = this.data.split(`<author>`)[1].split(`</author>`)[0]));
                        }),
                        (f = f === `` ? t.nodeName : f));
                    let r = e(`.path`).children(`a`);
                    for (let t of r) e(t).text() === f && p === `` && (p = e(t).attr(`href`));
                    return (
                        e(`span`).removeAttr(`style`).removeAttr(`class`),
                        e(`img`).removeAttr(`style`).removeAttr(`class`).removeAttr(`placement`).removeAttr(`data-toggle`).removeAttr(`trigger`).removeAttr(`referrerpolicy`),
                        e(`br`).removeAttr(`style`).removeAttr(`class`),
                        e(`p`).removeAttr(`style`).removeAttr(`class`),
                        e(`.space10, .ddf`).remove(),
                        (t.description += e(`.main_article`).html() ?? ``),
                        t
                    );
                })
            )
        );
    return { title: `羊城晚报金羊网 - ${f}`, link: String(p === `` ? `https://www.ycwb.com/` : p), item: m };
}
export { l as route };
