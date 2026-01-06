import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import o from 'aes-js';
const s = {
    path: `/search/:wd`,
    categories: [`shopping`],
    example: `/duozhuayu/search/JavaScript`,
    parameters: { wd: `搜索关键词` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`duozhuayu.com/search/book/:wd`] }],
    name: `搜索结果`,
    maintainers: [`fengkx`],
    handler: c,
};
async function c(s) {
    let c = s.req.param(`wd`),
        l = `https://www.duozhuayu.com`,
        u = `book`,
        d = `${l}/search/${u}/${c}`,
        f = [...`DkOliWvFNR7C4WvR`].map((e) => e.charCodeAt()),
        p = [...`GQWKUE2CVGOOBKXU`].map((e) => e.charCodeAt()),
        m = new o.ModeOfOperation.cfb(f, p),
        h = (e) => {
            let t = o.utils.utf8.toBytes(e),
                n = m.encrypt(t);
            return o.utils.hex.fromBytes(n);
        },
        g = (
            await t({
                method: `get`,
                url: `${l}/api/search/book`,
                searchParams: { type: `normal`, q: c },
                headers: (() => {
                    let e = Date.now(),
                        t = Math.floor(1e8 * Math.random()),
                        n = h([e, 0, t].join(`:`)),
                        r = [0, e, Math.round(1e5 * Math.random())].join(`-`);
                    return {
                        'x-api-version': `0.0.48`,
                        'x-refer-request-id': r,
                        'x-request-id': r,
                        'x-request-misc': `{"platform":"browser","originSource":"search","originFrom":"normal","webVersion":"1.2.201774"}`,
                        'x-request-token': n,
                        'x-security-key': t,
                        'x-timestamp': e,
                        'x-user-id': 0,
                    };
                })(),
            })
        ).data.data
            .filter((e) => e.type === u)
            .map(({ [u]: t }) => ({
                title: t.title,
                link: `${l}/books/${t.id}`,
                pubDate: e(t.updated),
                description: a(
                    i(`div`, {
                        children: [
                            r(`img`, { src: t.images.origin }),
                            r(`br`, {}),
                            `书名：`,
                            t.title,
                            ` `,
                            t.originalTitle,
                            r(`br`, {}),
                            t.subtitle ? i(n, { children: [t.subtitle, r(`br`, {})] }) : null,
                            `作者：`,
                            t.rawAuthor,
                            r(`br`, {}),
                            t.translators?.length ? i(n, { children: [`译者：`, t.translators.map((e) => e.name).join(` / `), r(`br`, {})] }) : null,
                            `ISBN：`,
                            t.isbn13,
                            r(`br`, {}),
                            `出版社：`,
                            t.publisher,
                            r(`br`, {}),
                            `出版时间：`,
                            t.publishDate,
                            r(`br`, {}),
                            `豆瓣评分：`,
                            t.doubanRating,
                            r(`br`, {}),
                            `价格：`,
                            (t.price / 100).toFixed(2),
                            `元起 `,
                            i(`del`, { children: [(t.originalPrice / 100).toFixed(2), `元`] }),
                        ],
                    })
                ),
            }));
    return { title: `多抓鱼搜索-${c}`, link: d, description: `多抓鱼搜索-${c}`, item: g };
}
export { s as route };
