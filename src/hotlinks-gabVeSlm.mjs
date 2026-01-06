import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { r as n, t as r } from './utils-DrHGekec.mjs';
const i = {
    path: `/hotlinks`,
    categories: [`social-media`],
    example: `/plurk/hotlinks`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`plurk.com/hotlinks`] }],
    name: `Hotlinks`,
    maintainers: [`TonyRL`],
    handler: a,
    url: `plurk.com/hotlinks`,
};
async function a(i) {
    let { data: a } = await t(`${r}/hotlinks/getLinks`, { searchParams: { offset: 0, count: i.req.query(`limit`) ? Number(i.req.query(`limit`)) : 30 } }),
        o = await Promise.all(a.map((t) => n(t.link_url.startsWith(`https://www.plurk.com/p/`) ? t.link_url : `plurk:${t.link_url}`, t, null, e.tryGet)));
    return { title: `Hot Links - Plurk`, image: `https://s.plurk.com/2c1574c02566f3b06e91.png`, link: `${r}/hotlinks`, item: o };
}
export { i as route };
