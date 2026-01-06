import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r, t as i } from './utils-BETPJRxL.mjs';
const a = { daily: `日榜`, weekly: `周榜`, monthly: `月榜` },
    o = {
        path: `/popular/:range?`,
        categories: [`new-media`],
        example: `/woshipm/popular`,
        parameters: { range: '时间，见下表，默认为 `daily`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`woshipm.com/`], target: `/popular` }],
        name: `热门文章`,
        maintainers: [`WenryXu`],
        handler: s,
        url: `woshipm.com/`,
        description: `| 日榜  | 周榜   | 月榜    |
| ----- | ------ | ------- |
| daily | weekly | monthly |`,
    };
async function s(o) {
    let { range: s = `daily` } = o.req.param(),
        { data: c } = await n(`${i}/api2/app/article/popular/${s}`),
        l = c.RESULT.map((e) => ((e = e.data), { title: e.articleTitle, description: e.articleSummary, link: `${i}/${e.type || `ai`}/${e.id}.html`, pubDate: t(e.publishTime, `x`), author: e.articleAuthor })),
        u = (await Promise.allSettled(l.map((t) => r(t, e.tryGet)))).filter((e) => e.status === `fulfilled`).map((e) => e.value);
    return { title: `热门文章 - ${a[s]} - 人人都是产品经理`, link: i, item: u };
}
export { o as route };
