import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './logger-_vmdpChp.mjs';
import { t as r } from './cache-DLkCV5c7.mjs';
import { t as i } from './config-not-found-DGyG6Tbz.mjs';
import { i as a, t as o } from './utils-BD0jSsK2.mjs';
const s = {
    path: `/works/:username`,
    categories: [`picture`],
    example: `/skeb/works/@brm2_1925`,
    parameters: { username: `Skeb Username with @` },
    features: {
        requireConfig: [{ name: `SKEB_BEARER_TOKEN`, optional: !1, description: '在瀏覽器開發者工具（F12）的主控台中輸入 `localStorage.getItem("token")` 獲取' }],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
        nsfw: !0,
    },
    name: `Creator Works`,
    maintainers: [`SnowAgar25`],
    handler: c,
    radar: [{ title: `Creator Works`, source: [`skeb.jp/:username`], target: `/works/:username` }],
    description: `Get the latest works of a specific creator on Skeb`,
};
async function c(n) {
    let s = n.req.param(`username`);
    if (!t.skeb || !t.skeb.bearerToken) throw new i(`Skeb works RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let c = `${o}/api/users/${s.replace(`@`, ``)}/works`;
    await u(c);
    let l = await r.tryGet(c, async () => {
        let n = await e(c, {
            retry: 0,
            method: `GET`,
            query: { role: `creator`, sort: `date`, offset: `0` },
            headers: { 'User-Agent': t.ua, Cookie: `request_key=${await r.get(`skeb:request_key`)}`, Authorization: `Bearer ${t.skeb.bearerToken}` },
        });
        if (!n || !Array.isArray(n)) throw Error(`Invalid data received from API`);
        return n.map((e) => a(e)).filter(Boolean);
    });
    return { title: `Skeb - ${s}'s Works`, link: `${o}/${s}`, item: l };
}
function l(e) {
    return typeof e == `object` && !!e && `response` in e && typeof e.response?._data == `string`;
}
async function u(i) {
    if (!(await r.get(`skeb:request_key`)))
        try {
            await e(i, { retry: 0, headers: { 'User-Agent': t.ua, Authorization: `Bearer ${t.skeb.bearerToken}` } });
        } catch (e) {
            if (l(e)) {
                let t = e.response?._data?.match(/request_key=(.*?);/)?.[1];
                t ? (r.set(`skeb:request_key`, t), n.debug(`Retrieved new request_key: ${t}`)) : n.error(`Failed to extract request_key from error response`);
            }
        }
}
export { s as route };
