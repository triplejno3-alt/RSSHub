import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = (e, t) => a(i(n, { children: [e, t?.map((e) => (e.mimeType?.includes(`image`) ? r(`img`, { src: e.url }) : null))] })),
    s = {
        path: `/ds/:id`,
        categories: [`game`],
        example: `/163/ds/63dfbaf4117741daaf73404601165843`,
        parameters: { id: `用户ID` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`ds.163.com/user/:id`] }],
        name: `用户发帖`,
        maintainers: [`luyuhuang`],
        handler: c,
    };
async function c(n) {
    let r = n.req.param(`id`),
        i = await t({ method: `get`, url: `https://inf.ds.163.com/v1/web/feed/basic/getSomeOneFeeds?feedTypes=1,2,3,4,6,7,10,11&someOneUid=${r}` }),
        a = i.data.result.feeds.map((t) => ({
            title: JSON.parse(t.content).body.text,
            link: `https://ds.163.com/feed/${t.id}`,
            description: o(JSON.parse(t.content).body.text, JSON.parse(t.content).body.media),
            pubDate: e(t.updateTime),
        }));
    return { title: `${i.data.result.userInfos[0].user.nick} 的动态`, link: `https://ds.163.com/user/${r}`, item: a };
}
export { s as route };
