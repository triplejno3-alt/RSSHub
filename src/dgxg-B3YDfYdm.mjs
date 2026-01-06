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
        [`gstz`, { title: `南京理工大学电光学院研学网 -- 公示通知`, id: `/6509` }],
        [`xswh`, { title: `南京理工大学电光学院研学网 -- 学术文化`, id: `/6511` }],
        [`jyzd`, { title: `南京理工大学电光学院研学网 -- 就业指导`, id: `/6510` }],
    ]),
    o = {
        path: `/dgxg/:type?`,
        categories: [`university`],
        example: `/njust/dgxg/gstz`,
        parameters: { type: `分类名，见下表，默认为公示通知` },
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `电光学院研学网`,
        maintainers: [`jasongzy`],
        handler: s,
        description: `| 公示通知 | 学术文化 | 就业指导 |
| -------- | -------- | -------- |
| gstz     | xswh     | jyzd     |`,
    };
async function s(o) {
    let s = o.req.param(`type`) ?? `gstz`,
        c = a.get(s);
    if (!c) throw new n(`invalid type`);
    let l = `https://dgxg.njust.edu.cn` + c.id + `/list.htm`,
        u = i(await r(l, !0)),
        d = u(`ul.wp_article_list`).find(`li`);
    return { title: c.title, link: l, item: d.toArray().map((n) => ({ title: u(n).find(`a`).attr(`title`).trim(), pubDate: t(e(u(n).find(`span.Article_PublishDate`).text(), `YYYY-MM-DD`), 8), link: u(n).find(`a`).attr(`href`) })) };
}
export { o as route };
