import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = { 'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1` },
    l = {
        path: `/:userid`,
        categories: [`social-media`],
        view: n.Audios,
        example: `/changba/skp6hhF59n48R-UpqO3izw`,
        parameters: { userid: `用户ID, 可在对应分享页面的 URL 中找到` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !0, supportScihub: !1 },
        radar: [{ source: [`changba.com/s/:userid`] }],
        name: `用户`,
        maintainers: [`kt286`, `xizeyoupan`, `pseudoyu`],
        handler: u,
    };
async function u(n) {
    let r = `https://changba.com/wap/index.php?s=${n.req.param(`userid`)}`,
        a = (await t({ method: `get`, url: r, headers: c })).data,
        l = o(a),
        u = l(`.user-work .work-info`).toArray(),
        f = l(`div.user-main-info > span.txt-info > a.uname`).text(),
        p = l(`div.user-main-info > .poster > img`).attr(`data-src`),
        m = await Promise.all(
            u.map((n) => {
                let r = o(n),
                    a = r(`a`).attr(`href`);
                return e.tryGet(a, async () => {
                    let e = await t({ method: `get`, url: a, headers: c }),
                        n = /workid: '\d+'/,
                        o;
                    try {
                        o = e.data.match(n)[0];
                    } catch {
                        return null;
                    }
                    if (((o = o.split(`'`)[1]), !o)) return null;
                    let l = `https://upscuw.changba.com/${o}.mp3`,
                        u = s(i(d, { desc: r(`div.des`).text(), mp3url: l })),
                        p = r(`div.work-cover`).attr(`style`).replace(`)`, ``).split(`url(`)[1];
                    return { title: r(`.work-title`).text(), description: u, link: a, author: f, itunes_item_image: p, enclosure_url: l, enclosure_type: `audio/mpeg` };
                });
            })
        );
    return ((m = m.filter(Boolean)), { title: f + ` - 唱吧`, link: r, description: l(`meta[name="description"]`).attr(`content`) || f + ` - 唱吧`, item: m, image: p, itunes_author: f, itunes_category: `唱吧` });
}
const d = ({ desc: e, mp3url: t }) => a(r, { children: [i(`p`, { children: e }), i(`audio`, { id: `audio`, src: t, preload: `metadata` })] });
export { l as route };
