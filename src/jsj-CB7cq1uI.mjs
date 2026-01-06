import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { news: `6277`, scholar: `6278`, states: `6279`, notice: `6280` },
    o = { news: `学院新闻`, scholar: `学术关注`, states: `学工动态`, notice: `通知公告` },
    s = {
        path: `/jsj/:type`,
        categories: [`university`],
        example: `/upc/jsj/news`,
        parameters: { type: `分类，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `计算机科学与技术学院`,
        maintainers: [`Veagau`],
        handler: c,
        description: `| 学院新闻 | 学术关注 | 学工动态 | 通知公告 |
| -------- | -------- | -------- | -------- |
| news     | scholar  | states   | notice   |`,
    };
async function c(s) {
    let c = `https://computer.upc.edu.cn`,
        l = s.req.param(`type`),
        u = `${c}/${a[l]}/list.htm`,
        d = i((await n({ method: `get`, url: u })).data),
        f = d(`.list tbody table tr`)
            .toArray()
            .map((e) => {
                e = d(e);
                let n = e.find(`a`),
                    r = n.attr(`href`);
                return { title: n.attr(`title`), link: r.startsWith(`http`) ? r : `${c}${r}`, pubDate: t(e.find(`div[style]`).text(), `YYYY-MM-DD`) };
            }),
        p = await Promise.all(
            f.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data);
                    return ((a.description = e(`.v_news_content, .wp_articlecontent`).html()), (a.pubDate = e(`.nr-xinxi i`).first().length ? r(t(e(`.nr-xinxi i`).first().text(), `YYYY-MM-DD HH:mm:ss`), 8) : a.pubDate), a);
                })
            )
        );
    return { title: o[l] + `-计算机科学与技术学院`, link: u, description: o[l] + `-计算机科学与技术学院`, item: p };
}
export { s as route };
