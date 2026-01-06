import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/news`,
    categories: [`shopping`],
    example: `/coolpc/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.coolpc.com.tw/`] }],
    name: `促銷&開箱`,
    maintainers: [`david90103`],
    handler: i,
    url: `www.coolpc.com.tw/`,
};
async function i() {
    let r = `https://www.coolpc.com.tw/`,
        i = n((await t(r)).data);
    return {
        title: `原價屋 - 促銷&開箱`,
        link: r,
        item: i(`#content article`)
            .toArray()
            .map((t) => ({
                title: i(t).find(`h3 a`).text(),
                description: i(t).find(`.ultimate-layouts-excerpt`).text(),
                link: i(t).find(`h3 a`).attr(`href`),
                pubDate: e(i(t).find(`.ultimate-layouts-metas-wrap span`).eq(1).text(), `YYYY/MM/DD`),
            }))
            .filter((e, t, n) => t === n.findIndex((t) => t.title === e.title)),
    };
}
export { r as route };
