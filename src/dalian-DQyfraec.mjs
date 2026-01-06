import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/dalian`,
    categories: [`forecast`],
    example: `/tingshuitz/dalian`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`swj.dl.gov.cn/col/col4296/index.html`, `swj.dl.gov.cn/`] }],
    name: `大连市`,
    maintainers: [`DIYgod`],
    handler: i,
    url: `swj.dl.gov.cn/col/col4296/index.html`,
};
async function i() {
    let r = n(
        (
            await t(
                `https://swj.dl.gov.cn/module/web/jpage/dataproxy.jsp?page=1&webid=28&path=https://swj.dl.gov.cn/&columnid=4296&unitid=31227&webname=%25E5%25A4%25A7%25E8%25BF%259E%25E5%25B8%2582%25E6%25B0%25B4%25E5%258A%25A1%25E5%25B1%2580&permissiontype=0`
            )
        ).data
    );
    return {
        title: `停水通知 - 大连市水务局`,
        link: `https://swj.dl.gov.cn/col/col4296/index.html`,
        description: `停水通知 - 大连市水务局`,
        item: r(`recordset record`)
            .toArray()
            .map((t) => ((t = r(t)), { title: t.find(`a`).text().trim(), description: `大连市停水通知：${t.find(`a`).text().trim()}`, pubDate: e(t.find(`span`).text(), `YYYY-MM-DD`), link: t.find(`a`).attr(`href`) })),
    };
}
export { r as route };
