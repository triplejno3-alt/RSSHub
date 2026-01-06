import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { FetchError as a } from 'ofetch';
import { Fragment as o, jsx as s, jsxs as c } from 'hono/jsx/jsx-runtime';
import { load as l } from 'cheerio';
import { renderToString as u } from 'hono/jsx/dom/server';
import { raw as d } from 'hono/html';
const f = `3d5_f6A(S$G_FD=2S(Dr6%7BW_h37@rE`,
    p = {
        path: `/:category?`,
        categories: [`traditional-media`],
        example: `/lorientlejour/977-lebanon`,
        parameters: { category: `Category from the last segment of the URL of the corresponding site, see below for more information, /977-Lebanon by default` },
        features: {
            requirePuppeteer: !1,
            antiCrawler: !1,
            supportBT: !1,
            supportPodcast: !1,
            supportScihub: !1,
            requireConfig: [
                { name: `LORIENTLEJOUR_USERNAME`, optional: !0, description: `L'Orient-Le Jour/L'Orient Today Email or Username` },
                { name: `LORIENTLEJOUR_PASSWORD`, optional: !0, description: `L'Orient-Le Jour/L'Orient Today Password` },
                { name: `LORIENTLEJOUR_TOKEN`, optional: !0, description: `To obtain a token, log into L'Orient-Le Jour/L'Orient Today App and inspect the connection request to find the token parameter from the request URL` },
            ],
        },
        name: `Category`,
        maintainers: [`quiniapiezoelectricity`],
        handler: h,
        description: `  ::: tip
For example, the path for the sites https://today.lorientlejour.com/section/977-lebanon and https://www.lorientlejour.com/rubrique/1-liban would be /lorientlejour/977-lebanon and /lorientlejour/1-liban respectively.
Multiple categories seperated by '|' is also supported, e.g. /lorientlejour/977-lebanon|1-liban.
:::`,
        radar: [
            { source: [`www.lorientlejour.com/*/:category`], target: `/:category` },
            { source: [`www.lorientlejour.com`], target: `/1-Liban` },
            { source: [`today.lorientlejour.com/*/:category`], target: `/:category` },
            { source: [`today.lorientlejour.com`], target: `/977-Lebanon` },
        ],
    };
async function m(n) {
    let i = `https://www.lorientlejour.com/cmsapi/categories.php?key=${f}&action=view&categoryId=${n}`;
    return (await t.tryGet(i, async () => await r({ method: `get`, url: i }), e.cache.routeExpire, !1)).data.data[0];
}
async function h(p) {
    let h = (p.req.param(`category`) ?? `977-Lebanon`).split(`|`).map((e) => e.match(/^(\d+)/i)[0] ?? e),
        g = p.req.query(`limit`) ?? 25,
        _,
        v = await t.get(`lorientlejour:token`);
    if (
        (v
            ? (_ = v)
            : e.lorientlejour.token
              ? ((_ = e.lorientlejour.token), t.set(`lorientlejour:token`, _))
              : e.lorientlejour.username &&
                e.lorientlejour.password &&
                ((_ = (await r(`https://www.lorientlejour.com/cmsapi/visitors.php?key=${f}&action=login&loginName=${e.lorientlejour.username}&password=${e.lorientlejour.password}`)).data.data.token), t.set(`lorientlejour:token`, _)),
        _)
    )
        try {
            await r(`https://www.lorientlejour.com/cmsapi/visitors.php?key=${f}&action=login_token&token=${_}`);
        } catch (e) {
            throw (e instanceof a && e.statusCode === 403 && (await t.set(`lorientlejour:token`, ``)), e);
        }
    let y = `L'Orient Le Jour/L'Orient Today`,
        b = ``,
        x = `https://www.lorientlejour.com`,
        S = ``;
    if (h.length === 1) {
        let e = await m(h[0]);
        ((S = e.typeId.locale ? e.typeId.locale : e.typeId.name === `English` ? `en-US` : `fr-FR`), (y = S === `en-US` ? `L'Orient Today - ${e.name}` : `L'Orient Le Jour - ${e.name}`), (b = e.description), (x = e.url));
    }
    let C = await Promise.all(h.map(async (e) => (await m(e)).children.map((e) => e.id))),
        w = [...new Set([...h, ...C.flat()])],
        T = `https://www.lorientlejour.com/cmsapi/content.php?text=clean&key=${f}&action=search&category=${encodeURIComponent(JSON.stringify(w))}&limit=${g}&text=false&page=1`;
    _ && (T += `&token=${_}`);
    let E = (await r(T)).data.data.map((e) => {
        ((e.link = e.url), (e.author = e.authors.map((e) => e.name).join(`, `)), (e.pubDate = i(n(e.firstPublished), 3)), (e.updated = i(n(e.lastUpdate), 3)), (e.category = e.categories.map((e) => e.name)));
        let t = e.contents,
            r = l(t),
            a = r(`html`);
        return (
            a.find(`.inline-embeded-article`).remove(),
            a.find(`.relatedArticles`).remove(),
            e.inline_attachments &&
                a.find(`.inlineImage`).each(function () {
                    let t = r(this).attr(`src`),
                        n = e.inline_attachments.find((e) => e.url === t);
                    n && n.description && (r(this).wrap(`<figure></figure>`), r(this).after(`<figcaption>${n.description}</figcaption>`));
                }),
            (e.description = u(
                c(o, {
                    children: [
                        e.summary ? s(`blockquote`, { children: d(e.summary) }) : null,
                        e.attachments ? e.attachments.map((e) => (e.url ? c(`figure`, { children: [s(`img`, { src: e.url }), e.description ? s(`figcaption`, { children: e.description }) : null] }) : null)) : null,
                        a.html() ? d(a.html()) : null,
                    ],
                })
            )),
            e
        );
    });
    return { title: y, description: b, language: S, link: x, item: E };
}
export { p as route };
