import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/scet/notice`,
    categories: [`university`],
    example: `/scut/scet/notice`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `土木与交通学院 - 学工通知`,
    maintainers: [`railzy`],
    handler: r,
};
async function r() {
    let n = `https://www2.scut.edu.cn/jtxs/24241/list.htm`,
        r = (await e({ method: `get`, url: n })).data,
        i = t(r),
        a = i(`#wp_news_w5 li`);
    return {
        title: `华南理工大学土木与交通学院 - 学工通知`,
        link: n,
        item: a && a.toArray().map((e) => ((e = i(e)), { title: e.find(`li a`).text(), description: e.find(`li a`).text(), link: e.find(`li a`).attr(`href`), pubDate: e.find(`.Article_PublishDate`).text() })),
    };
}
export { n as route };
