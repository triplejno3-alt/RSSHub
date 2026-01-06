import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `http://www.cmse.sdu.edu.cn/`,
    a = [`通知公告`, `学院新闻`, `本科生教育`, `研究生教育`, `学术动态`],
    o = [`zxzx/tzgg.htm`, `zxzx/xyxw.htm`, `zxzx/bksjy.htm`, `zxzx/yjsjy.htm`, `zxzx/xsdt.htm`],
    s = {
        path: `/cmse/:type?`,
        categories: [`university`],
        example: `/sdu/cmse/0`,
        parameters: { type: '默认为 `0`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `材料科学与工程学院通知`,
        maintainers: [`Ji4n1ng`],
        handler: c,
        description: `| 通知公告 | 学院新闻 | 本科生教育 | 研究生教育 | 学术动态 |
| -------- | -------- | ---------- | ---------- | -------- |
| 0        | 1        | 2          | 3          | 4        |`,
    };
async function c(s) {
    let c = s.req.param(`type`) ? Number.parseInt(s.req.param(`type`)) : 0,
        l = new URL(o[c], i).href,
        u = r((await n(l)).data),
        d = u(`.article_list li`)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e.find(`a`);
                return { title: n.text().trim(), link: n.attr(`href`), pubDate: t(e.find(`.date`).text(), `YYYY/MM/DD`) };
            });
    return (
        (d = await Promise.all(
            d
                .filter((e) => e.link.startsWith(`../info`))
                .map(
                    (t) => (
                        (t.link = new URL(t.link.slice(`3`), i).href),
                        e.tryGet(t.link, async () => {
                            let e = r((await n(t.link)).data);
                            return (
                                (t.title = e(`.contentTitle`).text()),
                                (t.author =
                                    e(`.contentTitle2`)
                                        .find(`span`)
                                        .eq(1)
                                        .text()
                                        .trim()
                                        .match(/作者：(.*)/)[1] || `山东大学材料科学与工程学院`),
                                e(`.contentTitle, .contentTitle2`).remove(),
                                (t.description = e(`.content_detail`).html()),
                                t
                            );
                        })
                    )
                )
        )),
        { title: `山东大学材料科学与工程学院${a[c]}`, description: u(`title`).text(), link: l, item: d }
    );
}
export { s as route };
