import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/tw/feeds/:category`,
    categories: [`new-media`],
    example: `/ithome/tw/feeds/news`,
    parameters: { category: `類別` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.ithome.com.tw/:category`, `www.ithome.com.tw/:category/feeds`] }],
    name: `Feeds`,
    maintainers: [`miles170`],
    handler: o,
    description: `| 新聞 | AI       | Cloud | DevOps | 資安     |
| ---- | -------- | ----- | ------ | -------- |
| news | big-data | cloud | devops | security |`,
};
async function o(a) {
    let o = `https://www.ithome.com.tw`,
        s = `${o}/${a.req.param(`category`)}/feeds`,
        c = i((await n(s)).data),
        l = c(`a.active-trail`).text(),
        u = await Promise.all(
            c(`.title a`)
                .toArray()
                .map((a) => {
                    let s = o + c(a).attr(`href`);
                    return e.tryGet(s, async () => {
                        let e = i((await n(s)).data);
                        return { title: e(`.page-header`).text(), author: e(`.author a`).text(), description: e(`article`).eq(0).html(), pubDate: r(t(e(`.created`).text(), `YYYY-MM-DD`), 8), category: l, link: s };
                    });
                })
        );
    return { title: `${l} | iThome`, link: s, description: `iThome Online 是臺灣第一個網路原生報，提供IT產業即時新聞、企業IT產品報導與測試、技術專題、IT應用報導、IT書訊，以及面向豐富的名家專欄。`, item: u };
}
export { a as route };
