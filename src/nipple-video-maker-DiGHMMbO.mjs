import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './rss-parser-CKuAfhVS.mjs';
import { i as t } from './utils-C9EYn6aX.mjs';
const n = {
    path: `/nipple-video-maker/:keyword`,
    categories: [`multimedia`],
    example: `/chikubi/nipple-video-maker/nipple-video-maker-nh`,
    parameters: { keyword: `Keyword` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `AVメーカー`,
    maintainers: [`SnowAgar25`],
    handler: r,
    radar: [{ title: `AVメーカー`, source: [`chikubi.jp/nipple-video-maker/:keyword`], target: `/nipple-video-maker/:keyword` }],
};
async function r(n) {
    let { keyword: r } = n.req.param(),
        i = `https://chikubi.jp`,
        a = `/nipple-video-maker/${encodeURIComponent(r)}`,
        o = await e.parseURL(`${i}${a}/feed`),
        s = await t(o.items.map((e) => ({ title: e.title, link: e.link })));
    return { title: `AVメーカー: ${o.title?.split(`-`)[0]} - chikubi.jp`, link: `${i}${a}`, item: s };
}
export { n as route };
