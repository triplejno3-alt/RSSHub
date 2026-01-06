import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://cs.whu.edu.cn`,
    o = {
        path: `/cs/:type`,
        categories: [`university`],
        example: `/whu/cs/2`,
        parameters: { type: `公告类型，详见表格` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `计算机学院公告`,
        maintainers: [`ttyfly`],
        handler: s,
        description: `| 公告类型 | 学院新闻 | 学术交流 | 通知公告 | 科研进展 |
| -------- | -------- | -------- | -------- | -------- |
| 参数     | 0        | 1        | 2        | 3        |`,
    };
async function s(o) {
    let s = Number.parseInt(o.req.param(`type`)),
        c;
    switch (s) {
        case 0:
            c = `${a}/xwdt/xyxw.htm`;
            break;
        case 1:
            c = `${a}/kxyj/xsjl.htm`;
            break;
        case 2:
            c = `${a}/xwdt/tzgg.htm`;
            break;
        case 3:
            c = `${a}/kxyj/kyjz.htm`;
            break;
        default:
            throw Error(`Unknown type: ${s}`);
    }
    let l = i((await n(c)).data),
        u = l(`div.study ul li`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`a p`).text().trim(), pubDate: t(e.find(`span`).text()), link: new URL(e.find(`a`).attr(`href`), c).href })),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    let e;
                    try {
                        e = await n(a.link);
                    } catch {
                        return null;
                    }
                    let o = i(e.data);
                    if (o(`.prompt`).length) return ((a.description = o(`.prompt`).html()), a);
                    let s = o(`.content`);
                    return (
                        s.find(`img`).each((e, t) => {
                            if (((t = o(t)), t.attr(`orisrc`))) {
                                let e = new URL(t.attr(`orisrc`), `https://cs.whu.edu.cn`);
                                (t.attr(`src`, e.href), t.removeAttr(`orisrc`), t.removeAttr(`vurl`));
                            }
                        }),
                        (a.description = s.html()),
                        (a.pubDate = o(`meta[name="PubDate"]`).length ? r(t(o(`meta[name="PubDate"]`).attr(`content`)), 8) : a.pubDate),
                        a
                    );
                })
            )
        );
    return ((d = d.filter((e) => e !== null)), { title: l(`title`).first().text(), link: c, item: d });
}
export { o as route };
