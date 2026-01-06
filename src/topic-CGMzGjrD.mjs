import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = (e) =>
        s(
            a(r, {
                children: [
                    e.image ? a(`figure`, { children: [i(`img`, { src: e.image.url, alt: e.image.alt }), i(`figcaption`, { children: e.image.caption || e.image.credit || e.image.alt })] }) : null,
                    e.body ? i(`p`, { children: c(e.body.html) }) : null,
                    e.heading2 ? a(r, { children: [i(`hr`, {}), i(`h2`, { children: c(e.heading2.html) })] }) : null,
                    e.oembed ? c(e.oembed.html) : null,
                ],
            })
        ),
    u = {
        path: `/topic/:topic/:language?`,
        categories: [`traditional-media`],
        example: `/vice/topic/politics/en`,
        parameters: { topic: `Can be found in the URL`, language: 'defaults to `en`, use the website to discover other codes' },
        radar: [{ source: [`www.vice.com/:language/topic/:topic`], target: `/topic/:topic/:language` }],
        name: `Topic`,
        maintainers: [`K33k0`],
        handler: d,
        url: `vice.com/`,
    };
async function d(r) {
    let { language: i = `en`, topic: a } = r.req.param(),
        s = o(await e(`https://www.vice.com/${i}/topic/${a}`)),
        c = JSON.parse(s(`script#__NEXT_DATA__`).text()).props.pageProps.listPageData.articles.map((e) => ({
            title: e.title,
            link: `https://vice.com${e.url}`,
            pubDate: n(e.publish_date, `x`),
            author: e.contributions.map((e) => e.contributor.full_name).join(`, `),
            description: e.dek,
            category: [...new Set([e.primary_topic.name, ...e.topics.map((e) => e.name)])],
        })),
        u = await Promise.all(
            c.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = o(await e(n.link)),
                        r = JSON.parse(t(`script#__NEXT_DATA__`).text()).props.pageProps.data.articles[0],
                        i = JSON.parse(r.body_components_json);
                    return (
                        (n.description =
                            l({ image: { url: r.thumbnail_url, alt: r.caption, caption: r.caption, credit: r.credit } }) +
                            i
                                .map((e) => {
                                    switch (e.role) {
                                        case `body`:
                                            return l({ body: { html: e.html } });
                                        case `heading2`:
                                            return l({ heading2: { html: e.html } });
                                        case `image`:
                                            return l({ image: { url: e.URL, alt: e.alt, caption: e.caption } });
                                        case `oembed`:
                                        case `tweet`:
                                        case `youtube`:
                                            return l({ oembed: { html: e.oembed.html } });
                                        default:
                                            return ``;
                                    }
                                })
                                .join(``)),
                        n
                    );
                })
            )
        );
    return { title: `VICE | ${a} articles`, link: `https://vice.com/${i}/topic/${a}`, item: u };
}
export { u as route };
