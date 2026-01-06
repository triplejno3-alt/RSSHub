import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
const t = {
    path: `/watching/:username`,
    name: `User's Watching List`,
    url: `furaffinity.net`,
    categories: [`social-media`],
    example: `/furaffinity/watching/fender`,
    maintainers: [`TigerCubDen`, `SkyNetX007`],
    parameters: { username: `Username, can find in userpage` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`furaffinity.net/watchlist/by/:username`], target: `/watching/:username` }],
    handler: n,
};
async function n(t) {
    let { username: n } = t.req.param(),
        r = await e(`https://faexport.spangle.org.uk/user/${n}/watching.json`, { method: `GET`, headers: { Referer: `https://faexport.spangle.org.uk/` } }),
        i = (await e(`https://faexport.spangle.org.uk/user/${n}.json`, { method: `GET`, headers: { Referer: `https://faexport.spangle.org.uk/` } })).watching.count,
        a = r.map((e) => ({ title: e, link: `https://www.furaffinity.net/user/${e}`, guid: e, description: `${n} is watching ${e} <br> Total: ${i}`, author: e }));
    return { title: `Fur Affinity | Users ${n} is watching`, link: `https://www.furaffinity.net/watchlist/by/${n}/`, description: `Fur Affinity Users ${n} is watching`, item: a };
}
export { t as route };
