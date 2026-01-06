import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `http://bio.pku.edu.cn/homes/Index/news_jz/7/7.html`,
    i = {
        path: `/cls/lecture`,
        categories: [`university`],
        example: `/pku/cls/lecture`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`bio.pku.edu.cn/homes/Index/news_jz/7/7.html`, `bio.pku.edu.cn/`] }],
        name: `生命科学学院近期讲座`,
        maintainers: [`TPOB`],
        handler: a,
        url: `bio.pku.edu.cn/homes/Index/news_jz/7/7.html`,
    };
async function a() {
    let i = n((await t(r)).data);
    return {
        title: `北京大学生命科学学院近期讲座`,
        link: r,
        description: `北京大学生命科学学院近期讲座`,
        item: i(`a.clearfix`)
            .toArray()
            .map((t) => ({ title: i(t).find(`p`).text().trim(), description: `日期: ` + i(t).find(`span`), pubDate: e(i(t).find(`.date`).text()), link: `http://bio.pku.edu.cn` + i(`a.clearfix`).attr(`href`) })),
    };
}
export { i as route };
