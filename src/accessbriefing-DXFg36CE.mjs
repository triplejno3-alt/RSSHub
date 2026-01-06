import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = ({ images: e, intro: t, description: n }) =>
        a(r, { children: [e?.length ? e.map((e) => (e?.src ? i(`figure`, { children: i(`img`, { alt: e.height ?? e.width ?? e.alt, src: e.src }) }) : null)) : null, t ? i(`blockquote`, { children: t }) : null, n ? c(n) : null] }),
    u = (e) => s(i(l, { ...e })),
    d = async (r) => {
        let { category: i = `latest/news` } = r.req.param(),
            a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 30,
            s = `https://www.accessbriefing.com`,
            c = new URL(i, s).href,
            l = new URL(`Ajax/GetPagedArticles`, s).href,
            { data: d } = await n(c),
            f = d.match(/'BrandID':\s(\d+)/)?.[1] ?? `32`,
            { data: p } = await n(l, { searchParams: { navcontentid: d.match(/'MoreID':\s(\d+)/)?.[1] ?? `9282`, brandid: f, page: 0, lastpage: 0, pagesize: a } }),
            m = o(d),
            h = m(`html`).prop(`lang`),
            g = p.slice(0, a).map((e) => {
                let n = e.Article_Headline,
                    r = new URL(e.Image, s).href,
                    i = u({ images: r ? [{ src: r, alt: n }] : void 0, intro: e.Article_Intro_Plaintext }),
                    a = `accessbriefing-${e.Article_ID}`;
                return {
                    title: n,
                    description: i,
                    pubDate: t(e.Article_PublishedDate),
                    link: new URL(e.URL, s).href,
                    author: e.Authors.join(`/`),
                    guid: a,
                    id: a,
                    content: { html: i, text: e.Article_Intro_Plaintext },
                    image: r,
                    banner: r,
                    language: h,
                };
            });
        g = await Promise.all(
            g.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link),
                        r = o(e),
                        i = r(`h1.khl-article-page-title`).text(),
                        a = t.description + u({ description: r(`div.khl-article-page-storybody`).html() });
                    return (
                        (t.title = i),
                        (t.description = a),
                        (t.category = r(`a.badge[data-id]`)
                            .toArray()
                            .map((e) => r(e).text())),
                        (t.author = r(`div.authorDetails a span b`).text()),
                        (t.content = { html: a, text: r(`div.khl-article-page-storybody`).text() }),
                        (t.language = h),
                        t
                    );
                })
            )
        );
        let _ = new URL(m(`a.navbar-brand img`).prop(`src`), s).href;
        return { title: m(`title`).text(), description: m(`meta[property="og:description"]`).prop(`content`), link: c, item: g, allowEmpty: !0, image: _, author: m(`meta[property="og:site_name"]`).prop(`content`), language: h };
    },
    f = {
        path: `/:category{.+}?`,
        name: `Articles`,
        url: `accessbriefing.com`,
        maintainers: [`nczitzk`],
        handler: d,
        example: `/accessbriefing/latest/news`,
        parameters: { category: `Category, Latest News by default` },
        description: `::: tip
  If you subscribe to [Latest News](https://www.accessbriefing.com/latest/news)，where the URL is \`https://www.accessbriefing.com/latest/news\`, extract the part \`https://www.accessbriefing.com/\` to the end, and use it as the parameter to fill in. Therefore, the route will be [\`/accessbriefing/latest/news\`](https://rsshub.app/accessbriefing/latest/news).
:::

#### Latest

| Category                                                                               | ID                                                                                              |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [News](https://www.accessbriefing.com/latest/news)                                     | [latest/news](https://rsshub.app/target/site/latest/news)                                       |
| [Products & Technology](https://www.accessbriefing.com/latest/products-and-technology) | [latest/products-and-technology](https://rsshub.app/target/site/latest/products-and-technology) |
| [Rental News](https://www.accessbriefing.com/latest/rental-news)                       | [latest/rental-news](https://rsshub.app/target/site/latest/rental-news)                         |
| [People](https://www.accessbriefing.com/latest/people)                                 | [latest/people](https://rsshub.app/target/site/latest/people)                                   |
| [Regualtions & Safety](https://www.accessbriefing.com/latest/regualtions-safety)       | [latest/regualtions-safety](https://rsshub.app/target/site/latest/regualtions-safety)           |
| [Finance](https://www.accessbriefing.com/latest/finance)                               | [latest/finance](https://rsshub.app/target/site/latest/finance)                                 |
| [Sustainability](https://www.accessbriefing.com/latest/sustainability)                 | [latest/sustainability](https://rsshub.app/target/site/latest/sustainability)                   |

#### Insight

| Category                                                                          | ID                                                                                        |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Interviews](https://www.accessbriefing.com/insight/interviews)                   | [insight/interviews](https://rsshub.app/target/site/insight/interviews)                   |
| [Longer reads](https://www.accessbriefing.com/insight/longer-reads)               | [insight/longer-reads](https://rsshub.app/target/site/insight/longer-reads)               |
| [Videos and podcasts](https://www.accessbriefing.com/insight/videos-and-podcasts) | [insight/videos-and-podcasts](https://rsshub.app/target/site/insight/videos-and-podcasts) |
  `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`accessbriefing.com/:category*`], target: `/:category` },
            { title: `Latest - News`, source: [`accessbriefing.com/latest/news`], target: `/latest/news` },
            { title: `Latest - Products & Technology`, source: [`accessbriefing.com/latest/products-and-technology`], target: `/latest/products-and-technology` },
            { title: `Latest - Rental News`, source: [`accessbriefing.com/latest/rental-news`], target: `/latest/rental-news` },
            { title: `Latest - People`, source: [`accessbriefing.com/latest/people`], target: `/latest/people` },
            { title: `Latest - Regualtions & Safety`, source: [`accessbriefing.com/latest/regualtions-safety`], target: `/latest/regualtions-safety` },
            { title: `Latest - Finance`, source: [`accessbriefing.com/latest/finance`], target: `/latest/finance` },
            { title: `Latest - Sustainability`, source: [`accessbriefing.com/latest/sustainability`], target: `/latest/sustainability` },
            { title: `Insight - Interviews`, source: [`accessbriefing.com/insight/interviews`], target: `/insight/interviews` },
            { title: `Insight - Longer reads`, source: [`accessbriefing.com/insight/longer-reads`], target: `/insight/longer-reads` },
            { title: `Insight - Videos and podcasts`, source: [`accessbriefing.com/insight/videos-and-podcasts`], target: `/insight/videos-and-podcasts` },
        ],
    };
export { d as handler, f as route };
