import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
import l from 'crypto-js';
const u = () => l.DES.encrypt(`${Date.now().toString()}-sgn51n6r6q97o6g3`, `jzhotdata`).toString(),
    d = `https://vp.fact.qq.com`,
    f = {
        path: `/fact`,
        categories: [`other`],
        example: `/qq/fact`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`vp.fact.qq.com/home`, `vp.fact.qq.com/`] }],
        name: `最新辟谣`,
        maintainers: [`hoilc`],
        handler: p,
        url: `vp.fact.qq.com/home`,
    };
async function p() {
    let { data: r } = await n(`${d}/api/article/list`, { headers: { Referer: `${d}/home` }, searchParams: { page: 1, locale: `zh-CN`, token: u() } }),
        a = r.data.list.map((e) => ({
            title: `【${e.explain}】${e.title}`,
            description: `<img src="${e.cover}"><br>${e.abstract}`,
            pubDate: t(e.date, `YYYY-MM-DD`),
            author: `${e.Author.name} - ${e.Author.desc}`,
            category: e.tag,
            link: `${d}/article?id=${e.id}`,
        })),
        c = await Promise.all(
            a.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = o((await n(r.link)).data),
                        { initialState: a } = JSON.parse(e(`#__NEXT_DATA__`).text()).props.pageProps;
                    return ((r.description = s(i(m, { data: a }))), (r.pubDate = t(a.createdAt)), r);
                })
            )
        );
    return { title: `较真查证平台 - 腾讯新闻`, link: `${d}/home`, item: c };
}
const m = ({ data: e }) => {
    let t = e.cover?.startsWith(`//`) ? `https:${e.cover}` : e.cover?.startsWith(`http`) ? e.cover : e.cover ? `https://${e.cover}` : void 0;
    return a(r, {
        children: [
            t ? i(`img`, { src: t }) : null,
            e.rumor ? a(`div`, { class: `saying`, children: [`流传说法：`, e.rumor] }) : null,
            e.abstract ? a(r, { children: [`查证要点：`, i(`ol`, { children: e.abstract.map((e) => i(`li`, { children: e.content })) })] }) : null,
            e.content ? i(`div`, { class: `dangerouslySet`, children: c(e.content) }) : null,
        ],
    });
};
export { f as route };
