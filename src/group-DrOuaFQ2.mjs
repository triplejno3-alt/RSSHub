import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './description-B57_U9sP.mjs';
const i = {
    path: `/group/:id/:sort?`,
    categories: [`bbs`],
    example: `/douyu/group/1011`,
    parameters: { id: `鱼吧 id，可在鱼吧页 URL 中找到`, sort: `排序方式，见下表，默认为发布时间排序` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yuba.douyu.com/group/:id`, `yuba.douyu.com/group/newself/:id`, `yuba.douyu.com/group/newall/:id`, `yuba.douyu.com/`], target: `/group/:id` }],
    name: `鱼吧帖子`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| 回复时间排序 | 发布时间排序 |
| ------------ | ------------ |
| 1            | 2            |`,
};
async function a(i) {
    let a = i.req.param(`id`),
        o = i.req.param(`sort`) ?? `2`,
        s = `https://yuba.douyu.com`,
        c = `${s}/wbapi/web/group/head?group_id=${a}`,
        l = `${s}/wbapi/web/group/postlist?group_id=${a}&page=1&sort=${o}`,
        u = `${s}/group/${o === `1` ? `newall` : `newself`}/${a}`,
        d = await t({ method: `get`, url: l }),
        f = await t({ method: `get`, url: c }),
        p = d.data.data.map((t) => ({ title: t.title, link: `${s}/p/${t.post_id}`, pubDate: n(e(t.created_at_std), 8), description: r({ content: t.describe, images: t.imglist.map((e) => ({ size: e.size, url: e.url })) }) }));
    return { title: `斗鱼鱼吧 - ${f.data.data.group_name}`, link: u, item: p, description: f.data.data.describe };
}
export { i as route };
