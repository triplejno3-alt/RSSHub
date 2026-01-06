import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/news`,
    categories: [`new-media`],
    example: `/hellobtc/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`hellobtc.com/news`] }],
    name: `快讯`,
    maintainers: [`Fatpandac`],
    handler: a,
    url: `hellobtc.com/news`,
};
async function a() {
    let i = `https://www.hellobtc.com/news`,
        a = r((await t(i)).data);
    return {
        title: `白话区块链 - 快讯`,
        link: i,
        item: a(`nav.js-nav`)
            .find(`div.item`)
            .toArray()
            .map((t) => ({ title: a(t).find(`h2`).text(), link: a(t).find(`a`).attr(`href`), description: a(t).find(`div.sub`).text(), pubDate: n(e(a(t).find(`span.date`).text(), `MM-DD HH:mm`), 8) }))
            .filter(Boolean),
    };
}
export { i as route };
