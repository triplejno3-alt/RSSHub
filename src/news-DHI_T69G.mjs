import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = (e) => ({ siteUrl: `https://www.homeaffairs.gov.au`, webUrl: `/News-subsite`, filter: { Categories: [], PageNumber: 1, RowLimit: 20, ShowCurrentSiteOnly: !1, CurrentSite: `Immi`, Year: e + `` } }),
    r = (e) => `https://immi.homeaffairs.gov.au/news-media/archive/article?itemId=${e}`,
    i = {
        path: `/immiau/news`,
        categories: [`government`],
        example: `/gov/immiau/news`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Immigration and Citizenship - News`,
        maintainers: [`liu233w`],
        handler: a,
    };
async function a() {
    let { data: i } = await t({ method: `post`, url: `https://immi.homeaffairs.gov.au/_layouts/15/api/Data.aspx/GetNews`, json: n(new Date().getFullYear()) });
    return {
        title: `News - Immigration and Citizenship`,
        link: `https://immi.homeaffairs.gov.au/news-media/archive`,
        description: `Australia Government, Department of Home Affairs`,
        item: i.d.data.map((t) => ({ title: t.Title, author: t.Source, category: t.Category, description: t.Content, pubDate: e(t.Date), link: r(t.Id) })),
    };
}
export { i as route };
