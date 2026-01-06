import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { n } from './puppeteer-BbZGb8cd.mjs';
import r from 'p-map';
var i = {
    ProcessFeed: async (e, t, n, i, a) => {
        let o = [],
            s = await r(
                e.slice(0, i),
                async (e) => {
                    let r = `https://www.dcard.tw/service/api/v2/posts/${e.id}`;
                    return (
                        (e.description = await a.tryGet(`dcard:${e.id}`, async () => {
                            let i;
                            try {
                                let a = await n.newPage();
                                (await a.setRequestInterception(!0),
                                    a.on(`request`, (e) => {
                                        e.resourceType() === `document` || e.resourceType() === `script` || e.resourceType() === `fetch` || e.resourceType() === `xhr` ? e.continue() : e.abort();
                                    }),
                                    await a.setExtraHTTPHeaders({ referer: `https://www.dcard.tw/f/${e.forumAlias}/p/${e.id}` }),
                                    await a.setCookie(...t),
                                    await a.goto(r),
                                    await a.waitForSelector(`body > pre`),
                                    (i = await a.evaluate(() => document.querySelector(`body > pre`).textContent)),
                                    (o = await a.cookies()),
                                    await a.close());
                                let s = JSON.parse(i).content;
                                return (
                                    (s = s.replaceAll(/(?=https?:\/\/).*?(?<=\.(jpe?g|gif|png))/gi, (e) => `<img src="${e}">`)),
                                    (s = s.replaceAll(/(?=https?:\/\/).*(?<!jpe?g"?>?)$/gim, (e) => `<a href="${e}">${e}</a>`)),
                                    (s = s.replaceAll(
                                        `
`,
                                        `<br>`
                                    )),
                                    s
                                );
                            } catch {
                                return ``;
                            }
                        })),
                        e
                    );
                },
                { concurrency: 3 }
            );
        return (await a.set(`dcard:cookies`, o, 3600), [...s, ...e.slice(i)]);
    },
};
const a = {
    path: `/:section/:type?`,
    categories: [`bbs`],
    example: `/dcard/funny/popular`,
    parameters: { section: `板塊名稱，URL 中獲得`, type: `排序，popular 熱門；latest 最新，默認為 latest` },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `板塊帖子`,
    maintainers: [`HenryQW`],
    handler: o,
};
async function o(r) {
    let { type: a = `latest`, section: o = `posts` } = r.req.param(),
        s = r.req.query(`limit`) ? Number(r.req.query(`limit`)) : 30,
        c = await n(),
        l = `https://www.dcard.tw/f`,
        u = `https://www.dcard.tw/service/api/v2`,
        d = `Dcard - `;
    (o !== `posts` && o !== `popular` && o !== `latest` && ((l += `/${o}`), (u += `/forums/${o}`), (d += `${o} - `)),
        (u += `/posts`),
        a === `popular` ? ((l += `?latest=false`), (u += `?popular=true`), (d += `熱門`)) : ((l += `?latest=true`), (u += `?popular=false`), (d += `最新`)));
    let f = await c.newPage();
    (await f.setRequestInterception(!0),
        f.on(`request`, (e) => {
            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
        }),
        await f.setExtraHTTPHeaders({ referer: `https://www.dcard.tw/f/${o}` }),
        await f.goto(`${u}&limit=100`),
        await f.waitForSelector(`body > pre`));
    let p = await f.evaluate(() => document.querySelector(`body > pre`).textContent),
        m = await e.tryGet(`dcard:cookies`, () => f.cookies(), 3600, !1);
    await f.close();
    let h = JSON.parse(p).map((e) => ({
            title: `「${e.forumName}」${e.title}`,
            link: `https://www.dcard.tw/f/${e.forumAlias}/p/${e.id}`,
            description: e.excerpt,
            author: `${e.school || `匿名`}．${e.gender === `M` ? `男` : `女`}`,
            pubDate: t(e.createdAt),
            category: [e.forumName, ...e.topics],
            forumAlias: e.forumAlias,
            id: e.id,
        })),
        g = await i.ProcessFeed(h, m, c, s, e);
    return (await c.close(), { title: d, link: l, description: `不想錯過任何有趣的話題嗎？趕快加入我們吧！`, item: g });
}
export { a as route };
