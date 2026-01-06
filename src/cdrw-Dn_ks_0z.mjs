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
    path: `/cdrw`,
    categories: [`university`],
    example: `/cdu/cdrw`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`news.cdu.edu.cn/`] }],
    name: `成大人物`,
    maintainers: [`uuwor`],
    handler: o,
    url: `news.cdu.edu.cn/`,
};
async function o() {
    let a = `https://news.cdu.edu.cn`,
        o = `${a}/cdrw.htm`,
        s = i((await n.get(o)).data),
        c = s(`.row-f1 ul.ul-mzw-news-a2 li a.con`)
            .slice(0, 10)
            .toArray()
            .map((e) => {
                let n = s(e),
                    i = n.attr(`title`) || n.find(`.tit`).text().trim(),
                    o = n.attr(`href`),
                    c = r(t(n.find(`.date`).text().trim()), 8);
                return { title: i, link: o.startsWith(`http`) ? o : new URL(o, a).href, pubDate: c, author: `成都大学新闻网` };
            });
    return {
        title: `人物`,
        link: o,
        item: await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n.get(t.link)).data)(`.v_news_content`);
                    return (e.find(`*[style*="text-align: right"]`).remove(), (t.description = e.html()), t);
                })
            )
        ),
    };
}
export { a as route };
