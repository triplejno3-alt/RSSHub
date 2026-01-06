import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
import i from 'markdown-it';
const a = i({ linkify: !0 }),
    o = `https://xiaozhuanlan.com`,
    s = {
        path: `/column/:id`,
        categories: [`new-media`],
        example: `/xiaozhuanlan/column/olddriver-selection`,
        parameters: { id: `专栏 ID，可在专栏页 URL 中找到` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`xiaozhuanlan.com/:id`] }],
        name: `专栏`,
        maintainers: [`TonyRL`],
        handler: c,
    };
async function c(i) {
    let s = i.req.param(`id`),
        c = r((await n(`${o}/${s}`)).data),
        l = c(`.xzl-topic-item`)
            .toArray()
            .map(
                (e) => (
                    (e = c(e)),
                    e.find(`.topic-has-suggested-item`).remove(),
                    {
                        title: e.find(`h3`).text().trim(),
                        link: new URL(e.find(`.topic-body-link`).attr(`href`), o).href,
                        author: e.find(`.topic-header .xzl-author-lockup`).text().trim(),
                        pubDate: t(e.find(`.topic-header .timeago`).attr(`title`)),
                    }
                )
            );
    return (
        (l = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data);
                    return (
                        (t.description = a.render(e(`.hidden_markdown_body`).attr(`data-summary`))),
                        e(`.topic-tags`) &&
                            (t.category = e(`.topic-tags label`)
                                .toArray()
                                .map((t) => e(t).text())),
                        t
                    );
                })
            )
        )),
        { title: c(`head title`).text().trim(), link: `${o}/${s}`, description: c(`meta[name=description]`).attr(`content`), item: l }
    );
}
export { s as route };
