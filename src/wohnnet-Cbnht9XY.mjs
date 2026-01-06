import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = `/wohnnet/`,
    r = `https://www.wohnnet.at/immobilien/`,
    i = {
        name: `Immobiliensuche`,
        path: `/:category/:region/*`,
        maintainers: [`sk22`],
        categories: [`other`],
        description: `
Only returns the first page of search results, allowing you to keep track of
newly added apartments. If you're looking for an apartment, make sure to also
look through the other pages on the website.

::: tip
Note that the parameter \`&sortierung=neueste-zuerst\` for chronological order
is automatically appended.
:::

::: tip
To get your query URL, go to https://www.wohnnet.at/immobilien/suche, apply
all desired filters (but at least a category and a region!) and click the
"… Treffer anzeigen" link. From the resulting URL, cut off the
\`https://www.wohnnet.at/immobilien/\` part at the beginning and replace only
the \`?\` (the \`&\`s stay as is!) after the region name with a \`/\`.

Examples:

* \`${r}mietwohnungen/wien\`
    - → \`${n}mietwohnungen/wien\`
* \`${r}mietwohnungen/wien?unterregionen=g90101\`
    - → \`${n}mietwohnungen/wien/unterregionen=g90101\`
* \`${r}mietwohnungen/wien?unterregionen=g90101&merkmale=balkon\`
    - → \`${n}mietwohnungen/wien/unterregionen=g90101&merkmale=balkon\`
:::
`,
        example: n + `mietwohnungen/wien/unterregionen=g90101--g90201--g90301--g90401--g90501&flaeche=40&preis=-1000`,
        parameters: {
            category: 'Category (`mietwohnungen`, `eigentumswohnungen`, `grundstuecke`, …)',
            region: 'Region (`wien`, `oesterreich`, …)',
            unterregionen: 'Unterregionen (e.g. `g90101--g90201--g90301`)',
            intention: 'Intention (`kauf` | `miete`)',
            zimmer: 'Zimmer (at least number, e.g. `2`)',
            flaeche: 'Fläche (m², `40-` = at least 40 m², `40-60` = between 40 m² and 60 m²)',
            preis: 'Preis (€, `-1000` = at most 1,000 €, `500-1000` = between 500 € and 1,000 €)',
            merkmale: 'Merkmale (multiple, delimited by `--`, e.g. `balkon--garten--kurzzeitmiete--moebliert--parkplatz--provisionsfrei--sofort-beziehbar`)',
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        async handler(i) {
            let a = i.req.param(`category`),
                o = i.req.param(`region`),
                s = i.req.path.slice(`${n}${a}/${o}/`.length) + `&sortierung=neueste-zuerst`;
            s.startsWith(`&`) && (s = s.slice(1));
            let c = `${r}${a}/${o}/?${s}`,
                l = t(await e(c));
            return {
                title: `wohnnet.at`,
                language: `de`,
                logo: `https://www.wohnnet.at/media/images/wohnnet/icon_192_192.png`,
                allowEmpty: !0,
                item: l(`a:has(> .realty)`)
                    .toArray()
                    .map((e) => {
                        let t = l(e),
                            n = t.attr(`href`),
                            [i, a] = t
                                .find(`.realty-detail-title-address`)
                                .text()
                                .split(
                                    `
`
                                )
                                .map((e) => e.trim())
                                .filter((e) => e.length),
                            o = t.find(`.realty-detail-area-rooms .text-right`).text().trim(),
                            s = t
                                .find(`.realty-detail-area-rooms`)
                                .text()
                                .split(
                                    `
`
                                )
                                .map((e) => e.trim())
                                .filter((e) => e.length),
                            c = t
                                .find(`.realty-detail-badges .badge`)
                                .toArray()
                                .map((e) => l(e).text().trim()),
                            u = t.find(`.realty-detail-agency`).text(),
                            d = t.find(`.realty-image img`).attr(`src`);
                        return {
                            title: `${a} · ${o} | ${i}`,
                            link: new URL(n ?? ``, r).href,
                            description: `${s.join(` · `)} | ${c.join(` · `)} | ${u}`,
                            category: c.filter((e) => !e.endsWith(` Bilder`)),
                            image: d ? new URL(d, r).href : void 0,
                        };
                    }),
                link: c,
            };
        },
    };
export { i as route };
