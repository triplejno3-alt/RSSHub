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
        path: `/commits/:owner/:repo`,
        categories: [`programming`],
        example: `/gitee/commits/y_project/RuoYi`,
        parameters: { owner: `用户名`, repo: `仓库名` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`gitee.com/:owner/:repo/commits`] }],
        name: `仓库提交`,
        maintainers: [`TonyRL`],
        handler: s,
    };
async function s(i) {
    let { owner: o, repo: s } = i.req.param(),
        c = `https://gitee.com/api/v5/repos/${o}/${s}/commits`,
        l = (await t.tryGet(c, async () => (await r(c, { searchParams: { access_token: e.gitee.access_token ?? void 0, per_page: i.req.query(`limit`) ? Number(i.req.query(`limit`)) : 100, direction: `desc` } })).data)).map((e) => ({
            title: a.renderInline(e.commit.message),
            description: a.render(e.commit.message),
            author: e.author?.login || e.commit.author.name,
            pubDate: n(e.commit.author.date),
            guid: e.sha,
            link: e.html_url,
        }));
    return { title: `${o}/${s} - 提交`, link: `https://gitee.com/${o}/${s}/commits`, item: l };
}
export { o as route };
