import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { n as i } from './puppeteer-BbZGb8cd.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/user/video/:uid`,
    categories: [`multimedia`],
    example: `/iqiyi/user/video/2289191062`,
    parameters: { uid: `用户名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`iqiyi.com/u/:uid/*`] }],
    name: `用户视频`,
    maintainers: [`talengu`, `JimenezLi`],
    handler: s,
};
async function s(o) {
    let s = `https://www.iqiyi.com/u/${o.req.param(`uid`)}/videos`,
        c = await i(),
        l = await n.tryGet(
            s,
            async () => {
                let e = await c.newPage();
                (await e.setRequestInterception(!0),
                    e.on(`request`, (e) => {
                        e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                    }),
                    t.http(`Requesting ${s}`),
                    await e.goto(s, { waitUntil: `domcontentloaded` }),
                    await e.waitForSelector(`li.pic-txt-li`));
                let n = a(await e.content()),
                    i = n(`li.pic-txt-li`);
                return {
                    title: n(`title`).text(),
                    link: s,
                    item: i.toArray().map((e) => ({ title: n(e).attr(`title`), pubDate: r(n(e).find(`.li-sub span.sub-date`).text(), `YYYY-MM-DD`), link: n(e).find(`.li-dec a`).attr(`href`) })),
                };
            },
            e.cache.routeExpire,
            !1
        );
    return (await c.close(), l);
}
export { o as route };
