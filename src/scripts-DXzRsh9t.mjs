import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: [`/:language/:domain?`, `/scripts/sort/:sort/:language?`],
    categories: [`program-update`],
    example: `/greasyfork/en/google.com`,
    parameters: { language: "language, located on the top right corner of Greasy Fork's search page, set to `all` for including all languages", domain: `the script's target domain` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`greasyfork.org/:language`, `greasyfork.org/:language/scripts/by-site/:domain?`] }],
    name: `Script Update`,
    maintainers: [`imlonghao`, `miles170`],
    handler: i,
    description: `| Sort            | Description    |
| --------------- | -------------- |
| today           | Daily installs |
| total_installs | Total installs |
| ratings         | Ratings        |
| created         | Created date   |
| updated         | Updated date   |
| name            | Name           |`,
};
async function i(r) {
    let i = r.req.param(`language`) === `all` ? `zh-CN` : r.req.param(`language`) || `zh-CN`,
        a = r.req.param(`domain`),
        o = r.req.param(`language`) === `all` ? 0 : 1,
        s = r.req.param(`sort`) ?? `updated`,
        c = `https://greasyfork.org/${i}/scripts${a ? `/by-site/${a}` : ``}`,
        l = n((await t({ method: `get`, url: c, searchParams: { filter_locale: o, sort: s } })).data),
        u = l(`.script-list`).find(`article`);
    return {
        title: l(`title`).first().text(),
        link: c,
        description: l(`meta[name=description]`).attr(`content`),
        item: u?.toArray().map((t) => {
            t = l(t);
            let n = t.find(`h2`);
            return {
                title: n.find(`a`).text(),
                description: n.find(`.description`).text(),
                link: new URL(n.find(`a`).attr(`href`), `https://greasyfork.org`).href,
                pubDate: e(t.find(`.script-list-created-date relative-time`).attr(`datetime`)),
                updated: e(t.find(`.script-list-updated-date relative-time`).attr(`datetime`)),
                author: t
                    .find(`.script-list-author a`)
                    .toArray()
                    .map((e) => l(e).text())
                    .join(`, `),
            };
        }),
    };
}
export { r as route };
