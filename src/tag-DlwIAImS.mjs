import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { a as t, c as n, i as r, n as i, s as a, t as o } from './utils-CTyET9-p.mjs';
const s = {
    path: `/tag/:tag`,
    categories: [`social-media`],
    example: `/fansly/tag/free`,
    parameters: { tag: `Hashtag` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`fansly.com/explore/tag/:tag`] }],
    name: `Hashtag`,
    maintainers: [`TonyRL`],
    handler: c,
};
async function c(s) {
    let c = s.req.param(`tag`),
        l = await t(await r(c)),
        u = l.aggregationData?.posts.map((t) => {
            let r = i(t.accountId, l.aggregationData.accounts);
            return {
                title: t.content.split(`
`)[0],
                description: n(t, l.aggregationData),
                pubDate: e(t.createdAt, `X`),
                link: `${o}/post/${t.id}`,
                author: `${r.displayName ?? r.username} (@${r.username})`,
            };
        });
    return { title: `#${c} - Fansly`, link: `${o}/explore/tag/${c}`, image: a, icon: a, logo: a, language: `en`, item: u };
}
export { s as route };
