import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t } from './utils-CN1Jalhf.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/topic/:topic`,
    categories: [`new-media`],
    example: `/psyche/topic/therapeia`,
    parameters: { topic: `Topic` },
    radar: [{ source: [`psyche.co/:topic`] }],
    name: `Topics`,
    maintainers: [`emdoe`],
    handler: i,
    description: `Supported categories: Therapeia, Eudaimonia, and Poiesis.`,
};
async function i(r) {
    let i = `https://psyche.co/${r.req.param(`topic`)}`,
        a = n(await e(i)),
        o = JSON.parse(a(`script#__NEXT_DATA__`).text()),
        s = o.props.pageProps.articles,
        c = `https://psyche.co/_next/data/${o.buildId}`,
        l = await t(Object.keys(s).flatMap((e) => s[e].edges.map((t) => ({ title: t.node.title, link: `https://psyche.co/${e}/${t.node.slug}`, json: `${c}/${e}/${t.node.slug}.json` }))));
    return { title: `Psyche | ${o.props.pageProps.section.title}`, link: i, description: o.props.pageProps.section.metaDescription, item: l };
}
export { r as route };
