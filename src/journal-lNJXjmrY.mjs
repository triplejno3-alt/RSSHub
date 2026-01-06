import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
    path: `/journal/:id/:category?`,
    categories: [`journal`],
    example: `/rsc/journal/ta`,
    parameters: { id: `Journal id, can be found in URL`, category: `Category, see below, All Recent Articles by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Journal`,
    maintainers: [`nczitzk`],
    handler: c,
    description: `::: tip
  All journals at [Current journals](https://pubs.rsc.org/en/journals)
:::

| All Recent Articles | Advance Articles |
| ------------------- | ---------------- |
| allrecentarticles   | advancearticles  |`,
};
async function c(s) {
    let { id: c, category: l = `allrecentarticles` } = s.req.param(),
        u = s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`), 10) : 50,
        d = `https://pubs.rsc.org`,
        f = new URL(`en/journals/journalissues/${c}#!recentarticles`, d).href,
        p = new URL(`en/journals/getrecentarticles`, d).href,
        { data: m } = await n.post(p, { form: { name: c, pageno: 1, iscontentavailable: !0, category: l } }),
        h = a(m);
    h(`div.capsule__article-image`).each(function () {
        let e = h(this).find(`img`).prop(`data-original`);
        h(this).replaceWith(o(e ? i(`figure`, { children: i(`img`, { src: e }) }) : null));
    });
    let g = h(`div.capsule--article`)
        .slice(0, u)
        .toArray()
        .map((e) => {
            e = h(e);
            let n = e.find(`div.article__authors`).text().trim(),
                i = e.find(`div.text--small span a`).text().split(/org\//).pop(),
                a = !!e.find(`span.capsule__context img.ver-t`).prop(`alt`),
                o = !!e.find(`span.capsule__context span`).text(),
                s = new URL(e.find(`div.capsule__action--buttons a`).prop(`href`).split(`?`).pop(), d).href;
            return {
                title: e.find(`h3.capsule__title`).text(),
                link: new URL(e.find(`a.capsule__action`).prop(`href`), d).href,
                description: e.find(`div.capsule__column-wrapper`).html(),
                author: n,
                category: [e.find(`span.capsule__context`).text().trim(), ...n.split(/,\s|and\s/), a || o],
                guid: `rsc-${i}`,
                pubDate: r(t(e.find(`div.text--small span.block`).text().split(/on\s/).pop(), `DD MMM YYYY`), 1),
                enclosure_url: s,
                enclosure_type: s ? `application/pdf` : void 0,
                doi: i,
            };
        });
    g = await Promise.all(
        g.map((i) =>
            e.tryGet(i.guid, async () => {
                if (i.category.pop()) {
                    let { data: e } = await n(i.link.replace(/\/articlelanding\//, `/articlehtml/`)),
                        o = a(e);
                    (o(`#pnlArticleAccess, #pnlArticleContent`).remove(),
                        o(`div.abstract, div.article-abstract__heading`).prevAll().remove(),
                        (i.title = o(`meta[name="DC.title"]`).prop(`content`)),
                        (i.description = o(`#wrapper, article.article-control`).html()),
                        (i.pubDate = r(t(o(`meta[name="citation_online_date"]`).prop(`content`), `YYYY/MM/DD`), 1)),
                        (i.enclosure_url = o(`meta[name="citation_pdf_url"]`).prop(`content`)),
                        (i.enclosure_type = i.enclosure_url ? `application/pdf` : void 0),
                        (i.doi = o(`meta[name="DC.Identifier"]`).prop(`content`)));
                }
                return i;
            })
        )
    );
    let { data: _ } = await n(f);
    h = a(_);
    let v = new URL(h(`link[rel="apple-touch-icon"]`).prop(`href`), d).href;
    return {
        item: g,
        title: h(`meta[name="citation_title"]`).prop(`content`),
        link: f,
        description: h(`meta[property="og:description"]`).prop(`content`),
        language: `en`,
        image: new URL(h(`div.page-head__cell--image span img`).prop(`src`), d).href,
        icon: v,
        logo: v,
        subtitle: h(`title`).text(),
        author: h(`meta[name="citation_journal_abbrev"]`).prop(`content`),
        allowEmpty: !0,
    };
}
export { s as route };
