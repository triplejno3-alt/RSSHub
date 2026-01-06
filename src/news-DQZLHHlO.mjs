import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
import r from 'dayjs';
import 'dayjs/locale/fr.js';
import i from 'dayjs/plugin/localizedFormat.js';
r.extend(i);
const a = {
    path: `/:language?`,
    categories: [`travel`],
    example: `/altotrain/en`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`altotrain.ca/:language`, `altotrain.ca/:language/news`, `altotrain.ca/:language/nouvelles`], target: `/:language` }],
    name: `Alto News`,
    maintainers: [`elibroftw`],
    handler: async (t) => {
        let { language: r = `en` } = t.req.param(),
            i = r === `fr` ? `https://www.altotrain.ca/fr/nouvelles` : `https://www.altotrain.ca/en/news`,
            a = n(await e(i)),
            s = a(`body > div:first-of-type > main > div:nth-of-type(2) > div:nth-of-type(2) > div > div:first-of-type > div > a`).first(),
            c = s.length ? (() => [o(s, r)])() : [],
            l = a(`.tw-grid > div.tw-flex.tw-flex-col`)
                .toArray()
                .map((e) => o(a(e).find(`a`).first(), r));
        return { title: `Alto News`, link: i, item: [...c, ...l] };
    },
};
function o(e, n) {
    let r = e.attr(`href`),
        i = e.find(`h2, h3`).first().text().trim(),
        a = e.find(`p`).first().text().trim(),
        o = n === `fr` ? a.match(/(\d{1,2} [a-zéû]+[.]? \d{4})/i) : a.match(/([A-Z][a-z]+[.]? \d{1,2}, \d{4})/),
        s = t(o ? o[1].trim() : ``),
        c = e.find(`img`).first().attr(`src`);
    return { title: i, link: r, pubDate: s, author: `Alto`, category: [`News`], description: a, id: r, image: c ? new URL(c, `https://www.altotrain.ca`).href : void 0 };
}
export { a as route };
