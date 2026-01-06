import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import r from 'query-string';
const i = {
    path: `/commits/:workspace/:repo_slug`,
    categories: [`programming`],
    example: `/bitbucket/commits/blaze-lib/blaze`,
    parameters: { workspace: `Workspace`, repo_slug: `Repository` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bitbucket.com/commits/:workspace/:repo_slug`] }],
    name: `Commits`,
    maintainers: [`AuroraDysis`],
    handler: a,
};
async function a(i) {
    let a = i.req.param(`workspace`),
        o = i.req.param(`repo_slug`),
        s = { Accept: `application/json` },
        c = ``;
    e.bitbucket && e.bitbucket.username && e.bitbucket.password && (c = e.bitbucket.username + `:` + e.bitbucket.password + `@`);
    let l = (await n({ method: `get`, url: `https://${c}api.bitbucket.org/2.0/repositories/${a}/${o}/commits/`, searchParams: r.stringify({ sort: `-target.date` }), headers: s })).data.values;
    return {
        allowEmpty: !0,
        title: `Recent Commits to ${a}/${o}`,
        link: `https://bitbucket.org/${a}/${o}`,
        item: l && l.map((e) => ({ title: e.message, author: e.author.raw, description: e.rendered.message.html || `No description`, pubDate: t(e.date), link: e.links.html.href })),
    };
}
export { i as route };
