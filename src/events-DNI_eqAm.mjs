import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import i from 'markdown-it';
const a = i({ html: !0 }),
    o = {
        path: `/events/:username`,
        categories: [`programming`],
        example: `/gitee/events/y_project`,
        parameters: { username: `用户名` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`gitee.com/:username`] }],
        name: `用户公开动态`,
        maintainers: [`TonyRL`],
        handler: s,
    };
async function s(i) {
    let o = i.req.param(`username`),
        s = `https://gitee.com/api/v5/users/${o}/events/public`,
        c = (await t.tryGet(s, async () => (await r(s, { searchParams: { access_token: e.gitee.access_token ?? void 0, limit: i.req.query(`limit`) ? Number(i.req.query(`limit`)) : 100 } })).data)).map((e) => ({
            title: e.type,
            author: e.actor.login,
            pubDate: n(e.created_at),
            guid: e.id,
            type: e.type,
            repo: e.repo,
            payload: e.payload,
        }));
    return (
        (c = c.map((e) => {
            switch (e.type) {
                case `CommitCommentEvent`:
                    ((e.title = `commented on commit ${e.payload.comment.commit_id.slice(0, 7)} in ${e.payload.repository.full_name}`), (e.description = a.render(e.payload.comment.body)), (e.link = e.payload.comment.html_url));
                    break;
                case `CreateEvent`:
                    e.title = `${e.payload.ref_type} ${e.payload.ref} created in ${e.repo.full_name}`;
                    break;
                case `IssueCommentEvent`:
                    ((e.title = e.payload.issue.title), (e.description = a.render(e.payload.comment.body)), (e.link = e.payload.comment.html_url));
                    break;
                case `IssueEvent`:
                    ((e.title = `${e.payload.action} ${e.payload.title}`), (e.description = a.render(e.payload.body)), (e.link = e.payload.html_url));
                    break;
                case `ProjectCommentEvent`:
                    ((e.title = `commented on project ${e.repo.full_name}`), (e.description = a.render(e.payload.comment.body)), (e.link = e.payload.comment.html_url));
                    break;
                case `PullRequestEvent`:
                    ((e.title = `${e.payload.action} pull request #${e.payload.number} ${e.payload.title} in ${e.repo.full_name}`), (e.description = a.render(e.payload.body)), (e.link = e.payload.html_url));
                    break;
                case `PushEvent`:
                    ((e.title = `committed ${e.payload.commits[0].sha.slice(0, 7)} in ${e.repo.full_name}`),
                        (e.description = a.render(e.payload.commits[0].message)),
                        (e.link = `http://gitee.com/${e.repo.full_name}/commit/${e.payload.commits[0].sha}`));
                    break;
                default:
                    break;
            }
            return (delete e.type, delete e.repo, delete e.payload, e);
        })),
        { title: `${o} - 公开动态`, link: `https://gitee.com/${o}`, item: c }
    );
}
export { o as route };
