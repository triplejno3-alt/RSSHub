import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
const t = {
    path: `/submission-comments/:id`,
    name: `Submission Comments`,
    url: `furaffinity.net`,
    categories: [`social-media`],
    example: `/furaffinity/submission-comments/24259751`,
    maintainers: [`TigerCubDen`, `SkyNetX007`],
    parameters: { id: `Submission ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`furaffinity.net/view/:id`], target: `/submission-comments/:id` }],
    handler: n,
};
async function n(t) {
    let { id: n } = t.req.param(),
        r = `https://faexport.spangle.org.uk/submission/${n}.json`,
        i = `https://faexport.spangle.org.uk/submission/${n}/comments.json`,
        a = await e(r, { method: `GET`, headers: { Referer: `https://faexport.spangle.org.uk/` } }),
        o = (await e(i, { method: `GET`, headers: { Referer: `https://faexport.spangle.org.uk/` } })).map((e) => ({
            title: e.text,
            link: `https://www.furaffinity.net/view/${n}`,
            guid: e.id,
            description: `<img src="${e.avatar}"> <br> ${e.name}: ${e.text}`,
            pubDate: new Date(e.posted_at).toUTCString(),
            author: e.name,
        }));
    return { allowEmpty: !0, title: `${a.title} - ${a.name} | Submission Comments`, link: `https://www.furaffinity.net/view/${n}`, description: `Fur Affinity | ${a.title} by ${a.name} - Submission Comments`, item: o };
}
export { t as route };
