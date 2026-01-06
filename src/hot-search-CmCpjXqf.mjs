import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { r as t } from './utils-Bu8-ZFdB.mjs';
import { t as n } from './cache-BV7o58Cb.mjs';
const r = {
    path: `/hot-search`,
    categories: [`social-media`],
    example: `/bilibili/hot-search`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.bilibili.com/`, `m.bilibili.com/`] }],
    name: `热搜`,
    maintainers: [`CaoMeiYouRen`],
    handler: i,
    url: `www.bilibili.com/`,
};
async function i() {
    let r = await n.getWbiVerifyString(),
        i = `https://api.bilibili.com/x/web-interface/wbi/search/square?${t.addWbiVerifyInfo(`limit=10&platform=web`, r)}`,
        a = (await e({ method: `get`, url: i, headers: { Referer: `https://api.bilibili.com` } }))?.data?.data?.trending;
    return {
        title: a?.title,
        link: i,
        description: `bilibili热搜`,
        item: (a?.list || []).map((e) => ({
            title: e.keyword,
            description: `${e.keyword}<br>${e.icon ? `<img src="${e.icon}">` : ``}`,
            link: e.link || e.goto || `https://search.bilibili.com/all?${new URLSearchParams({ keyword: e.keyword })}&from_source=webtop_search`,
        })),
    };
}
export { r as route };
