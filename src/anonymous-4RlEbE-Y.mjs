import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { r as n, t as r } from './utils-DrHGekec.mjs';
const i = {
    path: `/anonymous`,
    categories: [`social-media`],
    example: `/plurk/anonymous`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`plurk.com/anonymous`] }],
    name: `Anonymous`,
    maintainers: [`TonyRL`],
    handler: a,
    url: `plurk.com/anonymous`,
};
async function a(i) {
    let { data: a } = await t(`${r}/Stats/getAnonymousPlurks`, { searchParams: { offset: 0, limit: i.req.query(`limit`) ? Number(i.req.query(`limit`)) : 200 } });
    (delete a.pids, delete a.count);
    let o = await Promise.all(Object.values(a).map((t) => n(`plurk:${t.plurk_id}`, t, `ಠ_ಠ`, e.tryGet)));
    return { title: `Anonymous - Plurk`, image: `https://s.plurk.com/2c1574c02566f3b06e91.png`, link: `${r}/anonymous`, item: o };
}
export { i as route };
