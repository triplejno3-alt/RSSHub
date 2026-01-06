import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { tzgg: { title: `上海大学国际部港澳台-通知公告`, url: `https://global.shu.edu.cn/cd/tzgg.htm` }, xwsd: { title: `上海大学国际部港澳台-新闻速递`, url: `https://global.shu.edu.cn/cd/xwsd.htm` } },
    o = {
        path: `/global/:type?`,
        categories: [`university`],
        example: `/shu/global/tzgg`,
        parameters: { type: `分类，默认为通知公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`global.shu.edu.cn/cd/tzgg.htm`, `global.shu.edu.cn/cd/xwsd.htm`], target: `/global` }],
        name: `国际部港澳台办公室`,
        maintainers: [`GhhG123`],
        handler: s,
        url: `global.shu.edu.cn/`,
        description: `| 通知公告 | 新闻速递 |
| -------- | -------- |
| tzgg     | xwsd     |`,
    };
async function s(o) {
    let s = o.req.param(`type`) ?? `tzgg`,
        c = `https://global.shu.edu.cn`,
        l = i((await n({ method: `get`, url: a[s].url })).data),
        u = l(`div.only-list1 ul li`)
            .toArray()
            .map((e) => {
                let n = l(e),
                    i = n.find(`a`).attr(`href`),
                    a = n.find(`span`).text().trim();
                return { title: n.find(`a`).text().trim(), link: i ? new URL(i, c).href : c, pubDate: r(t(a, `YYYY年MM月DD日`), 8), description: `` };
            }),
        d = await Promise.all(u.map((t) => e.tryGet(t.link, async () => ((t.description = i((await n({ method: `get`, url: t.link })).data)(`#vsb_content_2 .v_news_content`).html() || `内容无法提取`), t))));
    return { title: a[s].title, description: a[s].title, link: a[s].url, image: `https://www.shu.edu.cn/__local/0/08/C6/1EABE492B0CF228A5564D6E6ABE_779D1EE3_5BF7.png`, item: d };
}
export { o as route };
