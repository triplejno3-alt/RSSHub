import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/versions`,
    categories: [`program-update`],
    example: `/zotero/versions`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`zotero.org/`, `zotero.org/support/changelog`] }],
    name: `Version History`,
    maintainers: [`jasongzy`],
    handler: r,
    url: `zotero.org/`,
};
async function r() {
    let n = `https://www.zotero.org/support/changelog`,
        r = (await e(n)).data,
        i = t(r);
    return {
        title: `Zotero - Version History`,
        link: n,
        item: i(`h2`)
            .toArray()
            .map((e) => {
                e = i(e);
                let t = i(e)
                    .text()
                    .match(/\((.*)\)/);
                return ((t = Array.isArray(t) ? t[1] : null), { title: e.text().trim(), description: i(`<div/>`).append(e.nextUntil(`h2`).clone()).html(), pubDate: t, link: n + `#` + e.attr(`id`) });
            }),
    };
}
export { n as route };
