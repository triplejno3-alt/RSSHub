import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://www.cpuid.com/news.html`,
    i = {
        path: `/news`,
        categories: [`program-update`],
        example: `/cpuid/news`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`cpuid.com/news.html`, `cpuid.com/`] }],
        name: `News`,
        maintainers: [],
        handler: a,
        url: `cpuid.com/news.html`,
    };
async function a() {
    let i = n((await t(r)).data),
        a = i(`.block_100 .js-block-news`)
            .toArray()
            .map(
                (t) => (
                    (t = i(t)),
                    { title: t.find(`.information a`).text(), description: t.find(`.description`).html(), link: t.find(`.information a`).attr(`href`), pubDate: e(t.find(`time[itemprop=dateCreated]`).attr(`datetime`)) }
                )
            );
    return { title: i(`head title`).text(), description: i(`head description`).attr(`content`), link: r, image: i(`link[rel=apple-touch-icon-precomposed]`).attr(`href`), item: a, language: i(`html`).attr(`lang`) };
}
export { i as route };
