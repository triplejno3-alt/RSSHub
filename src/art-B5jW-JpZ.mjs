import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
const t = {
    path: `/art/:folder/:username/:mode?`,
    name: `Gallery`,
    url: `furaffinity.net`,
    categories: [`social-media`],
    example: `/furaffinity/art/gallery/fender/nsfw`,
    maintainers: [`TigerCubDen`, `SkyNetX007`],
    parameters: { username: `Username, can find in userpage`, folder: `Image folders, options are gallery, scraps, favorites`, mode: `R18 content toggle, default value is sfw, options are sfw, nsfw` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [
        { source: [`furaffinity.net/gallery/:username`], target: `/gallery/:username` },
        { source: [`furaffinity.net/scraps/:username`], target: `/scraps/:username` },
        { source: [`furaffinity.net/favorites/:username`], target: `/favorites/:username` },
    ],
    handler: n,
};
async function n(t) {
    let { username: n, folder: r = `gallery`, mode: i = `sfw` } = t.req.param(),
        a = `https://faexport.spangle.org.uk/user/${n}/${r}.json?sfw=1&full=1`;
    i === `nsfw` && (a = `https://faexport.spangle.org.uk/user/${n}/${r}.json?full=1`);
    let o = await e(a, { method: `GET`, headers: { Referer: `https://faexport.spangle.org.uk/` } }),
        s;
    switch (r) {
        case `gallery`:
            s = `Gallery`;
            break;
        case `scraps`:
            s = `Scraps`;
            break;
        case `favorites`:
            s = `Favorites`;
            break;
        default:
            s = `Gallery`;
    }
    let c = o.map((e) => ({ title: e.title, link: e.link, guid: e.id, description: `<img src="${e.thumbnail}">`, author: e.name }));
    return { allowEmpty: !0, title: `Fur Affinity | ${s} of ${n}`, link: `https://www.furaffinity.net/${r}/${n}`, description: `Fur Affinity ${s} of ${n}`, item: c };
}
export { t as route };
