import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { t as r } from './pypasswaf-rqcG5Yn_.mjs';
import { load as i } from 'cheerio';
const a = `https://cae.nuaa.edu.cn/`,
    o = new Map([
        [`zhxw`, { title: `综合新闻 | 南京航空航天大学自动化学院`, suffix: `5399/list.htm` }],
        [`dwxz`, { title: `党委行政 | 南京航空航天大学自动化学院`, suffix: `13266/list.htm` }],
        [`rshz`, { title: `人事/合作 | 南京航空航天大学自动化学院`, suffix: `13267/list.htm` }],
        [`yjs`, { title: `研究生培养 | 南京航空航天大学自动化学院`, suffix: `13271/list.htm` }],
        [`bks`, { title: `本科生培养 | 南京航空航天大学自动化学院`, suffix: `13270/list.htm` }],
        [`xsgz`, { title: `学生工作 | 南京航空航天大学自动化学院`, suffix: `13268/list.htm` }],
        [`tzgg`, { title: `通知公告 | 南京航空航天大学自动化学院`, suffix: `13264/list.htm` }],
        [`xsxx`, { title: `学术信息 | 南京航空航天大学自动化学院`, suffix: `13265/list.htm` }],
        [`dbgg`, { title: `答辩公告 | 南京航空航天大学自动化学院`, suffix: `dbgg/list.htm` }],
    ]),
    s = { path: `/cae/:type/:getDescription?`, name: `Unknown`, maintainers: [`Xm798`], handler: c };
async function c(s) {
    let c = s.req.param(`type`),
        l = o.get(c).suffix,
        u = !!s.req.param(`getDescription`) || !1,
        d = new URL(l, a).href,
        f = { headers: { cookie: await r(a) } },
        p = i((await n(d, f)).data),
        m = p(`#wp_news_w6 ul li`)
            .slice(0, 10)
            .toArray()
            .map((e) => ({ title: p(e).find(`a`).text(), link: p(e).find(`a`).attr(`href`), date: p(e).find(`span`).text() })),
        h = await Promise.all(
            m.map(async (r) => {
                let o = r.title || `tzgg`,
                    s = r.date,
                    c = new URL(r.link, a).href,
                    l = o + `<br><a href="` + c + `" target="_blank">查看原文</a>`;
                return (
                    u &&
                        (l = await e.tryGet(c, async () => {
                            let e = c.split(`.`).at(-1);
                            if (e === `htm` || e === `html`) return i((await n(c, f)).data)(`.wp_articlecontent`).html() + `<br><hr /><a href="` + c + `" target="_blank">查看原文</a>`;
                        })),
                    { title: o, link: c, description: l, pubDate: t(s) }
                );
            })
        );
    return { title: o.get(c).title, link: d, description: `南京航空航天大学自动化学院RSS`, item: h };
}
export { s as route };
