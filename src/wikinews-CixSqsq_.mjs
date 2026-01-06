import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://zh.wikinews.org/wiki/Special:%E6%96%B0%E9%97%BB%E8%AE%A2%E9%98%85`,
    a = {
        path: `/latest`,
        categories: [`new-media`],
        example: `/wikinews/latest`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`zh.wikinews.org/wiki/Special:新闻订阅`] }],
        name: `最新新闻`,
        maintainers: [`KotoriK`],
        handler: o,
        description: `根据维基新闻的[sitemap](https://zh.wikinews.org/wiki/Special:%E6%96%B0%E9%97%BB%E8%AE%A2%E9%98%85)获取新闻全文。目前仅支持中文维基新闻。`,
    };
async function o() {
    let a = r((await n(i)).data),
        o = a(`url`)
            .toArray()
            .map(
                (e) => (
                    (e = a(e)),
                    {
                        title: e.find(String.raw`news\:title`).text(),
                        pubDate: t(e.find(String.raw`news\:publication_date`).text()),
                        category: e
                            .find(String.raw`news\:keywords`)
                            .text()
                            .split(`,`)
                            .map((e) => e.trim()),
                        link: e.find(`loc`).text(),
                    }
                )
            );
    return { title: `最新新闻 - 维基新闻`, link: i, item: await Promise.all(o.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n(t.link)).data)(`#bodyContent`).html()), t)))) };
}
export { a as route };
