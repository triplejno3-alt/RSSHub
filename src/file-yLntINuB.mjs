import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import n from 'query-string';
const r = {
    path: `/file/:user/:repo/:branch/:filepath{.+}`,
    example: `/github/file/DIYgod/RSSHub/master/README.md`,
    parameters: { user: `GitHub user or org name`, repo: `repository name`, branch: `branch name`, filepath: `path of target file` },
    radar: [{ source: [`github.com/:user/:repo/blob/:branch/*filepath`], target: `/file/:user/:repo/:branch/:filepath` }],
    name: `File Commits`,
    maintainers: [`zengxs`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`user`),
        a = r.req.param(`repo`),
        o = r.req.param(`branch`),
        s = r.req.param(`filepath`),
        c = `https://github.com/${i}/${a}/commits/${o}/${s}`,
        l = {};
    e.github && e.github.access_token && (l.Authorization = `token ${e.github.access_token}`);
    let u = (await t.get(`https://api.github.com/repos/${i}/${a}/commits`, { searchParams: n.stringify({ sha: o, path: s }), headers: l })).data,
        d = [];
    for (let e = 0; e < Math.min(u.length, 10); e++) d.push(e);
    let f = d.map((e) => {
        let t = u[e];
        return {
            title: t.commit.message.split(`
`)[0],
            description: `<pre>${t.commit.message}</pre>`,
            link: t.html_url,
            author: t.commit.author.name,
            pubDate: new Date(t.commit.committer.date).toUTCString(),
        };
    });
    return { title: `GitHub File - ${i}/${a}/${o}/${s}`, link: c, item: f };
}
export { r as route };
