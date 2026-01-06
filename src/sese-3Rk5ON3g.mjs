import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://sese.nuist.edu.cn`,
    a = {
        path: `/sese/:category?`,
        categories: [`university`],
        example: `/nuist/sese/tzgg1`,
        parameters: { category: `默认为通知公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `NUIST ESE（南信大环科院）`,
        maintainers: [`gylidian`],
        handler: o,
        description: `| 通知公告 | 新闻快讯 | 学术动态 | 学生工作 | 研究生教育 | 本科教育 |
| -------- | -------- | -------- | -------- | ---------- | -------- |
| tzgg1    | xwkx     | xsdt1    | xsgz1    | yjsjy1     | bkjy1    |`,
    };
async function o(a) {
    let { category: o = `tzgg1` } = a.req.param(),
        s = `${i}/${o}.htm`,
        c = r((await n(s)).data),
        l = c(`#ctl00_ctl00_mainbody_rightbody_listcontent_NewsList .gridline`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.find(`a`).eq(1).text(), link: new URL(e.find(`a`).eq(1).attr(`href`), i).href, category: e.find(`a`).eq(0).text(), pubDate: t(c(e).find(`.gridlinedate`).text(), `YYYY年MM月DD日`) })),
        u = await Promise.all(l.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n(t.link)).data)(`#vsb_content_6`).html()), t))));
    return { title: `NUIST ESE（南信大环科院）：` + c(`.lmtitle`).text(), description: c(`meta[name=description]`).attr(`content`), link: s, item: u };
}
export { a as route };
