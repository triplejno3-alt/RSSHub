import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { t } from './utils-BcWkesqf.mjs';
const n = {
    path: `/acct/:acct/statuses/:only_media?`,
    categories: [`social-media`],
    view: e.SocialMedia,
    example: `/mastodon/acct/Mastodon@mastodon.social/statuses`,
    parameters: {
        acct: 'Webfinger account URI, like `user@host`',
        only_media: {
            description: `whether only display media content, default to false, any value to true`,
            options: [
                { value: `true`, label: `true` },
                { value: `false`, label: `false` },
            ],
            default: `false`,
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `User timeline`,
    maintainers: [`notofoe`],
    handler: r,
    description: `Started from Mastodon v4.0.0, the use of the \`search\` API in the route no longer requires a user token.
If the domain of your Webfinger account URI is the same as the API host of the instance (i.e., no delegation called in some other protocols), then no configuration is required and the route is available out of the box.
However, you can still specify these route-specific configurations if you need to override them.`,
};
async function r(e) {
    let n = e.req.param(`acct`),
        r = e.req.param(`only_media`) === `true` ? `true` : `false`,
        { site: i, account_id: a } = await t.getAccountIdByAcct(n),
        { account_data: o, data: s } = await t.getAccountStatuses(i, a, r);
    return { title: `${o.display_name} (@${o.acct})`, link: o.url, description: o.note, item: t.parseStatuses(s), allowEmpty: !0 };
}
export { n as route };
