import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const { TYPE: o } = {
        TYPE: {
            usd: { name: `美元(USD)`, id: 14 },
            gbp: { name: `英镑(GBP)`, id: 12 },
            hkd: { name: `港币(HKD)`, id: 13 },
            chf: { name: `瑞士法郎(CHF)`, id: 15 },
            sek: { name: `瑞典克郎(SEK)`, id: 21 },
            dkk: { name: `丹麦克郎(DKK)`, id: 22 },
            nok: { name: `挪威克郎(NOK)`, id: 23 },
            jpy: { name: `日元(JPY)`, id: 27 },
            cad: { name: `加拿大元(CAD)`, id: 28 },
            aud: { name: `澳大利亚元(AUD)`, id: 29 },
            sgd: { name: `新加坡元(SGD)`, id: 32 },
            eur: { name: `欧元(EUR)`, id: 38 },
            mop: { name: `澳门元(MOP)`, id: 81 },
            thb: { name: `泰国铢(THB)`, id: 84 },
            nzd: { name: `新西兰元(NZD)`, id: 87 },
            krw: { name: `韩圆(KRW)`, id: 88 },
        },
    },
    s = {
        path: `/quotation/history/:type`,
        categories: [`other`],
        example: `/cebbank/quotation/history/usd`,
        parameters: { type: `货币的缩写，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `外汇牌价`,
        maintainers: [`linbuxiao`],
        handler: c,
        description: `#### 总览 {#zhong-guo-guang-da-yin-hang-wai-hui-pai-jia-zong-lan}


#### 历史牌价 {#zhong-guo-guang-da-yin-hang-wai-hui-pai-jia-li-shi-pai-jia}

| 美元 | 英镑 | 港币 | 瑞士法郎 | 瑞典克郎 | 丹麦克郎 | 挪威克郎 | 日元 | 加拿大元 | 澳大利亚元 | 新加坡元 | 欧元 | 澳门元 | 泰国铢 | 新西兰元 | 韩圆 |
| ---- | ---- | ---- | -------- | -------- | -------- | -------- | ---- | -------- | ---------- | -------- | ---- | ------ | ------ | -------- | ---- |
| usd  | gbp  | hkd  | chf      | sek      | dkk      | nok      | jpy  | cad      | aud        | sgd      | eur  | mop    | thb    | nzd      | krw  |`,
    };
async function c(t) {
    let r = t.req.param(`type`),
        s = i((await e({ method: `get`, url: `https://www.cebbank.com/eportal/ui?struts.portlet.action=/portlet/whpjFront!toView.action&moduleId=12094&pageId=477260&currcode=${o[r].id}&currentPagebak=1&currentPage=1` })).data)(
            `.lczj_box tbody tr`
        )
            .toArray()
            .map((e, t) => {
                if (t < 2) return null;
                let r = i(e, { decodeEntities: !1 });
                return {
                    title: r(`td:nth-child(1)`).text(),
                    description: a(n(l, { fcer: r(`td:nth-child(2)`).text(), pmc: r(`td:nth-child(3)`).text(), exrt: r(`td:nth-child(4)`).text(), mc: r(`td:nth-child(5)`).text(), time: r(`td:nth-child(6)`).text() })),
                };
            });
    s.pop();
    let c = { title: `中国光大银行`, description: `中国光大银行 外汇牌价 ${o[r].name}`, link: `https://www.cebbank.com/site/ygzx/whpj/rmbwhpjlspj/index.html?currcode=${o[r].id}`, item: s };
    return (t.set(`json`, c), c);
}
const l = ({ time: e, fcer: n, pmc: i, exrt: a, mc: o }) => r(t, { children: [r(`p`, { children: [`更新时间: `, e] }), r(`p`, { children: [`购汇：`, n, `，购钞：`, i] }), r(`p`, { children: [`结汇: `, a, `，结钞：`, o] })] });
export { s as route };
