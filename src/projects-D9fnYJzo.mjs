import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/projects/:category?`,
    categories: [`other`],
    example: `/instructables/projects/circuits`,
    parameters: { category: `Category, empty by default, can be found in URL or see the table below` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`instructables.com/projects`], target: `/projects` }],
    name: `Projects`,
    maintainers: [`wolfg1969`],
    handler: i,
    url: `instructables.com/projects`,
    description: `| All | Circuits | Workshop | Craft | Cooking | Living | Outside | Teachers |
| --- | -------- | -------- | ----- | ------- | ------ | ------- | -------- |
|     | circuits | workshop | craft | cooking | living | outside | teachers |`,
};
async function i(r) {
    let { category: i = `all` } = r.req.param(),
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 50,
        o = `instructables.com`,
        s,
        c;
    if (i === `all`) ((s = ``), (c = ``));
    else {
        s = `${i}/`;
        let e = `${i.charAt(0).toUpperCase()}${i.slice(1)}`;
        c = i === `teachers` ? `&& teachers:=${e}` : ` && category:=${e}`;
    }
    let l = `https://${o}/${s}projects`,
        u = n(await e(l)),
        { typesenseProxy: d, typesenseApiKey: f } = JSON.parse(u(`script#js-page-context`).text()),
        p = await e(`${d}/collections/projects/documents/search`, {
            method: `get`,
            baseURL: `https://${o}`,
            headers: { Referer: l, Host: o, 'x-typesense-api-key': f },
            query: {
                q: `*`,
                query_by: `title,stepBody,screenName`,
                page: 1,
                per_page: a,
                sort_by: `publishDate:desc`,
                include_fields: `title,urlString,coverImageUrl,screenName,publishDate,favorites,views,primaryClassification,featureFlag,prizeLevel,IMadeItCount`,
                filter_by: `featureFlag:=true${c}`,
            },
            parseResponse: JSON.parse,
        });
    return {
        title: `Instructables Projects`,
        link: `https://${o}/projects`,
        description: `Instructables Projects`,
        language: `en`,
        item: p.hits.map((e) => ({
            title: e.document.title,
            link: `https://${o}/${e.document.urlString}`,
            author: e.document.screenName,
            description: `<img src="${e.document.coverImageUrl}?auto=webp&crop=1.2%3A1&frame=1&width=500" width="500">`,
            pubDate: t(e.document.publishDate),
            category: e.document.primaryClassification,
        })),
    };
}
export { r as route };
