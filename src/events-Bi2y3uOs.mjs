import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = (e) => {
        let t = {};
        if (!e) return t;
        let n = e.split(`&`);
        for (let e of n) {
            let [n, r] = e.split(`=`);
            t[n] = r;
        }
        return t;
    },
    r = {
        path: `/events/:filter?`,
        name: `Events`,
        url: `app.questn.com`,
        maintainers: [`cxheng315`],
        example: `/questn/events`,
        parameters: { filter: `Filter string` },
        description: `
::: tip

Filter parameters:
- category: 100: trending, 200: newest, 300: top
- status_filter: 0: all, 100: available, 400: missed
- community_filter: 0: all community, 100: verified, 200: followed
- rewards_filter: 0: all rewards, 100: nft, 200: token, 400: whitelist
- chain_filter: 0: all chains, 1: ethereum, 56: bsc, 137: polygon, 42161: arb, 10: op, 324: zksync, 43114: avax
- search: 'Search keyword',
- count: 'Number of events to fetch',
- page: 'Page number',
:::`,
        categories: [`other`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`app.questn.com/explore`], target: `/events/:category?/:status_filter?/:community_filter?/:reward_filter?/:chain_filter?/:search?/:count?/:page?` }],
        handler: i,
    };
async function i(r) {
    let i = n(r.req.param(`filter`)),
        a = {
            category: i.category || `200`,
            status_filter: i.status_filter || `100`,
            community_filter: i.community_filter || `0`,
            rewards_filter: i.reward_filter || `0`,
            chain_filter: i.chain_filter || `0`,
            search: i.search || ``,
            count: i.count || r.req.query(`limit`) || `20`,
            page: i.page || `1`,
        },
        o = (await (await e(`https://api.questn.com/consumer/explore/list/?${new URLSearchParams(a)}`, { method: `GET`, headers: { 'Content-Type': `application/json` } })).result.data).map((e) => ({
            title: e.title,
            link: `https://app.questn.com/quest/${e.id}`,
            author: e.community_info ? e.community_info.name : ``,
            guid: e.id,
            pubDate: t(e.start_time * 1e3),
            itunes_duration: e.end_time > 0 ? e.end_time - e.start_time : 0,
        }));
    return {
        title: `QuestN Events`,
        link: `https://app.questn.com/explore`,
        description: `A Quest Protocol Dedicated to DePIN and AI Training`,
        image: `https://app.questn.com/static/svgs/logo-white.svg`,
        logo: `https://app.questn.com/static/svgs/logo-white.svg`,
        author: `QuestN`,
        item: o && o.length > 0 ? o : [{ title: `No events found`, description: `No events found`, link: `https://app.questn.com/explore` }],
    };
}
export { r as route };
