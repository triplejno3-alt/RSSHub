import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/app/:appId/:appSlug?`,
    categories: [`program-update`],
    example: `/macupdate/app/11942`,
    parameters: { appId: `Application unique ID, can be found in URL`, appSlug: `Application slug, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`macupdate.com/app/mac/:appId/:appSlug`] }],
    name: `Update`,
    maintainers: [`TonyRL`],
    handler: i,
};
async function i(r) {
    let { appId: i, appSlug: a } = r.req.param(),
        o = `https://www.macupdate.com`,
        s = n(await e(`${o}/app/mac/${i}${a ? `/${a}` : ``}`)),
        {
            asPath: c,
            appData: { data: l },
        } = JSON.parse(s(`#__NEXT_DATA__`).text()).props.pageProps,
        u = {
            title: `${l.title} ${l.version}`,
            description: l.release_notes,
            pubDate: t(l.date.timestamp, `X`),
            link: `${o}${c}`,
            guid: `macupdate/app/${i}/${l.version}`,
            category: [l.category.name, l.subcategory?.name],
            author: l.developer.name,
        };
    return { title: l.title, description: l.description, link: `${o}${c}`, logo: l.logo.source, icon: l.logo.source, item: [u], language: `en` };
}
export { r as route };
