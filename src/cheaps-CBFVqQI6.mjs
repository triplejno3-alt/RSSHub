import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/cheaps/:query?`,
    categories: [`shopping`],
    example: `/guangdiu/cheaps/k=clothes`,
    parameters: { query: `链接参数，对应网址问号后的内容` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `九块九`,
    maintainers: [`fatpandac`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`query`) ?? ``,
        a = `https://guangdiu.com/cheaps.php${i ? `?${i}` : ``}`,
        o = n((await t(a)).data);
    return {
        title: `逛丢 - 九块九`,
        link: a,
        item: o(`div.cheapitem.rightborder`)
            .toArray()
            .map((t) => ({
                title: o(t).find(`div.cheaptitle`).text().trim() + o(t).find(`a.cheappriceword`).text(),
                link: o(t).find(`a.cheappriceword`).attr(`href`),
                description: o(t).find(`div.cheapimga`).html(),
                pubDate: e(o(t).find(`span.cheapaddtimeword`).text()),
            })),
    };
}
export { r as route };
