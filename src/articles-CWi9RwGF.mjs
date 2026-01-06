import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
import i from 'markdown-it';
const a = i({ html: !0, breaks: !0 }),
    o = `https://leetcode.com`,
    s = `${o}/graphql`,
    c = {
        path: `/articles`,
        categories: [`programming`],
        example: `/leetcode/articles`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`leetcode.com/articles`] }],
        name: `Articles`,
        maintainers: [`LogicJake`],
        handler: l,
        url: `leetcode.com/articles`,
    };
async function l() {
    let i = new URL(`/articles/`, o).href,
        c = r(await e(i, { parseResponse: (e) => e })),
        l = c(`a.list-group-item`)
            .toArray()
            .filter((e) => c(e).find(`h4.media-heading i`).length === 0)
            .map((e) => ({ title: c(e).find(`h4.media-heading`).text().trim(), author: c(e).find(`.text-500`).text(), link: new URL(c(e).attr(`href`), o).href, pubDate: c(e).find(`p.pull-right.media-date strong`).text().trim() })),
        u = await Promise.all(
            l.map((r) =>
                t.tryGet(r.link, async () => {
                    let t = r.link.split(`/`)[4],
                        i = await e(s, {
                            method: `POST`,
                            body: {
                                operationName: `questionContent`,
                                variables: { titleSlug: t },
                                query: `query questionContent($titleSlug: String!) {
                                question(titleSlug: $titleSlug) {
                                    content
                                    mysqlSchemas
                                    dataSchemas
                                }
                            }`,
                            },
                        }),
                        o = await e(s, {
                            method: `POST`,
                            body: {
                                operationName: `officialSolution`,
                                variables: { titleSlug: t },
                                query: `query officialSolution($titleSlug: String!) {
                                question(titleSlug: $titleSlug) {
                                    solution {
                                        content
                                    }
                                }
                            }`,
                            },
                        }),
                        c = a.render(o.data.question.solution.content);
                    return ((r.description = (i.data.question.content?.trim() ?? ``) + c), (r.pubDate = n(r.pubDate)), r);
                })
            )
        );
    return { title: c(`head title`).text(), description: c(`meta[property="og:description"]`).attr(`content`), image: `https://assets.leetcode.com/static_assets/public/icons/favicon-192x192.png`, link: i, item: u };
}
export { c as route };
