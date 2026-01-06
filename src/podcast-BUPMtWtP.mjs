import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { n as t, t as n } from './utils-DFAyFAIS.mjs';
const r = {
    path: `/podcast/:category?`,
    view: e.Articles,
    categories: [`new-media`],
    example: `/newslaundry/podcast`,
    parameters: { category: `Podcast category, see below for details` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !0, supportScihub: !1 },
    radar: [
        { source: [`newslaundry.com/podcast`], target: `/podcast` },
        { source: [`newslaundry.com/collection/nl-hafta-podcast`], target: `/podcast/nl-hafta` },
        { source: [`newslaundry.com/podcast/whats-your-ism`], target: `/podcast/whats-your-ism` },
    ],
    name: `Podcast`,
    description: `| Category | URL |
| -------- | --- |
| All Podcasts | [/podcast](https://rsshub.app/newslaundry/podcast) |
| NL Hafta | [/podcast/nl-hafta](https://rsshub.app/newslaundry/podcast/nl-hafta) |
| What's Your Ism? | [/podcast/whats-your-ism](https://rsshub.app/newslaundry/podcast/whats-your-ism) |`,
    maintainers: [`Rjnishant530`],
    handler: i,
};
async function i(e) {
    let r = e.req.param(`category`),
        i = { 'nl-hafta': { slug: `nl-hafta-podcast`, url: `${t}/collection/nl-hafta-podcast` }, 'whats-your-ism': { slug: `whats-your-ism-podcast-newslaundry-hindi`, url: `${t}/podcast/whats-your-ism` } },
        a = !r;
    return r && i[r] ? await n(i[r].slug, i[r].url) : await n(`podcast`, void 0, a);
}
export { r as route };
