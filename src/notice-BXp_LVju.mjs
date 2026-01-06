import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.qlu.edu.cn`,
    o = {
        path: `/notice`,
        categories: [`university`],
        example: `/qlu/notice`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`qlu.edu.cn/tzggsh/list1.htm`] }],
        name: `通知公告`,
        maintainers: [`SunBK201`],
        handler: s,
        url: `qlu.edu.cn/tzggsh/list1.htm`,
    };
async function s() {
    let o = i((await n({ method: `get`, url: `${a}/tzggsh/list1.htm` })).data),
        s = o(`ul.news_list.list2`).children(),
        c = await Promise.all(
            s.map((s, c) => {
                c = o(c);
                let l = c.find(`.news_title`).children().text(),
                    u = c.find(`.news_year`).text() + c.find(`.news_days`).text(),
                    d = c.find(`.news_title`).children().attr(`href`),
                    f = d.startsWith(`https`) ? d : a + d;
                return e.tryGet(f, async () => {
                    let e = ``;
                    return (
                        (e = d.startsWith(`https`)
                            ? l
                            : i((await n(f)).data)(`.read`)
                                  .html()
                                  .trim()),
                        { title: l, link: f, pubDate: r(t(u), 8), description: e }
                    );
                });
            })
        );
    return { title: `齐鲁工业大学 - 通知公告`, link: `${a}/tzggsh/list1.htm`, description: `齐鲁工业大学 - 通知公告`, item: c };
}
export { o as route };
