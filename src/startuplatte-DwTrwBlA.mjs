import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:category?`,
    categories: [`new-media`],
    example: `/startuplatte`,
    parameters: { category: `分类，见下表，默认为首頁` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`startuplatte.com/category/:category`, `startuplatte.com/`] }],
    name: `分类`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| 首頁 | 大師智慧 | 深度分析 | 新知介紹 |
| ---- | -------- | -------- | -------- |
|      | quote    | analysis | trend    |`,
};
async function a(i) {
    let a = i.req.param(`category`) ?? ``,
        o = `https://startuplatte.com${a ? `/category/${a}` : ``}`,
        s = r((await n({ method: `get`, url: o })).data),
        c = s(`.post-header h2 a`)
            .toArray()
            .map((e) => ((e = s(e)), { title: e.text(), link: e.attr(`href`) })),
        l = await Promise.all(
            c.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = await n({ method: `get`, url: i.link }),
                        a = r(e.data);
                    return (
                        a(`.wp-post-navigation`).remove(),
                        (i.category = a(`.cat`).text()),
                        (i.author = a(`a[rel="author"]`).text()),
                        (i.description = a(`.post-entry`).html()),
                        (i.pubDate = t(e.data.match(/"datePublished":"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2})","dateModified"/)[1])),
                        i
                    );
                })
            )
        );
    return { title: s(`title`).text(), link: o, item: l };
}
export { i as route };
