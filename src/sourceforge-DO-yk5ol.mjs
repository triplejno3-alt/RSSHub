import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/:routeParams?`,
    categories: [`program-update`],
    example: `/sourceforge/topic=artificial-intelligence&os=windows`,
    parameters: { routeParams: `route params, see below` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Software`,
    maintainers: [`JimenezLi`],
    handler: i,
    description:
        'For some URL like [https://sourceforge.net/directory/artificial-intelligence/windows/](https://sourceforge.net/directory/artificial-intelligence/windows/), it is equal to [https://sourceforge.net/directory/?topic=artificial-intelligence&os=windows"](https://sourceforge.net/directory/?topic=artificial-intelligence&os=windows), thus subscribing to `/sourceforge/topic=artificial-intelligence&os=windows`.\n\n  URL params can duplicate, such as `/sourceforge/topic=artificial-intelligence&os=windows&os=linux`.',
};
async function i(r) {
    let i = `https://sourceforge.net/directory/?${r.req.param(`routeParams`).toString()}`,
        a = n((await t.get(i)).data),
        o = a(`ul.projects li[itemprop=itemListElement]`);
    return {
        title: a(`.content h1`).text().trim(),
        link: i,
        item: o.toArray().map((t) => {
            let n = a(t);
            return {
                title: n.find(`.result-heading-title`).text().trim(),
                link: `https://sourceforge.net${n.find(`.result-heading-title`).attr(`href`)}`,
                description: n.find(`.result-heading-texts`).html(),
                pubDate: e(n.find(`time`).attr(`datetime`), `YYYY-MM-DD`),
            };
        }),
    };
}
export { r as route };
