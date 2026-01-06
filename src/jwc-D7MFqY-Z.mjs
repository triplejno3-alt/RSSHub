import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://jwc.zcmu.edu.cn/`,
    i = new Map([
        [0, { title: `教务处 -- 教务管理`, id: `jwgl` }],
        [1, { title: `教务处 -- 成绩管理`, id: `jwgl/cjgl` }],
        [2, { title: `教务处 -- 学籍管理`, id: `jwgl/xjgl` }],
        [3, { title: `教务处 -- 考试管理`, id: `jwgl/ksgl` }],
        [4, { title: `教务处 -- 选课管理`, id: `jwgl/xkgl` }],
        [5, { title: `教务处 -- 排课管理`, id: `jwgl/pkgl` }],
    ]),
    a = {
        path: `/jwc/:type?`,
        categories: [`university`],
        example: `/zcmu/jwc/1`,
        parameters: { type: `通知模块id` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `教务处`,
        maintainers: [`CCraftY`],
        handler: o,
        description: `| 教务管理 | 成绩管理 | 学籍管理 | 考试管理 | 选课管理 | 排课管理 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 0        | 1        | 2        | 3        | 4        | 5        |`,
    };
async function o(a) {
    let o = Number.parseInt(a.req.param(`type`)),
        s = i.get(o).id,
        c = n((await t({ method: `get`, url: `${r}/${s}.htm` })).data),
        l = c(`.winstyle196327 tr:lt(20)`)
            .toArray()
            .map((t) => ((t = c(t)), { title: t.find(`a`).attr(`title`), link: `https://jwc.zcmu.edu.cn/${t.find(`a`).attr(`href`)}`, pubDate: e(t.find(`span.timestyle196327`).text().trim()) }));
    return { title: i.get(o).title, link: `${r}${s}`, item: l };
}
export { a as route };
