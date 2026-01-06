import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://yjszs.dhu.edu.cn`,
    a = { doctor: `/7126/list.htm`, master: `/7128/list.htm` },
    o = {
        path: `/yjs/zs/:type?`,
        categories: [`university`],
        example: `/dhu/yjs/zs/master`,
        parameters: { type: '默认为 `master`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `研究生招生信息`,
        maintainers: [`fox2049`],
        handler: s,
        description: `| 博士招生 | 硕士招生 |
| -------- | -------- |
| doctor   | master   |`,
    };
async function s(o) {
    let s = `${i}${a[o.req.param(`type`) || `master`]}`,
        { data: c } = await n(s),
        l = r(c),
        u = l(`.list_item`)
            .toArray()
            .map((e) => {
                e = l(e);
                let n = e.find(`a`).first();
                return { title: n.attr(`title`), link: `${i}${n.attr(`href`)}`, pubDate: t(e.find(`.Article_PublishDate`).text()) };
            }),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link);
                    return ((t.description = r(e)(`.wp_articlecontent`).first().html()), t);
                })
            )
        );
    return { title: `东华大学研究生-` + l(`.col_title`).text(), link: s, item: d };
}
export { o as route };
