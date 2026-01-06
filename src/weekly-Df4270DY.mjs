import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/weekly`,
    categories: [`programming`],
    example: `/sec-wiki/weekly`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `最新周刊`,
    maintainers: [`p7e4`],
    handler: n,
};
async function n() {
    let { data: t } = await e(`https://www.sec-wiki.com/weekly/index`);
    return {
        title: `SecWiki-安全维基`,
        link: `https://www.sec-wiki.com/`,
        item: [...t.matchAll(/\/weekly\/(\d+)">(.+?)<\/a><\/h5>\s*<p>(.+?)<\/p>/g)].map((e) => ({ title: e[2], link: `https://www.sec-wiki.com/weekly/${e[1]}`, description: e[3] })),
    };
}
export { t as route };
