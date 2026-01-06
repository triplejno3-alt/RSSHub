import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import s from 'sanitize-html';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = {
    path: `/stock_comments/:id`,
    categories: [`finance`],
    example: `/xueqiu/stock_comments/SZ002626`,
    parameters: { id: `股票代码（需要带上交易所）` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`xueqiu.com/S/:id`] }],
    name: `股票评论`,
    maintainers: [],
    handler: d,
};
async function d(u) {
    let d = u.req.param(`id`),
        f = await n({ method: `get`, url: `https://xueqiu.com/query/v1/symbol/search/status?u=11111&count=100&comment=0&symbol=${d}&source=all&sort=time` }),
        p = await e.tryGet(
            `stock_name_${d}`,
            async () =>
                o((await n({ method: `get`, url: `https://xueqiu.com/S/${d}` })).data)(`.stock-name`)
                    .text()
                    .split(`(`)[0]
        ),
        m = f.data.list;
    return {
        title: `${d} ${p} - 评论`,
        link: `https://xueqiu.com/S/${d}`,
        description: `${p} - 评论`,
        item: m.map((e) => {
            let n = `https://xueqiu.com${e.target}`;
            e.quote_cards && (n = e.quote_cards[0].target_url);
            let o = c(
                a(r, {
                    children: [
                        i(`a`, { href: `https://xueqiu.com/u/${e.user.id}`, children: a(`div`, { style: `font-weight: bold;`, children: [e.user.screen_name, `:`] }) }),
                        i(`hr`, {}),
                        e.text ? l(e.text) : null,
                        i(`br`, {}),
                        e.retweeted_status ? a(r, { children: [i(`hr`, { style: `border:1 dashed #987cb9` }), l(e.retweeted_status.text)] }) : i(`hr`, {}),
                        a(`div`, { style: `text-align:right`, children: [`----来源于:`, e.source] }),
                    ],
                })
            );
            return { title: e.title || s(e.text, { allowedTags: [], allowedAttributes: {} }), description: o, pubDate: t(e.created_at), link: n };
        }),
    };
}
export { u as route };
