import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { n as i } from './puppeteer-BbZGb8cd.mjs';
import { load as a } from 'cheerio';
const o = async (e, t) => {
        let n = await t.newPage(),
            r = new Set([`document`, `script`]);
        (await n.setRequestInterception(!0),
            n.on(`request`, (e) => {
                r.has(e.resourceType()) ? e.continue() : e.abort();
            }),
            await n.goto(e, { waitUntil: `domcontentloaded` }));
        let i;
        return (
            (i = await n.evaluate(() => document.documentElement.innerHTML)),
            i.includes(`抱歉，您尚未登录，没有权限访问该版块`) ? (await n.close(), i) : (await n.waitForSelector(`.t_f`), (i = await n.evaluate(() => document.documentElement.innerHTML)), await n.close(), i)
        );
    },
    s = `https://xsijishe.com`,
    c = {
        path: `/rank/:type`,
        categories: [`bbs`],
        example: `/xsijishe/rank/weekly`,
        parameters: {
            type: {
                description: `排行榜类型`,
                options: [
                    { value: `weekly`, label: `周榜` },
                    { value: `monthly`, label: `月榜` },
                ],
            },
        },
        features: {
            requireConfig: [
                { name: `XSIJISHE_COOKIE`, description: `` },
                { name: `XSIJISHE_USER_AGENT`, description: `` },
            ],
            requirePuppeteer: !0,
            antiCrawler: !0,
            supportBT: !1,
            supportPodcast: !1,
            supportScihub: !1,
            nsfw: !0,
        },
        name: `排行榜`,
        maintainers: [`akynazh`, `AiraNadih`],
        handler: l,
    };
async function l(c) {
    let l = c.req.param(`type`),
        u,
        d;
    if (l === `weekly`) ((u = `司机社综合周排行榜`), (d = 0));
    else if (l === `monthly`) ((u = `司机社综合月排行榜`), (d = 1));
    else throw new r(`Invalid rank type`);
    let f = await i(),
        p = !1,
        m = `${s}/portal.php`,
        h = { 'Accept-Encoding': `gzip, deflate, br`, 'Accept-Language': `zh-CN,zh;q=0.9,en;q=0.8`, Cookie: e.xsijishe.cookie, 'User-Agent': e.xsijishe.userAgent },
        g = await n(m, { headers: h }),
        _ = g.data.match(/window\.location\.href\s*=\s*"([^"]+)"/);
    _ && (g.data = (await n(`${s}${_[1]}`, { headers: h })).data);
    let v = a(g.data),
        y = v(`.nex_recon_lists ul li`)
            .eq(d)
            .find(`.nex_recons_demens dl dd`)
            .toArray()
            .map((e) => {
                e = v(e);
                let t = e.find(`h5`).text().trim(),
                    n = e.find(`a`).attr(`href`),
                    r = e.find(`img`).prop(`outerHTML`);
                return { title: t, link: `${s}/${n}`, description: r };
            });
    if (y.length > 0) {
        let e = y[0];
        a((await n(e.link, { headers: h })).data)(`.t_f`).first().length === 0 && (p = !0);
    }
    return (
        (y = await Promise.all(
            y.map((e) =>
                t.tryGet(e.link, async () => {
                    let t;
                    t = p ? await o(e.link, f) : (await n(e.link, { headers: h })).data;
                    let r = a(t),
                        i = r(`.t_f`).first();
                    return (
                        i.length === 1 &&
                            (i.find(`img`).each((e, t) => {
                                ((t = r(t)), t.attr(`zoomfile`) && (t.attr(`src`, t.attr(`zoomfile`)), t.removeAttr(`zoomfile`), t.removeAttr(`file`)), t.removeAttr(`onmouseover`));
                            }),
                            (e.description = i.html())),
                        e
                    );
                })
            )
        )),
        await f.close(),
        { title: u, link: m, description: u, item: y }
    );
}
export { c as route };
