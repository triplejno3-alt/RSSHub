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
        path: `/events/:owner/:repo`,
        categories: [`programming`],
        example: `/gitee/events/y_project/RuoYi`,
        parameters: { owner: `用户名`, repo: `仓库名` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`gitee.com/:owner/:repo`] }],
        name: `仓库动态`,
        maintainers: [`TonyRL`],
        handler: s,
    };
async function s(i) {
    let { owner: o, repo: s } = i.req.param(),
        c = `https://gitee.com/api/v5/repos/${o}/${s}/events`,
        l = (await t.tryGet(c, async () => (await r(c, { searchParams: { access_token: e.gitee.access_token ?? void 0, limit: i.req.query(`limit`) ? Number(i.req.query(`limit`)) : 100 } })).data)).map((e) => ({
            title: e.type,
            author: e.actor.login,
            pubDate: n(e.created_at),
            guid: e.id,
            type: e.type,
            payload: e.payload,
        }));
    return (
        (l = l.map((e) => {
            switch (e.type) {
                case `IssueEvent`:
                    ((e.title = e.payload.title), (e.description = a.render(e.payload.body)), (e.link = e.payload.html_url));
                    break;
                case `ForkEvent`:
                    ((e.title = `${e.author || e.actor.login} forked ${o}/${s}`), (e.link = e.payload.html_url));
                    break;
                case `StarEvent`:
                    e.title = `${e.author || e.actor.login} ${e.payload.action} ${o}/${s}`;
                    break;
                case `IssueCommentEvent`:
                    ((e.title = e.payload.issue.title), (e.description = a.render(e.payload.comment.body)), (e.link = e.payload.comment.html_url));
                    break;
                default:
                    break;
            }
            return (delete e.type, delete e.payload, e);
        })),
        { title: `${o}/${s} - 仓库动态`, link: `https://gitee.com/${o}/${s}`, item: l }
    );
}
export { o as route };
