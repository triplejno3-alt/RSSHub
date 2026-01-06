import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as n } from './utils-Bi4jpU3B.mjs';
import { load as r } from 'cheerio';
const i = `https://www.coindesk.com`,
    a = {
        path: `/consensus-magazine`,
        categories: [`new-media`],
        example: `/coindesk/consensus-magazine`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`coindesk.com/`] }],
        name: `新闻周刊`,
        maintainers: [`jameshih`],
        handler: o,
        url: `coindesk.com/`,
    };
async function o() {
    let a = `consensus-magazine`,
        o = r(await e(`${i}/${a}`)),
        s = o(`div h2`)
            .toArray()
            .map((e) => {
                let t = o(e);
                return { title: t.text(), link: i + t.parent().attr(`href`) };
            }),
        c = await Promise.all(s.map((e) => t.tryGet(e.link, () => n(e))));
    return { title: `CoinDesk Consensus Magazine`, link: `${i}/${a}`, item: c };
}
export { a as route };
