import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './description-A7ochmEt.mjs';
import { load as i } from 'cheerio';
const a = {
    path: [`/main`, `/`],
    categories: [`finance`],
    example: `/futunn/main`,
    features: { supportRadar: !0 },
    radar: [{ source: [`news.futunn.com/main`, `news.futunn.com/:lang/main`], target: `/main` }],
    name: `要闻`,
    maintainers: [`Wsine`, `nczitzk`, `kennyfong19931`],
    handler: o,
};
async function o(a) {
    let o = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 48,
        s = `https://news.futunn.com`,
        c = `${s}/main`,
        l = (await n({ method: `get`, url: `${s}/news-site-api/main/get-market-list?size=${o}` })).data.data.list.map((e) => ({
            title: e.title,
            link: e.url.split(`?`)[0],
            author: e.source,
            pubDate: t(e.timestamp * 1e3),
            description: r({ abs: e.abstract, pic: e.pic }),
        }));
    return (
        (l = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    if (/news\.futunn\.com/.test(t.link)) {
                        let e = i((await n({ method: `get`, url: t.link })).data);
                        (e(`.futu-news-time-stamp`).remove(),
                            e(`.nnstock`).each(function () {
                                e(this).replaceWith(`<a href="${e(this).attr(`href`)}">${e(this).text().replaceAll(`$`, ``)}</a>`);
                            }),
                            (t.description = e(`.origin_content`).html()),
                            (t.category = [
                                ...e(`.news__from-topic__title`)
                                    .toArray()
                                    .map((t) => e(t).text().trim()),
                                ...e(`#relatedStockWeb .stock-name`)
                                    .toArray()
                                    .map((t) => e(t).text().trim()),
                            ]));
                    }
                    return t;
                })
            )
        )),
        { title: `富途牛牛 - 要闻`, link: c, item: l }
    );
}
export { a as route };
