import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/ee/:id?`,
    categories: [`university`],
    example: `/xjtu/ee/1114`,
    parameters: { id: '栏目id，默认请求`1124`，可在 URL 中找到' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ee.xjtu.edu.cn/`] }],
    name: `电气学院`,
    maintainers: [`DylanXie123`],
    handler: o,
    url: `ee.xjtu.edu.cn/`,
};
async function o(a) {
    let o = `http://ee.xjtu.edu.cn/list.jsp?urltype=tree.TreeTempUrl&wbtreeid=${a.req.param(`id`) ?? `1124`}`,
        s = `http://ee.xjtu.edu.cn`,
        c = i((await n(o)).data),
        l = c(`span.windowstyle67278`, `div[class='list_right fr']`).text().trim(),
        u = c(`div[class='list_right fr'] ul li`)
            .toArray()
            .map((e) => {
                e = c(e);
                let n = e.find(`a`),
                    i = t(e.find(`span`).text());
                return { title: n.text(), link: new URL(n.attr(`href`), s).href, pubDate: r(i, 8) };
            });
    return {
        title: `西安交通大学电气学院 - ${l}`,
        link: s,
        item: await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n(t.link)).data);
                    return ((t.title = e(`tr td[class^=titlestyle]`).text()), (t.description = e(`td.contentstyle67362`, `form`).html()), t);
                })
            )
        ),
    };
}
export { a as route };
