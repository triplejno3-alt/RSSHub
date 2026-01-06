import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './utils-BGQjCLE6.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/web/:id?`,
    categories: [`traditional-media`],
    example: `/cna/web/aall`,
    parameters: { id: `分类 id，见上表。此參數默认为 aall` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `分类 (网页爬虫方法)`,
    maintainers: [`dzx-dzx`],
    handler: s,
};
async function s(o) {
    let s = o.req.param(`id`) || `aall`,
        c = /^\d+$/.test(s) ? `https://www.cna.com.tw/topic/newstopic/${s}.aspx` : `https://www.cna.com.tw/list/${s}.aspx`,
        l = a((await n({ method: `get`, url: c })).data),
        u = l(`*:is(.pcBox .caItem, .mainList li a div) h2`)
            .slice(0, o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 10)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.text(), link: new URL(e.parents(`a`).attr(`href`), `https://www.cna.com.tw`).href, pubDate: r(t(e.next().text()), 8) })),
        d = await Promise.all(u.map((t) => e.tryGet(t.link, async () => await i(t))));
    return { title: l(`title`).text(), link: c, item: d };
}
export { o as route };
