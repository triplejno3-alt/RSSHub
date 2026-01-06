import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/blog`,
    categories: [`blog`],
    example: `/backlinko/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`backlinko.com/blog`, `backlinko.com/`] }],
    name: `Blog`,
    maintainers: [`TonyRL`],
    handler: a,
    url: `backlinko.com/blog`,
};
async function a() {
    let i = `https://backlinko.com`,
        { data: a, url: o } = await n(`${i}/blog`),
        s = r(a),
        {
            buildId: c,
            props: { pageProps: l },
        } = JSON.parse(s(`#__NEXT_DATA__`).text()),
        u = [...l.posts.nodes, ...l.backlinkoLockedPosts.nodes].map((e) => ({ title: e.title, link: `${i}/${e.slug}`, pubDate: t(e.modified), author: e.author.node.name, apiUrl: `${i}/_next/data/${c}/${e.slug}.json` })),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.apiUrl);
                    return ((t.description = (e.pageProps.post || e.pageProps.lockedPost).content), t);
                })
            )
        );
    return { title: l.page.seo.title, description: l.page.seo.metaDesc, link: o, language: `en`, item: d };
}
export { i as route };
