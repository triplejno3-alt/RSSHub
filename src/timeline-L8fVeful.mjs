import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { t as a } from './config-not-found-DGyG6Tbz.mjs';
import { t as o } from './rss-parser-CKuAfhVS.mjs';
const s = {
        path: `/timeline/:account`,
        categories: [`social-media`],
        view: r.SocialMedia,
        example: `/fediverse/timeline/Mastodon@mastodon.social`,
        parameters: { account: `username@domain` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Timeline`,
        maintainers: [`DIYgod`, `pseudoyu`],
        handler: u,
    },
    c = new Set([`mastodon.social`, `pawoo.net`, t.mastodon.apiHost].filter(Boolean)),
    l = new Set([`application/activity+json`, `application/ld+json; profile="https://www.w3.org/ns/activitystreams"`]);
async function u(r) {
    let s = r.req.param(`account`),
        u = s.split(`@`)[1],
        d = s.split(`@`)[0];
    if (!u || !d) throw new i(`Invalid account`);
    if (!t.feature.allow_user_supply_unsafe_domain && !c.has(u.toLowerCase())) throw new a(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);
    let f = { headers: { Accept: `application/ld+json; profile="https://www.w3.org/ns/activitystreams"` } },
        p = await e(`https://${u}/.well-known/webfinger?resource=acct:${s}`, { headers: { Accept: `application/jrd+json` } }),
        m = p.links.find((e) => e.rel === `self` && l.has(e.type))?.href,
        h = p.links.find((e) => e.rel === `http://webfinger.net/rel/profile-page`)?.href,
        g = await o.parseURL(`${h}.rss`);
    if (g)
        return {
            title: `${g.title} (Fediverse@${s})`,
            description: g.description,
            image: g.image?.url,
            link: g.link,
            item: g.items.map((e) => ({ title: e.title, description: e.content, link: e.link, pubDate: e.pubDate ? n(e.pubDate) : null, guid: e.guid })),
        };
    let _ = await e(m, f),
        v = (await e((await e(_.outbox, f)).first, f)).orderedItems,
        y = [];
    for (let t of v) [`Announce`, `Create`, `Update`].includes(t.type) && (typeof t.object == `string` ? y.push((async (t) => ((t.object = await e(t.object, f)), t))(t)) : y.push(Promise.resolve(t)));
    let b = await Promise.all(y);
    return {
        title: `${_.name || _.preferredUsername} (Fediverse@${s})`,
        description: _.summary,
        image: _.icon?.url || _.image?.url,
        link: h,
        item: b.map((e) => ({
            title: e.object.content.replaceAll(/<[^<]*>/g, ``),
            description: `${e.object.content}\n${
                e.object.attachment?.map((e) => `<img src="${e.url}" width="${e.width}" height="${e.height}" />`).join(`
`) || ``
            }`,
            link: e.object.url,
            pubDate: n(e.published),
            guid: e.id,
        })),
    };
}
export { s as route };
