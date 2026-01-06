import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/bks`,
    categories: [`university`],
    example: `/tongji/bks`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bksy.tongji.edu.cn/`] }],
    name: `本科生院通知公告`,
    maintainers: [`shiquda`],
    handler: i,
    url: `bksy.tongji.edu.cn/`,
};
async function i() {
    let r = `https://bksy.tongji.edu.cn/30359/list.htm`,
        i = n((await t(r)).data);
    return {
        title: `同济大学本科生院`,
        link: r,
        description: `同济大学本科生院通知公告`,
        item: i(`.wcts-a0018 li`)
            ?.toArray()
            .map((t) => {
                t = i(t);
                let n = t.find(`a`),
                    a = t.find(`.li-data`),
                    o = a.find(`span`).text().split(`-`),
                    s = a.find(`p`).text(),
                    c = `${o[0]}-${o[1]}-${s}`;
                return { title: t.find(`.li-tt-title`).text(), description: t.find(`.intro`).text(), link: new URL(n.attr(`href`), r).href, pubDate: e(c, `YYYY-MM-DD`) };
            }),
    };
}
export { r as route };
