import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
const a = `http://yjszs.nudt.edu.cn`,
    o = new Map([
        [`2`, { title: `国防科技大学研究生院 - 通知公告` }],
        [`1`, { title: `国防科技大学研究生院 - 首页` }],
        [`8`, { title: `国防科技大学研究生院 - 招生简章` }],
        [`12`, { title: `国防科技大学研究生院 - 学校政策` }],
        [`16`, { title: `国防科技大学研究生院 - 硕士招生` }],
        [`17`, { title: `国防科技大学研究生院 - 博士招生` }],
        [`23`, { title: `国防科技大学研究生院 - 院所发文` }],
        [`25`, { title: `国防科技大学研究生院 - 数据统计` }],
    ]),
    s = {
        path: `/yjszs/:keyId?`,
        categories: [`university`],
        example: `/nudt/yjszs/2`,
        parameters: { keyId: `分类，见下表，默认为通知公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`yjszs.nudt.edu.cn`] }],
        name: `研究生院`,
        maintainers: [`Blank0120`],
        handler: c,
        url: `yjszs.nudt.edu.cn/`,
        description: `| 通知公告 | 首页 | 招生简章 | 学校政策 | 硕士招生 | 博士招生 | 院所发文 | 数据统计 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 2     | 1     | 8     | 12     | 16     | 17     | 23     | 25     |`,
    };
async function c(s) {
    let c = s.req.param(`keyId`) ?? `2`,
        l = o.get(c);
    if (!l) throw new r(`invalid keyId`);
    let u = `${a}/pubweb/homePageList`;
    u += c === `2` ? `/searchContent.view` : `/recruitStudents.view?keyId=${c}`;
    let d = i((await t({ method: `get`, url: u })).data),
        f = d(`.news-list li`)
            .toArray()
            .map((t) => ((t = d(t)), { link: new URL(t.find(`a`).attr(`href`), a).href, title: t.find(`h3`).text().trim(), pubDate: n(e(t.find(`.time`).text(), `YYYY-MM-DD`), -8) }));
    return { title: l.title, link: u, item: f };
}
export { s as route };
