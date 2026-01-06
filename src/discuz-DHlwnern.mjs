import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { t as a } from './config-not-found-DGyG6Tbz.mjs';
import { load as o } from 'cheerio';
import s from 'iconv-lite';
function c(e, t) {
    return ((e &&= (t && !/^https?:\/\//.test(t) && (t = /^\/\//.test(t) ? `http:` + t : `http://` + t), new URL(e, t).href)), e);
}
async function l(t, n, r) {
    let i = await e.raw(t, { method: `get`, responseType: `arrayBuffer`, headers: r }),
        a = s.decode(Buffer.from(i._data), n ?? `utf-8`);
    if (!a) return { description: `获取详细内容失败` };
    let c = o(a),
        l = c(`div#postlist div[id^=post] td[id^=postmessage]`).first();
    return (
        l.find(`img`).each((e, t) => {
            ((t = c(t)), t.attr(`src`)?.endsWith(`none.gif`) && t.attr(`file`) && (t.attr(`src`, t.attr(`file`) || t.attr(`zoomfile`)), t.removeAttr(`file`), t.removeAttr(`zoomfile`)));
        }),
        { description: l.html() }
    );
}
const u = { path: [`/:ver{[7x]}/:cid{[0-9]{2}}/:link{.+}`, `/:ver{[7x]}/:link{.+}`, `/:link{.+}`], name: `Unknown`, maintainers: [], handler: d };
async function d(u) {
    let d = u.req.param(`link`),
        f = u.req.param(`ver`) ? u.req.param(`ver`).toUpperCase() : void 0,
        p = u.req.param(`cid`);
    d = d.replace(/:\/\//, `:/`).replace(/:\//, `://`);
    let m = p === void 0 ? `` : t.discuz.cookies[p];
    if (m === void 0) throw new a(`缺少对应论坛的cookie.`);
    let h = { Cookie: m },
        g = await e.raw(d, { method: `get`, responseType: `arrayBuffer`, headers: h }),
        _ = Buffer.from(g._data),
        v = g.headers[`content-type`] || ``,
        y = o(s.decode(_, `utf-8`)),
        b = v.match(/charset=([^;]*)/)?.[1] ?? y(`meta[charset]`).attr(`charset`) ?? y(`meta[http-equiv="Content-Type"]`).attr(`content`)?.split(`charset=`)?.[1];
    b?.toLowerCase() !== `utf-8` && (y = o(s.decode(_, b ?? `utf-8`)));
    let x = f ? `DISCUZ! ${f}` : y(`head > meta[name=generator]`).attr(`content`),
        S;
    if (x.toUpperCase().startsWith(`DISCUZ! 7`)) {
        let e = y(`tbody[id^="normalthread"] > tr`)
            .slice(0, u.req.query(`limit`) ? Number.parseInt(u.req.query(`limit`), 10) : 5)
            .toArray()
            .map((e) => {
                e = y(e);
                let t = e.find(`span[id^=thread] a`);
                return { title: t.text().trim(), link: c(t.attr(`href`), d), pubDate: e.find(`td.author em`).length ? r(e.find(`td.author em`).text().trim()) : void 0, author: e.find(`td.author cite a`).text().trim() };
            });
        S = await Promise.all(
            e.map((e) =>
                n.tryGet(e.link, async () => {
                    let { description: t } = await l(e.link, b, h);
                    return ((e.description = t), e);
                })
            )
        );
    } else if (x.toUpperCase().startsWith(`DISCUZ! X`)) {
        let e = y(`tbody[id^="normalthread"] > tr`)
            .slice(0, u.req.query(`limit`) ? Number.parseInt(u.req.query(`limit`), 10) : 5)
            .toArray()
            .map((e) => {
                e = y(e);
                let t = e.find(`a.xst`);
                return {
                    title: t.text(),
                    link: c(t.attr(`href`), d),
                    pubDate: e.find(`td.by:nth-child(3) em span`).last().length ? r(e.find(`td.by:nth-child(3) em span`).last().text().trim()) : void 0,
                    author: e.find(`td.by:nth-child(3) cite a`).text().trim(),
                };
            });
        S = await Promise.all(
            e.map((e) =>
                n.tryGet(e.link, async () => {
                    let { description: t } = await l(e.link, b, h);
                    return ((e.description = t), e);
                })
            )
        );
    } else throw new i(`不支持当前Discuz版本.`);
    return { title: y(`head > title`).text(), description: y(`head > meta[name=description]`).attr(`content`), link: d, item: S };
}
export { u as route };
