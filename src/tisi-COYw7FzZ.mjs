import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://www.tisi.org`,
    a = {
        path: `/latest`,
        categories: [`new-media`],
        example: `/tisi/latest`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `最近更新`,
        maintainers: [`Fatpandac`],
        handler: o,
    };
async function o() {
    let a = `${i}/?page_id=11151`,
        o = r((await n(a)).data),
        s = o(`div.new-artice-list-box`)
            .toArray()
            .map((e) => ({
                title: o(e).find(`p.new-article-title > a`).text(),
                link: new URL(o(e).find(`p.new-article-title > a`).attr(`href`), i).href,
                pubDate: t(o(e).find(`p.new-article-date > span.left-span`).text()),
                category: o(e).find(`p.new-article-date > span:nth-child(1)`).text(),
            }));
    return { title: `腾讯研究院 - 最近更新`, link: a, item: await Promise.all(s.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n(t.link)).data)(`div.article-content`).html()), t)))) };
}
export { a as route };
