import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://wen.woshipm.com`,
    a = {
        path: `/wen`,
        categories: [`new-media`],
        example: `/woshipm/wen`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`wen.woshipm.com/`] }],
        name: `天天问`,
        maintainers: [`WenryXu`],
        handler: o,
        url: `wen.woshipm.com/`,
    };
async function o() {
    let a = r((await n(`${i}/m/main/indexNewData.html`)).data),
        o = a(`.article-list-item`)
            .toArray()
            .map((e) => ((e = a(e)), { title: e.find(`.went-head-text`).text(), link: `${i}${e.find(`.went-head`).attr(`href`)}`, pubDate: t(e.find(`.list-text`).text().split(`|`)[1]) }));
    return { title: `天天问 - 人人都是产品经理`, link: i, item: await Promise.all(o.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n(t.link)).data)(`.wt-desc`).html()), t)))) };
}
export { a as route };
