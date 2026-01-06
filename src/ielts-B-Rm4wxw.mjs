import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { n as a } from './puppeteer-BbZGb8cd.mjs';
import { load as o } from 'cheerio';
const s = `https://ielts.neea.cn/allnews?locale=zh_CN`,
    c = { path: `/`, radar: [{ source: [`ielts.neea.cn/allnews`], target: `` }], name: `Unknown`, maintainers: [`zenxds`], handler: l, url: `ielts.neea.cn/allnews` };
async function l() {
    let c = o(
            await t.tryGet(
                s,
                async () => {
                    let e = await a(),
                        t = await e.newPage();
                    (await t.setRequestInterception(!0),
                        t.on(`request`, (e) => {
                            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                        }),
                        await t.goto(s, { waitUntil: `domcontentloaded` }),
                        await t.waitForSelector(`div.container`));
                    let n = await t.evaluate(() => document.documentElement.innerHTML);
                    return (await e.close(), n);
                },
                e.cache.routeExpire,
                !1
            )
        ),
        l = c(`#newsListUl li`)
            .toArray()
            .map((e) => {
                let t = c(e);
                return { title: t.find(`a`).text(), link: t.find(`a`).attr(`href`), pubDate: i(n(t.find(`span`).eq(-1).text().replaceAll(/[[\]]/g, ``).trim(), 8)) };
            });
    return { title: `IELTS雅思最新消息`, link: s, item: await Promise.all(l.map((e) => t.tryGet(e.link, async () => ((e.description = o((await r({ method: `get`, url: e.link })).data)(`.content`).html()), e)))) };
}
export { c as route };
