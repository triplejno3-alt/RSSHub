import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://jiaowu.buaa.edu.cn/bhjwc2.0/index/newsList.do`,
    o = {
        path: `/jiaowu/:cddm?`,
        name: `教务部`,
        url: `jiaowu.buaa.edu.cn`,
        maintainers: [`OverflowCat`],
        handler: s,
        example: `/buaa/jiaowu/02`,
        parameters: { cddm: '菜单代码，可以是 2 位或者 4 位，默认为 `02`（通知公告）' },
        description:
            "::: tip\n\n菜单代码（`cddm`）应填写链接中调用的 newsList 接口的参数，可以是 2 位或者 4 位数字。若为 2 位，则为 `fcd`（父菜单）；若为 4 位，则为 `cddm`（菜单代码），其中前 2 位为 `fcd`。\n示例：\n\n1. 新闻快讯页面的链接中 `onclick=\"javascript:onNewsList('03');return false;\"`，对应的路径参数为 `03`，完整路由为 `/buaa/jiaowu/03`；\n2. 通知公告 > 公示专区页面的链接中 `onclick=\"javascript:onNewsList2('0203','2');return false;\"`，对应的路径参数为 `0203`，完整路由为 `/buaa/jiaowu/0203`。\n:::",
        categories: [`university`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    };
async function s(e) {
    let t = e.req.param(`cddm`);
    if (((t ||= `02`), t.length !== 2 && t.length !== 4)) throw Error(`cddm should be 2 or 4 digits`);
    let { title: n, list: r } = await l(a, { id: ``, fcdTab: t.slice(0, 2), cddmTab: t, xsfsTab: `2`, tplbid: ``, xwid: ``, zydm: ``, zymc: ``, yxdm: ``, pyzy: ``, szzqdm: `` });
    return { title: n, item: await u(r), link: a, author: `北航教务部`, language: `zh-CN` };
}
function c(e) {
    if (!e) return null;
    let t = e.match(/'(\d+)'/)?.at(1);
    return t ? `http://jiaowu.buaa.edu.cn/bhjwc2.0/index/newsView.do?xwid=${t}` : null;
}
async function l(e, a = {}) {
    let { body: o } = await n.post(e, { form: a }),
        s = i(o);
    return {
        title: s(`#main > div.dqwz > a`).last().text() || `北京航空航天大学教务部`,
        list: s(`#main div.news_list > ul > li`)
            .toArray()
            .map((e) => {
                let n = i(e),
                    a = c(n(`a`).attr(`onclick`));
                return a === null ? null : { title: n(`a`).text(), link: a, pubDate: r(t(n(`span.Floatright`).text()), 8) };
            })
            .filter((e) => e !== null),
    };
}
function u(t) {
    return Promise.all(
        t.map((t) =>
            e.tryGet(t.link, async () => {
                let { data: e } = await n(t.link),
                    r = i(e);
                return (
                    (t.description = r(`#main > div.content > div.search_height > div.search_con:has(p)`)
                        .html()
                        ?.replaceAll(/(\r|\n)+/g, `<br />`)),
                    (t.author = r(`#main > div.content > div.search_height > span.search_con`).text().split(`发布者:`).at(-1) || `教务部`),
                    t
                );
            })
        )
    );
}
export { o as route };
