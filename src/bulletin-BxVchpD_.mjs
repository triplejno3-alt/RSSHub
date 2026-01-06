import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://www.tokeninsight.com/`,
    a = async () => {
        let e = `${i}api/bulletin/selectBulletinList`,
            { data: t } = (await n.get(e)).data;
        return t;
    },
    o = {
        path: `/bulletin/:lang?`,
        categories: [`finance`],
        example: `/tokeninsight/bulletin/en`,
        parameters: { lang: `Language, see below, Chinese by default` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`tokeninsight.com/:lang/latest`], target: `/bulletin/:lang` }],
        name: `Latest`,
        maintainers: [],
        handler: s,
    };
async function s(o) {
    let s = o.req.param(`lang`) ?? `zh`,
        c = async (a) => {
            let { updateDate: o, titleEn: c, id: l, title: u } = a,
                d = `${i}${s}/latest/${l}`,
                f = await e.tryGet(d, async () => r((await n(d)).data)(`.detail_html_box`).html());
            return { title: s === `zh` ? u : c, description: f, pubDate: t(o), link: d };
        },
        l = await a(),
        u = await Promise.all(l.map((e) => c(e)));
    return { title: `${s === `zh` ? `快讯` : `Latest`} | TokenInsight`, link: `https://www.tokeninsight.com/${s}/latest`, item: u };
}
export { o as route };
