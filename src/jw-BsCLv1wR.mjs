import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = `https://jw.qust.edu.cn/`,
    r = {
        path: `/jw`,
        categories: [`university`],
        example: `/qust/jw`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`jw.qust.edu.cn/jwtz.htm`, `jw.qust.edu.cn/`] }],
        name: `教务通知`,
        maintainers: [`Silent-wqh`],
        handler: i,
        url: `jw.qust.edu.cn/jwtz.htm`,
    };
async function i() {
    let r = t((await e({ method: `get`, url: `${n}jwtz.htm` })).data),
        i = r(`.winstyle60982 tr a.c60982`)
            .toArray()
            .map((e) => {
                let t = r(e),
                    i = t.text().trim(),
                    a = t.attr(`href`);
                return { title: i, link: a.startsWith(`http`) ? a : `${n}${a}` };
            });
    return { title: `青岛科技大学 - 教务通知`, link: `${n}jwtz.htm`, item: i };
}
export { r as route };
