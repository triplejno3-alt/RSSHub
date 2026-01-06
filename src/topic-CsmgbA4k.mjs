import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './utils-BUyhh4To.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/topics/:topic`,
    categories: [`traditional-media`],
    example: `/scmp/topics/coronavirus-pandemic-all-stories`,
    parameters: { topic: `Topic, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`scmp.com/topics/:topic`] }],
    name: `Topics`,
    maintainers: [`TonyRL`],
    handler: o,
};
async function o(a) {
    let o = a.req.param(`topic`),
        s = Number.parseInt(a.req.query(`limit`), 10) || 30,
        c = `https://www.scmp.com/topics/${o}`,
        { data: l } = await n(c),
        u = i(l),
        d = JSON.parse(u(`script#__NEXT_DATA__`).text()),
        f = d.props.pageProps.payload.data.topic,
        p = d.props.pageProps.operationDescriptor.root.variables,
        { data: m } = await n(`https://apigw.scmp.com/content-delivery/v2`, {
            headers: { apikey: `MyYvyg8M9RTaevVlcIRhN5yRIqqVssNY`, 'content-type': `application/json` },
            searchParams: {
                extensions: JSON.stringify({ persistedQuery: { sha256Hash: `8c951c1c2d4e94bc37d06dd94571552da4c0440c744acd00f2af84d3d8b6e2cf`, version: 1 } }),
                operationName: `topicContentListPaginationQuery`,
                variables: JSON.stringify({ applicationIds: p.applicationIds, count: s, scmpPlusPaywallTypeIds: p.scmpPlusPaywallTypeIds, id: f.id }),
            },
        }),
        h = m.data.node.contents.edges.map(({ node: e }) => ({
            title: e.headline,
            summary: e.summary.text,
            link: `https://www.scmp.com${e.urlAlias}`,
            author: e.authors.map((e) => e.name).join(`, `),
            pubDate: t(e.publishedDate, `x`),
            updated: t(e.updatedDate, `x`),
        })),
        g = await Promise.all(h.map((t) => e.tryGet(t.link, () => r(t))));
    return (
        a.set(`json`, { nextData: d, apiResponse: m }),
        {
            title: f.name,
            link: c,
            description: f.description.text,
            item: g,
            language: `en-hk`,
            icon: `https://assets.i-scmp.com/static/img/icons/scmp-icon-256x256.png`,
            logo: `https://customerservice.scmp.com/img/logo_scmp@2x.png`,
            image: `https://assets-v2.i-scmp.com/production/_next/static/media/default-image.d1be8967.png`,
        }
    );
}
export { a as route };
