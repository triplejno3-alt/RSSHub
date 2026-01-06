import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `http://news.tju.edu.cn/`,
    o = `https://github.com/DIYgod/RSSHub/issues`,
    s = (e) => (e === void 0 ? `unknown` : e.startsWith(`http`) ? (new URL(e).hostname === `news.tju.edu.cn` ? `tju-news` : `unknown`) : `in-site`),
    c = {
        path: `/news/:type?`,
        categories: [`university`],
        example: `/tju/news/focus`,
        parameters: { type: 'default `focus`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `News`,
        maintainers: [`AlanZeng423`, `SuperPung`],
        handler: l,
        description: `| Focus on TJU | General News | Internal News | Media Report | Pictures of TJU |
| :----------: | :----------: | :-----------: | :----------: | :-------------: |
|     focus    |    general   |    internal   |     media    |     picture     |`,
    };
async function l(c) {
    let l = c.req.param(`type`),
        u,
        d;
    switch (l) {
        case `focus`:
            ((d = `聚焦天大`), (u = `jjtd.htm`));
            break;
        case `general`:
            ((d = `综合新闻`), (u = `zhxw.htm`));
            break;
        case `internal`:
            ((d = `校内新闻`), (u = `xnxw1/qb.htm`));
            break;
        case `media`:
            ((d = `媒体报道`), (u = `mtbd.htm`));
            break;
        case `picture`:
            ((d = `图说天大`), (u = `tstd.htm`));
            break;
        default:
            ((d = `聚焦天大`), (u = `jjtd.htm`));
    }
    let f = null;
    try {
        f = await n(a + u, { headers: { Referer: a } });
    } catch {}
    if (f === null) return { title: `天津大学新闻网 - ` + d, link: a + u, description: `链接失效` + a + u, item: [{ title: `提示信息`, link: o, description: `<h2>请到<a href=${o}>此处</a>提交Issue</h2>` }] };
    {
        let o = i(f.data),
            c;
        ((c = l === `picture` ? o(`.picList > li`).toArray() : o(`.indexList > li`).toArray()),
            (c = c.map((e) => {
                let t = o(`h4 > a`, e).attr(`href`),
                    n = s(t);
                return { title: o(`h4 > a`, e).text(), link: n === `in-site` ? a + t : t, type: n };
            })));
        let p = await Promise.all(
            c.map((a) => {
                switch (a.type) {
                    case `tju-news`:
                    case `in-site`:
                        return e.tryGet(a.link, async () => {
                            let e = null;
                            try {
                                (delete a.type, (e = await n(a.link)));
                                let o = i(e.data);
                                ((a.pubDate = r(
                                    t(
                                        o(`.contentTime`)
                                            .text()
                                            .match(/\d{4}-\d{2}-\d{2}/)[0],
                                        `YYYY-MM-DD`
                                    ),
                                    8
                                )),
                                    (a.description = o(`.v_news_content`).html()));
                            } catch {}
                            return a;
                        });
                    default:
                        return a;
                }
            })
        );
        return { title: `天津大学新闻网 - ` + d, link: a + u, item: p };
    }
}
export { c as route };
