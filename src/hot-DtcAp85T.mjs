import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/hot/:lang?`,
    categories: [`traditional-media`],
    example: `/taiwannews/hot`,
    parameters: { lang: 'Language, `en` or `zh`, `en` by default' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`taiwannews.com.tw/:lang/index`], target: `/hot/:lang` }],
    name: `Hot News`,
    maintainers: [`TonyRL`],
    handler: o,
};
async function o(a) {
    let o = `https://www.taiwannews.com.tw`,
        { lang: s = `en` } = a.req.param(),
        c = `${o}/${s}/index`,
        l = i((await n(c)).data),
        u = l(`.mod_group-columns  .container-fluid .row`)
            .toArray()
            .map((e) => {
                e = l(e);
                let n = e.find(`.entry-header a`).first();
                return { title: n.attr(`title`), link: new URL(n.attr(`href`), o).href, pubDate: r(t(e.find(`.entry-date span`).eq(1).text(), `YYYY/MM/DD HH:mm`), 8) };
            })
            .filter((e) => e.title),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n(t.link)).data);
                    return (
                        (t.author = e(`.article-author`).text()),
                        (t.category = e(`.tagcloud a`)
                            .toArray()
                            .map((t) => e(t).attr(`title`))),
                        e(`.article-head-wrapper, div[id^=div-gpt-ad-], div[class^=hidden-], footer`).remove(),
                        e(`.container-fluid`).eq(2).remove(),
                        (t.description = e(`.mod_single-column`).html()),
                        t
                    );
                })
            )
        );
    return { title: `${l(`.categories`).eq(0).text()} - ${l(`head title`).text()}`, description: l(`meta[name="description"]`).attr(`content`), link: c, item: d, language: s };
}
export { a as route };
