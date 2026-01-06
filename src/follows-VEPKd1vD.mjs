import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { o as r, r as i, t as a } from './_feed-DYR6QwZn.mjs';
const o = { reading: `reading`, 'plan-to-read': `plan_to_read`, completed: `completed`, 'on-hold': `on_hold`, 're-reading': `re_reading`, dropped: `dropped` },
    s = { reading: `Reading`, 'plan-to-read': `Plan to Read`, completed: `Completed`, 'on-hold': `On Hold`, 're-reading': `Re-reading`, dropped: `Dropped` },
    c = {
        path: `/user/follow/:type?`,
        name: `Logged User's Followed Mangas Feed`,
        maintainers: [`chrisis58`],
        example: `/mangadex/user/follow/reading`,
        description: `Fetches the feed of mangas that you follow on MangaDex whick are in the specified status.
CAUTION: With big amount of follows, it may take a long time to load or even fail.
It's recommended to use the \`/mangadex/mdlist/:listId?\` route instead for better performance, though it requires manual configuration.`,
        categories: [`anime`],
        parameters: {
            type: {
                description: `The type of follows to fetch`,
                default: `reading`,
                options: [
                    { value: `reading`, label: `Reading` },
                    { value: `plan-to-read`, label: `Plan to Read` },
                    { value: `completed`, label: `Completed` },
                    { value: `on-hold`, label: `On Hold` },
                    { value: `re-reading`, label: `Re-reading` },
                    { value: `dropped`, label: `Dropped` },
                ],
            },
        },
        radar: [{ source: [`mangadex.org/titles/follows`], target: `/user/follow/reading` }],
        features: {
            requireConfig: [
                { name: `MANGADEX_USERNAME`, description: `MangaDex Username, required when refresh-token is not set`, optional: !0 },
                { name: `MANGADEX_PASSWORD`, description: `MangaDex Password, required when refresh-token is not set`, optional: !0 },
                { name: `MANGADEX_CLIENT_ID`, description: `MangaDex Client ID`, optional: !1 },
                { name: `MANGADEX_CLIENT_SECRET`, description: `MangaDex Client Secret`, optional: !1 },
                { name: `MANGADEX_REFRESH_TOKEN`, description: `MangaDex Refresh Token, required when username and password are not set`, optional: !0 },
            ],
            nsfw: !0,
        },
        handler: l,
    };
async function l(c) {
    let { type: l } = c.req.param(),
        d = l || `reading`,
        f = await r(),
        p = u(
            await t.tryGet(
                `mangadex:user-follow-${d}`,
                async () => {
                    let t = (await n.get(`https://api.mangadex.org/manga/status`, { headers: { Authorization: `Bearer ${f}`, 'User-Agent': e.trueUA } }))?.data?.statuses;
                    if (!t) throw Error(`Failed to retrieve user follows from MangaDex API.`);
                    return t;
                },
                e.cache.routeExpire,
                !1
            ),
            o[d]
        ),
        m = await i(p),
        h = (await Promise.all(p.map((e) => a(e, void 0, 10)))).flatMap((e, t) => {
            let n = m.get(p[t]);
            return e.map((e) => ({ title: n?.title ?? `Unknown`, link: e.link, pubDate: e.pubDate, description: e.title ?? ``, image: n?.cover ?? `` }));
        });
    return { title: `User Follows - ${s[d]} Mangas`, link: `https://mangadex.org/titles/follows?tab=${d}`, description: `Followed Mangas`, item: h };
}
const u = (e, t) =>
    Object.entries(e)
        .filter(([, e]) => e === t)
        .map(([e]) => e);
export { c as route };
