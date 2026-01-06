import { t as e } from './invalid-parameter-DGZgOgO2.mjs';
import { t } from './description-D7Hn9Z68.mjs';
import { BigGenre as n, Genre as r, GenreNotation as i, NarouNovelFetch as a, SearchBuilder as o } from 'narou';
let s = (function (e) {
        return ((e.DAILY = `daily`), (e.WEEKLY = `weekly`), (e.MONTHLY = `monthly`), (e.QUARTER = `quarter`), (e.YEARLY = `yearly`), (e.TOTAL = `total`), e);
    })({}),
    c = (function (e) {
        return ((e.TOTAL = `total`), (e.SHORT = `t`), (e.ONGOING = `r`), (e.COMPLETE = `er`), e);
    })({}),
    l = (function (e) {
        return ((e.LIST = `list`), (e.GENRE = `genre`), (e.ISEKAI = `isekai`), e);
    })({});
const u = { [s.DAILY]: `dailypoint`, [s.WEEKLY]: `weeklypoint`, [s.MONTHLY]: `monthlypoint`, [s.QUARTER]: `quarterpoint`, [s.YEARLY]: `yearlypoint`, [s.TOTAL]: `hyoka` },
    d = { [s.DAILY]: `pt`, [s.WEEKLY]: `weekly_point`, [s.MONTHLY]: `monthly_point`, [s.QUARTER]: `quarter_point`, [s.YEARLY]: `yearly_point`, [s.TOTAL]: `global_point` },
    f = { [s.DAILY]: `日間`, [s.WEEKLY]: `週間`, [s.MONTHLY]: `月間`, [s.QUARTER]: `四半期`, [s.YEARLY]: `年間`, [s.TOTAL]: `累計` },
    p = { [c.TOTAL]: `すべて`, [c.SHORT]: `短編`, [c.ONGOING]: `連載中`, [c.COMPLETE]: `完結済` };
