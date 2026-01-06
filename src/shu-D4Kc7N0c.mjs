import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { tzgg: { title: `上海大学 - 通知公告`, url: `https://www.shu.edu.cn/tzgg.htm` }, zyxw: { title: `上海大学 - 重要新闻`, url: `https://www.shu.edu.cn/zyxw.htm` } },
    o = {
        path: `/news/:type?`,
        categories: [`university`],
        example: `/shu/news/tzgg`,
        parameters: { type: `分类，默认为通知公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.shu.edu.cn/`], target: `/news` }],
        name: `官网通知公告`,
        maintainers: [`lonelyion`, `GhhG123`],
        handler: s,
        url: `www.shu.edu.cn/`,
        description: `| 通知公告 | 重要新闻 |
| -------- | --------- |
| tzgg     | zyxw      |`,
    };
async function s(o) {
    let s = o.req.param(`type`) ?? `tzgg`,
        c = `https://www.shu.edu.cn`,
        l = i((await n({ method: `get`, url: a[s].url })).data),
        u = l(`div.list ul li`)
            .toArray()
            .map((e) => {
                let n = l(e),
                    i = n.find(`a`).attr(`href`);
                return { title: n.find(`p.bt`).text().trim(), link: i ? new URL(i, c).href : c, pubDate: r(t(n.find(`p.sj`).text().trim(), `YYYY.MM.DD`), 8), description: n.find(`p.zy`).text().trim() };
            }),
        d = await Promise.all(u.map((t) => e.tryGet(t.link, async () => ((t.description = i((await n({ method: `get`, url: t.link })).data)(`#vsb_content .v_news_content`).html() || t.description), t))));
    return { title: a[s].title, description: a[s].title, link: a[s].url, image: `https://www.shu.edu.cn/__local/0/08/C6/1EABE492B0CF228A5564D6E6ABE_779D1EE3_5BF7.png`, item: d };
}
export { o as route };
