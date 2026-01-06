import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/yzb`,
    categories: [`university`],
    example: `/scau/yzb`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yzb.scau.edu.cn/2136/list1.htm`, `yzb.scau.edu.cn/`] }],
    name: `华农研讯`,
    maintainers: [`shengmaosu`],
    handler: i,
    url: `yzb.scau.edu.cn/2136/list1.htm`,
};
async function i() {
    let r = `https://yzb.scau.edu.cn/2136/list1.htm`,
        i = n((await t(r)).data),
        a = i(`#wp_news_w25 tr`);
    return {
        title: `华南农业大学研招办`,
        link: r,
        description: `华农研讯`,
        item:
            a &&
            a.toArray().map((t) => {
                t = i(t);
                let n = t.find(`a`);
                return { title: n.text(), link: n.attr(`href`), pubDate: e(t.find(`td`).eq(3).text(), `YYYY/MM/DD`) };
            }),
    };
}
export { r as route };
