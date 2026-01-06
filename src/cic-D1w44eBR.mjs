import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `http://cic.tju.edu.cn/`,
    o = `https://github.com/DIYgod/RSSHub/issues`,
    s = (e) => (e.startsWith(`http`) ? (new URL(e).hostname === `cic.tju.edu.cn` ? `tju-cic` : `unknown`) : `in-site`),
    c = {
        path: `/cic/:type?`,
        categories: [`university`],
        example: `/tju/cic/news`,
        parameters: { type: 'default `news`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `College of Intelligence and Computing`,
        maintainers: [`AlanZeng423`, `SuperPung`],
        handler: l,
        description: `| College News | Notification | TJU Forum for CIC |
| :----------: | :----------: | :---------------: |
|     news     | notification |       forum       |`,
    };
async function l(c) {
    let l = c.req.param(`type`),
        u,
        d;
    switch (l) {
        case `news`:
            ((d = `学部新闻`), (u = `xwzx/xyxw.htm`));
            break;
        case `notification`:
            ((d = `通知公告`), (u = `xwzx/tzgg.htm`));
            break;
        case `forum`:
            ((d = `北洋智算论坛`), (u = `byzslt.htm`));
            break;
        default:
            ((d = `学部新闻`), (u = `xwzx/xyxw.htm`));
    }
    let f = null;
    try {
        f = await n(a + u, { headers: { Referer: a } });
    } catch {}
    if (f === null) return { title: `天津大学智能与计算学部 - ` + d, link: a + u, description: `链接失效` + a + u, item: [{ title: `提示信息`, link: o, description: `<h2>请到<a href=${o}>此处</a>提交Issue</h2>` }] };
    {
        let o = i(f.data),
            c = o(`.wenzi_list_ul > li`)
                .toArray()
                .map((e) => {
                    let t = o(`a`, e).attr(`href`),
                        n = s(t);
                    return { title: o(`a`, e).text(), link: n === `in-site` ? a + t : t, type: n };
                }),
            l = await Promise.all(
                c.map((a) => {
                    switch (a.type) {
                        case `tju-cic`:
                        case `in-site`:
                            return e.tryGet(a.link, async () => {
                                let e = null;
                                try {
                                    e = await n(a.link);
                                    let o = i(e.data);
                                    ((a.pubDate = r(t(o(`.news_info > span`).first().text(), `YYYY年MM月DD日 HH:mm`), 8)), o(`.news_tit`).remove(), o(`.news_info`).remove(), (a.description = o(`.con_news_body > div`).html()));
                                } catch {}
                                return a;
                            });
                        default:
                            return a;
                    }
                })
            );
        return { title: `天津大学智能与计算学部 - ` + d, link: a + u, description: null, item: l };
    }
}
export { c as route };
