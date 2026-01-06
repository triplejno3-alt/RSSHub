import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
    path: `/news`,
    categories: [`other`],
    example: `/fisher-spb/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`fisher.spb.ru/news`] }],
    name: `News`,
    maintainers: [`denis-ya`],
    handler: c,
    url: `fisher.spb.ru/news`,
};
async function c() {
    let s = (e) => o(i(n, { children: [r(`iframe`, { type: `text/html`, width: `640`, height: `360`, src: `https://youtube.com/embed/${e}`, frameborder: `0`, allowfullscreen: !0 }), r(`br`, {})] })),
        c = (e) => o(i(n, { children: [r(`img`, { style: `max-width: 650px; height: auto; object-fit: contain; flex: 0 0 auto;`, src: e }), r(`br`, {})] })),
        l = `https://fisher.spb.ru/news/`,
        u = a((await t({ method: `get`, url: l, responseType: `buffer` })).data),
        d = (e) => {
            let t = a(`<p>${u(`.news-message-text`, e).html()}</p>`).root();
            return (
                u(`.news-message-media a`, e).each((e, n) => {
                    u(n).hasClass(`news-message-youtube`) ? t.append(s(u(n).attr(`data-youtube`))) : t.append(c(u(n).attr(`href`)));
                }),
                t
            );
        },
        f = u(`.news-message`)
            .toArray()
            .map((t) => ({
                pubDate: e(u(`.news-message-date`, t).text().trim(), `DD.MM.YYYY HH:mm`),
                title: u(`.news-message-location`, t).text().trim(),
                description: d(t).html(),
                author: u(`.news-message-user`, t).text().trim(),
                guid: u(t).attr(`id`),
                link: l + u(`.news-message-comments-number > a`, t).attr(`href`),
            }));
    return { title: u(`head > title`).text().trim(), link: l, item: f };
}
export { s as route };
