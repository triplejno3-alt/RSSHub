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
function u(e) {
    let t = ``;
    switch (String(e)) {
        case `0`:
            t = `调高`;
            break;
        case `1`:
            t = `调低`;
            break;
        case `2`:
            t = `首次`;
            break;
        case `3`:
            t = `维持`;
            break;
        case `4`:
            t = `无`;
            break;
        default:
            t = `-`;
            break;
    }
    return t;
}
function d(e, t) {
    let n = ``;
    return (e !== void 0 && (n = e === `` ? `` : Number(e).toFixed(t)), n);
}
const f = {
    path: `/report/:category`,
    categories: [`finance`],
    view: r.Articles,
    example: `/eastmoney/report/strategyreport`,
    parameters: {
        category: {
            description: `研报类型`,
            options: [
                { value: `strategyreport`, label: `策略报告` },
                { value: `macresearch`, label: `宏观研究` },
                { value: `brokerreport`, label: `券商晨报` },
                { value: `industry`, label: `行业研报` },
                { value: `stock`, label: `个股研报` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`data.eastmoney.com/report/:category`] }],
    name: `研究报告`,
    maintainers: [`syzq`],
    handler: p,
    description: `| 策略报告       | 宏观研究    | 券商晨报     | 行业研究 | 个股研报 |
| -------------- | ----------- | ------------ | -------- | -------- |
| strategyreport | macresearch | brokerreport | industry | stock    |`,
};
async function p(r) {
    let f = `https://data.eastmoney.com`,
        { category: p = `strategyreport` } = r.req.param(),
        m = { brokerreport: `券商晨报`, industry: `行业研报`, macresearch: `宏观研究`, strategyreport: `策略报告`, stock: `个股研报` },
        h = { brokerreport: `zw_brokerreport`, industry: `zw_industry`, macresearch: `zw_macresearch`, strategyreport: `zw_strategy`, stock: `info` },
        g = s((await n(`${f}/report/${p}`)).data),
        _ = JSON.parse(
            g(`script`)
                .text()
                .match(/var initdata(.=?)(.*?);/)[2]
        ).data.map((e) => {
            let n = p === `stock` ? `[${e.stockName}]` : ``;
            return {
                title: `[${e.orgSName}]${n}${e.title}`,
                link: `${f}/report/${h[p]}` + (p === `stock` ? `/${e.infoCode}.html` : `.jshtml?encodeUrl=${e.encodeUrl}`),
                pubDate: t(e.publishDate),
                author: e.researcher,
                originItem: e,
            };
        }),
        v = await Promise.all(
            _.map((t) => {
                let r = t.originItem;
                return (
                    delete t.originItem,
                    e.tryGet(t.link, async () => {
                        try {
                            let { data: e } = await n(t.link),
                                f = s(e);
                            if (p === `stock`) {
                                let { title: e, stockName: n, stockCode: s, emRatingName: p, ratingChange: m, indvInduName: h } = r,
                                    g = u(m),
                                    _ = new Date().getFullYear(),
                                    v = _ + 1,
                                    y = f(`.newsContent`).html(),
                                    b = f(`#ContentBody .rightlab`).attr(`href`),
                                    x = d(r.predictThisYearEps, 3),
                                    S = d(r.predictThisYearPe, 2),
                                    C = d(r.predictNextYearEps, 3),
                                    w = d(r.predictNextYearPe, 2);
                                ((t.enclosure_url = b),
                                    (t.description = c(
                                        o(i, {
                                            children: [
                                                a(`table`, {
                                                    children: o(`tbody`, {
                                                        children: [
                                                            o(`tr`, {
                                                                children: [
                                                                    a(`th`, { rowspan: `2`, children: `股票代码` }),
                                                                    a(`th`, { rowspan: `2`, children: `股票简称` }),
                                                                    a(`th`, { rowspan: `2`, children: `报告名称` }),
                                                                    a(`th`, { rowspan: `2`, children: `东财评级` }),
                                                                    a(`th`, { rowspan: `2`, children: `评级变动` }),
                                                                    o(`th`, { colspan: `2`, children: [_, `盈利预测`] }),
                                                                    o(`th`, { colspan: `2`, children: [v, `盈利预测`] }),
                                                                    a(`th`, { rowspan: `2`, children: `行业` }),
                                                                ],
                                                            }),
                                                            o(`tr`, { children: [a(`th`, { children: `收益` }), a(`th`, { children: `市盈率` }), a(`th`, { children: `收益` }), a(`th`, { children: `市盈率` })] }),
                                                            o(`tr`, {
                                                                children: [
                                                                    a(`td`, { children: s }),
                                                                    a(`td`, { children: n }),
                                                                    a(`td`, { children: a(`a`, { href: b, children: e }) }),
                                                                    a(`td`, { children: p }),
                                                                    a(`td`, { children: g }),
                                                                    a(`td`, { children: x }),
                                                                    a(`td`, { children: S }),
                                                                    a(`td`, { children: C }),
                                                                    a(`td`, { children: w }),
                                                                    a(`td`, { children: h }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                a(`div`, { children: y ? l(y) : null }),
                                            ],
                                        })
                                    )));
                            } else ((t.link = f(`.pdf-link`).attr(`href`)), (t.description = f(`.ctx-content`).text()));
                            return t;
                        } catch {
                            return t;
                        }
                    })
                );
            })
        );
    return { title: `东方财富网-${m[p]}`, link: f, item: v };
}
export { f as route };
