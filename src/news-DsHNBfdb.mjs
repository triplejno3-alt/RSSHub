import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = {
    path: `/news`,
    categories: [`finance`],
    view: r.Articles,
    example: `/fastbull/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`fastbull.com/cn/news`, `fastbull.com/cn`] }],
    name: `News`,
    maintainers: [`nczitzk`],
    handler: d,
    url: `fastbull.com/news`,
};
async function d() {
    let r = `https://www.fastbull.com`,
        u = `${r}/cn/news`,
        d = s((await n({ method: `get`, url: u })).data),
        f = d(`.trending_type`)
            .toArray()
            .map(
                (e) => (
                    (e = d(e)),
                    { title: e.find(`.title`).text(), link: `${r}${e.attr(`href`)}`, author: e.find(`.resource`).text(), description: e.find(`.tips`).text(), pubDate: t(Number.parseInt(e.find(`.new_time`).attr(`data-date`))) }
                )
            );
    return (
        (f = await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = s((await n({ method: `get`, url: t.link })).data)(`.news-detail-content`).html();
                    return ((t.description = c(o(i, { children: [t.description ? o(i, { children: [a(`b`, { children: `摘要` }), `：`, a(`p`, { children: t.description })] }) : null, e ? l(e) : null] }))), t);
                })
            )
        )),
        { title: `财经头条、财经新闻、最新资讯 - FastBull`, link: u, item: f }
    );
}
export { u as route };