let m = (function (e) {
    return ((e.RENAI = `1`), (e.FANTASY = `2`), (e.OTHER = `o`), e);
})({});
const h = { [m.RENAI]: `〔恋愛〕`, [m.FANTASY]: `〔ファンタジー〕`, [m.OTHER]: `〔文芸・SF・その他〕` };
function g(t) {
    let [n, r, i = c.TOTAL] = t.split(`_`),
        a = n,
        o = r,
        l = i;
    if (![Object.values(s).includes(a), Object.values(m).includes(o), Object.values(c).includes(l)].every(Boolean)) throw new e(`Invalid isekai ranking type: ${t}`);
    return { period: a, category: o, novelType: l };
}
function _(t, r, i, a) {
    let o = { order: u[t], gzip: 5, lim: Math.ceil((a / 2) * 1.2) };
    switch ((i !== c.TOTAL && (o.type = i), r)) {
        case m.RENAI:
            o.biggenre = n.Renai;
            break;
        case m.FANTASY:
            o.biggenre = n.Fantasy;
            break;
        case m.OTHER:
            o.biggenre = `${n.Bungei}-${n.Sf}-${n.Sonota}`;
            break;
        default:
            throw new e(`Invalid Isekai category: ${r}`);
    }
    return o;
}
async function v(n, r) {
    let { period: i, category: s, novelType: c } = g(n),
        l = `https://yomou.syosetu.com/rank/isekailist/type/${n}`,
        u = `[${f[i]}] 異世界転生/転移${h[s]}ランキング - ${p[c]} BEST${r}`,
        m = _(i, s, c, r),
        v = new a(),
        [y, b] = await Promise.all([new o({ ...m, istensei: 1 }, v).execute(), new o({ ...m, istenni: 1 }, v).execute()]),
        x = [...y.values, ...b.values],
        S = [...new Map(x.map((e) => [e.ncode, e])).values()],
        C = d[i];
    if (!C) throw new e(`Invalid period: ${i}`);
    let w = S.toSorted((e, t) => (t[C] || 0) - (e[C] || 0)).map((e, n) => ({
        title: `#${n + 1} ${e.title}`,
        link: `https://ncode.syosetu.com/${String(e.ncode).toLowerCase()}`,
        description: t({ novel: e }),
        author: e.writer,
        category: e.keyword.split(/[\s/\uFF0F]/).filter(Boolean),
    }));
    return { title: `小説家になろう - ${u}`, link: l, item: w.slice(0, r), language: `ja` };
}
const y = {
    path: `/ranking/:listType/:type`,
    categories: [`reading`],
    example: `/syosetu/ranking/list/daily_total?limit=50`,
    parameters: (() => {
        let e = [
                { value: l.LIST, label: `総合ランキング (General Ranking)` },
                { value: l.GENRE, label: `ジャンル別ランキング (Genre Ranking)` },
                { value: l.ISEKAI, label: `異世界転生/転移ランキング (Isekai Ranking)` },
            ],
            t = Object.entries(s).map(([e, t]) => ({ value: t, label: `${f[t]} (${e})` })),
            n = Object.entries(c).map(([e, t]) => ({ value: t, label: `${p[t]} (${e})` })),
            a = Object.entries(r)
                .filter(([, e]) => typeof e == `number`)
                .map(([e, t]) => ({ value: t.toString(), label: e })),
            o = Object.entries(m).map(([e, t]) => ({ value: t, label: `${h[t]} (${e})` }));
        return {
            listType: { description: `Ranking type`, options: e },
            type: {
                description: `Detailed ranking type, can be found in Syosetu ranking URLs`,
                options: [
                    ...t.flatMap((e) => n.map((t) => ({ value: `${e.value}_${t.value}`, label: `${l.LIST} - [${f[e.value]}] 総合ランキング - ${p[t.value]}` }))),
                    ...t.flatMap((e) => a.flatMap((t) => n.map((n) => ({ value: `${e.value}_${t.value}_${n.value}`, label: `${l.GENRE} - [${f[e.value]}] ${i[t.value]}ランキング - ${p[n.value]}` })))),
                    ...t.flatMap((e) => o.flatMap((t) => n.map((n) => ({ value: `${e.value}_${t.value}_${n.value}`, label: `${l.ISEKAI} - [${f[e.value]}] 異世界転生/転移${h[t.value]}ランキング - ${p[n.value]}` })))),
                ],
            },
        };
    })(),
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Rankings`,
    url: `yomou.syosetu.com/rank/top`,
    maintainers: [`SnowAgar25`],
    handler: S,
    description: `
| Keyword | Description | 説明 |
| --- | --- | --- |
| list | Overall Ranking | 総合ランキング |
| genre | Genre Ranking | ジャンル別ランキング |
| isekai | Isekai/Reincarnation/Transfer Ranking | 異世界転生/転移ランキング |

| Period | Description |
| --- | --- |
| daily | Daily Ranking |
| weekly | Weekly Ranking |
| monthly | Monthly Ranking |
| quarter | Quarterly Ranking |
| yearly | Yearly Ranking |


| Type | Description |
| --- | --- |
| total | All Works |
| t | Short Stories |
| r | Ongoing Series |
| er | Completed Series |

::: warning
Please note that novel type options may vary depending on the ranking category.

ランキングの種類によって、小説タイプが異なる場合がございますのでご注意ください。
:::

::: danger 注意事項
The "注目度ランキング" (Attention Ranking) is not supported as syosetu does not provide a public API for this feature and the results cannot be replicated through the search API.

「注目度ランキング」については、API が非公開で検索 API でも同様の結果を得ることができないため、本 Route ではサポートしておりません。
:::

::: tip 異世界転生/転移ランキングについて (Isekai)
When multiple works have the same points, their order may differ from syosetu's ranking as syosetu randomizes the order for works with identical points.

集計の結果、同じポイントの作品が複数存在する場合、Syosetu ではランダムで順位が決定されるため、本 Route の順位と異なる場合があります。
:::
`,
    radar: [
        { source: [`yomou.syosetu.com/rank/list/type/:type`], target: `/ranking/list/:type` },
        { source: [`yomou.syosetu.com/rank/genrelist/type/:type`], target: `/ranking/genre/:type` },
        { source: [`yomou.syosetu.com/rank/isekailist/type/:type`], target: `/ranking/isekai/:type` },
        ...(() => {
            let e = Object.values(s).map((e) => ({ title: `${f[e]}ランキング BEST5`, source: [`yomou.syosetu.com/rank/top/`], target: `/ranking/list/${e}_total?limit=5` })),
                t = Object.entries(r)
                    .filter(([, e]) => typeof e == `number` && e !== r.SonotaReplay && e !== r.NonGenre)
                    .map(([, e]) => ({ title: `[${f.daily}] ${i[e]}ランキング BEST5`, source: [`yomou.syosetu.com/rank/top/`], target: `/ranking/genre/daily_${e}_total?limit=5` })),
                n = Object.values(m).map((e) => ({ title: `[${f.daily}] 異世界転生/転移${h[e]}ランキング BEST5`, source: [`yomou.syosetu.com/rank/top/`], target: `/ranking/isekai/daily_${e}_total?limit=5` }));
            return [...e, ...t, ...n];
        })(),
    ],
};
function b(t) {
    let [n, r] = t.split(`_`),
        i = n,
        a = r;
    if (![Object.values(s).includes(i), Object.values(c).includes(a)].every(Boolean)) throw new e(`Invalid general ranking type: ${t}`);
    return { period: i, novelType: a };
}
function x(t) {
    let [n, i, a = c.TOTAL] = t.split(`_`),
        o = n,
        l = Number(i),
        u = a;
    if (![Object.values(s).includes(o), Object.values(r).includes(l), Object.values(c).includes(u), l !== r.SonotaReplay, l !== r.NonGenre].every(Boolean)) throw new e(`Invalid genre ranking type: ${t}`);
    return { period: o, genre: l, novelType: u };
}
async function S(n) {
    let { listType: r, type: s } = n.req.param(),
        d = r,
        m = Math.min(Number(n.req.query(`limit`) ?? 300), 300),
        h = new a(),
        g = { gzip: 5, lim: m },
        _,
        y;
    switch (d) {
        case l.LIST: {
            let { period: e, novelType: t } = b(s);
            ((_ = `https://yomou.syosetu.com/rank/list/type/${s}`), (y = `[${f[e]}] 総合ランキング - ${p[t]} BEST${m}`), (g.order = u[e]), t !== c.TOTAL && (g.type = t));
            break;
        }
        case l.GENRE: {
            let { period: e, genre: t, novelType: n } = x(s);
            ((_ = `https://yomou.syosetu.com/rank/genrelist/type/${s}`), (y = `[${f[e]}] ${i[t]}ランキング - ${p[n]} BEST${m}`), (g.order = u[e]), (g.genre = t), n !== c.TOTAL && (g.type = n));
            break;
        }
        case l.ISEKAI:
            return v(s, m);
        default:
            throw new e(`Invalid ranking type: ${s}`);
    }
    let S = (await new o(g, h).execute()).values.map((e, n) => ({
        title: `#${n + 1} ${e.title}`,
        link: `https://ncode.syosetu.com/${String(e.ncode).toLowerCase()}`,
        description: t({ novel: e }),
        author: e.writer,
        category: e.keyword.split(/[\s/\uFF0F]/).filter(Boolean),
    }));
    return { title: `小説家になろう - ${y}`, link: _, item: S, language: `ja` };
}
export { y as route };
