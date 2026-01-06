import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = { metascore: { id: `metaScore`, name: `Metascore` }, userscore: { id: `userScore`, name: `User Score` }, popular: { id: `popularityCount`, name: `Most Popular` }, new: { id: `releaseDate`, name: `Releases` } },
    c = { game: { id: `games`, name: `Games` }, movie: { id: `movies`, name: `Movies` }, tv: { id: `tv`, name: `TV Shows` }, albums: { id: `albums`, name: `Music` } },
    l = (e, t, a) => o(i(n, { children: [e ? r(`figure`, { children: r(`img`, { src: e.src, alt: e.alt }) }) : null, t ? r(`p`, { children: t }) : null, a ? i(n, { children: [r(`span`, { children: `Metascore:` }), a] }) : null] })),
    u = { path: `/:type?/:sort?/:filter?`, name: `Unknown`, maintainers: [], handler: d };
async function d(n) {
    let { type: r = `game`, sort: i = `new`, filter: o } = n.req.param(),
        u = n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 50,
        d = `https://www.metacritic.com`,
        f = new URL(`finder/metacritic/web`, `https://backend.metacritic.com`).href,
        p = new URL(`/browse/${r}/all/all/all-time/${i}/${o ? `?${o}` : ``}`, d),
        m = p.searchParams,
        h = p.href,
        { data: g } = await t(h),
        _ = g.match(/apiKey=(.*?)&/)[1],
        v = { sortBy: `-${s[i].id}`, productType: c[r].id, limit: u, apiKey: _ },
        y = m.getAll(`genre`).join(`,`).toLowerCase(),
        b = m.getAll(`releaseType`).join(`,`),
        x = m.get(`releaseYearMin`),
        S = m.get(`releaseYearMax`);
    (y && (v.genres = y), b && (v.releaseType = b), x && (v.releaseYearMin = x), S && (v.releaseYearMax = S));
    let C = m.getAll(`platform`),
        w = m.getAll(`network`);
    if (C.length || w.length) {
        let e = {},
            t = String.raw`{label:"([^"]+)",value:(\d+),href:a,meta:{mcDisplayWeight`;
        for (let n of g.match(new RegExp(t, `g`))) {
            let r = n.match(new RegExp(t));
            e[
                r[1]
                    .toLowerCase()
                    .split(/(\s\(|\\u002f(?!\s))/)[0]
                    .replaceAll(`-`, `---`)
                    .replaceAll(/\s\/\s/g, `-or-`)
                    .replaceAll(`+`, `-plus`)
                    .replaceAll(/\s/g, `-`)
            ] = r[2];
        }
        (C.length &&
            (v.gamePlatformIds = C.map((t) => (Object.hasOwn(e, t) ? e[t] : void 0))
                .filter(Boolean)
                .join(`,`)),
            w.length &&
                (v.streamingNetworkIds = w
                    .map((t) => (Object.hasOwn(e, t) ? e[t] : void 0))
                    .filter(Boolean)
                    .join(`,`)));
    }
    let { data: T } = await t(f, { searchParams: v }),
        E = T.data.items
            .slice(0, u)
            .map((t) => ({
                title: t.title,
                link: new URL(`${r}/${t.slug}`, d).href,
                description: l(t.image ? { src: new URL(`a/img/catalog${t.image.bucketPath}`, d).href, alt: t.image.alt } : void 0, t.description, t.criticScoreSummary?.score ?? void 0),
                category: t.genres?.map((e) => e.name),
                guid: `metacritic-${t.id}`,
                pubDate: e(t.releaseDate),
                upvotes: t.criticScoreSummary?.positiveCount ? Number.parseInt(t.criticScoreSummary?.positiveCount, 10) : 0,
                downvotes: t.criticScoreSummary?.negativeCount ? Number.parseInt(t.criticScoreSummary?.negativeCount, 10) : 0,
                comments: t.criticScoreSummary?.reviewCount ? Number.parseInt(t.criticScoreSummary?.reviewCount, 10) : 0,
            })),
        D = a(g),
        O = new URL(D(`meta[data-hid="msapplication-task-metacritic"]`).prop(`content`).split(`icon-uri=`).pop(), d).href;
    return {
        item: E,
        title: D(`title`).text(),
        link: h,
        description: D(`meta[name="description"]`).prop(`content`),
        language: D(`html`).prop(`lang`),
        image: D(`link[rel="icon"]`).prop(`content`),
        icon: O,
        logo: O,
        subtitle: D(`meta[name="msapplication-tooltip"]`).prop(`content`),
        author: D(`meta[name="twitter:site"]`).prop(`content`),
        allowEmpty: !0,
    };
}
export { u as route };
