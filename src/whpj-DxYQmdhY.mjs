import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/whpj/:format?`,
    categories: [`other`],
    example: `/boc/whpj/zs?filter_title=%E8%8B%B1%E9%95%91`,
    parameters: { format: `输出的标题格式，默认为标题 + 所有价格。短格式仅包含货币名称。` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`boc.cn/sourcedb/whpj`, `boc.cn/`], target: `/whpj` }],
    name: `外汇牌价`,
    maintainers: [`LogicJake`, `HenryQW`],
    handler: r,
    url: `boc.cn/sourcedb/whpj`,
    description: `| 短格式 | 中行折算价 | 现汇买卖 | 现钞买卖 | 现汇买入 | 现汇卖出 | 现钞买入 | 现钞卖出 |
| ------ | ---------- | -------- | -------- | -------- | -------- | -------- | -------- |
| short  | zs         | xh       | xc       | xhmr     | xhmc     | xcmr     | xcmc     |`,
};
async function r(n) {
    let r = `https://www.boc.cn/sourcedb/whpj/`,
        i = t((await e(r)).data),
        a = n.req.param(`format`),
        o = {
            阿联酋迪拉姆: `AED`,
            澳大利亚元: `AUD`,
            巴西里亚尔: `BRL`,
            加拿大元: `CAD`,
            瑞士法郎: `CHF`,
            丹麦克朗: `DKK`,
            欧元: `EUR`,
            英镑: `GBP`,
            港币: `HKD`,
            印尼卢比: `IDR`,
            印度卢比: `INR`,
            日元: `JPY`,
            韩国元: `KRW`,
            澳门元: `MOP`,
            林吉特: `MYR`,
            挪威克朗: `NOK`,
            新西兰元: `NZD`,
            菲律宾比索: `PHP`,
            卢布: `RUB`,
            沙特里亚尔: `SAR`,
            瑞典克朗: `SEK`,
            新加坡元: `SGD`,
            泰国铢: `THB`,
            土耳其里拉: `TRY`,
            新台币: `TWD`,
            美元: `USD`,
            南非兰特: `ZAR`,
        };
    return {
        title: `中国银行外汇牌价`,
        link: r,
        item: i(`div.publish table tbody tr`)
            .slice(2)
            .toArray()
            .map((e) => {
                e = i(e);
                let t = e.find(`td:nth-child(1)`).text(),
                    n = `${t} ${o[t] || ``}`,
                    r = e.find(`td:nth-child(7)`).text(),
                    s = `现汇买入价：${e.find(`td:nth-child(2)`).text()}`,
                    c = `现钞买入价：${e.find(`td:nth-child(3)`).text()}`,
                    l = `现汇卖出价：${e.find(`td:nth-child(4)`).text()}`,
                    u = `现钞卖出价：${e.find(`td:nth-child(5)`).text()}`,
                    d = `中行折算价：${e.find(`td:nth-child(6)`).text()}`,
                    f = `${s} ${c} ${l} ${u} ${d}`;
                return {
                    title: (() => {
                        switch (a) {
                            case `short`:
                                return n;
                            case `xh`:
                                return `${n} ${s} ${l}`;
                            case `xc`:
                                return `${n} ${c} ${u}`;
                            case `zs`:
                                return `${n} ${d}`;
                            case `xhmr`:
                                return `${n} ${s}`;
                            case `xhmc`:
                                return `${n} ${l}`;
                            case `xcmr`:
                                return `${n} ${c}`;
                            case `xcmc`:
                                return `${n} ${u}`;
                            default:
                                return `${n} ${f}`;
                        }
                    })(),
                    description: f.replaceAll(/\s/g, `<br>`),
                    pubDate: new Date(r).toUTCString(),
                    guid: `${n} ${f}`,
                };
            }),
    };
}
export { n as route };
