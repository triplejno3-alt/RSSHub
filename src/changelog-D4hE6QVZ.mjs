import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/changelog`,
    categories: [`program-update`],
    example: `/typora/changelog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`support.typora.io/`] }],
    name: `Changelog`,
    maintainers: [`cnzgray`],
    handler: a,
    url: `support.typora.io/`,
};
async function a() {
    let i = `https://support.typora.io`,
        { data: a } = await n(`${i}/store/`),
        o = Object.values(a)
            .filter((e) => e.category === `new`)
            .map((e) => ({ title: e.title, author: e.author, description: e.content, link: `${i}${e.url}` })),
        s = await Promise.all(
            o.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = r(e);
                    return ((i.pubDate = t(a(`.post-meta time`).text())), (i.description = a(`#post-content`).html()), i);
                })
            )
        );
    return { title: `Typora Changelog`, link: i, description: `Typora Changelog`, image: `${i}/assets/img/favicon-128.png`, item: s };
}
export { i as route };
