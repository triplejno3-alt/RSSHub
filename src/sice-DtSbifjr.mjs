import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { n as t } from './puppeteer-BbZGb8cd.mjs';
import { load as n } from 'cheerio';
import r from 'dayjs';
const i = `https://www.sice.uestc.edu.cn/index.htm`,
    a = {
        path: `/sice`,
        categories: [`university`],
        example: `/uestc/sice`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`sice.uestc.edu.cn/`] }],
        name: `信息与通信工程学院`,
        maintainers: [`huyyi`, `mobyw`],
        handler: o,
        url: `sice.uestc.edu.cn/`,
    };
async function o() {
    let a = await t(),
        o = await a.newPage();
    (await o.setRequestInterception(!0),
        o.on(`request`, (e) => {
            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
        }),
        await o.goto(i, { waitUntil: `networkidle2` }));
    let s = await o.content();
    await a.close();
    let c = n(s);
    return {
        title: `信通学院通知`,
        link: i,
        description: `电子科技大学信息与通信工程学院通知公告`,
        item: c(`.notice p`)
            .toArray()
            .map((t) => {
                t = c(t);
                let n = r(),
                    i = r(n.year() + `-` + t.find(`a.date`).text());
                return (n < i && (i = r(n.year() - 1 + `-` + t.find(`a.date`).text())), { title: t.find(`a[href]`).text(), link: `https://www.sice.uestc.edu.cn/` + t.find(`a[href]`).attr(`href`), pubDate: e(i) });
            }),
    };
}
export { a as route };
