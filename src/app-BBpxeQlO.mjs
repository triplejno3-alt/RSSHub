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
    path: `/app/:column?`,
    categories: [`traditional-media`],
    example: `/gzdaily/app/74`,
    parameters: { column: `栏目 ID，点击对应栏目后在地址栏找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `客户端`,
    maintainers: [`TimWu007`],
    handler: u,
    description: `::: tip
  在北京时间深夜可能无法获取内容。
:::

  常用栏目 ID：

| 栏目名 | ID   |
| ------ | ---- |
| 首页   | 74   |
| 时局   | 374  |
| 广州   | 371  |
| 大湾区 | 397  |
| 城区   | 2980 |`,
};
async function u(l) {
    let u = l.req.param(`column`) ?? 74,
        { data: d } = await n(`https://app.gzdaily.cn/app_if/getArticles?columnId=${u}&page=1`),
        f = d.list
            .filter((e) => e.newstype === 0)
            .map((e) => ({
                title: e.title,
                description: c(a(i, { children: e.picBig ? o(i, { children: [a(`img`, { src: e.picBig }), a(`br`, {})] }) : null })),
                pubDate: r(t(e.publishtime), 8),
                link: e.shareUrl,
                colName: e.colName,
                author: e.arthorName,
            })),
        p = ``,
        m = await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = s((await n({ method: `get`, url: t.link })).data);
                    return (
                        (p = p === `` ? t.colName : p),
                        e(`.abstract`).text() && (e(`.abstract`).find(`span`).remove(), (t.description += `<blockquote>` + e(`.abstract`).text() + `</blockquote>`)),
                        (t.description += e(`.article`).html() ?? ``),
                        t
                    );
                })
            )
        );
    return { title: `广州日报客户端 - ${p}`, link: `https://www.gzdaily.cn/amucsite/web/index.html#/home/${u}`, item: m };
}
export { l as route };
