import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
var i = async (i, a) => {
    a = `https://www.ruancan.com${a}`;
    let o = r((await n({ method: `get`, url: a })).data),
        s = o(`.item-title a`)
            .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 15)
            .toArray()
            .map((e) => ((e = o(e)), { title: e.text(), link: e.attr(`href`) }));
    return (
        (s = await Promise.all(
            s.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data);
                    return (
                        e(`.entry-copyright`).remove(),
                        e(`.entry-content div`).each(function () {
                            /^ruanc-\d+/.test(e(this).attr(`id`)) && e(this).remove();
                        }),
                        e(`figure`).each(function () {
                            e(this).html(`<img src="${e(this).find(`a`).attr(`href`)}">`);
                        }),
                        (i.description = e(`.entry-content`).html()),
                        (i.category = e(`.entry-info a[rel="category tag"]`)
                            .toArray()
                            .map((t) => e(t).text())),
                        (i.pubDate = t(e(`.entry-info .entry-date`).attr(`datetime`))),
                        i
                    );
                })
            )
        )),
        { title: o(`title`).text(), link: a, item: s }
    );
};
export { i as t };
