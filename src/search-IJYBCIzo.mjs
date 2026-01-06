import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://guangdiu.com`,
    a = {
        path: `/search/:query?`,
        categories: [`shopping`],
        example: `/guangdiu/search/q=百度网盘`,
        parameters: { query: `链接参数，对应网址问号后的内容` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `关键字搜索`,
        maintainers: [`Huzhixin00`],
        handler: o,
    };
async function o(a) {
    let o = a.req.param(`query`) ?? ``,
        s = `${i}/${o ? `search.php?${o}` : ``}`,
        c = r((await n(s)).data),
        l = c(`#mainleft > div.zkcontent > div.gooditem`)
            .toArray()
            .map((e) => ({ title: c(e).find(`a.goodname`).text().trim(), link: `${i}/${c(e).find(`a.goodname`).attr(`href`)}` })),
        u = await Promise.all(
            l.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n(i.link)).data);
                    return ((i.description = e(`#dabstract`).html() + e(`a.dgotobutton`).html(`前往购买`)), (i.pubDate = t(e(`span.latesttime`).text())), i);
                })
            )
        );
    return { title: `逛丢 - ${/q=(.+)/.exec(o)[1]}`, link: s, item: u };
}
export { a as route };
