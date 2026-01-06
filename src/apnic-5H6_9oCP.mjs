import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/blog`, categories: [`blog`], example: `/apnic/blog`, url: `blog.apnic.net`, name: `Blog`, maintainers: [`p3psi-boo`], handler: a };
async function a() {
    let i = `https://blog.apnic.net`,
        a = r((await n(`${i}/feed/`)).data, { xmlMode: !0 }),
        o = a(`item`)
            .toArray()
            .map((e) => {
                let n = a(e);
                return {
                    title: n.find(`title`).text(),
                    link: n.find(`link`).text(),
                    author: n.find(String.raw`dc\:creator`).text(),
                    category:
                        n
                            .find(`category`)
                            .text()
                            .match(/>([^<]+)</)?.[1] || ``,
                    pubDate: t(n.find(`pubDate`).text()),
                };
            });
    return {
        title: `APNIC Blog`,
        link: i,
        item: await Promise.all(
            o.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link);
                    return ((t.description = r(e)(`.entry-content`).html()), t);
                })
            )
        ),
    };
}
export { i as route };
