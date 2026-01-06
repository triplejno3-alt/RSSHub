import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { c as r } from './google-Ewtr97IX.mjs';
const i = {
    path: `/charts/:category?/:country?/:embed?`,
    categories: [`social-media`],
    example: `/youtube/charts`,
    parameters: { category: 'Chart, see table below, default to `TopVideos`', country: `Country Code, see table below, default to global`, embed: `Default to embed the video, set to any value to disable embedding` },
    name: `Music Charts`,
    maintainers: [`TonyRL`],
    handler: a,
    description: `Chart

| Top artists | Top songs | Top music videos | Trending       |
| ----------- | --------- | ---------------- | -------------- |
| TopArtists  | TopSongs  | TopVideos        | TrendingVideos |

  Country Code

| Argentina | Australia | Austria | Belgium | Bolivia | Brazil | Canada |
| --------- | --------- | ------- | ------- | ------- | ------ | ------ |
| ar        | au        | at      | be      | bo      | br     | ca     |

| Chile | Colombia | Costa Rica | Czechia | Denmark | Dominican Republic | Ecuador |
| ----- | -------- | ---------- | ------- | ------- | ------------------ | ------- |
| cl    | co       | cr         | cz      | dk      | do                 | ec      |

| Egypt | El Salvador | Estonia | Finland | France | Germany | Guatemala |
| ----- | ----------- | ------- | ------- | ------ | ------- | --------- |
| eg    | sv          | ee      | fi      | fr     | de      | gt        |

| Honduras | Hungary | Iceland | India | Indonesia | Ireland | Israel | Italy |
| -------- | ------- | ------- | ----- | --------- | ------- | ------ | ----- |
| hn       | hu      | is      | in    | id        | ie      | il     | it    |

| Japan | Kenya | Luxembourg | Mexico | Netherlands | New Zealand | Nicaragua |
| ----- | ----- | ---------- | ------ | ----------- | ----------- | --------- |
| jp    | ke    | lu         | mx     | nl          | nz          | ni        |

| Nigeria | Norway | Panama | Paraguay | Peru | Poland | Portugal | Romania |
| ------- | ------ | ------ | -------- | ---- | ------ | -------- | ------- |
| ng      | no     | pa     | py       | pe   | pl     | pt       | ro      |

| Russia | Saudi Arabia | Serbia | South Africa | South Korea | Spain | Sweden | Switzerland |
| ------ | ------------ | ------ | ------------ | ----------- | ----- | ------ | ----------- |
| ru     | sa           | rs     | za           | kr          | es    | se     | ch          |

| Tanzania | Turkey | Uganda | Ukraine | United Arab Emirates | United Kingdom | United States |
| -------- | ------ | ------ | ------- | -------------------- | -------------- | ------------- |
| tz       | tr     | ug     | ua      | ae                   | gb             | us            |

| Uruguay | Zimbabwe |
| ------- | -------- |
| uy      | zw       |`,
};
async function a(i) {
    let a = {
            TopArtists: { contentKey: `artists`, viewKey: `artistViews`, title: `Top artists` },
            TopSongs: { contentKey: `trackTypes`, viewKey: `trackViews`, title: `Top songs` },
            TopVideos: { contentKey: `videos`, viewKey: `videoViews`, title: `Top music videos` },
            TrendingVideos: { contentKey: `videos`, viewKey: `videoViews`, title: `Trending` },
        },
        { category: o = `TopVideos`, country: s } = i.req.param(),
        c = !i.req.param(`embed`),
        { content: l } = await n.tryGet(
            `youtube:charts:${s ?? `global`}`,
            async () =>
                (
                    await e(`https://charts.youtube.com/youtubei/v1/browse`, {
                        method: `POST`,
                        query: { alt: `json`, key: `AIzaSyCzEW7JUJdSql0-2V4tHUb6laYm4iAE_dM` },
                        body: {
                            browseId: `FEmusic_analytics_charts_home`,
                            context: {
                                capabilities: {},
                                client: { clientName: `WEB_MUSIC_ANALYTICS`, clientVersion: `0.2`, experimentIds: [], experimentsToken: ``, gl: `US`, hl: `en`, theme: `MUSIC` },
                                request: { internalExperimentFlags: [] },
                            },
                            query: `chart_params_type=WEEK&perspective=CHART&flags=viral_video_chart&selected_chart=TRACKS&chart_params_id=weekly:0:0${s ? `:${s}` : ``}`,
                        },
                    })
                ).contents.sectionListRenderer.contents[0].musicAnalyticsSectionRenderer,
            t.cache.routeExpire,
            !1
        ),
        { entityId: u } = l.perspectiveMetadata,
        d =
            o === `TopArtists`
                ? l[a[o].contentKey][0][a[o].viewKey].map((e) => ({ title: e.name, link: `https://charts.youtube.com/artist/${encodeURIComponent(e.id)}`, guid: `youtube:charts:${o}:${u}:${e.id}` }))
                : l[a[o].contentKey][o === `TrendingVideos` ? 1 : 0][a[o].viewKey].map((e) => {
                      let t = o === `TopSongs` ? e.encryptedVideoId : e.id,
                          n = e.artists
                              .filter((e) => e.name)
                              .map((e) => e.name)
                              .join(`, `);
                      return { title: `${e.title ?? e.name} - ${n}`, description: r(c, t, e.thumbnail?.thumbnails.pop().url, ``), link: `https://www.youtube.com/watch?v=${t}`, guid: `youtube:charts:${o}:${u}:${e.id}`, author: n };
                  });
    return { title: `YouTube Music Charts - ${a[o].title}`, link: `https://charts.youtube.com/charts/${o}/${s ?? `global`}`, item: d };
}
export { i as route };
