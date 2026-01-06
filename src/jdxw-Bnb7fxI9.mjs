import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/jdxw`,
    categories: [`university`],
    example: `/cnu/jdxw`,
    parameters: {},
    radar: [{ source: [`news.cnu.edu.cn/xysx/jdxw/index.htm`], target: `/cnu/jdxw` }],
    name: `焦点关注`,
    maintainers: [`liueic`],
    handler: i,
    url: `news.cnu.edu.cn/xysx/jdxw/index.htm`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
};
async function i() {
    let r = `https://news.cnu.edu.cn`,
        i = `${r}/xysx/jdxw/index.htm`,
        a = n((await t(i)).data);
    return {
        title: `首都师范大学新闻网 - 焦点关注`,
        link: i,
        description: `首都师范大学新闻网焦点关注栏目最新新闻`,
        item: a(`ul.list3 > li`)
            .toArray()
            .map((t) => {
                let n = a(t),
                    i = n.find(`a`).attr(`href`),
                    o = i?.startsWith(`http`) ? i : `${r}/xysx/jdxw/${i}`;
                return { title: n.find(`span.listTitle`).text().trim(), link: o, pubDate: e(n.find(`span.listDate`).text().trim(), `YYYY-MM-DD`), description: `` };
            }),
    };
}
export { r as route };
