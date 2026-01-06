import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { i as n, n as r, r as i, t as a } from './utils-QDo09Fxn.mjs';
const o = {
    path: `/user/:name`,
    categories: [`programming`],
    example: `/segmentfault/user/minnanitkong`,
    parameters: { name: `用户 Id，用户详情页 URL 可以找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`segmentfault.com/u/:name`] }],
    name: `用户`,
    maintainers: [`leyuuu`, `Fatpandac`],
    handler: s,
};
async function s(o) {
    let s = o.req.param(`name`),
        c = (await e(`${r}/gateway/homepage/${s}/timeline?size=20&offset=`)).rows,
        l = n(c),
        { author: u } = l[0],
        d = await a(l[0].link, t.tryGet),
        f = await Promise.all(l.map((e) => i(d, e, t.tryGet)));
    return { title: `segmentfault - ${u}`, link: `${r}/u/${s}`, item: f };
}
export { o as route };
