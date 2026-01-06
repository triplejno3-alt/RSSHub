import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/news`,
    categories: [`new-media`],
    example: `/wanqu/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`wanqu.co/`] }],
    name: `最新推荐`,
    maintainers: [`Fatpandac`],
    handler: i,
    url: `wanqu.co/`,
};
async function i() {
    let r = `https://www.wanqu.co`,
        i = n((await t(r)).data);
    return {
        title: `湾区日报 - 最新推荐`,
        link: r,
        item: i(`div.mb-4`)
            .toArray()
            .map((t) => ({ title: i(t).find(`a`).text(), description: i(t).find(`a`).text(), link: i(t).find(`a`).attr(`href`), pubDate: e(i(t).find(`i.text-helper-color.mr-4`).text().trim()) })),
    };
}
export { r as route };
