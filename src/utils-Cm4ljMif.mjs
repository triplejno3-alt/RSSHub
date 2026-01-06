import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { n as i, t as a } from './puppeteer-utils-BhPB3ohS.mjs';
import { load as o } from 'cheerio';
let s;
const c = `https://www.cw.com.tw`,
    l = {
        today: { pageUrl: () => `/today`, limit: 30 },
        master: { pageUrl: (e) => `/masterChannel.action?idMasterChannel=${e}`, limit: 12 },
        sub: { pageUrl: (e) => `/subchannel.action?idSubChannel=${e}`, limit: 12 },
        author: { pageUrl: (e) => `/author/${e}`, limit: 10 },
    },
    u = async (e, n) => (
        (s ||= await n(`cw:cookie`, async () => {
            let n = await e.newPage();
            return (
                await n.setRequestInterception(!0),
                n.on(`request`, (e) => {
                    e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                }),
                t.http(`Requesting ${c}/user/get/cookie-bar`),
                await n.goto(`${c}/user/get/cookie-bar`, { waitUntil: `domcontentloaded` }),
                (s = await a(n)),
                await n.close(),
                s
            );
        })),
        s
    ),
    d = async (e, r, a) => {
        let s = `${c}${l[e].pageUrl(a.req.param(`channel`))}`,
            d = await u(r, n.tryGet),
            m = await r.newPage();
        (await m.setRequestInterception(!0),
            m.on(`request`, (e) => {
                e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
            }),
            await i(m, d, `cw.com.tw`),
            t.http(`Requesting ${s}`),
            await m.goto(s, { waitUntil: `domcontentloaded` }),
            await m.waitForSelector(`.caption`));
        let h = await m.evaluate(() => document.documentElement.innerHTML);
        await m.close();
        let g = o(h);
        return { $: g, items: await p(f(g, a.req.query(`limit`) ? Number(a.req.query(`limit`)) : l[e].limit), r, n.tryGet) };
    },
    f = (e, t) =>
        e(`.caption`)
            .toArray()
            .map((t) => ((t = e(t)), { title: t.find(`h3`).text(), link: t.find(`h3 a`).attr(`href`), pubDate: r(t.find(`time`).text()) }))
            .slice(0, t),
    p = (t, n, i) =>
        Promise.all(
            t.map((t) =>
                i(t.link, async () => {
                    let a = o(await e(t.link, { headers: { Cookie: await u(n, i), 'User-Agent': n.userAgent() } })),
                        s = JSON.parse(a(`head script[type="application/ld+json"]`).eq(0).text());
                    return (
                        a(`.article__head .breadcrumb, .article__head h1, .article__provideViews, .ad`).remove(),
                        a(`img.lazyload`).each((e, t) => {
                            t.attribs[`data-src`] && ((t.attribs.src = t.attribs[`data-src`]), delete t.attribs[`data-src`]);
                        }),
                        (t.title = a(`head title`).text()),
                        (t.category = a(`meta[name=keywords]`).attr(`content`).split(`,`)),
                        (t.pubDate = r(s.datePublished)),
                        (t.author = s.author.name.replace(`,`, ` `) || s.publisher.name),
                        (t.description = a(`.article__head .container`).html() + a(`.article__content`).html()),
                        t
                    );
                })
            )
        );
export { d as n, c as t };
