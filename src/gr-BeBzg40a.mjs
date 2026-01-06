import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { load as a } from 'cheerio';
const o = `https://gr.uestc.edu.cn/`,
    s = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2})/,
    c = { important: `tongzhi/`, teaching: `tongzhi/119`, degree: `tongzhi/129`, student: `tongzhi/122`, practice: `tongzhi/123` },
    l = { important: `重要公告`, teaching: `教学管理`, degree: `学位管理`, student: `学生管理`, practice: `就业实践` },
    u = {
        path: `/gr/:type?`,
        categories: [`university`],
        example: `/uestc/gr/student`,
        parameters: { type: '默认为 `important`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`gr.uestc.edu.cn/`] }],
        name: `研究生院`,
        maintainers: [`huyyi`, `mobyw`],
        handler: d,
        url: `gr.uestc.edu.cn/`,
        description: `| 重要公告  | 教学管理 | 学位管理 | 学生管理 | 就业实践 |
| --------- | -------- | -------- | -------- | -------- |
| important | teaching | degree   | student  | practice |`,
    };
async function d(u) {
    let d = u.req.param(`type`) || `important`;
    if (!(d in c)) throw new i(`type not supported`);
    let f = l[d],
        p = a(await e(o + c[d])),
        m = p(`div.title`)
            .toArray()
            .map(async (i) => {
                let o = p(i),
                    c = o.find(`a`).text() ?? ``,
                    l = `https://gr.uestc.edu.cn/` + o.find(`a`).attr(`href`);
                return await t.tryGet(l, async () => {
                    let t = a(await e(l)),
                        i = t(`div.topic_detail_header`).find(`div.info`).text(),
                        o = s.exec(i);
                    return { title: c, link: l, pubDate: o ? r(n(o[1]), 8) : null, description: t(`div.content`).html() };
                });
            }),
        h = await Promise.all(m);
    return { title: `研究生院通知（${f}）`, link: o, description: `电子科技大学研究生院通知（${f}）`, item: h };
}
export { u as route };
