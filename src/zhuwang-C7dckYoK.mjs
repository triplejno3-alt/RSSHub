import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/zhujia`,
    categories: [`shopping`],
    example: `/zhuwang/zhujia`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`zhujia.zhuwang.cc/`] }],
    name: `全国今日生猪价格`,
    maintainers: [],
    handler: n,
    url: `zhujia.zhuwang.cc/`,
};
async function n() {
    let t = `https://zhujia.zhuwang.com.cn/`,
        n = new Date(),
        r = `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()}`,
        i = await e(`${t}/api/chartData`, { searchParams: { areaId: -1 } });
    return {
        title: `全国今日生猪价格`,
        desription: `中国养猪网猪价频道是中国猪价权威平台,提供每日猪评,猪价和行情分析,并且预测猪价和分析每天的猪价排行。`,
        link: t,
        item: Object.entries({ pigprice: `生猪(外三元)`, pig_in: `生猪(内三元)`, pig_local: `生猪(土杂猪)` }).map(([e, t], n) => {
            let a = i.data[e],
                o = a.at(-1),
                s = a.at(-2),
                c = (o - s).toFixed(2),
                l = `较昨日价格, 每公斤上涨${c}元`;
            return (
                s > o && (l = `较昨日价格, 下跌${-c}元`),
                s === o && (l = `较昨日价格持平`),
                { title: `${r} ${t} ${o}元/公斤. ${l}`, description: l, link: `https://xt.yangzhu.vip/manage/datamap/ptype/${n + 1}/areano/-1.html`, guid: `${r} ${t}` }
            );
        }),
    };
}
export { t as route };
