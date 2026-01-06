import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
import { n as i } from './readable-social--hCfpJhv.mjs';
import { n as a, o, r as s, s as c, t as l } from './message-Cvd7KgB9.mjs';
const u = {
        path: `/search/:guildId/:routeParams`,
        categories: [`social-media`],
        example: `/discord/search/302094807046684672/content=friendly&has=image,video`,
        parameters: { guildId: `Guild ID`, routeParams: `Search parameters, support content, author_id, mentions, has, min_id, max_id, channel_id, pinned` },
        features: { requireConfig: [{ name: `DISCORD_AUTHORIZATION`, description: `Discord authorization header` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Guild Search`,
        maintainers: [`NekoAria`],
        handler: f,
    },
    d = (e) => {
        let t = new URLSearchParams(e),
            n = t
                .get(`has`)
                ?.split(`,`)
                .filter(Boolean)
                ?.filter((e) => a.has(e)),
            r = {
                content: t.get(`content`) ?? void 0,
                author_id: t.get(`author_id`) ?? void 0,
                mentions: t.get(`mentions`) ?? void 0,
                has: n?.length ? n : void 0,
                min_id: t.get(`min_id`) ?? void 0,
                max_id: t.get(`max_id`) ?? void 0,
                channel_id: t.get(`channel_id`) ?? void 0,
                pinned: t.has(`pinned`) ? i(t.get(`pinned`)) : void 0,
            };
        return Object.fromEntries(Object.entries(r).filter(([, e]) => e !== void 0));
    };
async function f(i) {
    let { authorization: a } = e.discord || {};
    if (!a) throw new r(`Discord RSS is disabled due to the lack of authorization config`);
    let { guildId: u } = i.req.param(),
        f = d(i.req.param(`routeParams`));
    if (!Object.keys(f).length) throw new n(`At least one valid search parameter is required`);
    let [p, m] = await Promise.all([o(u, a), c(u, a, f)]);
    if (!m?.messages?.length) return { title: `Search Results - ${p.name}`, link: `${s}/channels/${u}`, item: [], allowEmpty: !0 };
    let h = m.messages.flat().map((e) => ({
        title:
            e.content.split(`
`)[0] || `(no content)`,
        description: l({ message: e, guildInfo: p }),
        author: e.author.global_name ?? e.author.username,
        pubDate: t(e.timestamp),
        updated: e.edited_timestamp ? t(e.edited_timestamp) : void 0,
        category: [`#${e.channel_id}`],
        link: `${s}/channels/${u}/${e.channel_id}/${e.id}`,
    }));
    return {
        title: `Search "${Object.entries(f)
            .filter(([, e]) => e !== void 0)
            .map(([e, t]) => `${e}:${Array.isArray(t) ? t.join(`,`) : t}`)
            .join(` `)}" in ${p.name} - Discord`,
        link: `${s}/channels/${u}`,
        item: h,
        allowEmpty: !0,
    };
}
export { u as route };
