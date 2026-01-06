import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = (e, t) => s(a(r, { children: [e ? i(`p`, { children: e }) : null, t?.length ? t.map((e) => (e?.src ? i(`figure`, { children: i(`img`, { src: e.src, alt: e.alt }) }, e.src) : null)) : null] })),
    l = async (n) => {
        let r = Number.parseInt(n.req.query(`limit`) ?? `100`, 10),
            i = `https://tf.121.com.cn`,
            a = `https://wx.121.com.cn`,
            s = new URL(`web/weatherLive/`, i).href,
            l = new URL(`weather/weibo/message.js`, i).href,
            u = o(await e(s)),
            d = u(`html`).attr(`lang`) ?? `zh`,
            f = await (await e(l)).text(),
            p = JSON.parse(f.split(/var\smessage=/).pop())
                .slice(0, r)
                .map((e) => {
                    let n = e.Title,
                        r = c(
                            e.Content,
                            e.Img?.map((e) => ({ src: new URL(`WeChat/data/weiweb/images/lwspic/${e}`, a).href, alt: n }))
                        ),
                        o = e.DDatetime,
                        l = s,
                        u = `121-${n}-${o}`,
                        f = e.Img?.length > 0 ? new URL(`WeChat/data/weiweb/images/lwspic/${e.Img[0]}`, a).href : void 0,
                        p = o;
                    return { title: n, description: r, pubDate: o ? t(o) : void 0, link: l ?? new URL(e.id, i).href, guid: u, id: u, content: { html: r, text: r }, image: f, banner: f, updated: p ? t(p) : void 0, language: d };
                }),
            m = u(`title`).text();
        return { title: m, description: m, link: s, item: p, allowEmpty: !0, image: u(`img`).first().attr(`src`) ? new URL(u(`img`).first().attr(`src`), i).href : void 0, author: u(`div#webnameDiv`).text(), language: d, id: s };
    },
    u = {
        path: `/weatherLive`,
        name: `深圳天气直播`,
        url: `tf.121.com.cn`,
        maintainers: [`nczitzk`],
        handler: l,
        example: `/121/weatherLive`,
        parameters: void 0,
        description: void 0,
        categories: [`forecast`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`tf.121.com.cn`, `tf.121.com.cn/web/weatherLive`], target: `/weatherLive` }],
        view: n.Notifications,
    };
export { l as handler, u as route };
