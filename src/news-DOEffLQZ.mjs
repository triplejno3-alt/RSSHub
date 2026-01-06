import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/news`,
    categories: [`game`],
    example: `/dorohedoro/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`dorohedoro.net/news`, `dorohedoro.net/`] }],
    name: `News`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `dorohedoro.net/news`,
};
async function a(i) {
    let a = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 25,
        o = `https://dorohedoro.net`,
        s = `${o}/news/news.xml`,
        c = `${o}/news/`,
        l = r((await n({ method: `get`, url: s })).data, { xmlMode: !0 }),
        u = l(`item`)
            .slice(0, a)
            .toArray()
            .map((e) => {
                e = l(e);
                let n = e.find(`permalink`).text(),
                    r = /news_\d+_\d+\.html/.test(n);
                return { title: e.find(`title`).text(), pubDate: t(e.find(`date`).text()), link: `${o}${r ? `/news/${n}` : ``}`, isNews: r };
            });
    return (
        (u = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    if (t.isNews)
                        try {
                            let e = r((await n({ method: `get`, url: t.link })).data);
                            (e(`#bk_btn`).remove(), (t.title = e(`.newsTitle`).text()), (t.description = e(`article`).html()));
                        } catch {}
                    return (delete t.isNews, t);
                })
            )
        )),
        { title: `アニメ『ドロヘドロ』`, link: c, item: u }
    );
}
export { i as route };
