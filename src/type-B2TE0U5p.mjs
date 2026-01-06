import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t } from './utils-CN1Jalhf.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/type/:type`,
    categories: [`new-media`],
    example: `/psyche/type/ideas`,
    parameters: { type: `Type` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`psyche.co/:type`] }],
    name: `Types`,
    maintainers: [`emdoe`],
    handler: i,
    description: `Supported types: Ideas, Guides, and Films.`,
};
async function i(r) {
    let i = r.req.param(`type`),
        a = i.charAt(0).toUpperCase() + i.slice(1),
        o = `https://psyche.co/${i}`,
        s = n(await e(o)),
        c = JSON.parse(s(`script#__NEXT_DATA__`).text()),
        l = `https://psyche.co/_next/data/${c.buildId}`,
        u = await t(c.props.pageProps.articles.map((e) => ({ title: e.title, link: `${o}/${e.slug}`, json: `${l}/${i}/${e.slug}.json` })));
    return { title: `Psyche | ${a}`, link: o, item: u };
}
export { r as route };
