import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://cs.xidian.edu.cn`,
    a = {
        xyxw: { selector: { list: `.n_wenzhang ul li` }, name: `主页-学院新闻`, path: `/xyxw` },
        tzgg: { selector: { list: `.n_wenzhang ul li` }, name: `主页-通知公告`, path: `/tzgg` },
        jlhz1: { selector: { list: `.n_wenzhang ul li` }, name: `主页-交流合作`, path: `/jlhz1` },
        rsrc: { selector: { list: `.n_wenzhang ul li` }, name: `主页-人事人才`, path: `rsrc` },
        bkjy_jxxw: { selector: { list: `.n_wenzhang ul li` }, name: `主页-本科生教育 / 本科教育-教学新闻`, path: `bkjy/jxxw` },
        yjsjy_yjstz: { selector: { list: `.n_wenzhang ul li` }, name: `主页-研究生教育 / 研究生教育-研究生通知`, path: `yjsjy/yjstz` },
        jyzhaop: { selector: { list: `.n_wenzhang ul li` }, name: `主页-就业招聘`, path: `jyzhaop` },
    },
    o = {
        path: `/cs/:category?`,
        categories: [`university`],
        example: `/xidian/cs/xyxw`,
        parameters: { category: `通知类别，默认为主页-学院新闻` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `计算机科学与技术学院`,
        url: `cs.xidian.edu.cn`,
        maintainers: [`ZiHao256`],
        handler: s,
        description: `| 文章来源                   | 参数          |
| ---------------------- | ----------- |
| ✅主页-学院新闻                | xyxw        |
| ✅主页-通知公告                | tzgg        |
| ✅主页-交流合作                | jlhz1       |
| ✅主页-人事人才                | rsrc        |
| ✅主页-本科生教育 / 本科教育-教学新闻   | bkjy_jxxw   |
| ✅主页-研究生教育 / 研究生教育-研究生通知 | yjsjy_yjstz |
| ✅主页-就业招聘                | jyzhaop     |`,
        radar: [{ source: [`cs.xidian.edu.cn/`] }],
    };
async function s(o) {
    let { category: s = `xyxw` } = o.req.param(),
        c = `${i}/${a[s].path}.htm`,
        l = r((await n(c, { headers: { referer: i }, https: { rejectUnauthorized: !1 } })).data),
        u = l(a[s].selector.list)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`a`).text(), link: new URL(e.find(`a`).attr(`href`), i).href, pubDate: t(e.find(`span`).text()) }));
    return (
        (u = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link, { headers: { referer: c }, https: { rejectUnauthorized: !1 } })).data);
                    return (e(`.content-sxt`).remove(), (t.description = e(`[name="_newscontent_fromname"]`).html()), t);
                })
            )
        )),
        { title: l(`title`).text(), link: c, item: u }
    );
}
export { o as route };
