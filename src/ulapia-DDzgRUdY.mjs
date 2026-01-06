import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = { brokerage_news: `券商晨报`, stock_research: `个股研报`, industry_research: `行业研报`, strategy_research: `策略研报`, macro_research: `宏观研报`, ipo_research: `IPO研报` },
    i = { brokerage_news: `div.col-md-4`, stock_research: `div.col-md-6`, industry_research: `div.col-md-6`, strategy_research: `div.col-md-6`, macro_research: `div.col-md-6`, ipo_research: `div.col-md-6` },
    a = {
        path: `/reports/:category?`,
        categories: [`finance`],
        example: `/ulapia/reports/stock_research`,
        parameters: { category: `频道类型，默认为券商晨报（今日晨报）` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `频道`,
        maintainers: [`Fatpandac`],
        handler: o,
        description: `|     个股研报    |      行业研报      |      策略研报      |     宏观研报    |    新股研报   | 券商晨报（今日晨报） |
| :-------------: | :----------------: | :----------------: | :-------------: | :-----------: | :------------------: |
| stock_research | industry_research | strategy_research | macro_research | ipo_research |    brokerage_news   |`,
    };
async function o(a) {
    let o = a.req.param(`category`) ?? `brokerage_news`,
        s = `http://www.ulapia.com/reports/${o}`,
        c = n((await t.get(s)).data),
        l = c(String(i[o]))
            .toArray()
            .filter((e) => c(e).find(`img`).attr(`src`))
            .map((t) => ({
                title: `${c(t).find(`strong`).text()}  ${c(t).find(`h5.mb-1`).text()}`,
                author: c(t).find(`div.col.p-8.d-flex.px-3.py-3.flex-column.position-static > div:nth-child(4) > span:nth-child(2)`).text(),
                link: c(t).find(`h5.mb-1 > a`).attr(`href`),
                description: `<img src="${c(t).find(`img`).attr(`src`).split(`!`)[0]}">`,
                pubDate: e(c(t).find(`div.mb-0.text-muted`).last().text().split(`:`)[1], `YYYY-MM-DD`),
            }));
    return { title: ` ulapia - ${r[o]}`, link: s, item: l };
}
export { a as route };
