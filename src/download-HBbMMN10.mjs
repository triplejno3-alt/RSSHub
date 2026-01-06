import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/download/:id?`,
    categories: [`program-update`],
    example: `/wdc/download/279`,
    parameters: { id: `Software id, can be found in URL, 279 as Western Digital Dashboard by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Download`,
    maintainers: [],
    handler: i,
};
async function i(r) {
    let i = `https://support.wdc.com/downloads.aspx?p=${r.req.param(`id`) ?? `279`}`,
        a = n((await t({ method: `get`, url: i })).data),
        o = a(`#WD_lblVersionSelected`).text(),
        s = [
            {
                title: o,
                link: `${i}#${o}`,
                enclosure_url: a(`#WD_hlDownloadFWSelected`).attr(`href`),
                pubDate: e(a(`#WD_lblReleaseDateSelected`).text(), `D/M/YYYY`),
                description: a(`.toggleInner`)
                    .html()
                    .replace(/style="color:White;"/, ``),
            },
        ];
    return { title: `${a(`#WD_lblSelectedName`).text()} | WD Support`, link: i, item: s };
}
export { r as route };
