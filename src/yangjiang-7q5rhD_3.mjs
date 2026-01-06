import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/yangjiang`,
    categories: [`forecast`],
    example: `/tingshuitz/yangjiang`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yjsswjt.com/zxdt_list.jsp`, `yjsswjt.com/`] }],
    name: `阳江市`,
    maintainers: [`ciaranchen`],
    handler: i,
    url: `yjsswjt.com/zxdt_list.jsp`,
};
async function i() {
    let r = n((await t(`https://www.yjsswjt.com/zxdt_list.jsp?flbz=7`)).data);
    return {
        title: `停水通知 - 阳江市水务集团有限公司`,
        link: `https://www.yjsswjt.com/zxdt_list.jsp?flbz=7`,
        item: r(`div.list_ul_div > ul > li`)
            .toArray()
            .map((t) => {
                let n = r(t),
                    i = n.find(`a`).attr(`href`).slice(17, -1);
                return { title: n.find(`span`).text().trim(), description: n.find(`span`).text().trim(), link: `http://www.yjsswjt.com/list.jsp?id=` + i, pubDate: e(n.find(`.datetime`).text(), `YYYY.MM.DD`) };
            }),
    };
}
export { r as route };
