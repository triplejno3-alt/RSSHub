import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/lib/tzgg/:category`,
    categories: [`university`],
    example: `/tsinghua/lib/tzgg/qtkx`,
    parameters: { category: `分类，可在对应分类页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`lib.tsinghua.edu.cn/tzgg/:category`] }],
    name: `图书馆通知公告`,
    maintainers: [`linsenwang`],
    handler: i,
};
async function i(r) {
    let { category: i } = r.req.param(),
        a = `https://lib.tsinghua.edu.cn/tzgg/${i}.htm`,
        o = n(await e(a)),
        s = o(`.tags .on`).text(),
        c = o(`ul.notice-list li`)
            .toArray()
            .map((e) => {
                e = o(e);
                let t = e.find(`a`).first().text(),
                    n = e.find(`.notice-date`).first().text(),
                    r = e.find(`a`).first().attr(`href`);
                return { title: t, link: new URL(r, a).href, pubDate: n };
            }),
        l = await Promise.all(
            c.map((r) =>
                t.tryGet(
                    r.link,
                    async () => (
                        (r.description = n(await e(r.link))(`.v_news_content`)
                            .first()
                            .html()),
                        r
                    )
                )
            )
        );
    return { allowEmpty: !0, title: `图书馆通知公告 - ` + s, link: a, item: l };
}
export { r as route };
