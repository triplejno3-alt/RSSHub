import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './util-DZpdstlX.mjs';
const a = {
    path: `/rank/:category?`,
    categories: [`new-media`],
    example: `/xinpianchang/rank`,
    parameters: { category: '分类 id，可在对应排行榜页 URL 中找到，见下表，默认为 `all` ，即总榜' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `排行榜`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| 分类     | id         |
| -------- | ---------- |
| 总榜     | all        |
| 精选榜   | staffPicks |
| 广告     | ad         |
| 宣传片   | publicity  |
| 创意     | creative   |
| 干货教程 | backstage  |`,
};
async function o(a) {
    let { category: o = `all` } = a.req.param(),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 60,
        c = new URL(`api/xpc/v2/rank/${o}`, r).href,
        { data: l } = await t(c),
        u = l.data.list[0],
        d = u.web_link,
        f = `${u.code}-${u.year}-${u.index}`,
        { data: p, response: m } = await i(d, e.tryGet),
        h = m.match(/\/static\/(\w+)\/_buildManifest\.js/)[1],
        g = new URL(`_next/data/${h}/rank/article/${f}.json`, r).href,
        { data: _ } = await t(g),
        v = _.pageProps.rankList;
    return ((v = await n(v.slice(0, s), e.tryGet)), { ...p, item: v });
}
export { a as route };
