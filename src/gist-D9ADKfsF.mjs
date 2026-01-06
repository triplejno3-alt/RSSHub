import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = {
    path: `/gist/:gistId`,
    categories: [`programming`],
    example: `/github/gist/d2c152bb7179d07015f336b1a0582679`,
    parameters: { gistId: `Gist ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gist.github.com/:owner/:gistId/revisions`, `gist.github.com/:owner/:gistId/stargazers`, `gist.github.com/:owner/:gistId/forks`, `gist.github.com/:owner/:gistId`] }],
    name: `Gist Commits`,
    maintainers: [`TonyRL`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`gistId`),
        a = { Accept: `application/vnd.github.v3+json` };
    e.github && e.github.access_token && (a.Authorization = `Bearer ${e.github.access_token}`);
    let { data: o } = await n(`https://api.github.com/gists/${i}`, { headers: a }),
        s = o.history.map((e, n) => ({
            title: `${e.user.login} ${n === o.history.length - 1 ? `created` : `revised`} this gist`,
            description: e.change_status.total ? `${e.change_status.additions} additions and ${e.change_status.deletions} deletions` : null,
            link: `https://gist.github.com/${i}/${e.version}`,
            pubDate: t(e.committed_at),
        }));
    return { allowEmpty: !0, title: `${o.owner.login} / ${Object.values(o.files)[0].filename}`, description: o.description, image: o.owner.avatar_url, link: `${o.html_url}/revisions`, item: s };
}
export { r as route };
