import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = `https://www.cn-healthcare.com`,
    r = {
        path: `/index`,
        categories: [`new-media`],
        example: `/cn-healthcare/index`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`cn-healthcare.com/`] }],
        name: `首页`,
        maintainers: [`qnloft`],
        handler: i,
        url: `cn-healthcare.com/`,
    };
async function i() {
    let r = (await t({ method: `get`, url: `${n}/api/article/articlelist?data={%22start%22:%221%22,%22size%22:%2250%22,%22arctype%22:%220%22,%22wmstart%22:%220%22,%22flag%22:%222%22}` })).data.data,
        i = `健康界 [cn-healthcare] `;
    return { title: i, link: `https://www.cn-healthcare.com`, description: `${i} - RSS`, item: r.datalist.map((t) => ({ title: t.title, description: t.content, pubDate: e(t.createdate), link: `${n}${t.url}` })) };
}
export { r as route };
