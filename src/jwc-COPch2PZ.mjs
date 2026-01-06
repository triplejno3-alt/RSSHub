import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { load as a } from 'cheerio';
const o = `https://www.jwc.uestc.edu.cn/`,
    s = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2})/,
    c = { important: `hard/?page=1`, student: `list/256/?page=1`, teacher: `list/255/?page=1`, teaching: `list/40/?page=1`, office: `list/ff80808160bcf79c0160c010a8d20020/?page=1` },
    l = { important: `重要公告`, student: `学生事务公告`, teacher: `教师事务公告`, teaching: `教学新闻`, office: `办公室` },
    u = {
        path: `/jwc/:type?`,
        categories: [`university`],
        example: `/uestc/jwc/student`,
        parameters: { type: '默认为 `important`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.jwc.uestc.edu.cn/`], target: `/jwc` }],
        name: `教务处`,
        maintainers: [`achjqz`, `mobyw`],
        handler: d,
        url: `www.jwc.uestc.edu.cn/`,
        description: `| 重要公告  | 学生事务公告 | 教师事务公告 | 教学新闻 | 办公室 |
| --------- | ------------ | ------------ | -------- | ------ |
| important | student      | teacher      | teaching | office |`,
    };
async function d(u) {
    let d = u.req.param(`type`) || `important`;
    if (!(d in c)) throw new i(`type not supported`);
    let f = l[d],
        p = a(await e(o + c[d])),
        m = p(`div.textAreo.clearfix`)
            .toArray()
            .map(async (i) => {
                let o = p(i),
                    c = o.find(`a`).attr(`title`) ?? ``,
                    l = `https://www.jwc.uestc.edu.cn/info/` + o.find(`a`).attr(`newsid`);
                return await t.tryGet(l, async () => {
                    let t = a(await e(l)),
                        i = t(`div.detail_header`).find(`div.item`).text(),
                        o = s.exec(i);
                    return { title: c, link: l, pubDate: o ? r(n(o[1]), 8) : null, description: t(`div.NewText`).html() };
                });
            }),
        h = await Promise.all(m);
    return { title: `教务处通知（${f}）`, link: o, description: `电子科技大学教务处通知（${f}）`, item: h };
}
export { u as route };
