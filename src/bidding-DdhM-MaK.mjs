import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/bidding`,
    categories: [`university`],
    example: `/sustech/bidding`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`biddingoffice.sustech.edu.cn/`] }],
    name: `采购与招标管理部`,
    maintainers: [`sparkcyf`],
    handler: i,
    url: `biddingoffice.sustech.edu.cn/`,
};
async function i() {
    let r = `http://biddingoffice.sustech.edu.cn`,
        i = (await t({ method: `get`, url: r })).data,
        a = n(i),
        o = a(`.index-wrap.index-2 ul li`);
    return {
        title: `南方科技大学采购与招标管理部`,
        link: r,
        item:
            o &&
            o.toArray().map((t) => {
                t = a(t);
                let n = t.find(`li > span`).text(),
                    r = t.find(`li > a`);
                return { pubDate: e(n, `YYYY-MM-DD`), title: r.text(), link: r.attr(`href`) };
            }),
    };
}
export { r as route };
