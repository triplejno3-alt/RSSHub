import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
import { raw as a } from 'hono/html';
const o = {
    path: `/:id`,
    categories: [`study`],
    example: `/orcid/0000-0002-4731-9700`,
    parameters: { id: `Open Researcher and Contributor ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Works List`,
    maintainers: [`OrangeEd1t`],
    handler: s,
};
async function s(o) {
    let s = o.req.param(`id`),
        c = `https://orcid.org/${s}/worksPage.json?offset=0&sort=date&sortAsc=false&pageSize=20`,
        l = (await e(c)).data.groups,
        u = [],
        d = [];
    for (let e of l) for (let t of e.works) u.push(t);
    return (
        u.map((e) => {
            let o = ``;
            for (let t of e.workExternalIdentifiers)
                o += t.url ? `<a href="` + t.url.value + `">` + t.externalIdentifierType.value + `: ` + t.externalIdentifierId.value + `</a><br>` : t.externalIdentifierType.value + `: ` + t.externalIdentifierId.value + `<br>`;
            let s = {
                title: e.title.value,
                link: e.url,
                description: i(
                    r(t, {
                        children: [
                            n(`h2`, { children: e.title.value }),
                            e.journalTitle?.value ? n(`h3`, { children: e.journalTitle.value }) : null,
                            r(`span`, { children: [[e.publicationDate?.year, e.publicationDate?.month, e.publicationDate?.day].filter(Boolean).join(`-`), ` | `, e.workType.value] }),
                            n(`br`, {}),
                            n(`span`, { children: a(o) }),
                            r(`span`, { children: [`Source: `, e.sourceName] }),
                        ],
                    })
                ),
                guid: e.putCode.value,
            };
            return (d.push(s), s);
        }),
        { title: `ORCID Works List` + s, link: c, item: d }
    );
}
export { o as route };
