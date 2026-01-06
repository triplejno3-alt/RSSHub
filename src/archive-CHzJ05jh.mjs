import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './utils-D9VptmJt.mjs';
const r = {
    path: `/archive/:lang?`,
    categories: [`shopping`],
    example: `/furstar/archive/cn`,
    parameters: { lang: `语言, 留空为jp, 支持cn, en` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`furstar.jp/:lang/archive.php`, `furstar.jp/archive.php`], target: `/archive/:lang` }],
    name: `已经出售的角色列表`,
    maintainers: [`NeverBehave`],
    handler: i,
};
async function i(r) {
    let i = n.langBase(r.req.param(`lang`)),
        a = `${i}/archive.php`,
        o = await t.get(a, { https: { rejectUnauthorized: !1 } }),
        s = n.fetchAllCharacters(o.data, i);
    return {
        title: `Furstar 已出售角色`,
        link: `https://furstar.jp`,
        description: `Furstar 已经出售或预订的角色列表`,
        language: r.req.param(`lang`),
        item: s.map((t) => ({ title: t.title, author: t.author.name, description: `<img src="${t.headImage}"/> ${n.renderAuthor(t.author)}`, pubDate: e(new Date().toISOString()), link: t.detailPage })),
    };
}
export { r as route };
