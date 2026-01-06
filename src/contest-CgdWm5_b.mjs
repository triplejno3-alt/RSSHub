import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/contest/:language?/:rated?/:category?/:keyword?`,
    categories: [`programming`],
    example: `/atcoder/contest`,
    parameters: { language: 'Language, `jp` as Japanese or `en` as English, English by default', rated: `Rated Range, see below, all by default`, category: `Category, see below, all by default`, keyword: `Keyword` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Contests Archive`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `Rated Range

| ABC Class (Rated for ~1999) | ARC Class (Rated for ~2799) | AGC Class (Rated for ~9999) |
| ---------------------------- | ---------------------------- | ---------------------------- |
| 1                            | 2                            | 3                            |

  Category

| All | AtCoder Typical Contest | PAST Archive | Unofficial(unrated) |
| --- | ----------------------- | ------------ | ------------------- |
| 0   | 6                       | 50           | 101                 |

| JOI Archive | Sponsored Tournament | Sponsored Parallel(rated) |
| ----------- | -------------------- | ------------------------- |
| 200         | 1000                 | 1001                      |

| Sponsored Parallel(unrated) | Optimization Contest |
| --------------------------- | -------------------- |
| 1002                        | 1200                 |`,
};
async function a(i) {
    let a = [`action`, `upcoming`, `recent`],
        o = i.req.param(`language`) ?? `en`,
        s = i.req.param(`rated`) ?? `0`,
        c = i.req.param(`category`) ?? `0`,
        l = i.req.param(`keyword`) ?? ``;
    s = s === `active` ? `action` : s;
    let u = a.includes(s),
        d = `https://atcoder.jp`,
        f = `${d}/contests${u ? `?lang=${o}` : `/archive?lang=${o}&ratedType=${s}&category=${c}${l ? `&keyword=${l}` : ``}`}`,
        p = r((await n({ method: `get`, url: f })).data),
        m = p(u ? `#contest-table-${s}` : `.row`)
            .find(`tr`)
            .slice(1, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 20)
            .toArray()
            .map((e) => ((e = p(e).find(`td a`).eq(1)), { title: e.text(), link: `${d}${e.attr(`href`)}?lang=${o}` }));
    return (
        (m = await Promise.all(
            m.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data);
                    return ((i.description = e(`.lang-${o}`).html()), (i.pubDate = t(e(`.fixtime-full`).first().text())), i);
                })
            )
        )),
        { title: String(u ? `${p(`#contest-table-${s} h3`).text()} - AtCoder` : p(`title`).text()), link: f, item: m, allowEmpty: !0 }
    );
}
export { i as route };
