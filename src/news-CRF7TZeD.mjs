import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/news`,
    categories: [`university`],
    example: `/ahjzu/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`news.ahjzu.edu.cn/20/list.htm`] }],
    name: `通知公告`,
    maintainers: [`Yuk-0v0`],
    handler: o,
    url: `news.ahjzu.edu.cn/20/list.htm`,
};
async function o() {
    let a = `https://www.ahjzu.edu.cn/20/list.htm`,
        o = i((await n({ method: `get`, url: a })).data),
        s = o(`#wp_news_w9`)
            .find(`li`)
            .toArray()
            .map((e) => {
                e = o(e);
                let n = e.find(`.column-news-date`).text(),
                    i = e.find(`a`).attr(`href`),
                    a = i.slice(0, 4) === `http` ? i : `https://www.ahjzu.edu.cn` + i;
                return { title: e.find(`a`).attr(`title`), link: a, pubDate: r(t(n), 8) };
            });
    return {
        title: `安建大-通知公告`,
        description: `安徽建筑大学-通知公告`,
        link: a,
        item: await Promise.all(s.map((t) => e.tryGet(t.link, async () => ((t.description = i((await n({ method: `get`, url: t.link })).data)(`.wp_articlecontent`).html()), t)))),
    };
}
export { a as route };
