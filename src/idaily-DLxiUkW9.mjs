import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
    path: [`/:language?`],
    name: `每日环球视野`,
    example: `/idaily`,
    maintainers: [`zphw`, `nczitzk`],
    parameters: { language: `语言，见下表，默认为简体中文` },
    radar: [{ source: [`idai.ly/`] }],
    handler: c,
    description: `| 简体中文 | 繁体中文 |
| -------- | -------- |
| zh-hans  | zh-hant  |`,
};
async function c(n) {
    let { language: r = `zh-hans` } = n.req.param(),
        i = n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 100,
        o = new URL(`api/list/v3/iphone/${r}`, `https://idaily-cdn.idailycdn.com`).href,
        s = `https://idai.ly`,
        { data: c } = await t(o),
        u = c
            .filter((e) => e.ui_sets?.caption_subtitle)
            .slice(0, i)
            .map((t) => {
                let n = t.ui_sets?.cover_landscape_hd_4k ?? t.cover_landscape_hd;
                return {
                    title: `${t.ui_sets?.caption_subtitle} - ${t.title}`,
                    link: t.link_share,
                    description: l(n ? [{ src: n, alt: t.ui_sets?.caption_subtitle ?? t.title }] : void 0, t.content),
                    author: t.location,
                    category: t.tags?.map((e) => e.name),
                    guid: `idaily-${t.guid}`,
                    pubDate: e(t.pubdate_timestamp, `X`),
                    updated: e(t.lastupdate_timestamp, `X`),
                    enclosure_url: n,
                    enclosure_type: `image/${n.split(/\./).pop()}`,
                };
            }),
        { data: d } = await t(s),
        f = a(d),
        p = f(`title`).text(),
        m = new URL(`img/idaily/logo_2x.png`, s).href;
    return { item: u, title: p, link: s, description: f(`meta[name="description"]`).prop(`content`), language: `zh`, image: m, subtitle: f(`meta[name="keywords"]`).prop(`content`), author: p.split(/\s/)[0], allowEmpty: !0 };
}
const l = (e, t) => o(r(u, { images: e, intro: t })),
    u = ({ images: e, intro: t }) => i(n, { children: [e?.map((e) => (e?.src ? r(`figure`, { children: r(`img`, { src: e.src, alt: e.alt }) }) : null)), t ? r(`p`, { children: t }) : null] });
export { s as route };
