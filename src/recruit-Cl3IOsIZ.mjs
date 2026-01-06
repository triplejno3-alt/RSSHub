import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
        xwrd: `home!newsHome.action?category=12`,
        tzgg: `home!newsHome.action?category=13`,
        zpxx: `home!recruit.action?category=1&jobType=110001`,
        sxxx: `home!recruitList.action?category=2&jobType=110001`,
        cyxx: `home!newsHome.action?category=11`,
    },
    a = `https://scc.pku.edu.cn/`,
    o = {
        path: `/scc/recruit/:type?`,
        categories: [`university`],
        example: `/pku/scc/recruit/zpxx`,
        parameters: { type: '分区，见下表，默认请求 `zpxx`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `学生就业指导服务中心`,
        maintainers: [`DylanXie123`],
        handler: s,
        description: `| xwrd     | tzgg     | zpxx     | sxxx     | cyxx     |
| -------- | -------- | -------- | -------- | -------- |
| 新闻热点 | 通知公告 | 招聘信息 | 实习信息 | 创业信息 |`,
    };
async function s(o) {
    let s = a + i[o.req.param(`type`) ?? `zpxx`],
        c = r((await n(s)).data),
        l = c(`h2.category`).text(),
        u = c(`div#articleList-body div.item.clearfix`)
            .toArray()
            .map((e) => {
                e = c(e);
                let n = e.find(`a`),
                    r = t(e.find(`div.item-date`).text());
                return { title: n.text(), link: new URL(n.attr(`href`), a).href, pubDate: r };
            })
            .toSorted((e, t) => t.pubDate.getTime() - e.pubDate.getTime())
            .slice(0, 10);
    return {
        title: `北京大学学生就业指导服务中心 - ${l}`,
        link: s,
        item: await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data)(`div#content-div script`).html();
                    if (e !== null) {
                        let r = e.match(/\$\("#content-div"\).load\("(\S+)"\)/)[1];
                        t.description = (await n(new URL(r, a).href)).data;
                    }
                    return t;
                })
            )
        ),
    };
}
export { o as route };
