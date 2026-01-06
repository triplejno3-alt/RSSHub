import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:cate?`,
    categories: [`programming`],
    example: `/cncf`,
    parameters: { cate: `blog by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Category`,
    maintainers: [`Fatpandac`],
    handler: a,
    description: `| Blog | News | Announcements | Reports |
| ---- | ---- | ------------- | ------- |
| blog | news | announcements | reports |`,
};
async function a(i) {
    let a = `https://www.cncf.io/${i.req.param(`cate`) ?? `blog`}/`,
        o = r((await n(a)).data),
        s = o(`h1.is-style-page-title`).text(),
        c = o(`div.post-archive__item`)
            .toArray()
            .map((e) => ({ title: o(e).find(`span.post-archive__title`).text().trim(), link: o(e).find(`span.post-archive__title > a`).attr(`href`), pubDate: t(o(e).find(`span.post-archive__item_date`).text().split(`|`)[0]) })),
        l = await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data);
                    return (e(`div.post-author`).remove(), e(`div.social-share`).remove(), (t.description = e(`article`).html()), t);
                })
            )
        );
    return { title: `CNCF - ${s}`, link: a, item: l };
}
export { i as route };
