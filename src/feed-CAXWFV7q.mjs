import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { a as r, i, o as a, r as o, s } from './_feed-DYR6QwZn.mjs';
const c = {
    name: `MDList Feed`,
    path: `/mdlist/:id/:lang?`,
    radar: [{ source: [`mangadex.org/list/:id/:suffix`], target: `/mdlist/:id` }],
    description: `Sepcific MangaDex MDList Feed`,
    example: `/mangadex/mdlist/10cca803-8dc9-4f0e-86a8-6659a3ce5188?limit=10&private=true`,
    maintainers: [`chrisis58`],
    categories: [`anime`],
    parameters: { id: { description: `The list id of the manga list` }, private: { description: `(Query Param) Needed to access private lists, any value will be treated as true` } },
    features: {
        requireConfig: [
            { name: `MANGADEX_USERNAME`, description: `MangaDex Username, required when refresh-token is not set and the list is private`, optional: !0 },
            { name: `MANGADEX_PASSWORD`, description: `MangaDex Password, required when refresh-token is not set and the list is private`, optional: !0 },
            { name: `MANGADEX_CLIENT_ID`, description: `MangaDex Client ID, required when the list is private`, optional: !0 },
            { name: `MANGADEX_CLIENT_SECRET`, description: `MangaDex Client Secret, required when the list is private`, optional: !0 },
            { name: `MANGADEX_REFRESH_TOKEN`, description: `MangaDex Refresh Token, required when username and password are not set and the list is private`, optional: !0 },
        ],
        nsfw: !0,
    },
    handler: l,
};
async function l(c) {
    let { id: l, lang: u } = c.req.param(),
        d = c.req.query(`limit`) ? Number.parseInt(c.req.query(`limit`)) : 25,
        f = !!c.req.query(`private`),
        p = f ? await a() : void 0,
        m = new Set([...(typeof u == `string` ? [u] : u || []), ...(await r())].filter(Boolean)),
        { listName: h, listAuthor: g } = await t.tryGet(
            `mangadex:mdlist-info-${l}`,
            async () => {
                let t = (await n.get(`${s.API.BASE}/list/${l}${i({ includes: [`user`] })}`, { headers: { Authorization: String(f ? `Bearer ${p}` : ``), 'User-Agent': e.trueUA } }))?.data?.data;
                if (!t) throw Error(`Failed to retrieve user follows from MangaDex API.`);
                return { listName: t.attributes.name, listAuthor: t.relationships.find((e) => e.type === `user`)?.attributes.username };
            },
            e.cache.contentExpire
        ),
        _ = await t.tryGet(
            `mangadex:mdlist-feed-${l}`,
            async () => {
                let t = (await n.get(`${s.API.BASE}/list/${l}/feed${i({ limit: d, translatedLanguage: m, order: { publishAt: `desc` } })}`, { headers: { Authorization: String(f ? `Bearer ${p}` : ``), 'User-Agent': e.trueUA } }))
                    ?.data?.data;
                if (!t) throw Error(`Failed to retrieve user follows from MangaDex API.`);
                return t;
            },
            e.cache.routeExpire,
            !1
        ),
        v = await o(_.map((e) => e?.relationships.find((e) => e.type === `manga`)?.id));
    return {
        title: `MDList - ${h} by ${g}`,
        link: `https://mangadex.org/list/${l}?tab=feed`,
        description: `The latest updates of all the manga in a sepcific list`,
        item: _.map((e) => {
            let t = e.relationships.find((e) => e.type === `manga`)?.id,
                n = v.get(t),
                r = [e.attributes.volume ? `Vol. ${e.attributes.volume}` : null, e.attributes.chapter ? `Ch. ${e.attributes.chapter}` : null, e.attributes.title].filter(Boolean).join(` `);
            return { title: n?.title || `Unknown`, link: `${s.API.MANGA_CHAPTERS}${e.id}`, pubDate: new Date(e.attributes.publishAt), description: r, image: n?.cover };
        }),
    };
}
export { c as route };
