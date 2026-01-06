import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './utils-DFqNU-x2.mjs';
const t = {
    path: `/user/:name`,
    categories: [`design`],
    example: `/dribbble/user/google`,
    parameters: { name: `username, available in user's homepage URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`dribbble.com/:name`] }],
    name: `User (or team)`,
    maintainers: [`DIYgod`, `loganrockmore`],
    handler: n,
};
async function n(t) {
    let n = t.req.param(`name`),
        r = `https://dribbble.com/${n}`,
        i = `Dribbble - user ${n}`;
    return await e.getData(r, i);
}
export { t as route };
