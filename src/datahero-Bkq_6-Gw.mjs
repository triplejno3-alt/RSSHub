import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { 5: `侠创`, 6: `纽约数据科学学院`, 9: `RS实验所`, 10: `阿里云天池` },
    a = {
        path: `/datahero/:category?`,
        categories: [`finance`],
        example: `/dtcj/datahero`,
        parameters: { category: `分类，见下表，默认为全部` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `数据侠专栏`,
        maintainers: [`nczitzk`],
        handler: o,
        description: `| 侠创 | 纽约数据科学学院 | RS 实验所 | 阿里云天池 |
| ---- | ---------------- | --------- | ---------- |
| 5    | 6                | 9         | 10         |`,
    };
async function o(a) {
    let o = a.req.param(`category`) ?? ``,
        s = `https://dtcj.com/api/v1/data_hero_informations?per=15&page=1&topic_id=${o}`,
        c = (await n({ method: `get`, url: s })).data.data.map((e) => ({ title: e.title, author: e.author, link: `https://dtcj.com/topic/${e.id}`, pubDate: t(e.date) })),
        l = await Promise.all(c.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n({ method: `get`, url: t.link })).data)(`.summary-3_j7Wt, .content-3mNFyi`).html()), t))));
    return { title: `${o ? i[o] : `全部`} - 数据侠专栏 | DT 财经`, link: s, item: l };
}
export { a as route };
