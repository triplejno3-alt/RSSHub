import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: [`/hazyresearch/blog`],
    categories: [`blog`],
    example: `/stanford/hazyresearch/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`hazyresearch.stanford.edu/blog`] }],
    name: `Hazy Research Blog`,
    maintainers: [`dvorak0`],
    handler: o,
    url: `hazyresearch.stanford.edu/blog`,
};
async function o() {
    let a = `https://hazyresearch.stanford.edu`,
        o = `${a}/blog`,
        { data: s } = await n(o),
        c = i(s)(`script#__NEXT_DATA__`).text(),
        l = JSON.parse(c),
        u = l.props.pageProps.posts || [],
        d = l.buildId,
        f = u.map((e) => ({ title: e.title, link: `${a}/blog/${e.slug}`, api: `${a}/_next/data/${d}/blog/${e.slug}.json`, author: e.author, pubDate: r(t(e.dateString, `MMM D, YYYY`), -7) }));
    return {
        title: `Hazy Research Blog`,
        link: o,
        description: `Research updates from Stanford Hazy Research`,
        language: `en`,
        item: await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link);
                    return ((t.description = i(e)(`main [class^="Post_content"]`).html() || ``), t);
                })
            )
        ),
    };
}
export { a as route };
