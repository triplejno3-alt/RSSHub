import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
import { t as i } from './utils-D_mM_QGx.mjs';
const a = {
    path: `/notes/featured/:site`,
    categories: [`social-media`],
    view: n.SocialMedia,
    example: `/misskey/notes/featured/misskey.io`,
    parameters: { site: 'instance address, domain only, without `http://` or `https://` protocol header' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Featured Notes`,
    maintainers: [`Misaka13514`],
    handler: o,
};
async function o(n) {
    let a = n.req.param(`site`);
    if (!e.feature.allow_user_supply_unsafe_domain && !i.allowSiteList.includes(a)) throw new r(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);
    let o = (await t({ method: `post`, url: `https://${a}/api/notes/featured`, json: { limit: 10, offset: 0 } })).data;
    return { title: `Featured Notes on ${a}`, link: `https://${a}/explore`, item: i.parseNotes(o, a) };
}
export { a as route };
