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
    path: `/global/:category?`,
    categories: [`traditional-media`],
    example: `/udn/global`,
    parameters: { category: `分类，见下表，默认为首頁` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`global.udn.com/global_vision/index`, `global.udn.com/`] }],
    name: `轉角國際 - 首頁`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| 首頁 | 編輯精選 | 熱門文章 |
| ---- | -------- | -------- |
|      | editor   | hot      |`,
};
async function o(a) {
    let o = a.req.param(`category`),
        s = `https://global.udn.com`,
        c = `${s}/global_vision/index`,
        l = i((await n({ method: `get`, url: c })).data),
        u = {
            hot: { articleSelector: `.carousel__list .carousel__item`, titleExtractor: (e) => e.attr(`title`).trim() },
            editor: { articleSelector: `.list-container--featured .list-vertical__item`, titleExtractor: (e) => e.find(`.list-vertical__title`).text().trim() },
            default: { articleSelector: `.list-container--index .list-vertical__item`, titleExtractor: (e) => e.find(`.list-vertical__title`).text().trim() },
        },
        d = (e) =>
            l(e.articleSelector)
                .toArray()
                .map((t) => {
                    let n = l(t),
                        r = n.attr(`href`).split(`?`)[0];
                    return { title: e.titleExtractor(n), link: r.startsWith(`http`) ? r : `${s}${r}` };
                }),
        f;
    if (o) {
        let e = u[o];
        f = d(e);
    } else {
        let e = d(u.default),
            t = [...d(u.hot), ...e];
        f = [...new Map(t.map((e) => [e.link, e])).values()];
    }
    return (
        (f = await Promise.all(
            f.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data);
                    return (
                        (a.author = e(`.article-content__authors-name`).first().text().trim()),
                        (a.pubDate = r(t(e(`meta[property="article:published_time"]`).attr(`content`)), 8)),
                        (a.description =
                            e(`.article-content__focus`).html() +
                            e(`.article-content__editor`)
                                .find(`p, figure, h2, .video-container`)
                                .toArray()
                                .map((t) => e.html(t))
                                .join(``)),
                        (a.category = e(`meta[name="news_keywords"]`).attr(`content`).split(`,`)),
                        a
                    );
                })
            )
        )),
        { title: l(`title`).text(), link: c, item: f }
    );
}
export { a as route };
