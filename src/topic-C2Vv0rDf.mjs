import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/topic/:topic?/:type?`,
    categories: [`new-media`],
    example: `/hbr/topic/Leadership/Popular`,
    parameters: {
        topic: `Topic, can be found in URL, Leadership by default`,
        type: {
            description: `Type, see below, Popular by default`,
            options: [
                { value: `Popular`, label: `Popular` },
                { value: `From the Store`, label: `From the Store` },
                { value: `For You`, label: `For You` },
            ],
            default: `Popular`,
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`hbr.org/topic/:topic?`, `hbr.org/`] }],
    name: `Topic`,
    maintainers: [`nczitzk`, `pseudoyu`],
    handler: a,
    description: `| POPULAR | FROM THE STORE | FOR YOU |
| ------- | -------------- | ------- |
| Popular | From the Store | For You |

::: tip
  Click here to view [All Topics](https://hbr.org/topics)
:::`,
};
async function a(i) {
    let a = i.req.param(`topic`) ?? `Leadership`,
        o = i.req.param(`type`) ?? `Popular`,
        s = `https://hbr.org`,
        c = `${s}/topic/${a}`,
        l = r(await e(c)),
        u = l(`stream-content[data-stream-name="${o}"]`)
            .find(`.stream-item`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.attr(`data-title`), author: e.attr(`data-authors`), category: e.attr(`data-topic`), link: `${s}${e.attr(`data-url`)}` })),
        d = await Promise.all(
            u.map((i) =>
                t.tryGet(i.link, async () => {
                    let t = r(await e(i.link));
                    return ((i.description = t(`.article-body, article[itemprop="description"]`).html()), (i.pubDate = n(t(`meta[property="article:published_time"]`).attr(`content`))), i);
                })
            )
        );
    return { title: `${l(`title`).eq(0).text()} - ${o}`, link: c, item: d };
}
export { i as route };
