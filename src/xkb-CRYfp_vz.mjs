import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = {
    path: `/:channel`,
    categories: [`traditional-media`],
    example: `/xkb/350`,
    parameters: { channel: `栏目 ID，点击对应栏目后在地址栏找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `新闻`,
    maintainers: [`TimWu007`],
    handler: l,
    description: `常用栏目 ID：

| 栏目名 | ID  |
| ------ | --- |
| 首页   | 350 |
| 重点   | 359 |
| 广州   | 353 |
| 湾区   | 360 |
| 天下   | 355 |`,
};
async function l(c) {
    let l = c.req.param(`channel`) ?? 350,
        { data: u } = await n({ method: `get`, url: `https://www.xkb.com.cn/xkbapp/fundapi/article/api/articles?chnlId=${l}&visibility=1&page=0&size=20&keyword=`, headers: { siteId: 35 } }),
        d = u.data
            .filter((e) => e.contentUrl)
            .map((e) => ({
                title: e.listTitle,
                description: s(a(i, { children: e.shareImg ? o(i, { children: [a(`img`, { src: e.shareImg }), a(`br`, {})] }) : null })),
                pubDate: r(t(e.operTime), 8),
                link: `https://www.xkb.com.cn/detail?id=` + e.id,
                contentUrl: e.contentUrl,
                author: e.metaInfo.author,
                chnlName: e.metaInfo.chnlName,
            })),
        f = ``,
        p = await Promise.all(
            d.map((t) =>
                e.tryGet(t.contentUrl, async () => {
                    let e = await n({ method: `get`, url: t.contentUrl });
                    return ((t.description += e.data.htmlContent ?? ``), (f = f === `` ? t.chnlName : f), t);
                })
            )
        );
    return { title: `新快报新快网 - ${f}`, link: `https://www.xkb.com.cn/home?id=${l}`, item: p };
}
export { c as route };
