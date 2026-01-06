import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
import { n as i, t as a } from './readable-social--hCfpJhv.mjs';
import { t as o } from './utils-D_mM_QGx.mjs';
import s from 'node:querystring';
const c = {
    path: `/users/notes/:username/:routeParams?`,
    categories: [`social-media`],
    view: t.SocialMedia,
    example: `/misskey/users/notes/support@misskey.io`,
    parameters: {
        username: `Misskey username in the format of username@instance.domain`,
        routeParams: `
| Key               | Description                             | Accepted Values | Default |
| ----------------- | --------------------------------------- | --------------- | ------- |
| withRenotes       | Include renotes in the timeline         | 0/1/true/false  | false   |
| mediaOnly         | Only return posts containing media      | 0/1/true/false  | false   |
| simplifyAuthor    | Simplify author field in feed items     | 0/1/true/false  | false   |

Note: \`withRenotes\` and \`mediaOnly\` are mutually exclusive and cannot both be set to true.

Examples:
- /misskey/users/notes/mttb2ccp@misskey.io/withRenotes=true
- /misskey/users/notes/mttb2ccp@misskey.io/mediaOnly=true`,
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `User timeline`,
    maintainers: [`siygle`, `SnowAgar25`, `HanaokaYuzu`],
    handler: l,
};
async function l(t) {
    let c = t.req.param(`username`),
        [, l, u] = c.match(/@?(\w+)@(\w+\.\w+)/) || [];
    if (!l || !u) throw new n(`Provide a valid Misskey username`);
    if (!e.feature.allow_user_supply_unsafe_domain && !o.allowSiteList.includes(u)) throw new r(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);
    let d = s.parse(t.req.param(`routeParams`)),
        f = a(void 0, i(d.withRenotes), !1),
        p = a(void 0, i(d.mediaOnly), !1),
        m = a(void 0, i(d.simplifyAuthor), !1);
    if (f && p) throw new n(`withRenotes and mediaOnly cannot both be true.`);
    let { accountData: h, avatarUrl: g } = await o.getUserTimelineByUsername(l, u, { withRenotes: f, mediaOnly: p });
    return { title: `User timeline for ${c} on ${u}`, link: `https://${u}/@${l}`, image: g ?? ``, item: o.parseNotes(h, u, m) };
}
export { c as route };
