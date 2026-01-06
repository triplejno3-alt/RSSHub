import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/journals/society/current`,
    categories: [`journal`],
    example: `/journals/society/current`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `《社会》杂志当期目录`,
    maintainers: [`CNYoki`],
    handler: i,
};
async function i() {
    let r = `https://www.society.shu.edu.cn/CN/1004-8804/current.shtml`,
        i = n((await t(r)).body),
        a = i(`.dqtab .njq`)
            .text()
            .match(/刊出日期：(\d{4}-\d{2}-\d{2})/),
        o = a ? e(a[1]) : null;
    return {
        title: `《社会》当期目录`,
        link: r,
        item: i(`.wenzhanglanmu`)
            .nextAll(`.noselectrow`)
            .toArray()
            .map((e) => {
                let t = i(e),
                    n = t.find(`.biaoti`).text().trim(),
                    r = t.find(`.biaoti`).attr(`href`),
                    a = t.find(`.zuozhe`).text().trim(),
                    s = t.find(`div[id^="Abstract"]`).text().trim();
                return n && r ? { title: n, link: r, description: s, author: a, pubDate: o } : null;
            })
            .filter((e) => e !== null),
    };
}
export { r as route };
