import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import i from 'node:https';
import a from 'node:crypto';
import { load as o } from 'cheerio';
const s = {
    path: `/whpj/:format?`,
    categories: [`other`],
    example: `/cib/whpj/xh?filter_title=USD`,
    parameters: { format: `输出的标题格式，默认为标题 + 所有价格。短格式仅包含货币名称。` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cib.com.cn/`], target: `/whpj` }],
    name: `外汇牌价`,
    maintainers: [`Qixingchen`],
    handler: c,
    url: `cib.com.cn/`,
    description: `| 短格式 | 现汇买卖 | 现钞买卖 | 现汇买入 | 现汇卖出 | 现钞买入 | 现钞卖出 |
| ------ | -------- | -------- | -------- | -------- | -------- | -------- |
| short  | xh       | xc       | xhmr     | xhmc     | xcmr     | xcmc     |`,
};
async function c(s) {
    let c = new i.Agent({ secureOptions: a.constants.SSL_OP_LEGACY_SERVER_CONNECT }),
        u = await r(`https://personalbank.cib.com.cn/pers/main/pubinfo/ifxQuotationQuery.do`, { agent: { https: c } }),
        d = u.headers[`set-cookie`].map((e) => e.split(`;`)[0]).join(`;`),
        f = o(u.data)(`div.main-body`).find(`div.labe_text`).text();
    ((f = f
        .split(
            `
	`
        )[1]
        .replace(`日期：`, ``)
        .trim()),
        (f = f.slice(0, 11) + f.slice(15)));
    let p = `https://personalbank.cib.com.cn/pers/main/pubinfo/ifxQuotationQuery/list?_search=false&dataSet.rows=80&dataSet.page=1&dataSet.sidx=&dataSet.sord=asc`,
        m = await t.tryGet(p, async () => (await r(p, { headers: { Cookie: d }, agent: { https: c } })).data, e.cache.contentExpire, !1),
        h = s.req.param(`format`);
    return {
        title: `中国兴业银行外汇牌价`,
        link: `https://personalbank.cib.com.cn/pers/main/pubinfo/ifxQuotationQuery.do`,
        item: m.rows.map((e) => {
            let t = `${e.cell[0]} ${e.cell[1]}`,
                r = `现汇买入价：${e.cell[3]}`,
                i = `现钞买入价：${e.cell[5]}`,
                a = `现汇卖出价：${e.cell[4]}`,
                o = `现钞卖出价：${e.cell[6]}`,
                s = `${r} ${i} ${a} ${o}`;
            return { title: l(t, r, i, a, o, s, h), pubDate: n(f, `YYYY年MM月DD日 HH:mm:ss`), description: s.replaceAll(/\s/g, `<br>`), guid: `${e.cell[0]} ${e.cell[1]} ${f}` };
        }),
    };
}
function l(e, t, n, r, i, a, o) {
    switch (o) {
        case `short`:
            return e;
        case `xh`:
            return `${e} ${t} ${r}`;
        case `xc`:
            return `${e} ${n} ${i}`;
        case `xhmr`:
            return `${e} ${t}`;
        case `xhmc`:
            return `${e} ${r}`;
        case `xcmr`:
            return `${e} ${n}`;
        case `xcmc`:
            return `${e} ${i}`;
        default:
            return `${e} ${a}`;
    }
}
export { s as route };
