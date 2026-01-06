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
        zhxw: { title: `上海大学研究生院-综合新闻`, url: `https://gs.shu.edu.cn/xwlb/zh.htm` },
        pygl: { title: `上海大学研究生院-培养管理`, url: `https://gs.shu.edu.cn/xwlb/py.htm` },
        gjjl: { title: `上海大学研究生院-国际交流`, url: `https://gs.shu.edu.cn/xwlb/gjjl.htm` },
    },
    o = {
        path: `/gs/:type?`,
        categories: [`university`],
        example: `/shu/gs/zhxw`,
        parameters: { type: `分类，默认为学术公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`gs.shu.edu.cn/`], target: `/gs` }],
        name: `研究生院`,
        maintainers: [`GhhG123`],
        handler: s,
        url: `gs.shu.edu.cn/`,
        description: `| 综合新闻 | 培养管理 | 国际交流 |
| -------- | --------- | --------- |
| zhxw     | pygl      | gjjl      |`,
    };
async function s(o) {
    let s = o.req.param(`type`) ?? `zhxw`,
        c = `https://gs.shu.edu.cn`,
        l = i((await n({ method: `get`, url: a[s].url })).data),
        u = l(`tr[id^="line_u17_"]`)
            .toArray()
            .map((e) => {
                let n = l(e),
                    i = n.find(`a`).attr(`href`),
                    a = n.find(`a`).text().trim(),
                    o = n.find(`td`).eq(1).text().trim();
                return { title: a, link: i ? new URL(i, c).href : c, pubDate: r(t(o, `YYYY/MM/DD HH:mm:ss`), 8), description: n.find(`td`).eq(2).text().trim() };
            }),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () =>
                    new URL(t.link).hostname === `gs1.shu.edu.cn`
                        ? ((t.description = `gs1.shu.edu.cn, 无法直接获取`), t)
                        : ((t.description = i((await n({ method: `get`, url: t.link })).data)(`#vsb_content .v_news_content`).html() || t.description), t)
                )
            )
        );
    return { title: a[s].title, description: a[s].title, link: a[s].url, image: `https://www.shu.edu.cn/__local/0/08/C6/1EABE492B0CF228A5564D6E6ABE_779D1EE3_5BF7.png`, item: d };
}
export { o as route };
