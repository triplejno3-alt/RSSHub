import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { n as r } from './puppeteer-BbZGb8cd.mjs';
import { Fragment as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = { path: `/journal/:id`, radar: [{ source: [`pubs.acs.org/journal/:id`, `pubs.acs.org/`] }], name: `Unknown`, maintainers: [`nczitzk`], handler: u };
async function u(i) {
    let a = i.req.param(`id`) ?? ``,
        s = `https://pubs.acs.org`,
        c = `${s}/toc/${a}/0/0`,
        l = ``,
        u = await r(),
        f = await t.tryGet(
            c,
            async () => {
                let e = await u.newPage();
                (await e.setRequestInterception(!0),
                    e.on(`request`, (e) => {
                        e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                    }),
                    await e.goto(c, { waitUntil: `domcontentloaded` }),
                    await e.waitForSelector(`.toc`));
                let t = await e.evaluate(() => document.documentElement.innerHTML);
                await e.close();
                let r = o(t);
                return (
                    (l = r(`meta[property="og:title"]`).attr(`content`)),
                    r(`.issue-item`)
                        .toArray()
                        .map((e) => {
                            e = r(e);
                            let t = e.find(`.issue-item_title a`),
                                i = e.find(`input[name="doi"]`).attr(`value`);
                            return {
                                doi: i,
                                guid: i,
                                title: t.text(),
                                link: `${s}${t.attr(`href`)}`,
                                pubDate: n(e.find(`.pub-date-value`).text(), `MMMM D, YYYY`),
                                author: e
                                    .find(`.issue-item_loa li`)
                                    .toArray()
                                    .map((e) => r(e).text())
                                    .join(`, `),
                                description: d(e.find(`.issue-item_img`).html(), e.find(`.hlFld-Abstract`).html()),
                            };
                        })
                );
            },
            e.cache.routeExpire,
            !1
        );
    return (await u.close(), { title: l, link: c, item: f });
}
const d = (e, t) => s(a(i, { children: [e ? c(e) : null, t ? c(t) : null] }));
export { l as route };
