import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/career`,
    categories: [`university`],
    example: `/ccnu/career`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ccnu.91wllm.com/news/index/tag/tzgg`, `ccnu.91wllm.com/`] }],
    name: `就业信息`,
    maintainers: [`jackyu1996`],
    handler: i,
    url: `ccnu.91wllm.com/news/index/tag/tzgg`,
};
async function i() {
    let r = `https://ccnu.91wllm.com`,
        i = `${r}/news/index/tag/tzgg`,
        a = n((await t(i)).data),
        o = a(`.newsList`);
    return {
        title: `华中师范大学就业信息`,
        link: i,
        item:
            o &&
            o.toArray().map((t) => {
                t = a(t);
                let n = t.find(`a`);
                return { title: n.text(), pubDate: e(t.find(`.y`).text(), `YYYY-MM-DD`), link: `${r}${n.attr(`href`)}` };
            }),
    };
}
export { r as route };
