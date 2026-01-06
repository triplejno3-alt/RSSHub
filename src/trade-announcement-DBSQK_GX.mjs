import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { n as r } from './puppeteer-BbZGb8cd.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/pbc/tradeAnnouncement`,
    categories: [`finance`],
    example: `/gov/pbc/tradeAnnouncement`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `货币政策司公开市场交易公告`,
    maintainers: [`nczitzk`],
    handler: o,
};
async function o() {
    let a = `http://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125475/index.html`,
        o = await r(),
        s = await o.newPage();
    (await s.setRequestInterception(!0),
        s.on(`request`, (e) => {
            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
        }),
        await s.goto(a, { waitUntil: `domcontentloaded` }));
    let c = i(await s.evaluate(() => document.documentElement.innerHTML)),
        l = c(`font.newslist_style`)
            .toArray()
            .map((e) => {
                e = c(e);
                let t = e.find(`a[title]`);
                return { title: t.attr(`title`), link: new URL(t.attr(`href`), `http://www.pbc.gov.cn`).href };
            }),
        u = await Promise.all(
            l.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = await o.newPage();
                    (await e.setRequestInterception(!0),
                        e.on(`request`, (e) => {
                            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                        }),
                        await e.goto(r.link, { waitUntil: `domcontentloaded` }));
                    let a = i(await e.evaluate(() => document.documentElement.innerHTML));
                    return ((r.description = a(`#zoom`).html()), (r.pubDate = n(t(a(`#shijian`).text()), 8)), r);
                })
            )
        );
    return (await o.close(), { title: `中国人民银行 - 货币政策司公开市场交易公告`, link: a, item: u });
}
export { a as route };
