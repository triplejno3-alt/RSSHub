import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = async (n) => {
        let { state: c = `all` } = n.req.param(),
            l = Number.parseInt(n.req.query(`limit`) ?? `50`, 10),
            u = `https://petition.parliament.uk`,
            d = new URL(`petitions?state=${c}`, u).href,
            f = new URL(`petitions.json`, u).href,
            p = o(await e(d)),
            m = p(`html`).prop(`lang`) ?? `en`,
            h = (await e(f, { query: { page: 1, state: c } })).data.slice(0, l).map((e) => {
                let n = e.attributes,
                    o = n.action,
                    c = s(a(r, { children: [n.background ? i(`blockquote`, { children: n.background }) : null, n.additional_details ? i(`p`, { children: n.additional_details }) : null] })),
                    l = `parliament.uk-petition-${e.id}`,
                    d = n.creator_name,
                    f = n.departments?.map((e) => ({ url: e.url, type: `related`, content_html: e.name }));
                return {
                    title: o,
                    description: c,
                    pubDate: t(n.created_at),
                    link: new URL(`petitions/${e.id}`, u).href,
                    category: [...new Set([...(n.topics ?? []), ...(n.departments?.map((e) => e.name) ?? [])])].filter(Boolean),
                    author: d,
                    guid: l,
                    id: l,
                    content: { html: c, text: n.background },
                    updated: t(n.updated_at),
                    language: m,
                    _extra: { links: f?.length ? f : void 0 },
                };
            }),
            g = p(`meta[property="og:image"]`).prop(`content`);
        return {
            title: p(`h1.page-title`).text(),
            description: p(`meta[property="twitter:description"]`).prop(`content`),
            link: d,
            item: h,
            allowEmpty: !0,
            image: g,
            author: p(`meta[name="msapplication-tooltip"]`).prop(`content`),
            language: m,
            id: p(`meta[property="og:url"]`).prop(`content`),
        };
    },
    l = {
        path: `/petitions/:state?`,
        name: `Petitions`,
        url: `petition.parliament.uk`,
        maintainers: [`nczitzk`],
        handler: c,
        example: `/parliament.uk/petitions/all`,
        parameters: { state: 'State, `all` by default, see below' },
        description: `::: tip
If you subscribe to [Recent petitions](https://petition.parliament.uk/petitions?state=recent)，where the URL is \`https://petition.parliament.uk/petitions?state=recent\`, use the value of \`state\` as the parameter to fill in. Therefore, the route will be [\`/parliament.uk/petitions/recent\`](https://rsshub.app/parliament.uk/petitions/recent).
:::

<details>
<summary>More states</summary>

| Name                            | ID                |
| ------------------------------- | ----------------- |
| All petitions                   | all               |
| Open petitions                  | open              |
| Recent petitions                | recent            |
| Closed petitions                | closed            |
| Rejected petitions              | rejected          |
| Awaiting government response    | awaiting_response |
| Government responses            | with_response     |
| Awaiting a debate in Parliament | awaiting_debate   |
| Debated in Parliament           | debated           |
| Not debated in Parliament       | not_debated       |

</details>
    `,
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`petition.parliament.uk/petitions`],
                target: (e, t) => {
                    let n = new URL(t).searchParams.get(`state`);
                    return `/parliament.uk/petitions${n ? `/${n}` : ``}`;
                },
            },
            { title: `All petitions`, source: [`petition.parliament.uk/petitions`], target: `/petitions/all` },
            { title: `Open petitions`, source: [`petition.parliament.uk/petitions`], target: `/petitions/open` },
            { title: `Recent petitions`, source: [`petition.parliament.uk/petitions`], target: `/petitions/recent` },
            { title: `Closed petitions`, source: [`petition.parliament.uk/petitions`], target: `/petitions/closed` },
            { title: `Rejected petitions`, source: [`petition.parliament.uk/petitions`], target: `/petitions/rejected` },
            { title: `Awaiting government response`, source: [`petition.parliament.uk/petitions`], target: `/petitions/awaiting_response` },
            { title: `Government responses`, source: [`petition.parliament.uk/petitions`], target: `/petitions/with_response` },
            { title: `Awaiting a debate in Parliament`, source: [`petition.parliament.uk/petitions`], target: `/petitions/awaiting_debate` },
            { title: `Debated in Parliament`, source: [`petition.parliament.uk/petitions`], target: `/petitions/debated` },
            { title: `Not debated in Parliament`, source: [`petition.parliament.uk/petitions`], target: `/petitions/not_debated` },
        ],
        view: n.Articles,
    };
export { c as handler, l as route };
