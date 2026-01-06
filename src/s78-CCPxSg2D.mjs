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
    path: `/moe/s78/:column`,
    categories: [`government`],
    example: `/gov/moe/s78/A13`,
    parameters: { column: `司局 ID，可在 URL 找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`moe.gov.cn/s78/:column/tongzhi`, `moe.gov.cn/s78/:column`] }],
    name: `司局通知`,
    maintainers: [`TonyRL`],
    handler: o,
};
async function o(a) {
    let o = `https://www.moe.gov.cn/s78/${a.req.param(`column`)}/tongzhi/`,
        { data: s } = await n(o),
        c = i(s),
        l = c(`#list li`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.find(`a`).attr(`title`), link: new URL(e.find(`a`).attr(`href`), o).href, pubDate: r(t(e.find(`span`).text(), `YYYY-MM-DD`), 8) })),
        u = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link),
                        r = i(e);
                    return (r(`#moe-detail-page-set, #moeCode, .moe-detail-shuxing, h1`).remove(), (t.description = r(`.moe-detail-box`).html()), t);
                })
            )
        );
    return { title: `${c(`meta[name="ColumnType"]`).attr(`content`)} - ${c(`head title`).text()}`, link: o, item: u };
}
export { a as route };
