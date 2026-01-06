import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { n as t } from './puppeteer-BbZGb8cd.mjs';
import { load as n } from 'cheerio';
const r = `https://www.auto.uestc.edu.cn/index/tzgg1.htm`,
    i = {
        path: `/auto`,
        categories: [`university`],
        example: `/uestc/auto`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`auto.uestc.edu.cn/`] }],
        name: `自动化工程学院`,
        maintainers: [`talengu`, `mobyw`],
        handler: a,
        url: `auto.uestc.edu.cn/`,
    };
async function a() {
    let i = await t(),
        a = await i.newPage();
    (await a.setRequestInterception(!0),
        a.on(`request`, (e) => {
            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
        }),
        await a.goto(r, { waitUntil: `networkidle2` }));
    let o = await a.content();
    await i.close();
    let s = n(o);
    return {
        title: `电子科技大学自动化学院通知`,
        link: r,
        description: `电子科技大学自动化工程学院通知`,
        item: s(s(`dl.clearfix`))
            .toArray()
            .map((t) => ((t = s(t)), { title: t.find(`a`).text(), link: `https://www.auto.uestc.edu.cn/` + t.find(`a[href]`).attr(`href`).slice(3), pubDate: e(t.find(`span`).text()) })),
    };
}
export { i as route };
