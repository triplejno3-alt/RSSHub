import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { n as r } from './puppeteer-BbZGb8cd.mjs';
import { load as i } from 'cheerio';
const a = { path: `/:cate{.+}?`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let o = `https://www.cmde.org.cn/${a.req.param(`cate`) ?? `xwdt/zxyw`}/`,
        s = await r(),
        c = await e.tryGet(o, async () => {
            let e = await s.newPage();
            (await e.setRequestInterception(!0),
                e.on(`request`, (e) => {
                    e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                }),
                await e.goto(o, { waitUntil: `domcontentloaded` }),
                await e.waitForSelector(`.list`));
            let t = await e.evaluate(() => document.documentElement.innerHTML);
            await e.close();
            let n = i(t);
            return {
                title: n(`head title`).text(),
                description: n(`meta[name=ColumnDescription]`).attr(`content`),
                items: n(`.list ul li`)
                    .toArray()
                    .map((e) => ((e = n(e)), { title: n(e).find(`a`).attr(`title`), link: new URL(n(e).find(`a`).attr(`href`), o).href })),
            };
        }),
        l = await Promise.all(
            c.items.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = await s.newPage();
                    (await e.setRequestInterception(!0),
                        e.on(`request`, (e) => {
                            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                        }),
                        await e.goto(r.link, { waitUntil: `domcontentloaded` }),
                        await e.waitForSelector(`.text`));
                    let a = await e.evaluate(() => document.documentElement.innerHTML);
                    await e.close();
                    let o = i(a);
                    return ((r.description = o(`.text`).html()), (r.pubDate = n(t(o(`meta[name="PubDate"]`).attr(`content`)), 8)), r);
                })
            )
        );
    return (await s.close(), { title: c.title, description: c.description, link: o, item: l });
}
export { a as route };
