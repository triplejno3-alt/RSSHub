import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { r as n } from './utils-1RHCymsN.mjs';
import { t as r } from './detail-BIjXlaR0.mjs';
import { load as i } from 'cheerio';
function a(e) {
    return e(`#vod .list-group-item`)
        .toArray()
        .map((t) => ((t = e(t)), { title: t.find(`a`).text(), publishDate: t.find(`b`).text(), link: `https://www.xlmp4.com${t.find(`a`).attr(`href`)}` }))
        .filter((e) => !e.title.includes(`话`) && !e.title.includes(`集`) && !e.title.includes(`更新至`));
}
const o = {
    path: `/latest_movie_bt`,
    categories: [`multimedia`],
    example: `/domp4/latest_movie_bt`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !0, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.xlmp4.com/`, `www.xlmp4.com/custom/update.html`] }],
    name: `最近更新的电源BT列表`,
    maintainers: [`xianghuawe`, `pseudoyu`],
    handler: s,
    url: `www.xlmp4.com/`,
};
async function s(o) {
    let { domain: s, second: c } = o.req.query(),
        l = `${n(o, s)}/custom/update.html`,
        u = a(i(await e(l)));
    return { link: l, title: `domp4电影`, item: (await Promise.all(u.map(async (n) => await t.tryGet(n.link, async () => r(i(await e(n.link)), n.link, c))))).filter((e) => e !== void 0).flat() };
}
export { o as route };
