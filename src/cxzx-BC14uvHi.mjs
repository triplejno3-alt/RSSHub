import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './utils-CL2wn9gY.mjs';
import { load as i } from 'cheerio';
const a = { path: `/cxzx/:types?`, name: `Unknown`, maintainers: [`wenjia03`], handler: o };
async function o(a) {
    let { types: o = `xkjs` } = a.req.param(),
        s = {
            tzgg: { url: `https://cxzx.jsu.edu.cn/xwzx.htm`, title: `通知公告` },
            xkjs: { url: `https://cxzx.jsu.edu.cn/xwzx/zxdt.htm`, title: `学科竞赛公告` },
            cxtz: { url: `https://cxzx.jsu.edu.cn/cxlt/xsjz1.htm`, title: `创新项目公告` },
            jsxw: { url: `https://cxzx.jsu.edu.cn/cxjs.htm`, title: `竞赛新闻` },
            jstz: { url: `https://cxzx.jsu.edu.cn/cxjs/xkjs.htm`, title: `竞赛新闻 -> 通知公告` },
        },
        c = i((await n({ method: `get`, url: s[o].url })).data),
        l = c(`tr[height="20"]`).toArray(),
        u = await Promise.all(
            l.map((n) => {
                n = c(n);
                let i = new URL(n.find(`td:nth-child(2) > a`).attr(`href`), `https://cxzx.jsu.edu.cn/`).href;
                return e.tryGet(i, async () => {
                    let e = n.find(`td:nth-child(2) > a`).text() || `无标题`,
                        a = s[o].title,
                        c = await r(
                            `#vsb_newscontent`,
                            i,
                            `body > div.cx_big_container > div.cx_content_container > div.cx_right_part > div.viewbox > form > table > tbody > tr:nth-child(1) > td`,
                            `body > div.cx_big_container > div.cx_content_container > div.cx_right_part > div.viewbox > form > table > tbody > tr:nth-child(2) > td > span.timestyle134612`
                        );
                    return { title: e, link: i, pubDate: t(c.date), description: c.pageInfo, category: a };
                });
            })
        );
    return { title: `吉首大学创新中心 - ${s[o].title}`, link: s[o].url, description: `吉首大学创新中心`, item: u };
}
export { a as route };
