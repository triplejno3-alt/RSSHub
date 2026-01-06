import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import n from 'markdown-it';
const r = n({ html: !0 }),
    i = {
        path: `/commits/:owner/:repo/:branch?`,
        categories: [`programming`],
        example: `/gitcode/commits/openharmony-sig/flutter_flutter`,
        parameters: { owner: `用户名/组织名`, repo: `仓库名`, branch: `分支名，可选，默认为主分支` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`gitcode.com/:owner/:repo/commits`, `gitcode.com/:owner/:repo/commits/:branch`], target: (e) => `/gitcode/commits/${e.owner}/${e.repo}${e.branch ? `/${e.branch}` : ``}` }],
        name: `仓库提交`,
        maintainers: [`JiZhi-Error`],
        handler: a,
    };
async function a(n) {
    let { owner: i, repo: a, branch: o } = n.req.param(),
        { data: s } = await t(`https://web-api.gitcode.com/api/v2/projects/${encodeURIComponent(`${i}/${a}`)}/repository/commits`, {
            searchParams: { per_page: n.req.query(`limit`) ? Number(n.req.query(`limit`)) : 100, ref_name: o },
        });
    if (!s || !s.content) throw Error(`无法获取提交数据`);
    let c = s.content.map((t) => ({ title: r.renderInline(t.title), description: r.render(t.message), author: t.author_name, pubDate: e(t.committed_date), guid: t.id, link: `https://gitcode.com/${i}/${a}/commit/${t.id}` }));
    return { title: `${i}/${a}/${o ? ` (${o})` : ``} - 提交记录`, link: `https://gitcode.com/${i}/${a}/commits/${o || ``}`, item: c };
}
export { i as route };
