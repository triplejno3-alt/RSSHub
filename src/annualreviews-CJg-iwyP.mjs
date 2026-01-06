import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:id`,
    categories: [`journal`],
    example: `/annualreviews/anchem`,
    parameters: { id: `Journal id, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !0 },
    radar: [{ source: [`annualreviews.org/journal/:id`, `annualreviews.org/`] }],
    name: `Journal`,
    maintainers: [`nczitzk`],
    handler: a,
    description:
        'The URL of the journal [Annual Review of Analytical Chemistry](https://www.annualreviews.org/journal/anchem) is `https://www.annualreviews.org/journal/anchem`, where `anchem` is the id of the journal, so the route for this journal is `/annualreviews/anchem`.\n\n::: tip\n  More jounals can be found in [Browse Journals](https://www.annualreviews.org/action/showPublications).\n:::',
};
async function a(i) {
    let a = i.req.param(`id`),
        o = `https://www.annualreviews.org`,
        s = `${o}/r/${a}_rss`,
        c = `${o}/toc/${a}/current`,
        l = r((await n({ method: `get`, url: s })).data),
        u = l(`entry`)
            .toArray()
            .map((e) => {
                e = l(e);
                let n = e.find(`id`).text().split(`doi=`).pop();
                return {
                    doi: n,
                    guid: n,
                    title: e.find(`title`).text(),
                    link: e.find(`link`).attr(`href`).split(`?`)[0],
                    description: e.find(`content`).text(),
                    pubDate: t(e.find(`published`).text()),
                    author: e
                        .find(`author name`)
                        .toArray()
                        .map((e) => l(e).text())
                        .join(`, `),
                };
            });
    return (
        (u = await Promise.all(u.map((t) => e.tryGet(t.guid, async () => ((t.description = (await n({ method: `get`, url: `https://api.crossref.org/works/${t.doi}` })).data.message.abstract.replaceAll(`jats:p>`, `p>`)), t))))),
        {
            title: l(`title`)
                .first()
                .text()
                .replace(/: Table of Contents/, ``),
            description: l(`subtitle`).first().text(),
            link: c,
            item: u,
            language: l(`html`).attr(`lang`),
        }
    );
}
export { i as route };
