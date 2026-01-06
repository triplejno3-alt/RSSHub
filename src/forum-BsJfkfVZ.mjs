import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/forum/:id`,
    categories: [`bbs`],
    example: `/zhibo8/forum/8`,
    parameters: { id: `子论坛 id，可在子论坛 URL 找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `子论坛`,
    maintainers: [`LogicJake`],
    handler: o,
};
async function o(a) {
    let o = `https://bbs.zhibo8.cc/forum/list/?fid=${a.req.param(`id`)}`,
        s = i((await n(o)).data),
        c = s(`div.intro > h2`).text(),
        l = s(`table.topic-list > tbody:nth-child(3) > tr`),
        u = await Promise.all(
            l.toArray().map((a) => {
                a = s(a);
                let o = a.find(`td:nth-child(1) > a:nth-child(2)`),
                    c = `https://bbs.zhibo8.cc` + o.attr(`href`);
                return e.tryGet(c, async () => {
                    let e = o.text(),
                        s = a.find(`td:nth-child(2) cite a`).text(),
                        l = a.find(`td:nth-child(2) em`).text();
                    return { title: e, description: i((await n(c)).data)(`.detail_ent`).html(), author: s, link: c, pubDate: r(t(l, `YYYY-MM-DD HH:mm`), 8) };
                });
            })
        );
    return { title: `${c}—直播吧`, link: o, item: u };
}
export { a as route };
