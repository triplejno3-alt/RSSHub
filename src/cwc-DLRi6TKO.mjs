import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './timezone-CrV-DT8S.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { t as r } from './utils-UYnaHvS1.mjs';
import { load as i } from 'cheerio';
const a = new Map([
        [`tzgg`, { title: `南京理工大学财务处 -- 通知公告`, id: `/12432` }],
        [`bslc`, { title: `南京理工大学财务处 -- 办事流程`, id: `/1382` }],
    ]),
    o = {
        path: `/cwc/:type?`,
        categories: [`university`],
        example: `/njust/cwc/tzgg`,
        parameters: { type: `分类名，见下表，默认为通知公告` },
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `财务处`,
        maintainers: [`MilkShakeYoung`, `jasongzy`],
        handler: s,
        description: `| 通知公告 | 办事流程 |
| -------- | -------- |
| tzgg     | bslc     |`,
    };
async function s(o) {
    let s = o.req.param(`type`) ?? `tzgg`,
        c = a.get(s);
    if (!c) throw new n(`invalid type`);
    let l = `https://cwc.njust.edu.cn` + c.id + `/list.htm`,
        u = i(await r(l, !0)),
        d = u(`ul.news_list`).find(`li`);
    return { title: c.title, link: l, item: d.toArray().map((n) => ({ title: u(n).find(`a`).attr(`title`).trim(), pubDate: t(e(u(n).find(`span.news_meta`).text(), `YYYY-MM-DD`), 8), link: u(n).find(`a`).attr(`href`) })) };
}
export { o as route };
