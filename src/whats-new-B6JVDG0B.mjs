import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/whats-new`,
    categories: [`program-update`],
    example: `/diskanalyzer/whats-new`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`diskanalyzer.com/whats-new`, `diskanalyzer.com/`] }],
    name: `What's New`,
    maintainers: [`nczitzk`],
    handler: i,
    url: `diskanalyzer.com/whats-new`,
};
async function i() {
    let r = `https://diskanalyzer.com/whats-new`,
        i = n((await t({ method: `get`, url: r })).data),
        a = i(`.blog-content h4`)
            .toArray()
            .map((t) => {
                t = i(t);
                let n = t.text(),
                    a = ``;
                return (
                    t.nextUntil(`h4`).each(function () {
                        a += i(this).html();
                    }),
                    a === `` &&
                        t
                            .parent()
                            .nextUntil(`h4`)
                            .each(function () {
                                a += i(this).html();
                            }),
                    { title: n, link: r, description: a, pubDate: e(n.match(/\((.*)\)/)[1], [`D MMMM YYYY`, `D MMM YYYY`]), guid: n }
                );
            });
    return { title: i(`title`).text(), link: r, item: a };
}
export { r as route };
