import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './utils-CGxy1qK9.mjs';
import i from 'p-map';
const a = {
    path: `/mobile/:path{.+}?`,
    categories: [`traditional-media`],
    example: `/apnews/mobile/ap-top-news`,
    view: n.Articles,
    parameters: { path: { description: `Corresponding path from AP News website`, default: `ap-top-news` } },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`apnews.com/`] }],
    name: `News (from mobile client API)`,
    maintainers: [`dzx-dzx`],
    handler: o,
};
async function o(n) {
    let a = (
            await e(`https://apnews.com/graphql/delivery/ap/v1`, {
                query: {
                    operationName: `ContentPageQuery`,
                    variables: { path: n.req.param(`path`) ? `/${n.req.param(`path`)}` : `/hub/ap-top-news` },
                    extensions: { persistedQuery: { version: 1, sha256Hash: `3bc305abbf62e9e632403a74cc86dc1cba51156d2313f09b3779efec51fc3acb` } },
                },
            })
        ).data.Screen,
        o = [...a.main.filter((e) => e.__typename === `ColumnContainer`).flatMap((e) => e.columns), ...a.main.filter((e) => e.__typename !== `ColumnContainer`)]
            .filter((e) => e.__typename !== `GoogleDfPAdModule`)
            .flatMap((e) => {
                switch (e.__typename) {
                    case `PageListModule`:
                        return e.items;
                    case `VideoPlaylistModule`:
                        return e.playlist;
                    default:
                        return;
                }
            })
            .filter(Boolean)
            .map((e) => {
                if (e.__typename === `PagePromo`) return { title: e.title, link: e.url, pubDate: t(e.publishDateStamp), category: e.category, description: e.description, guid: e.id };
                if (e.__typename === `VideoPlaylistItem`) return { title: e.title, link: e.url, description: e.description, guid: e.contentId };
            })
            .filter(Boolean)
            .toSorted((e, t) => t.pubDate - e.pubDate)
            .slice(0, n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 20),
        s = n.req.query(`fulltext`) === `true` ? await i(o, (e) => r(e), { concurrency: 10 }) : o;
    return { title: a.category ?? a.title, item: s, link: `https://apnews.com` };
}
export { a as route };
