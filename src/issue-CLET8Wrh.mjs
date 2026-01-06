import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import i from 'markdown-it';
import a from 'query-string';
const o = i({ html: !0, linkify: !0 }),
    s = {
        path: `/issue/:user/:repo/:state?/:labels?`,
        categories: [`programming`],
        view: r.Notifications,
        example: `/github/issue/DIYgod/RSSHub/open`,
        parameters: {
            user: `GitHub username`,
            repo: `GitHub repo name`,
            state: {
                description: `the state of the issues.`,
                default: `open`,
                options: [
                    { label: `Open`, value: `open` },
                    { label: `Closed`, value: `closed` },
                    { label: `All`, value: `all` },
                ],
            },
            labels: `a list of comma separated label names`,
        },
        radar: [{ source: [`github.com/:user/:repo/issues`, `github.com/:user/:repo/issues/:id`, `github.com/:user/:repo`], target: `/issue/:user/:repo` }],
        name: `Repo Issues`,
        maintainers: [`HenryQW`, `AndreyMZ`],
        handler: c,
    };
async function c(r) {
    let i = r.req.param(`user`),
        s = r.req.param(`repo`),
        c = r.req.param(`state`),
        l = r.req.param(`labels`),
        u = r.req.query(`limit`) ? Math.min(Number.parseInt(r.req.query(`limit`)), 100) : 100,
        d = `https://github.com/${i}/${s}/issues`,
        f = `https://api.github.com/repos/${i}/${s}/issues`,
        p = { Accept: `application/vnd.github.v3+json` };
    e.github && e.github.access_token && (p.Authorization = `token ${e.github.access_token}`);
    let m = (await n({ method: `get`, url: f, searchParams: a.stringify({ state: c, labels: l, sort: `created`, direction: `desc`, per_page: u }), headers: p })).data;
    return {
        allowEmpty: !0,
        title: `${i}/${s}${c ? ` ` + c.replace(/^\S/, (e) => e.toUpperCase()) : ``} Issues${l ? ` - ` + l : ``}`,
        link: d,
        item: m.filter((e) => e.pull_request === void 0).map((e) => ({ title: e.title, description: e.body ? o.render(e.body) : `No description`, pubDate: t(e.created_at), author: e.user.login, link: `${d}/${e.number}` })),
    };
}
export { s as route };
