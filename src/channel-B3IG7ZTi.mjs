import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:channel`,
    categories: [`finance`],
    example: `/fx-markets/trading`,
    parameters: { channel: `channel, can be found in the navi bar links at the home page` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Channel`,
    maintainers: [],
    handler: a,
    description: `| Trading | Infrastructure | Tech and Data | Regulation |
| ------- | -------------- | ------------- | ---------- |
| trading | infrastructure | tech-and-data | regulation |`,
};
async function a(i) {
    let a = `https://www.fx-markets.com/${i.req.param(`channel`)}`,
        o = (await n(a)).data,
        s = r(o),
        c = `FX-Markets ${s(`header.select-header > h1`).text()}`,
        l = s(`div#listings`)
            .children()
            .toArray()
            .map((e) => {
                let n = s(e),
                    r = n.find(`h5 > a`),
                    i = `https://www.fx-markets.com${r.attr(`href`)}`;
                return { title: r.attr(`title`), link: i, pubDate: t(n.find(`time`).text()) };
            });
    return {
        title: c,
        link: a,
        item: await Promise.all(
            l.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n(i.link)).data),
                        a = e(`script[type="application/ld+json"]`).toArray()[0].children[0].data,
                        o = /"datePublished": "(?<dateTimePub>.*)"/.exec(a).groups.dateTimePub,
                        s = t(o, `YYYY-MM-DDTHH:mm:ssZ`);
                    return ((i.description = e(`div.article-page-body-content:not(.print-access-info)`).html()), { title: i.title, link: i.link, description: i.description, pubDate: s ?? i.pubDate });
                })
            )
        ),
    };
}
export { i as route };
