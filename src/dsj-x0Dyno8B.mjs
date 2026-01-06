import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
import i from 'p-map';
const a = {
    path: `/nrta/dsj/:category?`,
    categories: [`government`],
    example: `/gov/nrta/dsj`,
    parameters: { category: `分类，见下表，默认为备案公示` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `电视剧政务平台`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| 备案公示 | 发行许可通告 | 重大题材立项     | 重大题材摄制    | 变更通报 |
| -------- | ------------ | ---------------- | --------------- | -------- |
| note     | announce     | importantLixiang | importantShezhi | changing |`,
};
async function o(a) {
    let { category: o = `note` } = a.req.param(),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 15,
        c = `https://dsj.nrta.gov.cn`,
        l = new URL(`tims/site/views/applications.shanty?appName=${o}`, c).href,
        { data: u } = await n(l),
        d = r(u);
    return {
        item: await i(
            d(`img[src="/site/styles/default/images/icon_arrow_r.gif"]`)
                .slice(0, s)
                .toArray()
                .map((e) => {
                    e = d(e).next();
                    let n = e.text().match(/(\d+年\d+月)/);
                    return { title: e.text(), link: new URL(e.prop(`href`), c).href, pubDate: n ? t(n[1], [`YYYY年MM月`, `YYYY年M月`]) : void 0 };
                }),
            (t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link),
                        i = r(e);
                    return (i(`table`).last().remove(), (t.description = i(`td.newstext`).html() || i(`table`).last().parent().parent().html()), t);
                }),
            { concurrency: 5 }
        ),
        title: `${d(`title`).text()}-${d(`div.headbottom_menu_selected`).text()}`,
        link: l,
        description: d(`td`).last().text(),
        language: `zh-cn`,
        image: d(`img`).first().prop(`src`),
        author: `国家广播电影电视总局电视剧管理司`,
    };
}
export { a as route };
