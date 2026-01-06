import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = `https://css-tricks.com`;
async function i(t, i = ``, a = ``) {
    let o = n(await e(r)),
        s = o(t).toArray();
    return { title: i ? o(i).text().trim() : ``, description: a ? o(a).text().trim() : ``, cards: s };
}
function a(e) {
    return e.map((e) => {
        let t = n(e),
            r = t(e).attr(`id`),
            i = t(e).find(`div.article-thumbnail-wrap > a >img`).attr(`src`),
            a = t(`div.article-article`);
        return { id: r, title: a.find(`h2 > a`).text(), link: a.find(`h2 > a`).attr(`href`), thumbnail: i };
    });
}
function o(e) {
    return e.map((e) => {
        let t = n(e);
        return { id: t(e).attr(`id`)?.replace(`mini-`, ``), title: t(`h3.mini-card-title`).find(`a:not(.aal_anchor)`).text(), link: t(`h3.mini-card-title`).find(`a:not(.aal_anchor)`).attr(`href`), thumbnail: `` };
    });
}
async function s(t, n = !1, i = `posts`) {
    let s = (n ? o(t) : a(t)).map((e) => e.id.replace(`post-`, ``)),
        l = await e(`${r}/wp-json/wp/v2/${i}?include=${s.join(`,`)}&_embed&per_page=${s.length}`),
        u = Object.fromEntries(l.map((e) => [e.id, e]));
    return s.map((e) => c(u[e]));
}
function c(e) {
    let n = e.title.rendered,
        r = e.link,
        i = e.content.rendered,
        a = e.excerpt.rendered,
        o = e.date_gmt,
        s = e.modified_gmt,
        c = e._embedded?.author,
        l = c?.[0]?.name,
        u = c?.[0]?.link,
        d = c?.[0]?.avatar_urls[48],
        f = e._embedded?.[`wp:featuredmedia`]?.[0]?.source_url,
        p = e._embedded?.[`wp:term`]?.[1]?.map((e) => e.name);
    return { title: n, link: r, description: i, banner: f, image: f, pubDate: t(o), updated: t(s), author: [{ name: l || ``, url: u || ``, avatar: d || `` }], content: { html: i, text: a }, category: p };
}
export { s as n, r, i as t };
