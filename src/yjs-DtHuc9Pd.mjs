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
    example: `/upc/yjs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`zs.gs.upc.edu.cn/sszs/list.htm`, `zs.gs.upc.edu.cn/`] }],
    name: `研究生院通知公告`,
    maintainers: [`shengmaosu`],
    handler: i,
    url: `zs.gs.upc.edu.cn/sszs/list.htm`,
};
async function i() {
    let r = `http://zs.gs.upc.edu.cn`,
        i = `${r}/sszs/list.htm`,
        a = n((await t(i)).data),
        o = a(`.list tr`);
    return {
        title: `中国石油大学研究生院`,
        link: i,
        description: `中国石油大学研究生院通知公告`,
        item:
            o &&
            o.toArray().map((t) => {
                t = a(t);
                let n = t.find(`a`);
                return { title: n.attr(`title`), link: `${r}${n.attr(`href`)}`, pubDate: e(t.find(`div[style]`).text()) };
            }),
    };
}
export { r as route };
