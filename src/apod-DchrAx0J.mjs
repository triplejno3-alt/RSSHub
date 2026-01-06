import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/apod`,
    categories: [`picture`],
    view: i.Pictures,
    example: `/bjp/apod`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bjp.org.cn/APOD/today.shtml`, `bjp.org.cn/APOD/list.shtml`, `bjp.org.cn/`] }],
    name: `每日一图`,
    maintainers: [`HenryQW`],
    handler: s,
    url: `bjp.org.cn/APOD/today.shtml`,
};
async function s(i) {
    let o = `https://www.bjp.org.cn`,
        s = `${o}/APOD/list.shtml`,
        c = a((await n(s)).data),
        l = c(`td[align=left] b`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.find(`a`).attr(`title`), link: `${o}${e.find(`a`).attr(`href`)}`, pubDate: r(t(e.find(`span`).text().replace(`：`, ``), `YYYY-MM-DD`), 8) }))
            .toSorted((e, t) => t.pubDate - e.pubDate)
            .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 10),
        u = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n.get(t.link);
                    return ((t.description = a(e)(`.juzhong`).html()), t);
                })
            )
        );
    return { title: c(`head title`).text(), description: `探索宇宙！每天发布一张迷人宇宙的影像，以及由专业天文学家撰写的简要说明。`, link: s, item: u };
}
export { o as route };
