import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { t as a } from './config-not-found-DGyG6Tbz.mjs';
import o from 'markdown-it';
const s = o({ html: !0 }),
    c = {
        path: `/:community/:sort?`,
        categories: [`social-media`],
        example: `/lemmy/technology@lemmy.world/Hot`,
        parameters: {
            community: `Lemmmy community, for example technology@lemmy.world`,
            sort: {
                description: `Sort by`,
                options: [
                    { value: `Active`, label: `Active` },
                    { value: `Hot`, label: `Hot` },
                    { value: `New`, label: `New` },
                    { value: `Old`, label: `Old` },
                    { value: `TopDay`, label: `TopDay` },
                    { value: `TopWeek`, label: `TopWeek` },
                    { value: `TopMonth`, label: `TopMonth` },
                    { value: `TopYear`, label: `TopYear` },
                    { value: `TopAll`, label: `TopAll` },
                    { value: `MostComments`, label: `MostComments` },
                    { value: `NewComments`, label: `NewComments` },
                    { value: `TopHour`, label: `TopHour` },
                    { value: `TopSixHour`, label: `TopSixHour` },
                    { value: `TopTwelveHour`, label: `TopTwelveHour` },
                    { value: `TopThreeMonths`, label: `TopThreeMonths` },
                    { value: `TopSixMonths`, label: `TopSixMonths` },
                    { value: `TopNineMonths`, label: `TopNineMonths` },
                    { value: `Controversial`, label: `Controversial` },
                    { value: `Scaled`, label: `Scaled` },
                ],
                default: `Active`,
            },
        },
        features: { requireConfig: [{ name: `ALLOW_USER_SUPPLY_UNSAFE_DOMAIN`, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Community`,
        maintainers: [`wb14123`, `pseudoyu`],
        handler: l,
    };
async function l(o) {
    let c = o.req.param(`sort`) ?? `Active`,
        l = o.req.param(`community`);
    if (l.split(`@`).length !== 2) throw new i(`Invalid community: ${l}`);
    let u = l.split(`@`)[1];
    if (
        !e.feature.allow_user_supply_unsafe_domain &&
        ![`lemmy.world`, `lemm.ee`, `lemmy.ml`, `sh.itjust.works`, `feddit.de`, `hexbear.net`, `beehaw.org`, `lemmynsfw.com`, `lemmy.ca`, `programming.dev`].includes(new URL(`http://${u}/`).hostname)
    )
        throw new a(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);
    let d = `https://${u}/api/v3/community?name=${l}`,
        f = await t.tryGet(d, async () => (await r({ method: `get`, url: d, headers: { 'Content-Type': `application/json` } })).data.community_view.community),
        p = `https://${u}/api/v3/post/list?type_=All&sort=${c}&community_name=${l}&limit=50`,
        m = (await t.tryGet(p, async () => (await r({ method: `get`, url: p, headers: { 'Content-Type': `application/json` } })).data, e.cache.routeExpire, !1)).posts.map((e) => {
            let t = e.post,
                r = e.creator,
                i = e.counts,
                a = { title: t.name, author: r.name, pubDate: n(t.published), link: t.ap_id, description: ``, comments: 0, upvotes: 0, downvotes: 0 },
                o = t.url;
            return ((a.description = (o ? `<p><a href="${o}">${o}</a></p>` : ``) + (t.body ? s.render(t.body) : ``)), (a.comments = i.comments), (a.upvotes = i.upvotes), (a.downvotes = i.downvotes), a);
        });
    return { title: `${l} - ${c} posts`, description: f.description, link: f.actor_id, item: m };
}
export { c as route };
