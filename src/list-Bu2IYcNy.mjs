import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { t as e } from './api-BlYmvzit.mjs';
import { t } from './utils-DPcqKUMS.mjs';
const n = {
    path: `/list/:id/:routeParams?`,
    categories: [`social-media`],
    example: `/twitter/list/1502570462752219136`,
    parameters: { id: `list id, get from url`, routeParams: `extra parameters, see the table above` },
    features: {
        requireConfig: [
            { name: `TWITTER_AUTH_TOKEN`, description: `Please see above for details.` },
            { name: `TWITTER_THIRD_PARTY_API`, description: `Please see above for details.` },
        ],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `List timeline`,
    maintainers: [`DIYgod`, `xyqfer`, `pseudoyu`],
    handler: r,
    radar: [{ source: [`x.com/i/lists/:id`], target: `/list/:id` }],
};
async function r(n) {
    let r = n.req.param(`id`),
        { count: i, include_rts: a, only_media: o } = t.parseRouteParams(n.req.param(`routeParams`)),
        s = i ? { count: i } : {};
    await e.init();
    let c = await e.getList(r, s);
    return (a || (c = t.excludeRetweet(c)), o && (c = t.keepOnlyMedia(c)), { title: `Twitter List - ${r}`, link: `https://x.com/i/lists/${r}`, item: t.ProcessFeed(n, { data: c }) });
}
export { n as route };
