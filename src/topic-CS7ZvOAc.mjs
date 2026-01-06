import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as n } from './utils-D2KpmCJ6.mjs';
const r = {
    path: `/topic/:id`,
    categories: [`new-media`],
    example: `/infoq/topic/1`,
    parameters: { id: `话题id，可在 [InfoQ全部话题](https://www.infoq.cn/topics) 页面找到URL里的话题id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`infoq.cn/topic/:id`] }],
    name: `话题`,
    maintainers: [`brilon`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`id`),
        a = `https://www.infoq.cn/topic/${i}`,
        o = (await e(`https://www.infoq.cn/public/v1/topic/getInfo`, { method: `POST`, headers: { Referer: a }, body: Number.isNaN(Number(i)) ? { alias: i } : { id: Number.parseInt(i) } })).data,
        s = o.name,
        c = (await e(`https://www.infoq.cn/public/v1/article/getList`, { method: `POST`, headers: { Referer: a }, body: { id: o.id, ptype: 0, size: r.req.query(`limit`) ? Number(r.req.query(`limit`)) : 30, type: 0 } })).data,
        l = await n.ProcessFeed(c, t);
    return { title: `InfoQ 话题 - ${s}`, description: o.desc, image: o.cover, link: a, item: l };
}
export { r as route };
