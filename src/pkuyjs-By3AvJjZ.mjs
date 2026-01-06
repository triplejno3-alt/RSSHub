import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/admission/sszs`,
    categories: [`university`],
    example: `/pku/admission/sszs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`admission.pku.edu.cn/zsxx/sszs/index.htm`, `admission.pku.edu.cn/`] }],
    name: `研究生招生网`,
    maintainers: [`pkuyjs`],
    handler: i,
    url: `admission.pku.edu.cn/zsxx/sszs/index.htm`,
};
async function i() {
    let r = `https://admission.pku.edu.cn/zsxx/sszs/index.htm`,
        i = n((await t(r)).data),
        a = i(`.zsxx_cont_list li`);
    return {
        title: `${i(`.twostage_title_C`).text()} - ${i(`title`).text()}`,
        link: r,
        description: `北京大学研究生院通知公告`,
        item: a.toArray().map((t) => ((t = i(t)), { title: t.find(`li a`).text(), description: t.find(`li a`).text(), link: t.find(`li a`).attr(`href`), pubDate: e(t.find(`.zsxxCont_list_time`).text()) })),
    };
}
export { r as route };
