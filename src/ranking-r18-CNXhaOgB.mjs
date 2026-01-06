import { t as e } from './invalid-parameter-DGZgOgO2.mjs';
import { t } from './description-D7Hn9Z68.mjs';
import { NarouNovelFetch as n, R18Site as r, SearchBuilderR18 as i } from 'narou';
let a = (function (e) {
        return ((e.NOCTURNE = `noc`), (e.MOONLIGHT = `mnlt`), (e.MIDNIGHT = `mid`), (e.MOONLIGHT_BL = `mnlt-bl`), e);
    })({}),
    o = (function (e) {
        return ((e.DAILY = `daily`), (e.WEEKLY = `weekly`), (e.MONTHLY = `monthly`), (e.QUARTER = `quarter`), (e.YEARLY = `yearly`), e);
    })({}),
    s = (function (e) {
        return ((e.TOTAL = `total`), (e.SHORT = `t`), (e.ONGOING = `r`), (e.COMPLETE = `er`), e);
    })({});
const c = { [a.NOCTURNE]: r.Nocturne, [a.MOONLIGHT]: r.MoonLight, [a.MOONLIGHT_BL]: r.MoonLightBL, [a.MIDNIGHT]: r.Midnight },
    l = { [a.NOCTURNE]: `ノクターン`, [a.MOONLIGHT]: `ムーンライト`, [a.MOONLIGHT_BL]: `ムーンライト BL`, [a.MIDNIGHT]: `ミッドナイト` },
    u = { [o.DAILY]: `dailypoint`, [o.WEEKLY]: `weeklypoint`, [o.MONTHLY]: `monthlypoint`, [o.QUARTER]: `quarterpoint`, [o.YEARLY]: `yearlypoint` },
    d = { [o.DAILY]: `日間`, [o.WEEKLY]: `週間`, [o.MONTHLY]: `月間`, [o.QUARTER]: `四半期`, [o.YEARLY]: `年間` },
    f = { [s.TOTAL]: `総合`, [s.SHORT]: `短編`, [s.ONGOING]: `連載中`, [s.COMPLETE]: `完結済` },
    p = {
        path: `/rankingr18/:sub/:type`,
        categories: [`reading`],
        example: `/syosetu/rankingr18/noc/daily_total?limit=50`,
        parameters: (() => {
            let e = Object.entries(a).map(([, e]) => ({ value: e, label: l[e] })),
                t = Object.entries(o).map(([e, t]) => ({ value: t, label: `${d[t]} (${e})` })),
                n = Object.entries(s).map(([e, t]) => ({ value: t, label: `${f[t]} (${e})` }));
            return {
                sub: { description: `Target site for R18 rankings`, options: e },
                type: { description: `Detailed ranking type (format: period_noveltype)`, options: t.flatMap((e) => n.map((t) => ({ value: `${e.value}_${t.value}`, label: `${e.label} ${t.label}` }))) },
            };
        })(),
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `R18 Rankings`,
        url: `syosetu.com/site/group`,
        maintainers: [`SnowAgar25`],
        handler: g,
        description: `
| Period | Description | 説明 |
| --- | --- | --- |
| daily | Daily Ranking | 日間ランキング |
| weekly | Weekly Ranking | 週間ランキング |
| monthly | Monthly Ranking | 月間ランキング |
| quarter | Quarterly Ranking | 四半期ランキング |
| yearly | Yearly Ranking | 年間ランキング |

| Novel Type | Description | 説明 |
| --- | --- | --- |
| total | All Works | 総合 |
| t | Short Stories | 短編 |
| r | Ongoing Series | 連載中 |
| er | Completed Series | 完結済 |

::: tip
Combine Period and Novel Type with \`_\`.
For example: \`daily_total\`, \`weekly_r\`, \`monthly_er\`
:::`,
        radar: [
            { source: [`noc.syosetu.com/rank/list/type/:type`], target: `/rankingr18/noc/:type` },
            { source: [`mid.syosetu.com/rank/list/type/:type`], target: `/rankingr18/mid/:type` },
            { source: [`mnlt.syosetu.com/rank/list/type/:type`], target: `/rankingr18/mnlt/:type` },
            { source: [`mnlt.syosetu.com/rank/bllist/type/:type`], target: `/rankingr18/mnlt-bl/:type` },
            ...(() =>
                Object.entries(a).flatMap(([, e]) =>
                    Object.values(o).map((t) => ({
                        title: `${l[e]} ${d[t]}ランキング BEST5`,
                        source: [`${e === a.MOONLIGHT_BL ? a.MOONLIGHT : e}.syosetu.com/rank/${e === a.MOONLIGHT_BL ? `bltop` : `top`}`],
                        target: `/rankingr18/${e}/${t}_${s.TOTAL}?limit=5`,
                    }))
                ))(),
        ],
    };
function m(t) {
    let [n, r] = t.split(`_`),
        i = n,
        a = r;
    if (![Object.values(o).includes(i), Object.values(s).includes(a)].every(Boolean)) throw new e(`Invalid ranking type: ${t}`);
    return { period: n, novelType: r };
}
function h(e, t) {
    let { period: n, novelType: r } = m(e);
    return `${d[n]}${f[r]}ランキング BEST${t}`;
}
async function g(r) {
    let { sub: o, type: l } = r.req.param(),
        d = `${`https://${o === a.MOONLIGHT_BL ? a.MOONLIGHT : o}.syosetu.com`}/rank/list/type/${l}`,
        f = new n(),
        p = Math.min(Number(r.req.query(`limit`) ?? 300), 300),
        { period: g, novelType: _ } = m(l),
        v = { gzip: 5, lim: p, order: u[g] };
    if ((_ !== s.TOTAL && (v.type = _), !(o in c))) throw new e(`Invalid subsite: ${o}`);
    let y = c[o],
        b = (await new i(v, f).r18Site(y).execute()).values.map((e, n) => ({
            title: `#${n + 1} ${e.title}`,
            link: `https://novel18.syosetu.com/${String(e.ncode).toLowerCase()}`,
            description: t({ novel: e }),
            author: e.writer,
            category: e.keyword.split(/[\s/\uFF0F]/).filter(Boolean),
        }));
    return { title: `小説家になろう (${o}) - ${h(l, p)}`, link: d, item: b, language: `ja` };
}
export { p as route };
