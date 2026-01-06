import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = { hot: `热门`, last: `最近` },
    r = {
        path: `/article/:sort?`,
        categories: [`programming`],
        example: `/hellogithub/article`,
        parameters: { sort: '排序方式，见下表，默认为 `last`，即最近' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `文章`,
        maintainers: [`moke8`, `nczitzk`, `CaoMeiYouRen`],
        handler: i,
        description: `| 热门 | 最近 |
| ---- | ---- |
| hot  | last |`,
    };
async function i(r) {
    let i = r.req.param(`sort`) ?? `last`,
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 20,
        o = `https://hellogithub.com`,
        s = `${o}/article/?sort_by=${i}`,
        c = (await t({ method: `get`, url: `https://api.hellogithub.com/v1/article/?sort_by=${i}&page=1` })).data.data.slice(0, a).map((t) => ({
            title: t.title,
            description: `<figure>
  <img src="${t.head_image}">
</figure><br>${t.desc}`,
            link: `${o}/article/${t.aid}`,
            author: t.author,
            guid: t.aid,
            pubDate: e(t.publish_at),
        }));
    return { title: `HelloGithub - ${n[i]}文章`, link: s, item: c };
}
export { r as route };
