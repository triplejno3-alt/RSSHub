import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = {
    path: `/inquire`,
    categories: [`finance`],
    example: `/sse/inquire`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.sse.com.cn/disclosure/credibility/supervision/inquiries`, `www.sse.com.cn/`] }],
    name: `监管问询`,
    maintainers: [`Jeason0228`],
    handler: o,
    url: `www.sse.com.cn/disclosure/credibility/supervision/inquiries`,
};
async function o() {
    let r = `https://www.sse.com.cn/disclosure/credibility/supervision/inquiries/`;
    return {
        title: `上海证券交易所 - 科创板股票审核`,
        link: r,
        item: (
            await t(`https://query.sse.com.cn/commonSoaQuery.do`, {
                searchParams: {
                    isPagination: !0,
                    'pageHelp.pageSize': 25,
                    'pageHelp.pageNo': 1,
                    'pageHelp.beginPage': 1,
                    'pageHelp.cacheSize': 1,
                    'pageHelp.endPage': 1,
                    sqlId: `BS_KCB_GGLL`,
                    siteId: 28,
                    channelId: `10743,10744,10012`,
                    type: ``,
                    stockcode: ``,
                    extWTFL: ``,
                    order: `createTime|desc,stockcode|asc`,
                    _: Date.now(),
                },
                headers: { Referer: r },
            })
        ).data.result.map((t) => ({ title: t.extGSJC, description: i(n(s, { item: t })), pubDate: e(t.createTime), link: `https://${t.docURL}`, author: t.extGSJC })),
    };
}
const s = ({ item: e }) =>
    r(`table`, {
        border: `1`,
        children: [
            r(`tr`, { children: [n(`td`, { children: ` 公司代码 : ` }), n(`td`, { children: e.stockcode })] }),
            r(`tr`, { children: [n(`td`, { children: ` 公司简称 : ` }), n(`td`, { children: e.extGSJC })] }),
            r(`tr`, { children: [n(`td`, { children: ` 发函日期 : ` }), n(`td`, { children: e.createTime })] }),
            r(`tr`, { children: [n(`td`, { children: ` 监管问询类型 : ` }), n(`td`, { children: e.extWTFL })] }),
            r(`tr`, { children: [n(`td`, { children: ` 标题 : ` }), n(`td`, { children: n(`a`, { href: `https://${e.docURL}`, children: e.docTitle }) })] }),
        ],
    });
export { a as route };
