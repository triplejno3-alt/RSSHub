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
    path: `/rsks/:guid`,
    categories: [`study`],
    example: `/hunanpea/rsks/2f1a6239-b4dc-491b-92af-7d95e0f0543e`,
    parameters: { guid: `分类 id，可在 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`rsks.hunanpea.com/Category/:guid/ArticlesByCategory.do`] }],
    name: `公告`,
    maintainers: [`TonyRL`],
    handler: o,
};
async function o(a) {
    let o = `http://rsks.hunanpea.com`,
        s = `${o}/Category/${a.req.param(`guid`)}/ArticlesByCategory.do?PageIndex=1`,
        { data: c } = await n(s),
        l = i(c),
        u = l(`#column_content > ul > li`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`a`).attr(`title`), link: `${o}${e.find(`a`).attr(`href`).replace(`ArticleDetail.do`, `InternalArticleDetail.do?`)}`, pubDate: r(t(e.find(`em`).text()), 8) })),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link);
                    return ((t.description = i(e)(`.content_area`).html()), t);
                })
            )
        );
    return { title: `${l(`.sitemap h2`).text()} - ${l(`head title`).text()}`, link: s, item: d };
}
export { a as route };
