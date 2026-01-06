import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
const t = {
    path: `/journals/:username`,
    name: `Journals`,
    url: `furaffinity.net`,
    categories: [`social-media`],
    example: `/furaffinity/journals/fender`,
    maintainers: [`TigerCubDen`, `SkyNetX007`],
    parameters: { username: `Username, can find in userpage` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`furaffinity.net/journals/:username`], target: `/journals/:username` }],
    handler: n,
};
async function n(t) {
    let { username: n } = t.req.param(),
        r = (await e(`https://faexport.spangle.org.uk/user/${n}/journals.json?full=1`, { method: `GET`, headers: { Referer: `https://faexport.spangle.org.uk/` } })).map((e) => ({
            title: e.title,
            link: e.link,
            guid: e.id,
            description: e.description,
            pubDate: new Date(e.posted_at).toUTCString(),
            author: n,
        }));
    return { allowEmpty: !0, title: `Fur Affinity | ${n}'s Journals`, link: `https://www.furaffinity.net/journals/${n}`, description: `Fur Affinity ${n}'s Journals`, item: r };
}
export { t as route };
