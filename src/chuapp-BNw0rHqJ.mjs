import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
        path: `/:category?`,
        categories: [`game`],
        example: `/chuapp/daily`,
        parameters: { category: `栏目分类，见下表` },
        description: '\n  | `category` | 栏目分类 |\n  | ------------ | ------- |\n  | `daily`    | 每日聚焦 |\n  | `pcz`      | 最好玩   |\n  | `night`    | 触乐夜话 |\n  | `news`     | 动态资讯 |\n    ',
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `分类`,
        maintainers: [`dousha`],
        radar: [
            { source: [`chuapp.com/category/:category`], target: `/:category` },
            { source: [`chuapp.com/tag/index/id/20369.html`], target: `/night` },
        ],
        handler: l,
    },
    a = `https://www.chuapp.com`,
    o = {
        daily: { title: `每日聚焦`, suffix: `/category/daily` },
        pcz: { title: `最好玩`, suffix: `/category/pcz` },
        night: { title: `触乐夜话`, suffix: `/tag/index/id/20369.html` },
        news: { title: `动态资讯`, suffix: `/category/zsyx` },
        zsyx: { title: `动态资讯`, suffix: `/category/zsyx` },
    };
function s(e) {
    return `title` in e && `link` in e && e.title !== null && e.link !== null;
}
function c(e) {
    return e ? Number(e) * 1e3 : 0;
}
async function l(i) {
    let { category: l = `night` } = i.req.param(),
        u = o[l];
    if (!u) return null;
    let d = `${a}${u.suffix}`,
        f = r(await e(d)),
        p = f(`a.fn-clear`)
            .toArray()
            .map((e) => ({ title: f(e).attr(`title`), link: f(e).attr(`href`) }))
            .filter((e) => s(e))
            .map((e) => (e.link.startsWith(`/`) ? e : { title: e.title, link: `/${e.link}` }))
            .map((i) => {
                let o = `${a}${i.link}`;
                return t.tryGet(o, async () => {
                    let t = r(await e(o));
                    return { title: i.title, link: i.link, description: t(`.content .the-content`).html() || ``, pubDate: n(c(t(`.friendly_time`).attr(`data-time`))), author: t(`.author-time .fn-left`).text() || `` };
                });
            }),
        m = await Promise.all(p);
    return { title: `触乐 - ${u.title}`, link: d, item: m };
}
export { i as route };
