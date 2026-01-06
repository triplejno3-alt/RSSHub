import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './timezone-CrV-DT8S.mjs';
import { load as n } from 'cheerio';
async function r(r) {
    let i = r.req.param(`category`) ?? `all`,
        a = `https://www.cs.nycu.edu.tw/announcements/${i === `all` ? `` : i}`,
        o = await e(a, { parseResponse: n }),
        s = o(`.announcement-item`)
            .toArray()
            .map((e) => ({ title: o(`header a`, e).text().trim(), link: o(`a`, e).attr(`href`), pubDate: o(`time`, e).attr(`datetime`) ? t(o(`time`, e).attr(`datetime`) || ``, 8) : void 0 }));
    return { title: `陽明交大資工系公告 - ${i}`, description: `國立陽明交大資訊學院公告 - ${i}`, language: `zh-TW`, link: a, item: s };
}
const i = {
    name: `資訊學院公告`,
    categories: [`university`],
    maintainers: [`simbafs`],
    description: `|    名稱    |       Name       |    :category     |
| :--------: | :--------------: | :--------------: |
|  全部公告  |       All        |       all        |
|   獎學金   |   Scholarships   |   scholarship    |
| 課程/演講  |     Courses      |     courses      |
|   研究所   |    Graduates     |     graduate     |
|   學士班   |  Undergraduates  |  undergraduate   |
|  入學公告  |    Admissions    |    candidate     |
|  獲獎捷報  |      Awards      |      awards      |
|  系內徵才  |   Internal Job   |      campus      |
|  企業徵才  |   Industry Job   |   corporation    |
|   系計中   | Computer Center  |       cscc       |
|  活動競賽  |     activity     |     activity     |
| 資訊人院刊 | NYC CCS MAGAZINE | NYC CCS MAGAZINE |`,
    path: `/cs/:category?`,
    parameters: { category: `categories, see below` },
    example: `/nycu/cs/all`,
    handler: r,
};
export { i as route };
