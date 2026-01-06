import { t as e } from './parse-date-DjdQS_Nt.mjs';
const t = {
    create: `CreateEvent`,
    delete: `DeleteEvent`,
    issuecomm: `IssueCommentEvent`,
    fork: `ForkEvent`,
    member: `MemberEvent`,
    public: `PublicEvent`,
    push: `PushEvent`,
    pr: `PullRequestEvent`,
    prcomm: `PullRequestReviewCommentEvent`,
    release: `ReleaseEvent`,
    star: `WatchEvent`,
    issue: `IssuesEvent`,
    prrev: `PullRequestReviewEvent`,
    discussion: `DiscussionEvent`,
    wiki: `GollumEvent`,
    cmcomm: `CommitCommentEvent`,
};
function n(t) {
    let { id: n, type: r, actor: i, repo: a, payload: o, created_at: s } = t,
        c = ``,
        l = ``,
        u = ``;
    switch (r) {
        case `PushEvent`: {
            c = `${i.login} pushed to ${a.name}`;
            let e = o.ref ? o.ref.replace(`refs/heads/`, ``) : `unknown`;
            ((l = `Pushed ${o.size ? `${o.size} commit(s) ` : ``}to ${e} in ${a.name}`),
                o.commits
                    ? ((u = o.commits.at(-1).url.replace(/https:\/\/api\.github\.com\/repos\/([^/]+)\/([^/]+)\/commits\/(\d+)/, `https://github.com/$1/$2/commit/$3`)),
                      (l += `<br><strong>Latest commit:</strong> ${o.commits.at(-1).message}`))
                    : (u = `https://github.com/${a.name}/commit/${o.head}`));
            break;
        }
        case `PullRequestEvent`:
            ((c = `${i.login} ${o.action} a pull request in ${a.name}`),
                o.pull_request
                    ? ((u = o.pull_request.url.replace(/https:\/\/api\.github\.com\/repos\/([^/]+)\/([^/]+)\/pulls\/(\d+)/, `https://github.com/$1/$2/pull/$3`)), (l = `PR: ${u}`))
                    : ((u = `https://github.com/${a.name}`), (l = `PR: Unknown`)));
            break;
        case `PullRequestReviewCommentEvent`:
            ((c = `${i.login} commented on a pull request review in ${a.name}`), (l = `Comment: ${o.comment?.body || `No comment`}`), (u = o.comment?.html_url || `https://github.com/${a.name}`));
            break;
        case `PullRequestReviewEvent`:
            ((c = `${i.login} reviewed a pull request in ${a.name}`),
                (l = `${i.login} ${o.review?.state ?? `operated`} the PR` + (o.review?.body ? `: ${o.review.body}` : ``)),
                (u = o.review?.html_url || `https://github.com/${a.name}`));
            break;
        case `IssueCommentEvent`:
            ((c = `${i.login} commented on an issue in ${a.name}`), (l = `Comment: ${o.comment?.body || `No comment`}`), (u = o.comment?.html_url || `https://github.com/${a.name}`));
            break;
        case `IssuesEvent`:
            ((c = `${i.login} ${o.action} an issue in ${a.name}`), (l = `Issue: ${o.issue?.title || `Unknown`}`), (u = o.issue?.html_url || `https://github.com/${a.name}`));
            break;
        case `CommitCommentEvent`:
            ((c = `${i.login} commented on a commit in ${a.name}`), (l = `Comment: ${o.comment?.body || `No comment`}`), (u = o.comment?.html_url || `https://github.com/${a.name}`));
            break;
        case `WatchEvent`:
            ((c = `${i.login} starred ${a.name}`), (l = `Starred repository ${a.name}`), (u = `https://github.com/${a.name}`));
            break;
        case `ForkEvent`:
            ((c = `${i.login} forked ${a.name}`), (l = `Forked repository ${a.name}`), (u = `https://github.com/${a.name}`));
            break;
        case `CreateEvent`:
            ((c = `${i.login} created ${o.ref_type} in ${a.name}`), (l = `Created ${o.ref_type}: ${o.ref || a.name}`), (u = `https://github.com/${a.name}`));
            break;
        case `DeleteEvent`:
            ((c = `${i.login} deleted ${o.ref_type} in ${a.name}`), (l = `Deleted ${o.ref_type}: ${o.ref}`), (u = `https://github.com/${a.name}`));
            break;
        case `ReleaseEvent`:
            ((c = `${i.login} released ${o.release?.name || o.release?.tag_name} in ${a.name}`), (l = o.release?.body || `Released ${o.release?.tag_name}`), (u = o.release?.html_url || `https://github.com/${a.name}`));
            break;
        case `PublicEvent`:
            ((c = `${i.login} made ${a.name} public`), (l = `Repository ${a.name} was made public`), (u = `https://github.com/${a.name}`));
            break;
        case `MemberEvent`:
            ((c = `${i.login} ${o.action} as a member of ${a.name}`), (l = `Member ${o.action} in repository ${a.name}`), (u = `https://github.com/${a.name}`));
            break;
        case `GollumEvent`:
            ((c = `${i.login} update the wiki in ${a.name}`), (l = `<ul>`));
            for (let e of o.pages ?? []) l += `<li>Page <a href=${e.html_url}>${e.page_name}</a> ${e.action} ${e.summary ? `: ${e.summary}` : ``}</li>`;
            ((l += `</ul>`), (u = `https://github.com/${a.name}`));
            break;
        case `DiscussionEvent`:
            ((c = `${i.login} ${o.action} a discussion ${a.discussion?.title ?? ``} on ${a.name}`), (l = o.discussion?.body ?? `Unknown`), (u = o.discussion?.html_url || `https://github.com/${a.name}`));
            break;
        default:
            ((c = `${i.login} performed ${r} in ${a?.name || `unknown repository`}`), (l = `Activity type: ${r} ${JSON.stringify(t)}`), (u = a ? `https://github.com/${a.name}` : `https://github.com/${i.login}`));
    }
    return { title: c, link: u, description: l, pubDate: e(s), author: i.login, category: [r], guid: n };
}
function r(e, r) {
    let i = [];
    return (
        e !== `all` &&
            (i = e.split(`,`).map((e) => {
                let n = e.trim();
                return t[n] || n;
            })),
        r.filter((e) => i.length === 0 || i.includes(e.type)).map((e) => n(e))
    );
}
export { r as t };
