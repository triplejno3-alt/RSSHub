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
    example: `/ngocn2`,
    parameters: { category: `分类，见下表，默认为所有文章` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ngocn2.org/`] }],
    name: `首页`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `ngocn2.org/`,
    description: `| 所有文章 | 早报        | 热点     |
| -------- | ----------- | -------- |
| article  | daily-brief | trending |`,
};
async function a(i) {
    let a = i.req.param(`category`) ?? `article`,
        o = `https://ngocn2.org`,
        s = `${o}/${a}`,
        c = r((await n({ method: `get`, url: s })).data),
        l = c(`.articleroll__article a`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.find(`.title`).text(), link: `${o}${e.attr(`href`)}`, pubDate: t(e.find(`.meta`).text()) })),
        u = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n({ method: `get`, url: t.link })).data);
                    return (
                        e(`.gatsby-resp-image-link`).each(function () {
                            e(this).html(`<img src="${e(this).find(`img`).attr(`src`)}">`);
                        }),
                        (t.description = e(`.article__content`).html()),
                        t
                    );
                })
            )
        );
    return { title: `${c(`.sectitle__content`).text()} - NGOCN`, link: s, item: u };
}
export { i as route };
