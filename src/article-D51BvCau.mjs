import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/article/:atype`,
    categories: [`programming`],
    example: `/elecfans/article/special`,
    parameters: { atype: `需获取文章的类别` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `文章`,
    radar: [{ source: [`www.elecfans.com`] }],
    maintainers: [`tian051011`],
    handler: async (i) => {
        let { atype: a } = i.req.param(),
            o = r(await e(`https://www.elecfans.com/article/${a}/`)),
            s = o(`#mainContent li`)
                .toArray()
                .map((e) => {
                    e = o(e);
                    let t = e.find(`a`).eq(1);
                    return { title: t.text(), link: String(t.attr(`href`)) };
                }),
            c = await Promise.all(
                s.map((i) =>
                    t.tryGet(i.link, async () => {
                        let t = r(await e(i.link));
                        return (
                            (i.pubDate = n(t(`.article-info .time`).first().text())),
                            (i.author = t(`.article-info a`).first().text()),
                            (i.description = t(`.rticle-content .simditor-body`).first().html()),
                            (i.category = t(`.hot-main li > span`)
                                .toArray()
                                .map((e) => t(e).text().trim())),
                            i
                        );
                    })
                )
            );
        return { title: `elecfans ${a} articles`, link: `https://www.elecfans.com/article/${a}/`, item: c };
    },
};
export { i as route };
