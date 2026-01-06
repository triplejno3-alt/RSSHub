import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { t } from './api-BlYmvzit.mjs';
import { t as n } from './utils-DPcqKUMS.mjs';
const r = {
    path: `/keyword/:keyword/:routeParams?`,
    categories: [`social-media`],
    view: e.SocialMedia,
    example: `/twitter/keyword/RSSHub`,
    parameters: { keyword: `keyword`, routeParams: `extra parameters, see the table above` },
    features: {
        requireConfig: [
            { name: `TWITTER_USERNAME`, description: `Please see above for details.` },
            { name: `TWITTER_PASSWORD`, description: `Please see above for details.` },
            { name: `TWITTER_AUTH_TOKEN`, description: `Please see above for details.` },
            { name: `TWITTER_THIRD_PARTY_API`, description: `Please see above for details.` },
        ],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `Keyword`,
    maintainers: [`DIYgod`, `yindaheng98`, `Rongronggg9`, `pseudoyu`],
    handler: i,
    radar: [{ source: [`x.com/search`] }],
};
async function i(e) {
    let r = e.req.param(`keyword`);
    await t.init();
    let i = await t.getSearch(r);
    return { title: `Twitter Keyword - ${r}`, link: `https://x.com/search?q=${encodeURIComponent(r)}`, item: n.ProcessFeed(e, { data: i }), allowEmpty: !0 };
}
export { r as route };
