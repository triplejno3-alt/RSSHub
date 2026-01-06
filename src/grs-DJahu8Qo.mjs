import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = `http://www.grs.zju.edu.cn/`,
    a = new Map([
        [1, { title: `浙大研究生院 -- 全部公告`, tag: `qbgg` }],
        [2, { title: `浙大研究生院 -- 教学管理`, tag: `jxgl` }],
        [3, { title: `浙大研究生院 -- 各类资助`, tag: `glzz` }],
        [4, { title: `浙大研究生院 -- 学科建设`, tag: `xkjs` }],
        [5, { title: `浙大研究生院 -- 海外交流`, tag: `hwjl` }],
    ]),
    o = {
        path: `/grs/:type`,
        categories: [`university`],
        example: `/zju/grs/1`,
        parameters: { type: `分类，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `研究生院`,
        maintainers: [`Caicailiushui`],
        handler: s,
        description: `| 全部公告 | 教学管理 | 各类资助 | 学科建设 | 海外交流 |
| -------- | -------- | -------- | -------- | -------- |
| 1        | 2        | 3        | 4        | 5        |`,
    };
async function s(o) {
    let s = Number.parseInt(o.req.param(`type`)),
        c = a.get(s).tag,
        l = r((await t(`${i}${c}/list.htm`)).data),
        u = l(`#wp_news_w09`)
            .find(`.list-item`)
            .toArray()
            .map(
                (t) => (
                    (t = l(t)),
                    { title: t.find(`h3`).attr(`title`), pubDate: n(e(t.find(`.date`).text().trim(), `YY-MM-DD`), 8), link: `http://www.grs.zju.edu.cn${t.find(`a`).eq(-1).attr(`href`)}`, description: t.find(`p`).text() }
                )
            );
    return { title: a.get(s).title, link: `${i}${c}/list.htm`, item: u };
}
export { o as route };
