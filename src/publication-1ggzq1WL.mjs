import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { i as n, n as r, r as i, t as a } from './utils-d1vF_dke.mjs';
const o = {
    path: `/publication/:id`,
    categories: [`social-media`],
    example: `/vocus/publication/bass`,
    parameters: { id: `出版專題 id，可在出版專題主页的 URL 找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`vocus.cc/:id/home`, `vocus.cc/:id/introduce`] }],
    name: `出版專題`,
    maintainers: [`Maecenas`],
    handler: s,
};
async function s(o) {
    let s = o.req.param(`id`),
        c = `${i}/${s}/home`,
        l = await e.tryGet(`vocus:publication:${s}`, async () => {
            let { data: e } = await t(`${r}/api/publication/${s}`, { headers: { referer: c } });
            return { _id: e._id, title: e.title, abstract: e.abstract };
        }),
        {
            data: { articles: u },
        } = await t(`${r}/api/articles`, { headers: { referer: c }, searchParams: { publicationId: l._id } }),
        d = await a(n(u), e.tryGet);
    return { title: `${l.title} - 文章列表｜方格子 vocus`, link: c, description: l.abstract, item: d };
}
export { o as route };
