import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/iec`,
    categories: [`university`],
    example: `/cnu/iec`,
    parameters: {},
    radar: [{ source: [`iec.cnu.edu.cn/ggml/tzgg1/index.htm`], target: `/cnu/iec` }],
    name: `信息工程学院通知公告`,
    maintainers: [`liueic`],
    handler: i,
    url: `iec.cnu.edu.cn/ggml/tzgg1/index.htm`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
};
async function i() {
    let r = `https://iec.cnu.edu.cn`,
        i = `${r}/ggml/tzgg1/index.htm`,
        a = n((await t(i)).data);
    return {
        title: `首都师范大学信息工程学院 - 通知公告`,
        link: i,
        description: `首都师范大学信息工程学院通知公告`,
        item: a(`.articleList.articleList2 ul > li`)
            .toArray()
            .map((t) => {
                let n = a(t),
                    i = n.find(`span`),
                    o = n.find(`a`),
                    s = i
                        .text()
                        .trim()
                        .match(/\[(\d{4}-\d{2}-\d{2})\]/),
                    c = s ? e(s[1], `YYYY-MM-DD`) : void 0,
                    l = o.text().trim(),
                    u = o.attr(`href`);
                return { title: l, link: u?.startsWith(`http`) ? u : `${r}/ggml/tzgg1/${u}`, pubDate: c, description: `` };
            })
            .filter((e) => e.title && e.link),
    };
}
export { r as route };
