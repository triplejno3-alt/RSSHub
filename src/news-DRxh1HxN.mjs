import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/news/:lang/:department?`,
    categories: [`government`],
    example: `/canada.ca/news/en/departmentfinance`,
    parameters: { lang: `Language, en or fr`, department: `dprtmnt query value` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [
        {
            source: [`www.canada.ca/:lang/department-finance.html`, `www.canada.ca/:lang/ministere-finances.html`, `www.canada.ca/:lang/department-finance/news/*`, `www.canada.ca/:lang/ministere-finances/nouvelles/*`],
            target: `/news/:lang/departmentfinance`,
        },
        {
            source: [
                `ised-isde.canada.ca/site/ised/:lang`,
                `ised-isde.canada.ca/site/isde/:lang`,
                `www.canada.ca/:lang/innovation-science-economic-development/news/*`,
                `www.canada.ca/:lang/innovation-sciences-developpement-economique/nouvelles/*`,
            ],
            target: `/news/:lang/departmentofindustry`,
        },
        { source: [`www.canada.ca/:lang/news/advanced-news-search/news-results.html`, `www.canada.ca/:lang/nouvelles/recherche-avancee-de-nouvelles/resultats-de-nouvelles.html`], target: `/news/:lang` },
    ],
    name: `News by Department`,
    maintainers: [`elibroftw`],
    handler: i,
    description: `News from specific Canadian government departments`,
};
async function i(r) {
    let i = r.req.param(`lang`),
        a = r.req.param(`department`),
        o = `https://www.canada.ca`,
        s = { en: `/en/news/advanced-news-search/news-results.html`, fr: `/fr/nouvelles/recherche-avancee-de-nouvelles/resultats-de-nouvelles.html` }[i],
        c = a ? `${o}${s}?dprtmnt=${a}` : `${o}${s}`,
        l = n(await e(c)),
        u = l(`article.item`)
            .toArray()
            .map((e) => {
                let n = l(e),
                    r = n.find(`h3 a`),
                    i = r.text().trim(),
                    a = r.attr(`href`);
                if (!a) return null;
                let s = n.find(`time`).attr(`datetime`),
                    c = s ? t(s) : void 0,
                    u = n.find(`p`).first().text().split(`|`),
                    d = u[1].trim(),
                    f = u[2].trim(),
                    p = n.find(`p`).last().text().trim();
                return { title: i, link: a.startsWith(`http`) ? a : `${o}${a}`, pubDate: c, category: f ? [f] : [], description: p, author: d };
            })
            .filter((e) => e !== null);
    return { title: a ? `${a.toUpperCase()} Canada` : `Government of Canada News`, link: c, item: u, language: i };
}
export { r as route };
