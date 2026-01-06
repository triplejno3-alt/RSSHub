import './config-Cc-zZ5p-.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './rss-parser-CKuAfhVS.mjs';
const n = {
    path: `/tag/:tag`,
    categories: [`new-media`],
    example: `/qbitai/tag/大语言模型`,
    parameters: { tag: `标签名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`qbitai.com/tag/:tag`] }],
    name: `标签`,
    maintainers: [`FuryMartin`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`tag`),
        i = encodeURI(`https://www.qbitai.com/tag/${r}/feed`),
        a = (await t.parseURL(i)).items.map((t) => ({ title: t.title, pubDate: e(t.pubDate), link: t.link, author: `量子位`, category: t.categories, description: t[`content:encoded`] }));
    return { title: `量子位-${r}`, link: `https://www.qbitai.com/tag/${r}`, item: a };
}
export { n as route };
