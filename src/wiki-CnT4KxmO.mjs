import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://github.com`,
    i = {
        path: `/wiki/:user/:repo/:page?`,
        categories: [`programming`],
        example: `/github/wiki/flutter/flutter/Roadmap`,
        parameters: { user: `User / Org name`, repo: `Repo name`, page: `Page slug, can be found in URL, empty means Home` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`github.com/:user/:repo/wiki/:page/_history`, `github.com/:user/:repo/wiki/:page`, `github.com/:user/:repo/wiki/_history`, `github.com/:user/:repo/wiki`], target: `/wiki/:user/:repo/:page` }],
        name: `Wiki History`,
        maintainers: [`TonyRL`],
        handler: a,
    };
async function a(i) {
    let { user: a, repo: o, page: s } = i.req.param(),
        c = `${r}/${a}/${o}/wiki${s ? `/${s}` : ``}/_history`;
    if (!s) {
        let { data: e } = await t(`${r}/${a}/${o}/wiki`);
        c = `${r}${n(e)(`a[href$=_history]`).attr(`href`)}`;
    }
    let { data: l } = await t(c),
        u = n(l),
        d = u(`.js-wiki-history-revision`)
            .toArray()
            .map((t) => ((t = u(t)), { title: t.find(`.h5`).text(), author: t.find(`.mt-1 a`).text(), pubDate: e(t.find(`relative-time`).attr(`datetime`)), link: `${r}${t.find(`.text-mono a`).attr(`href`)}` }));
    return { title: `${u(`.gh-header-title`).text()} - ${a}/${o}`, link: c, item: d };
}
export { i as route };
