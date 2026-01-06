import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://www.rccp.pku.edu.cn/mzyt/`,
    i = {
        path: `/rccp/mzyt`,
        categories: [`university`],
        example: `/pku/rccp/mzyt`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.rccp.pku.edu.cn/`] }],
        name: `每周一推 - 中国政治学研究中心`,
        maintainers: [`vhxubo`],
        handler: a,
        url: `www.rccp.pku.edu.cn/`,
    };
async function a() {
    let i = n((await t(r)).data);
    return {
        title: `每周一推 - 北京大学中国政治学研究中心`,
        link: r,
        description: i(`meta[name="description"]`).attr(`content`),
        item: i(`li.list`)
            .toArray()
            .map((t) => ({ title: i(t).find(`a`).text().trim(), description: ``, pubDate: e(i(t).find(`span`).first().text(), `[YYYY-MM-DD]`), link: r + i(t).find(`a`).attr(`href`) })),
    };
}
export { i as route };
