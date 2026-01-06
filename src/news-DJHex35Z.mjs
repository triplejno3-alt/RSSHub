import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = {
    path: `/news/:category?`,
    categories: [`game`],
    example: `/loltw/news`,
    parameters: { category: `新闻分类，置空为全部新闻` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `台服新闻`,
    maintainers: [`hoilc`],
    handler: c,
    description: `| 活动  | 资讯 | 系统   | 电竞   | 版本资讯 | 战棋资讯 |
| ----- | ---- | ------ | ------ | -------- | -------- |
| event | info | system | esport | patch    | TFTpatch |`,
};
async function c(i) {
    let o = i.req.param(`category`) ?? ``,
        s = `https://lol.garena.tw`,
        c = (await n(`${s}/api/news/search?category=${o}`)).data.data.news.map((e) => ({ guid: e.id, title: e.title, author: `Garena`, link: `${s}/news/articles/${e.id}`, pubDate: t(e.updated_at * 1e3) })),
        u = await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = await n(`${s}/api/news/detail?news_id=${t.guid}`);
                    return ((t.description = a(r(l, { img: e.data.data.news_detail.img, content: e.data.data.news_detail.content }))), t);
                })
            )
        );
    return { title: `英雄联盟 - 台服新闻`, link: o ? `${s}/news/${o}` : `${s}/news`, item: u };
}
const l = ({ img: e, content: t }) => i(`div`, { children: [e ? r(`img`, { style: `max-width: 100%`, src: e }) : null, t ? o(t) : null] });
export { s as route };
