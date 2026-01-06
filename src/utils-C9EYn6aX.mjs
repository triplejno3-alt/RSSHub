import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    doujin: { title: `.doujin-title`, description: [`.doujin-detail`, `.section`, `.area-buy > a.btn`] },
    video: { title: `.video-title`, description: [`.video-data`, `.section`, `.lp-samplearea a.btn`] },
    article: { title: `.article_title`, description: [`.article_icatch`, `.article_contents`] },
};
function a(e) {
    for (let [t, n] of Object.entries({ doujin: [`/cg/`, `/comic/`, `/voice/`], video: [`/nipple-video/`], article: [`/post-`] })) if (n.some((t) => e.includes(t))) return t;
    throw Error(`Unknown content type for link: ${e}`);
}
async function o(o) {
    return (
        await Promise.all(
            o.map((o) =>
                e.tryGet(o.link, async () => {
                    let e = r((await n(o.link)).data),
                        c = i[a(o.link)],
                        l = e(c.title).text().trim() || o.title,
                        u = s(c.description.map((t) => e(t).prop(`outerHTML`)).join(``)),
                        d = e(`meta[property="article:published_time"]`).attr(`content`),
                        f = d ? t(d) : void 0;
                    return { title: l, description: u, link: o.link, pubDate: f };
                })
            )
        )
    ).filter((e) => e !== null);
}
function s(e) {
    let t = r(e);
    return t(`body`)
        .children()
        .toArray()
        .map((e) => t(e).clone().wrap(`<div>`).parent().html())
        .join(``);
}
const c = `https://chikubi.jp/wp-json/wp/v2`;
async function l(r) {
    let i = `${c}/posts${r?.length ? `?include=${r.join(`,`)}` : ``}`,
        a = await e.tryGet(i, async () => {
            let e = await n(i),
                r = JSON.parse(e.body);
            if (!Array.isArray(r)) throw TypeError(`No posts found for the given IDs`);
            return r.map(({ title: e, link: n, date: r, content: i }) => ({ title: e.rendered, link: n, pubDate: t(r), description: s(i.rendered) }));
        });
    return (Array.isArray(a) ? a : []).filter((e) => e !== null);
}
const u = { tag: `tags`, category: `categories` };
async function d(e, t) {
    let { body: r } = await n(`${c}/${u[e]}?slug=${encodeURIComponent(t)}`),
        i = JSON.parse(r);
    if (i?.[0]) {
        let { id: e, name: t } = i[0];
        return { id: e, name: t };
    }
    throw Error(`No ${e} found for slug: ${t}`);
}
async function f(r, i) {
    let a = `${c}/posts?${u[r]}=${i}`,
        o = await e.tryGet(a, async () => {
            let { body: e } = await n(a),
                r = JSON.parse(e);
            return Array.isArray(r) && r.length > 0 ? r.map(({ title: e, link: n, date: r, content: i }) => ({ title: e.rendered, link: n, pubDate: t(r), description: s(i.rendered) })) : [];
        });
    return (Array.isArray(o) ? o : []).filter((e) => e !== null);
}
export { o as i, l as n, f as r, d as t };
