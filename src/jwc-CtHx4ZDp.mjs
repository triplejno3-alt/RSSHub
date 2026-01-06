import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/jwc`,
    categories: [`university`],
    example: `/cnu/jwc`,
    parameters: {},
    radar: [{ source: [`jwc.cnu.edu.cn/tzgg/index.htm`], target: `/cnu/jwc` }],
    name: `教务处通知公示`,
    maintainers: [`liueic`],
    handler: i,
    url: `jwc.cnu.edu.cn/tzgg/index.htm`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
};
async function i() {
    let r = `https://jwc.cnu.edu.cn`,
        i = `${r}/tzgg/index.htm`,
        a = n((await t(i)).data);
    return {
        title: `首都师范大学教务处 - 通知公示`,
        link: i,
        description: `首都师范大学教务处通知公示`,
        item: a(`li > a`)
            .has(`span.title`)
            .toArray()
            .map((t) => {
                let n = a(t),
                    i = n.attr(`href`),
                    o = i?.startsWith(`http`) ? i : `${r}/tzgg/${i}`,
                    s = n.find(`span.date`),
                    c = s.find(`span.day`).text().trim(),
                    l = s.find(`span.year`).text().trim(),
                    u = l && c ? e(`${l}-${c}`, `YYYY-MM-DD`) : null,
                    d = n.find(`span.name`).text().trim();
                return { title: n.find(`span.title`).text().trim(), link: o, pubDate: u || void 0, category: d ? [d] : void 0, description: `` };
            }),
    };
}
export { r as route };
