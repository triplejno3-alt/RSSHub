import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/smkxxy`,
    categories: [`university`],
    example: `/cnu/smkxxy`,
    parameters: {},
    radar: [{ source: [`smkxxy.cnu.edu.cn/tzgg3/index.htm`], target: `/cnu/smkxxy` }],
    name: `生命科学学院通知公告`,
    maintainers: [`liueic`],
    handler: i,
    url: `smkxxy.cnu.edu.cn/tzgg3/index.htm`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
};
async function i() {
    let r = `https://smkxxy.cnu.edu.cn`,
        i = `${r}/tzgg3/index.htm`,
        a = n((await t(i)).data);
    return {
        title: `首都师范大学生命科学学院 - 通知公告`,
        link: i,
        description: `首都师范大学生命科学学院通知公告`,
        item: a(`ul.block-list > li > a`)
            .toArray()
            .map((t) => {
                let n = a(t),
                    i = n.attr(`href`),
                    o = i?.startsWith(`http`) ? i : `${r}/tzgg3/${i}`;
                return { title: n.find(`p.gpArticleTitle`).text().trim(), link: o, pubDate: e(n.find(`span.gpArticleDate`).text().trim(), `YYYY-MM-DD`), description: `` };
            }),
    };
}
export { r as route };
