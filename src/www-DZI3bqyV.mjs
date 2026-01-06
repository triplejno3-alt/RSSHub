import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://www.shmtu.edu.cn`;
async function a(e) {
    return r((await n.get(e, { https: { rejectUnauthorized: !1 } })).data)(`article`).html();
}
const o = (e, t) => Promise.all(e.map((e) => t.tryGet(e.link, async () => ((e.description = await a(e.link)), e)))),
    s = {
        path: `/www/:type`,
        categories: [`university`],
        example: `/shmtu/www/events`,
        parameters: { type: `类型名称` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.shmtu.edu.cn/:type`] }],
        name: `官网信息`,
        maintainers: [`imbytecat`, `simonsmh`],
        handler: c,
        description: `| 学术讲座 | 通知公告 |
| -------- | -------- |
| events   | notes    |`,
    };
async function c(a) {
    let s = a.req.param(`type`),
        c = s === `notes` ? `通知公告` : `学术讲座`,
        l = r((await n(`${i}/${s}`, { headers: { Referer: i }, https: { rejectUnauthorized: !1 } })).data),
        u = await o(
            l(`tbody tr`)
                .toArray()
                .map((e) => {
                    e = l(e);
                    let n = e.find(`.department`).text().trim();
                    return { title: e.find(`.title a`).text().trim(), link: new URL(e.find(`a`).attr(`href`), i).href, pubDate: t(e.find(`.date-display-single`).attr(`content`)), category: n, author: n };
                }),
            e
        );
    return { title: `上海海事大学 ${c}`, link: `${i}/${s}`, description: `上海海事大学 官网信息`, item: u };
}
export { s as route };
