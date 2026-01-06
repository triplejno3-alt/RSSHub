import './config-Cc-zZ5p-.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './rss-parser-CKuAfhVS.mjs';
import { t as n } from './description-JiHYizv6.mjs';
const r = { arxiv: (e) => `https://arxiv.org/pdf/${e}.pdf` },
    i = async (i) => {
        let { keyword: a = `query/Detection` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 150,
            s = `https://papers.cool`,
            c = new URL(`arxiv/search?highlight=1&query=${a}&sort=0`, s).href,
            l = new URL(`arxiv/search/feed?query=${a}`, s).href,
            u = a.split(/\//)[0],
            d = new URL(`${u}/kimi?paper=`, s).href,
            f = await t.parseURL(l),
            p = f.items.slice(0, o).map((t) => {
                let i = t.title,
                    a = t.guid,
                    o = t.link?.split(/\//).pop() ?? ``,
                    s = new URL(o, d).href,
                    c = Object.hasOwn(r, u) ? r[u](o) : void 0,
                    l = t.author,
                    f = n({ pdfUrl: c, kimiUrl: s, summary: t.summary });
                return {
                    title: i,
                    description: f,
                    pubDate: e(t.pubDate ?? ``),
                    link: t.link,
                    category: t.categories,
                    author: l,
                    doi: `${u}${o}`,
                    guid: a,
                    id: a,
                    content: { html: f, text: t.content },
                    language: `en`,
                    enclosure_url: c,
                    enclosure_type: `application/pdf`,
                    enclosure_title: i,
                };
            });
        return { title: f.title, description: f.description, link: c, item: p, allowEmpty: !0, image: f.image?.url, language: f.language };
    },
    a = {
        path: `/query/:keyword{.+}?`,
        name: `Topic`,
        url: `papers.cool`,
        maintainers: [`Muyun99`],
        handler: i,
        example: `/papers/query/Detection`,
        parameters: { keyword: `Keyword to search for papers, e.g., Detection, Segmentation, etc.` },
        description: `::: tip
  If you subscibe to [arXiv Paper queryed by Detection](https://papers.cool/arxiv/search?highlight=1&query=Detection), where the URL is \`https://papers.cool/arxiv/search?highlight=1&query=Detection\`, extract the part \`https://papers.cool/\` to the end, and use it as the parameter to fill in. Therefore, the route will be [\`/papers/query/Detection\`](https://rsshub.app/papers/query/Detection).
:::

| Category                                              | id                  |
| ----------------------------------------------------- | ------------------- |
| arXiv Paper queryed by Detection                      | query/Detection     |
| arXiv Paper queryed by Segmentation                   | query/Segmentation  |
  `,
        categories: [`journal`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !0 },
        radar: [{ title: `arXiv Paper queryed by Keyword`, source: [`papers.cool/arxiv/search?highlight=1&query=*&sort=0`], target: `/papers/query/:keyword` }],
    };
export { i as handler, a as route };
