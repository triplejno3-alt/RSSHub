import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
async function i(e) {
    return { description: r((await n(e)).data)(`[name="_newscontent_fromname"]`).html(), link: e, guid: e };
}
const a = {
    path: `/cse/:type?`,
    categories: [`university`],
    example: `/csu/cse`,
    parameters: { type: `类型` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `计算机学院`,
    maintainers: [`j1g5awi`],
    handler: o,
    description: `| 类型 | 学院新闻 | 通知公告 | 学术信息 | 学工动态 | 科研动态 |
| ---- | -------- | -------- | -------- | -------- | -------- |
| 参数 | xyxw     | tzgg     | xsxx     | xgdt     | kydt     |`,
};
async function o(a) {
    let o = `https://cse.csu.edu.cn/index/`,
        s = o + (a.req.param(`type`) ?? `tzgg`) + `.htm`,
        c = r((await n.get(s)).data),
        l = c(`.download li`).toArray(),
        u = await Promise.all(
            l.map((n) => {
                let a = r(n),
                    s = new URL(a(`a`).attr(`href`), o).href,
                    c = a(`a`).text(),
                    l = a(`span`).text();
                return e.tryGet(s, async () => {
                    let e = await i(s);
                    return ((e.title = c), (e.pubDate = t(l, `YYYY/MM/DD`)), e);
                });
            })
        );
    return { title: c(`title`).text(), link: s, item: u };
}
export { a as route };
