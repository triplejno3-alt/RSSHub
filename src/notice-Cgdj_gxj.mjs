import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: [`/aia/notice/:type?`, `/auto/notice/:type?`],
    categories: [`university`],
    example: `/hust/aia/notice`,
    parameters: { type: `分区，默认为最新通知，可在网页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `人工智能和自动化学院通知`,
    maintainers: [`budui`],
    handler: i,
    description: `| 最新 | 党政 | 科研 | 本科生 | 研究生 | 学工思政 | 离退休 |
| ---- | ---- | ---- | ------ | ------ | -------- | ------ |
|      | dz   | ky   | bk     | yjs    | xgsz     | litui  |`,
};
async function i(r) {
    let i = r.req.param(`type`),
        a = `https://aia.hust.edu.cn/tzgg${i ? `/${i}` : ``}.htm`,
        o = n((await t(a)).data),
        s = o(`.list li`),
        c = o(`title`).text();
    return {
        title: c,
        link: a,
        item: s && s.toArray().map((t) => ((t = o(t)), { title: t.find(`a h2`).text(), description: t.find(`a div`).text() || c, pubDate: e(t.find(`.date3`).text(), `DDYYYY-MM`), link: new URL(t.find(`a`).attr(`href`), a).href })),
    };
}
export { r as route };
