import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
const i = {
    path: `/user_stock/:id`,
    categories: [`finance`],
    example: `/xueqiu/user_stock/1247347556`,
    parameters: { id: `用户 id, 可在用户主页 URL 中找到` },
    features: { requireConfig: [{ name: `XUEQIU_COOKIES`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`xueqiu.com/u/:id`] }],
    name: `用户自选动态`,
    maintainers: [`hillerliao`],
    handler: a,
    description: `::: warning
  用户自选动态需要登录后的 Cookie 值，所以只能自建，详情见部署页面的配置模块。
:::`,
};
async function a(i) {
    let a = t.xueqiu.cookies;
    if (a === void 0) throw new r(`缺少雪球用户登录后的 Cookie 值`);
    let o = i.req.param(`id`),
        {
            data: { stocks: s },
        } = await e(`https://stock.xueqiu.com/v5/stock/portfolio/stock/list.json?category=1&size=1000&uid=${o}`, { headers: { Cookie: a, Referer: `https://xueqiu.com/u/${o}` } }),
        {
            user: { screen_name: c },
        } = await e(`https://xueqiu.com/statuses/original/show.json`, { query: { user_id: o }, headers: { Cookie: a, Referer: `https://xueqiu.com/u/${o}` } });
    return {
        title: `${c} 的雪球自选动态`,
        link: `https://xueqiu.com/u/${o}`,
        description: `@${c} 的雪球自选动态`,
        item: s.map((e) => ({
            title: `@${c} 关注了股票 ${e.name}`,
            description: `@${c} 在${n(e.created).toLocaleString()} 关注了 ${e.marketplace} ${e.name}(${e.exchange}:${e.symbol})。`,
            pubDate: n(e.created),
            link: `https://xueqiu.com/s/${e.symbol}`,
        })),
    };
}
export { i as route };
