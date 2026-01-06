import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './items-processor-ClFNqZaW.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/public`,
    categories: [`traditional-media`],
    example: `/publico/public`,
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`publico.es/public`], target: `/public` }],
    name: `Public`,
    maintainers: [`adrianrico97`],
    handler: i,
};
async function i() {
    let r = `https://www.publico.es/public`;
    return { title: `public | Público`, link: r, item: t(n((await e({ method: `get`, url: r })).data)) };
}
export { r as route };
