import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/servicesupport/analygarden/:program?`,
    categories: [`other`],
    example: `/cfachina/servicesupport/analygarden`,
    parameters: { program: `分类，见下表，留空为全部` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cfachina.org/servicesupport/analygarden/:program?`, `cfachina.org/`] }],
    name: `分析师园地`,
    maintainers: [`TonyRL`],
    handler: a,
    description: `| 有色金属类 | 黑色金属类 | 能源化工类 | 贵金属类 | 农产品类 | 金融类 | 指数类 |
| ---------- | ---------- | ---------- | -------- | -------- | ------ | ------ |
| ysjsl      | hsjsl      | nyhgl      | gjsl     | ncpl     | jrl    | zsl    |`,
};
async function a(i) {
    let { program: a = `分析师园地` } = i.req.param(),
        o = `https://www.cfachina.org`,
        s,
        c = `${o}/servicesupport/analygarden/`;
    if (a !== `分析师园地`) {
        c = `${c}${a}/`;
        let e = r((await t(c)).data);
        ((a = e(`script:contains("Paging")`)
            .text()
            .match(/var name = '(.+)';/)[1]),
            (s = {
                category: e(`.crumb a`)
                    .toArray()
                    .map((t) => e(t).text())
                    .slice(-2),
            }));
    }
    let { data: l } = await t(`${o}/qx-search/api/wcmSearch/getDataByProgram`, {
            headers: { accept: `application/json, text/plain, */*` },
            searchParams: { pageNo: 1, pageSize: i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 20, keyword: ``, startTime: ``, endTime: ``, type: ``, programName: a },
        }),
        u = l.data.dataList.map((t) => {
            let r = new URL(t.docPubUrl, o).href;
            return { title: t.docTitle, author: t.docAuthor, link: r, pubDate: n(e(t.operTime), 8), enclosure_url: r, enclosure_type: `application/${r.split(`.`).pop()}` };
        });
    return { title: `${s?.category.toReversed().join(` - `) ?? `分析师园地`} - 中国期货业协会`, link: c, item: u };
}
export { i as route };
