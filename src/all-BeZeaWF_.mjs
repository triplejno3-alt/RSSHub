import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './md5-DQN6cWFb.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = {
    path: `/quotation/all`,
    categories: [`other`],
    example: `/cebbank/quotation/all`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cebbank.com/site/ygzx/whpj/index.html`, `cebbank.com/eportal/ui`, `cebbank.com/`] }],
    name: `Unknown`,
    maintainers: [`linbuxiao`],
    handler: u,
    url: `cebbank.com/site/ygzx/whpj/index.html`,
};
async function u(i) {
    let o = `https://www.cebbank.com/eportal/ui?pageId=477257`,
        l = s((await n({ method: `get`, url: o })).data),
        u = {
            title: `中国光大银行`,
            description: `中国光大银行 外汇牌价`,
            link: o,
            item: l(`.lczj_box tbody tr`)
                .toArray()
                .map((n, i) => {
                    if (i < 2) return null;
                    let o = s(n, { decodeEntities: !1 });
                    return {
                        title: o(`td:nth-child(1)`).text(),
                        description: c(a(d, { fcer: o(`td:nth-child(2)`).text(), pmc: o(`td:nth-child(3)`).text(), exrt: o(`td:nth-child(4)`).text(), mc: o(`td:nth-child(5)`).text() })),
                        pubDate: r(t(l(`#t_id span`).text().slice(5), `YYYY-MM-DD HH:mm`, !0), 8),
                        guid: e(o(`td:nth-child(1)`).text() + l(`#t_id span`).text().slice(5)),
                    };
                }),
        };
    return (i.set(`json`, { ...u, pubDate: r(t(l(`#t_id span`).text().slice(5), `YYYY-MM-DD HH:mm`, !0), 0) }), u);
}
const d = ({ fcer: e, pmc: t, exrt: n, mc: r }) => o(i, { children: [o(`p`, { children: [`购汇：`, e, `，购钞：`, t] }), o(`p`, { children: [`结汇: `, n, `，结钞：`, r] })] });
export { l as route };
