import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = (e) => {
        let t = {
            0: `search.score() desc, Metadata/OfficialRepositoryNumber desc, NameSortable asc`,
            1: `NameSortable asc, Metadata/OfficialRepositoryNumber desc, Metadata/RepositoryStars desc, Metadata/Committed desc`,
            2: `Metadata/Committed desc, Metadata/OfficialRepositoryNumber desc, Metadata/RepositoryStars desc`,
        };
        if (e === `1`) return t;
        let n = {};
        for (let e in t) n[e] = t[e].replaceAll(/\b(desc|asc)\b/gi, (e) => (e.toLowerCase() === `desc` ? `asc` : `desc`));
        return n;
    },
    c = { o: `Metadata/OfficialRepositoryNumber eq 1`, dm: `Metadata/DuplicateOf eq null` },
    l = async (n) => {
        let { query: i = `s=2&d=1&n=true&dm=true&o=true` } = n.req.param(),
            l = Number.parseInt(n.req.query(`limit`) ?? `50`, 10),
            d = `https://scoop.sh`,
            f = new URL(`/#/apps?${i}`, d).href,
            p = new URL(`indexes/apps/docs/search`, `https://scoopsearch.search.windows.net`).href,
            m = await e(f),
            h = a(m)(`html`).attr(`lang`) ?? `en`,
            g = /<script type="module" crossorigin src="(.*?)"><\/script>/,
            _ = g.test(m) ? new URL(m.match(g)?.[1], d).href : ``;
        if (!_) throw Error(`JavaScript file not found.`);
        let v = (await e(_, { parseResponse: (e) => e })).match(/VITE_APP_AZURESEARCH_KEY:"(.*?)"/)?.[1];
        if (!v) throw Error(`Key not found.`);
        let y = !i.includes(`o=false`),
            b = !i.includes(`dm=false`),
            x = i.match(/s=(\d+)/)?.[1] ?? `2`,
            S = i.match(/d=(\d+)/)?.[1] ?? `1`,
            C = await e(p, {
                method: `post`,
                query: { 'api-version': `2020-06-30` },
                headers: { 'api-key': v, origin: d, referer: d },
                body: {
                    count: !0,
                    search: ``,
                    searchMode: `all`,
                    filter: [y ? c.o : void 0, b ? c.dm : void 0].filter(Boolean).join(` and `),
                    orderby: s(S)[x],
                    skip: 0,
                    top: l,
                    select: `Id,Name,NamePartial,NameSuffix,Description,Notes,Homepage,License,Version,Metadata/Repository,Metadata/FilePath,Metadata/OfficialRepository,Metadata/RepositoryStars,Metadata/Committed,Metadata/Sha`,
                    highlight: `Name,NamePartial,NameSuffix,Description,Version,License,Metadata/Repository`,
                    highlightPreTag: `<mark>`,
                    highlightPostTag: `</mark>`,
                },
            }),
            w = [];
        w = C.value.slice(0, l).map((e) => {
            let n = e.Metadata.Repository.split(/\//).slice(-2).join(`/`),
                i = `${e.Name} ${e.Version} in ${n}`,
                a = o(r(u, { item: e })),
                s = e.Metadata.Committed,
                c = e.Homepage,
                l = [{ name: n, url: e.Metadata.Repository, avatar: void 0 }],
                d = `scoop-${e.Name}-${e.Version}-${e.Metadata.Sha}`,
                f = s;
            return { title: i, description: a, pubDate: s ? t(s) : void 0, link: c, author: l, guid: d, id: d, content: { html: a, text: a }, updated: f ? t(f) : void 0, language: h };
        });
        let T = `Scoop`;
        return { title: `${T} - Apps`, description: void 0, link: f, item: w, allowEmpty: !0, author: T, language: h, id: f };
    },
    u = ({ item: e }) => {
        let t = e.Metadata.Repository.split(/\//).slice(-2).join(`/`);
        return r(`table`, {
            children: i(`tbody`, {
                children: [
                    e.Name ? i(`tr`, { children: [r(`th`, { children: `Name` }), r(`td`, { children: e.Name })] }) : null,
                    e.Repository ? i(`tr`, { children: [r(`th`, { children: `Repository` }), r(`td`, { children: r(`a`, { href: e.Metadata.Repository, children: t }) })] }) : null,
                    e.Committed ? i(`tr`, { children: [r(`th`, { children: `Committed` }), r(`td`, { children: r(`a`, { href: `${e.Metadata.Repository}/commit/${e.Metadata.Sha}`, children: e.Metadata.Committed }) })] }) : null,
                    e.Version ? i(`tr`, { children: [r(`th`, { children: `Version` }), r(`td`, { children: i(`a`, { href: `${e.Metadata.Repository}/blob/${e.Metadata.FilePath}`, children: [`v`, e.Version] }) })] }) : null,
                    e.Description ? i(`tr`, { children: [r(`th`, { children: `Description` }), r(`td`, { children: e.Description })] }) : null,
                    e.Homepage ? i(`tr`, { children: [r(`th`, { children: `Homepage` }), r(`td`, { children: r(`a`, { href: e.Homepage, children: e.Homepage }) })] }) : null,
                    e.License ? i(`tr`, { children: [r(`th`, { children: `License` }), r(`td`, { children: e.License })] }) : null,
                    e.Note ? i(`tr`, { children: [r(`th`, { children: `Note` }), r(`td`, { children: e.Note })] }) : null,
                ],
            }),
        });
    },
    d = {
        path: `/apps/:query?`,
        name: `Apps`,
        url: `scoop.sh`,
        maintainers: [`nczitzk`],
        handler: l,
        example: `/scoop/apps`,
        parameters: { query: { description: 'Query, `s=2&d=1&n=true&dm=true&o=true` by default' } },
        description:
            '::: tip\nTo subscribe to [Apps](https://scoop.sh/#/apps?s=2&d=1&n=true&dm=true&o=true), where the source URL is `https://scoop.sh/#/apps?s=2&d=1&n=true&dm=true&o=true`, extract the certain parts from this URL to be used as parameters, resulting in the route as [`/scoop/apps/s=2&d=1&n=true&dm=true&o=true`](https://rsshub.app/scoop/apps/s=2&d=1&n=true&dm=true&o=true).\n:::',
        categories: [`program-update`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`scoop.sh/#/apps`, `scoop.sh`],
                target: (e, t) => {
                    let n = new URL(t).searchParams.toString() ?? void 0;
                    return `/scoop/apps${n ? `/${n}` : ``}`;
                },
            },
        ],
        view: n.Notifications,
    };
export { l as handler, d as route };
