import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { n, t as r } from './utils-C3bDp-a0.mjs';
const i = {
    path: `/manga/:order`,
    categories: [`anime`],
    example: `/skebetter/manga/1`,
    parameters: { order: `Order, see below.` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Manga`,
    maintainers: [`SnowAgar25`],
    handler: a,
    radar: [
        { title: `Manga - Latest`, source: [`skebetter.com/series`], target: `/manga/1` },
        { title: `Manga - Hot`, source: [`skebetter.com/series`], target: `/manga/2` },
    ],
    description: `
| 新着 (Latest) | 人気 (Hot) |
| ---- | ---- |
| 1    | 2    |`,
};
async function a(i) {
    let a = i.req.param(`order`) ?? `1`,
        o = { 1: `新着`, 2: `人気` },
        s = `https://api.twieromanga.com/api/mangaseries?order=${a}`,
        c = await t.tryGet(s, async () => n(await r(s, !0), `manga`), e.cache.routeExpire, !1);
    return { title: `Skebetter Manga - ${o[a]}`, link: `https://skebetter.com/series?order=${a}`, item: c };
}
export { i as route };
