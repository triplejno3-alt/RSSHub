import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
import a from 'p-map';
const o = {
    path: `/default`,
    categories: [`bbs`],
    example: `/guozaoke/default`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `过早客`,
    maintainers: [`xiaoshame`],
    handler: s,
    url: `guozaoke.com/`,
};
async function s() {
    let o = `https://www.guozaoke.com/`,
        s = i((await r({ method: `get`, url: o, headers: { Cookie: e.guozaoke.cookies, 'User-Agent': e.ua } })).data);
    return {
        title: `过早客`,
        link: o,
        item: await a(
            s(`div.topic-item`)
                .toArray()
                .slice(0, 20)
                .map((e) => {
                    let t = s(e),
                        r = t.find(`h3.title a`).text(),
                        i = t.find(`h3.title a`).attr(`href`),
                        a = t.find(`span.username a`).text(),
                        o = n(t.find(`span.last-touched`).text()),
                        c = i ? i.split(`#`)[0] : void 0;
                    return c ? { title: r, link: c, author: a, pubDate: o } : void 0;
                })
                .filter((e) => e !== void 0),
            (n) =>
                t.tryGet(n.link, async () => {
                    let t = i((await r({ method: `get`, url: `https://www.guozaoke.com${n.link}`, headers: { Cookie: e.guozaoke.cookies } })).data),
                        a = t(`div.ui-content`).html();
                    a = a ? a.trim() : ``;
                    let o = t(`.reply-item`).map((e, n) => {
                        let r = t(n);
                        return { comment: r.find(`span.content`).text().trim(), author: r.find(`span.username`).text() };
                    });
                    if (o && o.length > 0) for (let e of o) a += `<br>` + e.author + `: ` + e.comment;
                    return ((n.description = a), n);
                }),
            { concurrency: 2 }
        ),
    };
}
export { o as route };
