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
        path: `/:query?`,
        categories: [`shopping`],
        example: `/guangdiu/k=daily`,
        parameters: { query: `链接参数，对应网址问号后的内容` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `国内折扣 / 海外折扣`,
        maintainers: [`Fatpandac`],
        handler: o,
        description: `::: tip
  海外折扣: [\`/guangdiu/k=daily&c=us\`](https://rsshub.app/guangdiu/k=daily&c=us)
:::`,
    };
async function o(a) {
    let o = a.req.param(`query`) ?? ``,
        s = o === `c=us` ? `${i}/?c=us` : `${i}/${o ? `cate.php?${o}` : ``}`,
        c = r((await n(s)).data),
        l = c(`#mainleft > div.zkcontent > div.gooditem`)
            .toArray()
            .map((e) => ({ title: c(e).find(`a.goodname`).text().trim(), link: new URL(c(e).find(`div.iteminfoarea > h2 > a`).attr(`href`), i).href })),
        u = await Promise.all(
            l.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n(i.link)).data);
                    return ((i.description = e(`#dabstract`).html() + e(`a.dgotobutton`).html(`前往购买`)), (i.pubDate = t(e(`span.latesttime`).text())), i);
                })
            )
        );
    return { title: `逛丢 - ${o.includes(`c=us`) ? `海外` : `国内`}`, link: s, item: u };
}
export { a as route };
