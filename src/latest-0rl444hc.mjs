import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { r as t } from './utils-1RHCymsN.mjs';
import { load as n } from 'cheerio';
function r(e, t) {
    return e(`#${t} .list-group-item`)
        .toArray()
        .map((t) => ((t = e(t)), { title: t.find(`a`).text(), link: `https://www.xlmp4.com${t.find(`a`).attr(`href`)}` }));
}
const i = {
    path: `/latest/:type?`,
    categories: [`multimedia`],
    example: `/domp4/latest/vod`,
    parameters: { type: '`vod` 代表电影，`tv` 代表电视剧，默认 vod' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.xlmp4.com/`, `www.xlmp4.com/custom/update.html`] }],
    name: `最近更新`,
    maintainers: [`savokiss`, `pseudoyu`],
    handler: a,
    url: `www.xlmp4.com/`,
};
async function a(i) {
    let { type: a = `vod` } = i.req.param(),
        { domain: o } = i.req.query(),
        s = `${t(i, o)}/custom/update.html`;
    return { link: s, title: `domp4电影`, item: r(n(await e(s)), a) };
}
export { i as route };
