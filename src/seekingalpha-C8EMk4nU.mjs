import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = `https://seekingalpha.com`,
    c = {
        path: `/:symbol/:category?`,
        categories: [`finance`],
        example: `/seekingalpha/TSM/transcripts`,
        parameters: { symbol: `Stock symbol`, category: 'Category, see below, `news` by default' },
        features: { antiCrawler: !0 },
        radar: [{ source: [`seekingalpha.com/symbol/:symbol/:category`, `seekingalpha.com/symbol/:symbol/earnings/:category`], target: `/:symbol/:category` }],
        name: `Summary`,
        maintainers: [`TonyRL`],
        handler: d,
        description: `| Analysis | News | Transcripts | Press Releases | Related Analysis |
| -------- | ---- | ----------- | -------------- | ---------------- |
| analysis | news | transcripts | press-releases | related-analysis |`,
    },
    l = () => t.tryGet(`seekingalpha:machine_cookie`, async () => (await e.raw(s)).headers.getSetCookie().map((e) => e.split(`;`)[0])),
    u = {
        article: { slug: `/articles`, include: `author,primaryTickers,secondaryTickers,otherTags,presentations,presentations.slides,author.authorResearch,author.userBioTags,co_authors,promotedService,sentiments` },
        news: { slug: `/news`, include: `author,primaryTickers,secondaryTickers,otherTags` },
        pr: { slug: `/press_releases`, include: `acquireService,primaryTickers` },
    };
async function d(c) {
    let { category: d = `news`, symbol: f } = c.req.param(),
        p = `${s}/symbol/${f.toUpperCase()}/${d === `transcripts` ? `earnings/${d}` : d}`,
        m = await l(),
        h = await e(`${s}/api/v3/symbols/${f.toUpperCase()}/${d}`, {
            headers: { cookie: m.join(`; `) },
            query: {
                'filter[since]': 0,
                'filter[until]': 0,
                id: f.toLowerCase(),
                include: `author,primaryTickers,secondaryTickers,sentiments`,
                'page[size]': c.req.query(`limit`) ? Number.parseInt(c.req.query(`limit`), 10) : d === `news` ? 40 : 20,
                'page[number]': 1,
            },
        }),
        g = h.data?.map((e) => ({
            title: e.attributes.title,
            link: new URL(e.links.self, s).href,
            pubDate: n(e.attributes.publishOn),
            author: h.included.find((t) => t.id === e.relationships.author.data.id).attributes.nick,
            id: e.id,
            articleType: e.links.self.split(`/`)[1],
        })),
        _ = g
            ? await Promise.all(
                  g.map((c) =>
                      t.tryGet(c.link, async () => {
                          let t = await e(`${s}/api/v3${u[c.articleType].slug}/${c.id}`, { headers: { cookie: m.join(`; `) }, query: { include: u[c.articleType].include } });
                          c.category = t.included.filter((e) => e.type === `tag`).map((e) => (e.attributes.company ? `${e.attributes.company} (${e.attributes.name})` : e.attributes.name));
                          let l = t.data.attributes.summary;
                          return (
                              (c.description = (l?.length ? o(a(r, { children: [i(`h2`, { children: `Summary` }), i(`ul`, { children: l.map((e) => i(`li`, { children: e })) })] })) : ``) + t.data.attributes.content),
                              (c.updated = n(t.data.attributes.lastModified)),
                              c
                          );
                      })
                  )
              )
            : [];
    return { title: h.meta.page.title, description: h.meta.page.description, link: p, image: `https://seekingalpha.com/samw/static/images/favicon.svg`, item: _, allowEmpty: !0, language: `en-US` };
}
export { c as route };
