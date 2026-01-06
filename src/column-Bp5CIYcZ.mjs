import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { CookieJar as n } from 'tough-cookie';
import { JSDOM as r } from 'jsdom';
const i = new n(),
    a = `https://xueqiu.com`,
    o = {
        path: `/column/:id`,
        categories: [`finance`],
        example: `/xueqiu/column/9962554712`,
        parameters: { id: `用户 id, 可在用户主页 URL 中找到` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`xueqiu.com/:id/column`] }],
        name: `用户专栏`,
        maintainers: [`TonyRL`, `pseudoyu`],
        handler: s,
    };
async function s(n) {
    let o = n.req.param(`id`),
        s = `${a}/${o}/column`;
    await t(a, { cookieJar: i });
    let { window: c } = new r((await t(s, { cookieJar: i })).data, { runScripts: `dangerously` }),
        l = c.SNOWMAN_TARGET,
        { data: u } = await t(`${a}/statuses/original/timeline.json`, { cookieJar: i, searchParams: { user_id: o, page: 1 } });
    if (!u.list) throw Error(`Error occurred, please refresh the page or try again after logging back into your account`);
    let d = u.list.map((t) => ({ title: t.title, description: t.description, pubDate: e(t.created_at, `x`), link: `${a}${t.target}`, author: l.screen_name }));
    return { title: `${l.screen_name} - 雪球`, link: s, description: l.description, item: d };
}
export { o as route };
