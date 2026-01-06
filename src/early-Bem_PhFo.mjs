import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n } from './puppeteer-BbZGb8cd.mjs';
import { n as r, r as i, t as a } from './utils-BYK5ZCkV.mjs';
import { load as o } from 'cheerio';
const s = {
    path: `/early/:journal?`,
    categories: [`journal`],
    example: `/science/early`,
    parameters: { journal: `Short name for a journal` },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !0 },
    radar: [{ source: [`science.org/journal/:journal`, `science.org/toc/:journal/0/0`], target: `/early/:journal` }],
    name: `First Release`,
    maintainers: [`y9c`, `TonyRL`],
    handler: c,
    description: `*only Science, Science Immunology and Science Translational Medicine have first release*`,
};
async function c(s) {
    let { journal: c = `science` } = s.req.param(),
        l = `${a}/toc/${c}/0/0`,
        { data: u } = await t(l, { headers: { cookie: `cookiePolicy=iaccept;` } }),
        d = o(u),
        f = d(`.card-content .card-header`)
            .toArray()
            .map((e) => i(e, d)),
        p = await n(),
        m = await r(f, p, e.tryGet);
    return (await p.close(), { title: d(`head title`).text(), description: d(`.body02`).text().trim(), image: `${a}/apple-touch-icon.png`, link: l, language: `en-US`, item: m });
}
export { s as route };
