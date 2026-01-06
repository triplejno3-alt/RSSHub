import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { d as e, f as t, i as n, l as r, r as i, s as a, t as o, u as s } from './service-8NkLHBf0.mjs';
const c = {
    path: `/search/:type/:keyword?`,
    categories: [`shopping`],
    example: `/showstart/search/live`,
    parameters: {
        keyword: `搜索关键词`,
        type: {
            description: `类别`,
            options: [
                { value: `event`, label: `演出` },
                { value: `artist`, label: `音乐人` },
                { value: `site`, label: `场地` },
                { value: `brand`, label: `厂牌` },
                { value: `city`, label: `城市` },
                { value: `style`, label: `风格` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `演出搜索`,
    maintainers: [`lchtao26`],
    handler: l,
};
async function l(c) {
    let l = c.req.param(`type`) || ``,
        u = c.req.param(`keyword`) || ``;
    switch (l) {
        case `event`:
            return { title: `${t} - 搜演出 - ${u || `全部`}`, link: e, item: await o({ keyword: u }) };
        case `artist`:
            return { title: `${t} - 搜艺人 - ${u || `全部`}`, link: e, item: await a({ searchKeyword: u }) };
        case `site`:
            return { title: `${t} - 搜场地 - ${u || `全部`}`, link: e, item: await r({ searchKeyword: u }) };
        case `brand`:
            return { title: `${t} - 搜厂牌 - ${u || `全部`}`, link: e, item: await i({ searchKeyword: u }) };
        case `city`:
            return { title: `${t} - 搜城市 - ${u || `全部`}`, link: e, item: await n(u) };
        case `style`:
            return { title: `${t} - 搜风格 - ${u || `全部`}`, link: e, item: await s(u) };
        default:
            return { title: `${t} - 搜演出 - ${l || `全部`}`, link: e, allowEmpty: !0, item: await o({ keyword: l }) };
    }
}
export { c as route };
