import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
import i from 'iconv-lite';
const a = `http://www.design.zjut.edu.cn/BigClass.jsp?`,
    o = new Map([
        [1, { id: `bigclassid=16`, title: `学院新闻 - 浙工大设建学院` }],
        [2, { id: `bigclassid=18`, title: `公告通知 - 浙工大设建学院` }],
        [3, { id: `bigclassid=5&sid=25`, title: `科研申报 - 浙工大设建学院` }],
        [4, { id: `bigclassid=5&sid=26`, title: `科研成果 - 浙工大设建学院` }],
        [5, { id: `bigclassid=5&sid=27`, title: `文件与资源 - 浙工大设建学院` }],
        [6, { id: `bigclassid=20`, title: `学术交流 - 浙工大设建学院` }],
    ]),
    s = {
        path: `/da/:type`,
        categories: [`university`],
        example: `/zjut/da/1`,
        parameters: { type: `分类，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `设计与建筑学院`,
        maintainers: [`yikZero`],
        url: `www.design.zjut.edu.cn`,
        handler: c,
        description: `| 学院新闻 | 公告通知 | 科研申报 | 科研成果 | 文件与资源 | 学术交流 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 1        | 2        | 3        | 4        | 5        | 6        |`,
    };
async function c(s) {
    let c = Number.parseInt(s.req.param(`type`)),
        l = o.get(c)?.id,
        u = await n(`${a}${l}`, { responseType: `buffer` });
    u.data = i.decode(u.data, `gbk`);
    let d = r(u.data),
        f = d(`td[class='newstd'] .news2`)
            .toArray()
            .map((e) => {
                e = d(e);
                let n = e.find(`a`).text(),
                    r = e.find(`a`).attr(`href`);
                return r ? (r.startsWith(`http`) || (r = `http://www.design.zjut.edu.cn/` + r), { title: n, description: ``, pubDate: t(e.next().text().replace(`[`, ``).replace(`]`, ``)), link: r }) : null;
            }),
        p = await Promise.all(f.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n(t.link)).data)(`div[style="line-height:27px;"]`).html()), t))));
    return { title: o.get(c)?.title, link: `${a}${l}`, item: p };
}
export { s as route };
