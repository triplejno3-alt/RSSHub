import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = {
    path: `/latest-ranked/:routeParams?`,
    categories: [`game`],
    example: `/osu/latest-ranked/includeMode=osu&difficultyLimit=L3&difficultyLimit=U7`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, supportRadar: !0 },
    parameters: { routeParams: { description: `Used to pass route parameters in Query String format. Check out route description for more info.`, default: `null` } },
    name: `Latest Ranked Beatmap`,
    description: `
Subscribe to the new beatmaps on https://osu.ppy.sh/beatmapsets.

#### Parameter Description

Parameters allows you to:

- Filter game mode
- Limit beatmap difficulty
- Show/hide game mode in feed title

Below is a table of all allowed parameters passed to \`routeParams\`


| Name              | Default  | Description                                                                                                                                                                                                                                          |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`includeMode\`     | All mode | Could be \`osu\`, \`mania\`, \`fruits\` or \`taiko\`. Specify included game mode of beatmaps. Including this paramseter multiple times to specify multiple game modes, e.g.: \`includeMode=osu&includeMode=mania\`. Subscribe to all game modes if not specified |
| \`difficultyLimit\` | None     | Lower/upper limit of star rating of the beatmaps in the beatmapset item, e.g.:\`difficultyLimit=U6\`. Checkout tips in descriptions for detailed explaination and examples.                                                                            |
| \`modeInTitle\`     | \`true\`   | \`true\` or \`false\` Add mode info into feed title.


This actual parameters should be passed as \`routeParams\` in URL Query String format without \`?\`, e.g.:

    /osu/latest-ranked/modeInTitle=true&includeMode=osu

::: tip
You could make use of \`difficultyLimit\` paramters to create a "high difficulty/low difficulty only" only feed.

For example, if you only wants to play low star rating beatmap like 1 or 2 star, you could subscribe to:

    /osu/latest-ranked/difficultyLimit=U2

This will filter out all beatmapsets that do not provide at least one beatmap with star rating<=\`2.00\`.

Similarly, you could use lower bound to filter out beatmapsets which don't have at least one beatmap
with star rating higher than a certain threshold.

    /osu/latest-ranked/difficultyLimit=L6

Now all beatmapsets that don't provided at least one beatmap with star rating higher than \`6.00\` will be filtered.
:::`,
    maintainers: [`nfnfgo`],
    radar: [{ source: [`osu.ppy.sh/beatmapsets`] }],
    handler: u,
};
async function u(l) {
    let u = l.req.param(`routeParams`),
        d = new URL(`https://osu.ppy.sh?${u}`).searchParams,
        f = d.getAll(`includeMode`),
        p = d.getAll(`difficultyLimit`),
        m = d.get(`modeInTitle`) ?? `true`,
        h = await t.tryGet(
            `https://osu.ppy.sh/beatmapsets:JSON`,
            async () => {
                let e = s((await r.get(`https://osu.ppy.sh/beatmapsets`)).data),
                    t = JSON.parse(e(`#json-beatmaps`).text() ?? `{"beatmapsets": undefined}`).beatmapsets;
                if (t === void 0) throw Error(`Failed to retrieve JSON beatmap info from osu! website`);
                return t;
            },
            e.cache.routeExpire,
            !1
        );
    for (let e of h) e.beatmaps.sort((e, t) => e.difficulty_rating - t.difficulty_rating);
    f?.length && f?.length > 0 && (h = h.filter((e) => f.includes(e.beatmaps[0].mode)));
    let g = 99,
        _ = 0;
    if (p && p.length > 0 && p.length < 2) {
        for (let e of p) e.startsWith(`U`) ? (g = Number.parseFloat(e.slice(1))) : e.startsWith(`L`) && (_ = Number.parseFloat(e.slice(1)));
        let e = (e) => !(e.beatmaps.at(0).difficulty_rating > g || e.beatmaps.at(-1).difficulty_rating < _);
        h = h.filter((t) => e(t));
    }
    function v() {
        if (!u) return ``;
        let e = `Feed Configurations:
`;
        return ((e += `Game Mode: ${f.length > 0 ? JSON.stringify(f) : `All modes`}\n`), (e += `Star Rating Limit: Lower=${_}, Upper=${g}`), e);
    }
    let y = h.map((e) => {
        let t = n(e.ranked_date),
            r = e.covers[`cover@2x`] || e.covers.cover,
            s = e.covers[`card@2x`] || e.covers.card,
            l = `${Math.floor(e.beatmaps[0].total_length / 60)
                .toString()
                .padStart(2, `0`)}:${(e.beatmaps[0].total_length % 60).toString().padStart(2, `0`)}`,
            u = { osu: `Osu!`, fruits: `Osu!Catch`, taiko: `Osu!Taiko`, mania: `Osu!Mania` },
            d = c(
                o(i, {
                    children: [
                        a(`img`, { src: e.covers[`cover@2x`] || e.covers.cover, alt: e.title, style: `max-width: 100%; height: auto;` }),
                        a(`h3`, { children: `Song Info` }),
                        o(`ul`, {
                            children: [
                                o(`li`, { children: [a(`strong`, { children: `English Title:` }), ` `, e.title] }),
                                o(`li`, { children: [a(`strong`, { children: `Artist:` }), ` `, `${e.artist_unicode} (${e.artist})`] }),
                                o(`li`, { children: [a(`strong`, { children: `Length:` }), ` `, l] }),
                                o(`li`, { children: [a(`strong`, { children: `BPM:` }), ` `, e.bpm] }),
                            ],
                        }),
                        a(`h3`, { children: `Beatmapset Info` }),
                        o(`ul`, { children: [o(`li`, { children: [a(`strong`, { children: `Mode:` }), ` `, u[e.beatmaps[0].mode]] }), o(`li`, { children: [a(`strong`, { children: `Creator:` }), ` `, e.creator] })] }),
                        a(`h3`, { children: `Difficulties` }),
                        o(`table`, {
                            border: `1`,
                            children: [
                                a(`thead`, { children: o(`tr`, { children: [a(`th`, { children: `Version` }), a(`th`, { children: `Rating` }), a(`th`, { children: `AR` }), a(`th`, { children: `Drain` })] }) }),
                                a(`tbody`, {
                                    children: e.beatmaps.map((e) =>
                                        o(`tr`, {
                                            children: [
                                                a(`td`, { children: a(`a`, { href: e.url, target: `_blank`, children: e.version }) }),
                                                a(`td`, { children: e.difficulty_rating.toFixed(2) }),
                                                a(`td`, { children: e.ar.toFixed(1) }),
                                                a(`td`, { children: e.drain }),
                                            ],
                                        })
                                    ),
                                }),
                            ],
                        }),
                    ],
                })
            );
        return {
            title: `${m === `true` ? `[${u[e.beatmaps[0].mode]}] ` : ``}${e.title_unicode ?? e.title}`,
            description: d,
            pubDate: t,
            link: `https://osu.ppy.sh/beatmapsets/${e.id}`,
            category: [`osu!`, `game`],
            author: [{ name: e.creator }],
            image: r,
            banner: s,
            updated: e.last_updated,
        };
    });
    return { title: `Osu! Latest Ranked Map`, link: `https://osu.ppy.sh/beatmapsets`, description: `Newly ranked beatmaps at https://osu.ppy.sh/beatmapsets.\n${v()}`, item: y };
}
export { l as route };
