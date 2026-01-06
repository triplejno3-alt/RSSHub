import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/dongguan`,
    categories: [`forecast`],
    example: `/tingshuitz/dongguan`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `东莞市`,
    maintainers: [`victoriqueko`],
    handler: i,
};
async function i() {
    let r = (await t({ method: `get`, url: `http://www.djsw.com.cn/news/tstz/index.html` })).data,
        i = n(r),
        a = i(`#cntR li`);
    return {
        title: i(`title`).text() || `停水通知 - 东莞市东江水务有限公司`,
        link: `http://www.djsw.com.cn/news/tstz/index.html`,
        description: i(`title`).text() || `停水通知 - 东莞市东江水务有限公司`,
        item: a.toArray().map((t) => ((t = i(t)), { title: t.find(`a`).text(), description: `东莞市停水通知：${t.find(`a`).text()}`, pubDate: e(i(t.contents()[1]).text().slice(1, -1)), link: t.find(`a`).attr(`href`) })),
    };
}
export { r as route };
