import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
import { t as i } from './utils-BcWkesqf.mjs';
const a = {
    path: `/tag/:site/:hashtag/:only_media?`,
    categories: [`social-media`],
    view: n.SocialMedia,
    example: `/mastodon/tag/mastodon.social/gochisou/true`,
    parameters: {
        site: 'instance address, only domain, no `http://` or `https://` protocol header',
        hashtag: `Hashtag you want to subscribe to (without the # symbol)`,
        only_media: {
            description: `whether only display media content, default to false, any value to true`,
            options: [
                { value: `true`, label: `true` },
                { value: `false`, label: `false` },
            ],
            default: `false`,
        },
    },
    name: `Hashtag timeline`,
    maintainers: [`yuikisaito`],
    handler: o,
};
async function o(n) {
    let { site: a, hashtag: o } = n.req.param(),
        s = n.req.param(`only_media`) === `true` ? `true` : `false`;
    if (!e.feature.allow_user_supply_unsafe_domain && !i.allowSiteList.includes(a)) throw new r(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);
    let c = `http://${a}/api/v1/timelines/tag/${o}?only_media=${s}`,
        l = (await t.get(c, { headers: i.apiHeaders(a) })).data;
    return { title: `#${o} ${s === `true` ? ` Media` : ``} Timeline on ${a}`, link: `https://${a}`, item: i.parseStatuses(l) };
}
export { a as route };
