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
    categories: [`multimedia`],
    example: `/qq88`,
    parameters: { category: `分类 id，见下表，默认为首页` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `分类`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| 首页 | オトナの土ドラ | 日剧 | 日剧 SP |
| ---- | -------------- | ---- | ------- |
|      | 10             | 5    | 11      |`,
};
async function a(i) {
    let a = i.req.param(`category`) ?? ``,
        o = `https://qq88.info`,
        s = a ? `${o}/?cat=${a}` : o,
        c = r((await n({ method: `get`, url: s })).data),
        l = c(`.entry-title a`)
            .slice(0, 15)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.text(), link: e.attr(`href`), pubDate: t(e.parent().next().find(`.mh-meta-date`).eq(-1).text().split(`：`)[1]) })),
        u = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n({ method: `get`, url: t.link })).data),
                        i = e(`.entry-content`).find(`a[download]`);
                    return (
                        (t.enclosure_type = `video/mp4`),
                        (t.enclosure_url = i.eq(-1).attr(`href`)),
                        (t.description = `<video controls><source src="${t.enclosure_url}"></video><br>`),
                        i.each(function () {
                            t.description += `<li><a href="${e(this).attr(`href`)}">${e(this).text()}</a></li>`;
                        }),
                        t
                    );
                })
            )
        );
    return { title: `${c(`.page-title`).text() || `首页`} - 秋爸日字`, link: s, item: u };
}
export { i as route };
