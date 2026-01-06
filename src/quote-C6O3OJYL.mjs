import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/news/:ticker`,
    categories: [`finance`],
    example: `/finviz/news/AAPL`,
    parameters: { ticker: `The stock ticker` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `US Stock News`,
    maintainers: [`HenryQW`],
    handler: i,
};
async function i(r) {
    let i = `https://finviz.com/quote.ashx?t=${r.req.param(`ticker`)}`,
        a = n((await t(i)).body),
        o = a(`table.fullview-news-outer tr`),
        s = ``,
        c = await Promise.all(
            o.toArray().map((t) => {
                let n = a(t).find(`td`).first().text().trim();
                return (n.includes(`-`) ? (s = n.split(` `)[0]) : (n = `${s} ${n}`), { title: a(t).find(`a`).text(), pubDate: e(n, `MMM-DD-YY HH:mmA`), author: a(t).find(`span`).text(), link: a(t).find(`a`).attr(`href`) });
            })
        ),
        l = a(`.fullview-title b`).text();
    return { title: `${r.req.param(`ticker`)} ${l} News by Finviz`, link: i, description: `A collection of ${l} news aggregated by Finviz.`, item: c };
}
export { r as route };
