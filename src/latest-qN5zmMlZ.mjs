import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://www.indiansinkuwait.com`,
    a = {
        path: `/latest`,
        categories: [`new-media`],
        example: `/indiansinkuwait/latest`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`indiansinkuwait.com/latest-news`, `indiansinkuwait.com/`] }],
        name: `News`,
        maintainers: [`TonyRL`],
        handler: o,
        url: `indiansinkuwait.com/latest-news`,
    };
async function o() {
    let { data: a } = await n(`${i}/latest-news`),
        o = r(a),
        s = o(`.paragraphs .span4`)
            .toArray()
            .map((e) => ((e = o(e)), { title: e.find(`.content-heading h6 a`).text().trim(), link: i + e.find(`a`).attr(`href`) })),
        c = await Promise.all(
            s.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = r(e);
                    return (
                        (i.pubDate = t(a(`#ctl00_ContentPlaceHolder1_SpanAuthor`).text())),
                        a(`#newsdetails h3, #ctl00_ContentPlaceHolder1_SpanAuthor, .noprint, [id^=div-gpt-ad]`).remove(),
                        (i.description = a(`#newsdetails`).html()),
                        i
                    );
                })
            )
        );
    return { title: o(`head title`).text(), description: o(`head meta[name="description"]`).attr(`content`), image: `https://www.indiansinkuwait.com/apple-touch-icon-152x152-precomposed.png`, link: `${i}/latest-news`, item: c };
}
export { a as route };
