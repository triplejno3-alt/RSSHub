import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './config-not-found-DGyG6Tbz.mjs';
import './description-ysUMLo8r.mjs';
import { t as r } from './cache-Cs0MoOSc.mjs';
import { t as i } from './utils-DTPoD2K3.mjs';
const a = {
    path: `/bbs/timeline`,
    categories: [`game`],
    example: `/mihoyo/bbs/timeline`,
    parameters: {},
    features: { requireConfig: [{ name: `MIHOYO_COOKIE`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`miyoushe.com/:game/timeline`] }],
    name: `米游社 - 用户关注动态`,
    maintainers: [`CaoMeiYouRen`],
    handler: o,
    description: `::: warning
  用户关注动态需要米游社登录后的 Cookie 值，所以只能自建，详情见部署页面的配置模块。
:::`,
};
async function o(a) {
    if (!e.mihoyo.cookie) throw new n(`Miyoushe Timeline is not available due to the absense of [Miyoushe Cookie]. Check <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config tutorial</a>`);
    let o = { gids: 2, page_size: a.req.query(`limit`) || `20` },
        s = `https://www.miyoushe.com/ys/timeline`,
        c = (await t({ method: `get`, url: `https://bbs-api.miyoushe.com/painter/wapi/timeline/list`, searchParams: o, headers: { Referer: s, Cookie: e.mihoyo.cookie } }))?.data?.data?.list;
    if (!c) throw Error(`未获取到数据！`);
    let { nickname: l } = await r.getUserFullInfo(a, ``);
    return { title: `米游社 - ${l} 的关注动态`, link: s, item: c.map((e) => i(e)) };
}
export { a as route };
