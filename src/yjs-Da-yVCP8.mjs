import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/yjs`,
    categories: [`university`],
    example: `/ecust/yjs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gschool.ecust.edu.cn/12753/list.htm`, `gschool.ecust.edu.cn/`] }],
    name: `研究生院通知公告`,
    maintainers: [`shengmaosu`],
    handler: i,
    url: `gschool.ecust.edu.cn/12753/list.htm`,
};
async function i() {
    let r = `https://gschool.ecust.edu.cn`,
        i = `${r}/12753/list.htm`,
        a = n((await t(i)).data),
        o = a(`#wp_news_w6 li`);
    return {
        title: `华东理工大学研究生院`,
        link: i,
        description: `华东理工大学研究生院通知公告`,
        item: o && o.toArray().map((t) => ((t = a(t)), { title: t.find(`a`).attr(`title`), link: `${r}${t.find(`a`).attr(`href`)}`, pubDate: e(t.find(`.news_meta`).text()) })),
    };
}
export { r as route };
