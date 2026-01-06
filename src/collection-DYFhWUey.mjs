import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './utils-Bry6Na7d.mjs';
import { t as r } from './auth-CxuQ4hiC.mjs';
const i = {
    path: `/xhu/collection/:id`,
    categories: [`social-media`],
    example: `/zhihu/xhu/collection/26444956`,
    parameters: { id: `收藏夹 id, 可在收藏夹页面 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.zhihu.com/collection/:id`] }],
    name: `xhu - 收藏夹`,
    maintainers: [`JimenezLi`],
    handler: a,
};
async function a(i) {
    let a = await r.getCookie(),
        o = i.req.param(`id`),
        s = `https://www.zhihu.com/collection/${o}`,
        c = await t({ method: `get`, url: `https://api.zhihuvvv.workers.dev/collections/${o}`, headers: { Referer: `https://api.zhihuvvv.workers.dev`, Cookie: a } }),
        l = (await t({ method: `get`, url: `https://api.zhihuvvv.workers.dev/collections/${o}/contents?limit=20&offset=0`, headers: { Referer: `https://api.zhihuvvv.workers.dev`, Cookie: a } })).data.data;
    return {
        title: `知乎收藏夹-${c.data.title}`,
        description: c.data.description,
        link: s,
        item: l.map((t) => {
            let r = t.url,
                i = t.author.name,
                a = e(t.collect_time * 1e3),
                o = ``,
                s = ``;
            switch (t.type) {
                case `article`:
                    ((o = t.title), (s = t.excerpt));
                    break;
                case `answer`:
                    ((o = t.question.title), (s = t.excerpt));
                    break;
                case `pin`: {
                    let e = n([t])[0];
                    ((o = e.title), (s = e.description));
                    break;
                }
                default:
                    throw Error(`Unknown type: ${t.type}`);
            }
            return { title: `收藏了内容：${o}`, description: s, author: i, pubDate: a, guid: r, link: r };
        }),
    };
}
export { i as route };
