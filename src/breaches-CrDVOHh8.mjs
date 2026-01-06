import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/breaches`,
    categories: [`other`],
    example: `/firefox/breaches`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`monitor.firefox.com/`, `monitor.firefox.com/breaches`] }],
    name: `Firefox Monitor`,
    maintainers: [`TonyRL`],
    handler: a,
    url: `monitor.firefox.com/`,
};
async function a() {
    let i = `https://monitor.firefox.com`,
        a = await t(`${i}/breaches`),
        o = r(a.data),
        s = o(`.breach-card`)
            .toArray()
            .map(
                (t) => (
                    (t = o(t)),
                    t.find(`.breach-detail-link`).remove(),
                    {
                        title: t.find(`h3 span`).last().text(),
                        description: t.find(`.breach-main`).html(),
                        link: new URL(t.attr(`href`), i).href,
                        pubDate: n(e(t.find(`.breach-main div dd`).first().text()), 0),
                        category: t
                            .find(`.breach-main div dd`)
                            .last()
                            .text()
                            .split(`,`)
                            .map((e) => e.trim()),
                    }
                )
            );
    return { title: o(`title`).text(), description: o(`head meta[name=description]`).attr(`content`).trim(), link: a.url, item: s, image: o(`head meta[property=og:image]`).attr(`content`) };
}
export { i as route };
