import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './items-processor-ClFNqZaW.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/sociedad/:subsection?`,
    parameters: { subsection: { description: `Filter by subsection. Check the subsections available on the newspaper's website.` } },
    categories: [`traditional-media`],
    example: `/publico/sociedad`,
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`publico.es/sociedad`], target: `/sociedad` }],
    name: `Sociedad`,
    maintainers: [`adrianrico97`],
    handler: i,
};
async function i(r) {
    let { subsection: i } = r.req.param(),
        a = `https://www.publico.es`,
        o = i ? `${a}/sociedad/${i}` : `${a}/sociedad`;
    return { title: `Medio Ambiente | Sociedad | Público`, link: o, item: t(n((await e({ method: `get`, url: o })).data)) };
}
export { r as route };
