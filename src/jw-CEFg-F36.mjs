import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/jw`,
    categories: [`university`],
    example: `/scnu/jw`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`jw.scnu.edu.cn/ann/index.html`, `jw.scnu.edu.cn/`] }],
    name: `教务处通知`,
    maintainers: [`fengkx`],
    handler: i,
    url: `jw.scnu.edu.cn/ann/index.html`,
};
async function i() {
    let r = `http://jw.scnu.edu.cn`,
        i = `${r}/ann/index.html`,
        a = n((await t({ method: `get`, url: i, headers: { Referer: r } })).data),
        o = a(`.notice_01`).find(`li`);
    return {
        title: a(`title`).first().text(),
        link: i,
        description: `华南师范大学教务处 - 通知公告`,
        item: o && o.toArray().map((t) => ((t = a(t)), { title: t.find(`a`).text(), pubDate: e(t.find(`.time`).text()), link: t.find(`a`).attr(`href`) })),
    };
}
export { r as route };
