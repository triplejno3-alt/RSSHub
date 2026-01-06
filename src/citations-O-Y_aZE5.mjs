import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/citations/:id`,
    categories: [`journal`],
    example: `/google/citations/mlmE4JMAAAAJ`,
    parameters: { id: `N` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Scholar Author Citations`,
    maintainers: [`KellyHwong`, `const7`],
    handler: r,
    description:
        "The parameter id in the route is the id in the URL of the user's Google Scholar reference page, for example `https://scholar.google.com/citations?user=mlmE4JMAAAAJ` to `mlmE4JMAAAAJ`.\n\n  Query parameters are also supported here, for example `https://scholar.google.com/citations?user=mlmE4JMAAAAJ&sortby=pubdate` to `mlmE4JMAAAAJ&sortby=pubdate`. Please make sure that the user id (`mlmE4JMAAAAJ` in this case) should be the first parameter in the query string.",
};
async function r(n) {
    let r = `https://scholar.google.com/citations?user=${n.req.param(`id`)}`,
        i = t((await e({ method: `get`, url: r })).data),
        a = i(`#gsc_prf .gsc_prf_il`).eq(0).text(),
        o = i(`#gsc_prf_ivh a`).attr(`href`),
        s = i(`#gsc_prf_in`).text(),
        c = `Google Scholar Citation Monitor: ${s}; Profile: ${a}; HomePage: ${o}`,
        l = i(`#gsc_a_b .gsc_a_tr`)
            .toArray()
            .map((e) => {
                let n = t(e),
                    r = `https://scholar.google.com` + n(`.gsc_a_t a`).attr(`href`),
                    i = n(`.gsc_a_t div`).eq(0).text(),
                    a = n(`.gsc_a_t div`).eq(1).text();
                return { title: n(`.gsc_a_t a`).text(), author: i, description: `Author: ${i}; Publication: ${a}`, link: r, guid: r };
            });
    return { title: `Google Scholar: ${s}`, link: r, description: c, item: l };
}
export { n as route };
