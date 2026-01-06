import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
const i = {
    path: `/notifications`,
    categories: [`programming`],
    example: `/github/notifications`,
    features: { requireConfig: [{ name: `GITHUB_ACCESS_TOKEN`, description: `` }] },
    radar: [{ source: [`github.com/notifications`] }],
    name: `Notifications`,
    maintainers: [`zhzy0077`],
    handler: a,
    url: `github.com/notifications`,
};
async function a(i) {
    if (!t.github || !t.github.access_token) throw new r(`GitHub trending RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let a = { Accept: `application/vnd.github.v3+json`, Authorization: `Bearer ${t.github.access_token}`, 'X-GitHub-Api-Version': `2022-11-28` },
        o = await e.raw(`https://api.github.com/notifications`, { headers: a }),
        s = o._data,
        c = s.map((e) => {
            let t = e.subject.url ? e.subject.url.replace(`https://api.github.com/repos/`, `https://github.com/`) : `https://github.com/notifications`;
            return (t.includes(`/releases/`) && (t = t.replace(/\/releases\/\d+$/, `/releases`)), { title: e.subject.title, description: e.subject.title, pubDate: n(e.updated_at), guid: e.id, link: t });
        });
    return (
        i.set(`json`, {
            title: `Github Notifications`,
            item: s,
            rateLimit: {
                limit: Number.parseInt(o.headers[`x-ratelimit-limit`]),
                remaining: Number.parseInt(o.headers[`x-ratelimit-remaining`]),
                reset: n(Number.parseInt(o.headers[`x-ratelimit-reset`]), `X`),
                resoure: o.headers[`x-ratelimit-resource`],
                used: Number.parseInt(o.headers[`x-ratelimit-used`]),
            },
        }),
        { title: `Github Notifications`, link: `https://github.com/notifications`, item: c }
    );
}
export { i as route };
