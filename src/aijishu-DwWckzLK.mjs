import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as t, t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
var a = {
    parseArticle: (a) => {
        let o = `https://aijishu.com${a.url || a.object.url}`;
        return e.tryGet(o, async () => {
            let e = n(a.createdDate, [`YYYY-MM-DD`, `M-DD`]),
                s = t(a.createdDate),
                c,
                l;
            try {
                ((c = await r(o)), (l = i(c.data)(`article.fmt`).html()));
            } catch (e) {
                if (e.response.status !== 403) throw e;
            }
            return { title: a.title || a.object.title, link: o, description: l, pubDate: e.toString() === `Invalid Date` ? s : e };
        });
    },
};
const o = {
    path: `/:type/:name?`,
    categories: [`programming`],
    example: `/aijishu/channel/ai`,
    parameters: { type: `文章类型，可以取值如下`, name: `名字，取自URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `频道、专栏、用户`,
    maintainers: [],
    handler: s,
    description: `| type    | 说明 |
| ------- | ---- |
| channel | 频道 |
| blog    | 专栏 |
| u       | 用户 |`,
};
async function s(e) {
    let { type: t, name: n = `newest` } = e.req.param(),
        o = n === `newest` ? `https://aijishu.com/` : `https://aijishu.com/${t}/${n}`,
        s = i((await r(o)).data),
        c = s(`title`).text(),
        l = (await r(`https://aijishu.com${s(`li[data-js-stream-load-more]`).attr(`data-api-url`)}?page=1`)).data.data.rows,
        u = await Promise.all(l.filter((e) => e?.url?.startsWith(`/a/`) || e?.object?.url.startsWith(`/a/`)).map((e) => a.parseArticle(e)));
    return { title: c.split(` - `).slice(0, 2).join(` - `), link: o, item: u };
}
export { o as route };
