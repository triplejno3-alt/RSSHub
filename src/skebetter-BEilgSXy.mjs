import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { n, t as r } from './utils-C3bDp-a0.mjs';
const i = {
    path: `/:type`,
    categories: [`anime`],
    example: `/skebetter/hot`,
    parameters: { type: `Type, see below` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Hot`,
    maintainers: [`SnowAgar25`],
    handler: a,
    radar: [
        { title: `Skebetter - Hot`, source: [`skebetter.com`], target: `/hot` },
        { title: `Skebetter - Week`, source: [`skebetter.com`], target: `/week` },
        { title: `Skebetter - Month`, source: [`skebetter.com`], target: `/month` },
        { title: `Skebetter - Latest`, source: [`skebetter.com`], target: `/latest` },
    ],
    description: `
| 急上昇 | 週間 | 月間 | 新着 |
| ----- | ---- | ---- | ---- |
| hot | week | month| latest |`,
};
async function a(i) {
    let a = i.req.param(`type`),
        o = { hot: `急上昇`, week: `週間`, month: `月間`, latest: `新着` },
        s = { hot: ``, week: `?term=week`, month: `?term=month`, latest: `?term=latest` },
        c = `https://api.twieromanga.com/api/hotv2?type=${a}`,
        l = await t.tryGet(c, async () => n(await r(c), `index`), e.cache.routeExpire, !1);
    return { title: `Skebetter - ${o[a]}`, link: `https://skebetter.com/${s[a]}`, item: l };
}
export { i as route };
