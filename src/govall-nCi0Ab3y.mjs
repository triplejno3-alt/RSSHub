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
    path: `/zhengce/govall/:advance?`,
    categories: [`government`],
    example: `/gov/zhengce/govall/orpro=555&notpro=2&search_field=title`,
    parameters: { advance: `高级搜索选项，将作为请求参数直接添加到url后。目前已知的选项及其意义如下。` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.gov.cn/`], target: `/zhengce/govall` }],
    name: `信息稿件`,
    maintainers: [`ciaranchen`],
    handler: o,
    url: `www.gov.cn/`,
    description: `|               选项              |                       意义                       |              备注              |
| :-----------------------------: | :----------------------------------------------: | :----------------------------: |
|              orpro              |             包含以下任意一个关键词。             |          用空格分隔。          |
|              allpro             |                包含以下全部关键词                |                                |
|              notpro             |                 不包含以下关键词                 |                                |
|              inpro              |                完整不拆分的关键词                |                                |
|           searchfield           | title: 搜索词在标题中；content: 搜索词在正文中。 |  默认为空，即网页的任意位置。  |
| pubmintimeYear, pubmintimeMonth |                    从某年某月                    | 单独使用月份参数无法只筛选月份 |
| pubmaxtimeYear, pubmaxtimeMonth |                    到某年某月                    | 单独使用月份参数无法只筛选月份 |
|              colid              |                       栏目                       |      比较复杂，不建议使用      |`,
};
async function o(a) {
    let o = a.req.param(`advance`),
        s = `http://sousuo.gov.cn/list.htm`,
        c = `${new URLSearchParams({ n: 20, t: `govall`, sort: `pubtime`, advance: `true` }).toString()}&${o}`,
        l = i((await n.get(s, { searchParams: c.replaceAll(/([\u4E00-\u9FA5])/g, (e) => encodeURIComponent(e)) })).data),
        u = l(`body > div.dataBox > table > tbody > tr`)
            .slice(1)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`td:nth-child(2) > a`).text(), link: e.find(`td:nth-child(2) > a`).attr(`href`), pubDate: r(t(e.find(`td:nth-child(5)`).text()), 8) })),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = ``;
                    try {
                        e = i((await n(t.link)).data)(`#UCAP-CONTENT`).html();
                    } catch {
                        e = `文章已被删除`;
                    }
                    return ((t.description = e), t);
                })
            )
        );
    return { title: `信息稿件 - 中国政府网`, link: `${s}?${c}`, item: d };
}
export { a as route };
