import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://www.tokeninsight.com/`,
    a = {
        path: `/report/:lang?`,
        categories: [`finance`],
        example: `/tokeninsight/report/en`,
        parameters: { lang: `Language, see below, Chinese by default` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`tokeninsight.com/:lang/report`], target: `/report/:lang` }],
        name: `Research`,
        maintainers: [],
        handler: o,
        description: `Language:

| Chinese | English |
| ------- | ------- |
| zh      | en      |`,
    };
async function o(a) {
    let o = a.req.param(`lang`) ?? `zh`,
        s = async () => {
            let e = `${i}api/user/search/getAllList`;
            return (await n.post(e, { form: { isRecommend: 2, language: o === `zh` ? `cn` : o } })).data.data.reportList;
        },
        c = async (a) => {
            let { publishDate: s, title: c, id: l } = a,
                u = `${i}${o}/report/${l}`;
            return { title: c, description: await e.tryGet(u, async () => r((await n(u)).data)(`.detail_html_box`).html()), pubDate: t(s), link: u };
        },
        l = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 30,
        u = (await s()).slice(0, l),
        d = await Promise.all(u.map((e) => c(e)));
    return { title: `${o === `zh` ? `报告` : `Research`} | TokenInsight`, link: `https://www.tokeninsight.com/${o}/report`, item: d };
}
export { a as route };
