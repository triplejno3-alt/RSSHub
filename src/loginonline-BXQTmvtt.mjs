import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/loginonline`,
    categories: [`journal`],
    example: `/usenix/loginonline`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`usenix.org/publications/loginonline`, `usenix.org/publications`, `usenix.org/`] }],
    name: `;login:`,
    maintainers: [`wu-yufei`],
    handler: a,
};
async function a() {
    let i = `https://www.usenix.org`,
        { data: a } = await n(`${i}/publications/loginonline`),
        o = r(a),
        s = o(`div.views-row`)
            .toArray()
            .map(
                (e) => (
                    (e = o(e)),
                    {
                        title: e.find(`.views-field-title`).text().trim(),
                        link: `${i}${e.find(`a`).attr(`href`)}`,
                        pubDate: t(e.find(`.views-field-field-lv2-publication-date`).text()),
                        author: e.find(`.views-field-pseudo-author-list`).text().trim().replace(`Authors: `, ``),
                    }
                )
            ),
        c = await Promise.all(
            s.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link);
                    return ((t.description = r(e)(`.group-article-body-wrapper`).html()), t);
                })
            )
        );
    return { title: `USENIX ;login:`, link: `${i}/publications/loginonline`, description: `An open access publication driven by the USENIX community`, item: c };
}
export { i as route };
