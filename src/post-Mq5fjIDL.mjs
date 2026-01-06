import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { c as t, o as n, r, t as i } from './utils-CTyET9-p.mjs';
const a = {
    path: `/user/:username`,
    categories: [`social-media`],
    example: `/fansly/user/AeriGoMoo`,
    parameters: { username: `User ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`fansly.com/:username/posts`, `fansly.com/:username/media`] }],
    name: `User Timeline`,
    maintainers: [`TonyRL`],
    handler: o,
};
async function o(a) {
    let o = await r(a.req.param(`username`)),
        s = await n(o.id),
        c = s.posts.map((n) => ({
            title: n.content.split(`
`)[0],
            description: t(n, s),
            pubDate: e(n.createdAt, `X`),
            link: `${i}/post/${n.id}`,
            author: `${o.displayName ?? o.username} (@${o.username})`,
        }));
    return {
        title: `${o.displayName ?? o.username} (@${o.username}) - Fansly`,
        link: `${i}/${o.username}`,
        description: o.about.replaceAll(
            `
`,
            ` `
        ),
        image: o.banner.locations[0].location,
        icon: o.avatar.locations[0].location,
        logo: o.avatar.locations[0].location,
        language: `en`,
        allowEmpty: !0,
        item: c,
    };
}
export { a as route };
