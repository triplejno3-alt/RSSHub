import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/library`,
    categories: [`university`],
    example: `/xyu/library`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `图书馆通知公告`,
    maintainers: [`JinMokai`],
    handler: i,
    url: `lib.xyc.edu.cn/index/tzgg.htm`,
    radar: [{ source: [`lib.xyc.edu.cn/index/tzgg.htm`], target: `/library` }],
};
async function i() {
    let r = `https://lib.xyc.edu.cn`,
        i = `${r}/index/tzgg.htm`,
        a = n(await e(i));
    return {
        title: `新余学院图书馆通知公告`,
        link: i,
        item: a(`.text-list ul li`)
            .toArray()
            .map((e) => {
                let n = a(e),
                    i = n.find(`a`),
                    o = i.attr(`title`) || i.text().trim(),
                    s = i.attr(`href`);
                return { title: o, link: s ? new URL(s, r).href : ``, pubDate: t(n.find(`.date`).text().trim() || n.text().match(/\d{4}-\d{2}-\d{2}/)?.[0] || ``, `YYYY-MM-DD`), description: o };
            })
            .filter((e) => !!(e.title && e.link)),
    };
}
export { r as route };
