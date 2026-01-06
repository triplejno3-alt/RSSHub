import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = { featured: `精选`, all: `全部` },
    i = {
        path: `/home/:sort?/:id?`,
        categories: [`programming`],
        example: `/hellogithub/home`,
        parameters: { sort: '排序方式，见下表，默认为 `featured`，即精选', id: `标签 id，可在对应标签页 URL 中找到，默认为全部标签` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `开源项目`,
        maintainers: [`moke8`, `nczitzk`, `CaoMeiYouRen`],
        handler: a,
        description: `| 精选 | 全部 |
| ---- | ---- |
| featured  | all |`,
    };
async function a(i) {
    let a = i.req.param(`sort`) ?? `featured`,
        o = i.req.param(`id`) ?? ``,
        s = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 20,
        c = `https://hellogithub.com`,
        l = `${c}/?sort_by=${a}${o ? `&tid=${o}` : ``}`,
        u = await t({ method: `get`, url: `https://api.hellogithub.com/v1/?sort_by=${a}${o ? `&tid=${o}` : ``}&page=1` }),
        d;
    o &&
        (d = n((await t({ method: `get`, url: `${c}/tags/${o}` })).data)(`meta[property="og:title"]`)
            ?.attr(`content`)
            ?.split(` `)
            .pop());
    let f = u.data.data
        .slice(0, s)
        .map((t) => ({
            guid: t.item_id,
            title: `${t.name}: ${t.title}`,
            author: t.author,
            link: `${c}/repository/${t.item_id}`,
            pubDate: e(t.updated_at),
            name: `${t.author}/${t.name}`,
            description: t.summary,
            language: t.primary_lang,
        }));
    return { title: `HelloGithub - ${r[a]}${d || ``}开源项目`, link: l, item: f };
}
export { i as route };
