import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
async function r() {
    let { data: r } = await t(`https://apisix.apache.org/zh/blog/`),
        i = n(r);
    return i(`section.sec_gjjg`)
        .eq(1)
        .find(`article`)
        .toArray()
        .map((t) => {
            let n = i(t).find(`header > a`);
            return {
                title: n.find(`h2`).text(),
                description: n.find(`p`).text(),
                link: n.attr(`href`),
                pubDate: e(i(t).find(`footer`).find(`time`).attr(`datetime`)),
                category: i(t)
                    .find(`header div a`)
                    .toArray()
                    .map((e) => i(e).text()),
            };
        });
}
const i = {
    path: `/apisix/blog`,
    categories: [`blog`],
    example: `/apache/apisix/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `APISIX 博客`,
    maintainers: [`aneasystone`],
    handler: a,
};
async function a() {
    return { title: `Blog | Apache APISIX`, link: `https://apisix.apache.org/zh/blog/`, item: await r() };
}
export { i as route };
