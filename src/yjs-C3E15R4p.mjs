import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/yjs`,
    categories: [`university`],
    example: `/hust/yjs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gszs.hust.edu.cn/zsxx/ggtz.htm`, `gszs.hust.edu.cn/`] }],
    name: `研究生院通知公告`,
    maintainers: [`shengmaosu`],
    handler: i,
    url: `gszs.hust.edu.cn/zsxx/ggtz.htm`,
};
async function i() {
    let r = `https://gszs.hust.edu.cn/zsxx/ggtz.htm`,
        i = n((await t(r)).data),
        a = i(`.main_conRCb li`);
    return {
        title: `华中科技大学研究生院`,
        link: r,
        description: `华中科技大学研究生调剂信息`,
        item:
            a &&
            a.toArray().map((t) => {
                t = i(t);
                let n = t.find(`a`);
                return { title: n.text(), link: new URL(n.attr(`href`), r).href, pubDate: e(t.find(`span`).text(), `YYYY-MM-DD`) };
            }),
    };
}
export { r as route };
