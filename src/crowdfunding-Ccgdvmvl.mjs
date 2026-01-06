import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import o from 'dayjs';
import { renderToString as s } from 'hono/jsx/dom/server';
import c from 'dayjs/plugin/localizedFormat.js';
import 'dayjs/locale/zh-cn.js';
import l from 'dayjs/plugin/timezone.js';
import u from 'dayjs/plugin/utc.js';
(o.extend(c), o.extend(l), o.extend(u));
const d = async () => (await e(`https://m.mi.com/v1/crowd/crowd_home`, { headers: { referer: `https://m.mi.com/` }, method: `POST` })).data.list,
    f = (n) =>
        t.tryGet(`mi:crowdfunding:${n.project_id}`, async () => {
            let t = await e(`https://m.mi.com/v1/crowd/crowd_detail`, { headers: { referer: `https://m.mi.com/crowdfunding/home` }, method: `POST`, query: { project_id: n.project_id } });
            return (
                t.data.crowd_funding_info.product_market_price === void 0 && (t.data.crowd_funding_info.product_market_price = n.product_market_price),
                t.data.crowd_funding_info.start_time_desc === void 0 && (t.data.crowd_funding_info.start_time_desc = h(t.data.crowd_funding_info.start_time)),
                t.data.crowd_funding_info.end_time_desc === void 0 && (t.data.crowd_funding_info.end_time_desc = h(t.data.crowd_funding_info.end_time)),
                t.data.crowd_funding_info
            );
        }),
    p = ({ item: e }) =>
        a(r, {
            children: [
                i(`img`, { src: e.big_image }),
                i(`br`, {}),
                e.project_name,
                i(`br`, {}),
                e.project_desc,
                i(`br`, {}),
                `众筹价：`,
                e.price,
                ` 元，建议零售价：`,
                e.product_market_price,
                ` 元`,
                i(`br`, {}),
                `众筹开始：`,
                e.start_time_desc,
                `，众筹结束：`,
                e.end_time_desc,
                i(`br`, {}),
                `物流：`,
                e.send_info,
                i(`br`, {}),
                i(`table`, {
                    children: a(`tbody`, {
                        children: [
                            a(`tr`, { children: [i(`th`, { children: `档位` }), i(`th`, { children: `价格` }), i(`th`, { children: `描述` })] }),
                            e.support_list.map((e, t) => a(`tr`, { children: [i(`td`, { children: e.name }), a(`td`, { children: [e.price, ` 元`] }), i(`td`, { children: e.support_desc })] }, `${e.name}-${t}`)),
                        ],
                    }),
                }),
            ],
        }),
    m = (e) => s(i(p, { item: e })),
    h = (e) => o.unix(e).tz(`Asia/Shanghai`).locale(`zh-cn`).format(`lll`);
var g = { getCrowdfundingList: d, getCrowdfundingItem: f, renderCrowdfunding: m };
const _ = {
        path: `/crowdfunding`,
        categories: [`shopping`],
        example: `/mi/crowdfunding`,
        name: `小米众筹`,
        maintainers: [`DIYgod`, `nuomi1`],
        handler: b,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`m.mi.com/crowdfunding/home`], target: `/crowdfunding` }],
        view: n.Notifications,
    },
    v = async (e) => {
        let t = e.flatMap((e) => e.items.map((e) => g.getCrowdfundingItem(e)));
        return await Promise.all(t);
    },
    y = (e) => ({ title: e.project_name, description: g.renderCrowdfunding(e), link: `https://m.mi.com/crowdfunding/proddetail/${e.project_id}`, image: e.big_image, language: `zh-cn` });
async function b() {
    return {
        title: `小米众筹`,
        link: `https://m.mi.com/crowdfunding/home`,
        item: (await v(await g.getCrowdfundingList())).map((e) => y(e)),
        allowEmpty: !0,
        image: `https://m.mi.com/static/img/icons/apple-touch-icon-152x152.png`,
        language: `zh-cn`,
    };
}
export { _ as route };
