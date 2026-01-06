import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/guides`,
    categories: [`programming`],
    example: `/dev.to/guides`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`dev.to/`] }],
    name: `Trending Guides`,
    maintainers: [`Rjnishant530`],
    handler: a,
    url: `dev.to`,
};
async function a() {
    let i = `https://dev.to`,
        a = r((await n(i)).data),
        o = a(`.widget-link-list .crayons-link--contentful`)
            .toArray()
            .map((e) => {
                let t = a(e);
                return { title: t.text().trim(), link: i + t.attr(`href`) };
            });
    return {
        title: `DEV.to - Trending Guides`,
        link: i,
        description: `Trending guides and resources from DEV.to`,
        language: `en-us`,
        item: await Promise.all(
            o.map((o) =>
                e.tryGet(o.link, async () => {
                    let e = r((await n(o.link)).data),
                        s = e(`.crayons-article__cover img`).attr(`src`),
                        c = e(`.crayons-article__body`).html() || ``,
                        l = e(`.crayons-article__header__meta .fw-bold`).first().text().trim(),
                        u = e(`.crayons-article__header__meta .fw-bold`).first().attr(`href`),
                        d = e(`.crayons-article__header__meta .radius-full`).attr(`src`),
                        f = e(`time[datetime]`).first().attr(`datetime`) || void 0,
                        p = f ? t(f) : void 0,
                        m = e(`.spec__tags .crayons-tag`)
                            .toArray()
                            .map((e) => a(e).text().trim().replace(`#`, ``));
                    return { title: o.title, link: o.link, description: c, image: s, pubDate: p, category: m, author: [{ name: l, url: u ? i + u : void 0, avatar: d }] };
                })
            )
        ),
        icon: `https://media2.dev.to/dynamic/image/width=32,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png`,
    };
}
export { i as route };
