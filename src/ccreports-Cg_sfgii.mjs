import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.ccreports.com.cn`,
    o = {
        path: `/article`,
        categories: [`shopping`],
        example: `/ccreports/article`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.ccreports.com.cn/`] }],
        name: `要闻`,
        maintainers: [`EsuRt`, `Fatpandac`],
        handler: s,
        url: `www.ccreports.com.cn/`,
    };
async function s() {
    let o = i((await n.get(a)).data),
        s = o(`div.index-four-content > div.article-box`)
            .find(`div.new-child`)
            .toArray()
            .map((e) => ({
                title: o(e).find(`p.new-title`).text(),
                link: new URL(o(e).find(`a`).attr(`href`), a).href,
                author: o(e)
                    .find(`p.new-desc`)
                    .text()
                    .match(/作者：(.*?)\s/)[1],
            }));
    return {
        title: `消费者报道`,
        link: a,
        item: await Promise.all(
            s.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n.get(a.link)).data);
                    return ((a.description = e(`div.pdbox`).html()), (a.pubDate = r(t(e(`div.newbox > div.newtit > p`).text(), `YYYY-MM-DD HH:mm:ss`), 8)), a);
                })
            )
        ),
    };
}
export { o as route };
