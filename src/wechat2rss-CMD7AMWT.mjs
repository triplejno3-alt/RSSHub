import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './rss-parser-CKuAfhVS.mjs';
import { n } from './wechat-mp-HNgcLN2K.mjs';
const r = {
    path: `/wechat2rss/:id`,
    categories: [`new-media`],
    example: `/wechat/wechat2rss/5b925323244e9737c39285596c53e3a2f4a30774`,
    parameters: { id: '公众号 id，打开 `https://wechat2rss.xlab.app/posts/list/`，在 URL 中找到 id；注意不是公众号页的 id，而是订阅的 id' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `公众号（Wechat2RSS 来源）`,
    maintainers: [`TonyRL`],
    handler: i,
};
async function i(r) {
    let i = `https://wechat2rss.xlab.app/feed/${r.req.param(`id`)}.xml`,
        { title: a, link: o, description: s, image: c, items: l } = await t.parseURL(i),
        u = l.map((t) => ({ title: t.title, pubDate: e(t.pubDate), link: t.link }));
    return ((u = await Promise.all(u.map((e) => n(e)))), { title: a, link: o, description: s, image: c.url, item: u });
}
export { r as route };
