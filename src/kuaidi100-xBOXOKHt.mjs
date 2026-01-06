import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './utils-CmZ3_Tvt.mjs';
const t = {
    path: `/track/:number/:id/:phone?`,
    categories: [`other`],
    example: `/kuaidi100/track/shunfeng/SF1007896781640/0383`,
    parameters: { number: `快递公司代号`, id: `订单号`, phone: `手机号后四位（仅顺丰）` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `快递订单追踪`,
    maintainers: [`NeverBehave`],
    handler: n,
    description: `快递公司代号如果不能确定，可通过下方快递列表获得。

::: warning
  1.  构造链接前请确认所有参数正确：错误\`快递公司 - 订单号\`组合将会缓存信息一小段时间防止产生无用查询
  2.  正常查询的订单在未签收状态下不会被缓存：请控制查询频率
  3.  订单完成后请尽快取消订阅，避免资源浪费
:::`,
};
async function n(t) {
    let { number: n, id: r, phone: i } = t.req.param(),
        { status: a, message: o, company: s } = await e.checkCode(n, r, i),
        c,
        l,
        u = new Date().toString();
    if (a) ((l = await e.getQuery(n, r, i)), (c = l.status === `200` ? l.data : [{ context: l.message, time: u }]));
    else throw Error(`[本地]信息有误，请检查后重试：${o}`);
    return {
        title: `快递 ${s.name}-${r}`,
        link: `https://www.kuaidi100.com`,
        description: `快递 ${s.name}-${r}`,
        item: c.map((e) => ({ title: e.context, description: e.context, guid: new Date(e.time || e.ftime).toUTCString(), pubDate: new Date(e.time || e.ftime).toUTCString(), link: `https://www.kuaidi100.com` })),
    };
}
export { t as route };
