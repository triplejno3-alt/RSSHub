import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = (e) => {
        let t = (e, t) => Number.parseInt(e.slice(t, t + 2), 16),
            n = ``,
            r = t(e, 0);
        for (let i = 2; i < e.length; i += 2) {
            let a = t(e, i) ^ r;
            n += String.fromCharCode(a);
        }
        return n;
    },
    a = {
        path: `/journal/:id`,
        categories: [`journal`],
        example: `/sciencedirect/journal/research-policy`,
        parameters: { id: `Journal id, can be found in URL` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`sciencedirect.com/journal/:id`, `sciencedirect.com/`] }],
        name: `Journal`,
        maintainers: [`nczitzk`],
        handler: o,
    };
async function o(a) {
    let o = a.req.param(`id`),
        s = `https://www.sciencedirect.com`,
        c = `${s}/journal/${o}/articles-in-press`,
        l = await n({ method: `get`, url: c }),
        u = (
            await n({
                method: `get`,
                url: `${s}/journal/${l.data.match(/ISSN(\w{8})'/)[1]}/articles-in-press/articles?path=/journal/${o}/articles-in-press&title=${o}`,
                headers: { cookie: l.headers[`set-cookie`].map((e) => e.split(`;Version=1;`)[0]).join(`; `) },
            })
        ).data.data.results.map((e) => ({
            doi: e.doi,
            title: e.title,
            link: `${s}${e.href}`,
            pubDate: t(e.coverDateStart),
            enclosure_url: `${s}${e.pdfDownload.url}`,
            author: e.authors.map((e) => `${e.givenName} ${e.surname}`).join(`, `),
        })),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n({ method: `get`, url: t.link })).data);
                    return (
                        e(`a.__cf_email__`).each((t, n) => {
                            ((n = e(n)), n.after(i(n.attr(`data-cfemail`))), n.remove());
                        }),
                        (t.description = (e(`.Abstracts`).html() ?? ``) + (e(`.Keywords`).html() ?? ``)),
                        t
                    );
                })
            )
        );
    return { title: `${l.data.match(/\\"displayName\\":\\"(.*?)\\",\\"/)[1]} - ScienceDirect`, link: c, item: d };
}
export { a as route };
