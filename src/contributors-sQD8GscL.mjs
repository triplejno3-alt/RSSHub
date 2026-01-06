import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/contributors/:user/:repo/:order?/:anon?`,
    categories: [`programming`],
    example: `/github/contributors/DIYgod/RSSHub`,
    parameters: { user: `User name`, repo: `Repo name`, order: `Sort order by commit numbers, desc and asc (descending by default)`, anon: `Show anonymous users. Defaults to no, use any values for yes.` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`github.com/:user/:repo/graphs/contributors`, `github.com/:user/:repo`], target: `/contributors/:user/:repo` }],
    name: `Repo Contributors`,
    maintainers: [`zoenglinghou`],
    handler: r,
};
async function r(n) {
    let { user: r, repo: i, order: a, anon: o } = n.req.param(),
        s = `https://github.com/${r}/${i}`,
        c = `https://api.github.com/repos/${r}/${i}/contributors?` + (o ? `anon=1` : ``),
        l = {};
    e.github && e.github.access_token && (l.Authorization = `token ${e.github.access_token}`);
    let u = await t({ method: `get`, url: c, headers: l }),
        d = u.data;
    try {
        let e = u.headers.link.split(`,`).find((e) => e.includes(`"last"`)),
            n = e.match(/<(.*)page=\d*/)[1],
            r = ((e) => Array.from({ length: e - 1 }).map((e, t) => t + 2))(Number(e.match(/page=(\d*)/)[1])).map(async (e) => {
                let r = await t({ method: `get`, url: `${n}page=${e}`, headers: l });
                d = [...d, ...r.data];
            });
        await Promise.all(r);
    } catch (e) {
        if (!(e instanceof TypeError)) throw e;
    }
    (d.sort((e, t) => e.contributions - t.contributions), a !== `asc` && d.reverse());
    let f = d.map((e) =>
        e.type === `Anonymous`
            ? { title: `Contributor: ${e.name}`, description: `<p>Anonymous contributor</p><p>Name: ${e.name}</p><p>E-mail: ${e.email}</p><p>Contributions: ${e.contributions}</p>`, guid: `anon-${e.name}` }
            : { title: `Contributor: ${e.login}`, description: `<img src="${e.avatar_url}"></img><p><a href="${e.html_url}">${e.login}</a></p><p>Contributions: ${e.contributions}</p>`, link: e.html_url, guid: e.id }
    );
    return { title: `${r}/${i} Contributors`, link: `${s}/graphs/contributors`, description: `New contributors for ${r}/${i}`, item: f };
}
export { n as route };
