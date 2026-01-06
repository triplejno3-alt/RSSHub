import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://jw.dhu.edu.cn`,
    a = { student: `/tzggwxszl/list.htm`, teacher: `/tzggwjszl/list.htm`, class: `/tzggwxkzl_19850/list.htm`, fxzy: `/fxzy/list.htm` },
    o = {
        path: `/jiaowu/news/:type?`,
        categories: [`university`],
        example: `/dhu/jiaowu/news/student`,
        parameters: { type: '默认为 `student`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `教务处通知`,
        maintainers: [`KiraKiseki`],
        handler: s,
        description: `| 学生专栏 | 教师专栏 | 选课专栏（仅选课期间开放） | 辅修专业 |
| -------- | -------- | -------- | -------- |
| student  | teacher  | class    | fxzy     |`,
    };
async function s(o) {
    let s = `${i}${a[o.req.param(`type`) || `student`]}`,
        { data: c } = await n(s),
        l = r(c),
        u = await Promise.all(
            l(`.list2 > li`)
                .toArray()
                .map(async (a) => {
                    a = l(a);
                    let o = a.find(`.news_title > a`),
                        s = a.find(`.news_meta`),
                        c = o.attr(`href`),
                        u = o.text(),
                        d = t(s.text(), `YYYY-MM-DD`, `zh-cn`),
                        f = `${i}${c}`;
                    return await e.tryGet(f, async () => {
                        let e = ``;
                        try {
                            let { data: t } = await n(f);
                            e = r(t)(`.wp_articlecontent`).first().html() ?? ``;
                        } catch {
                            e = ``;
                        }
                        return { title: u, link: c, pubDate: d, description: e };
                    });
                })
        );
    return { title: `东华大学教务处-` + l(`.col_title`).text(), link: s, item: u };
}
export { o as route };
