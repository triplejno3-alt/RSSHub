import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './config-not-found-DGyG6Tbz.mjs';
const r = {
    path: `/entry/:feeds/:parameters?`,
    description:
        "\n1. Support to get all content: You can obtain the content of all subscription sources by using keywords such as `/miniflux/all` or `/miniflux/default`.\n2. Support to get the subscription content of a specific subscription source by its ID. Please obtain the subscription source ID on the page where it is located under `Sources` (shortcut keys `g` `f`). The URL for each category (or subscription source) displays its ID information. There are several format options available:\n    1. Support `/miniflux/feed=[feed_id]`, please replace `[feed_id]` with the actual ID of the subscribed feed (note that it should be just a number without brackets).\n    2. Support subscribing to multiple feeds using `/miniflux/feed=[feed1_id]&feed=[feed2_id]` or `/miniflux/feeds=[feed1_id]&[feed2_id]`.\n    3. Additionally, you can use shorthand notation by directly using feed IDs: `/miniflux/[feed1_id]&[feed2_id]`.\n3. Further customization options are available based on your needs:\n    1. All parameters/options provided by MiniFlux are supported ([link](https://miniflux.app/docs/api.html#endpoint-get-feed-entries)). As noted in their documentation, multiple filtering options should be connected with `&`. Except for `status`, only the first occurrence of duplicate filter options will be considered.\n    2. Specifically, this route defaults to sorting entries from new to old (`direction=desc`).\n    3. Moreover, this route supports additional options including:\n        - Using the `feed_name` parameter to control title formatting; setting `feed_name=1` will display each title as \"Article Title | Feed Name,\" while default is set at `0`, showing only article titles.\n        - Utilizing the `mark` parameter to specify actions after fetching subscriptions in RSSHub, such as maintaining unchanged state (`unchanged`, default), marking as read (`read`), removing (`removed`) or marking as unread (`unread`). Note that marking as read should not simply be understood as a means for implementing synchronization services; rather, it functions more like an aid for MiniFlux's automatic cleaning feature.\n        - Future support may include utilizing the `link` parameter to control output URLs (this functionality requires corresponding interfaces from MiniFlux). It could involve generating URLs through MiniFlux entity sharing features or original content links.\n        - The output content quantity can be controlled via the 'limit' parameter; although all matching contents are typically outputted by default, **it is recommended that users set this parameter**.\n    ",
    categories: [`other`],
    example: `/miniflux/feeds=1&2&3/mark=read&limit=7&status=unread`,
    parameters: { feeds: `Subscribe source ID or get all.`, parameters: 'Filter and set parameters, use `&` to connect multiple.' },
    features: {
        requireConfig: [
            { name: `MINIFLUX_INSTANCE`, description: `The instance used by the user, by default, is the official MiniFlux [paid service address](https://reader.miniflux.app)` },
            { name: `MINIFLUX_TOKEN`, description: "User's API key, please log in to the instance used and go to `Settings` -> `API Key` -> `Create a new API key` to obtain." },
        ],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `Feed entry`,
    maintainers: [`emdoe`, `DIYgod`],
    handler: i,
};
async function i(r) {
    let i = `unchanged`,
        a = 0,
        o = 0,
        s = e.miniflux.instance,
        c = e.miniflux.token;
    if (!c) throw new n(`This RSS feed is disabled due to its incorrect configuration: the token is missing.`);
    function l(e) {
        if (e.search(`=`) === -1) return ``;
        let t = e.slice(0, e.indexOf(`=`)),
            n = e.slice(e.lastIndexOf(`=`) + 1);
        switch (t) {
            case `mark`:
                ((n === `read` || n === `removed` || n === `unread`) && !m.length && ((i = n), m.push(1)), (e = ``));
                break;
            case `feed_name`:
                (Number.parseInt(n) === 1 && !h.length && ((a = 1), h.push(1)), (e = ``));
                break;
            case `direction`:
                n !== `asc` && (e = `direction=desc`);
                break;
            case `category`:
                e = Number.isNaN(Number.parseInt(n)) ? `` : `category_id=${n}`;
                break;
            case `order`:
                n !== `id` && n !== `category_title` && n !== `published_at` && n !== `status` && n !== `category_id` && (e = ``);
                break;
            case `limit`:
                (!Number.isNaN(n) && !p.length && ((o = n), p.push(1)), (e = ``));
                break;
            default:
                break;
        }
        return e;
    }
    let u = [],
        d = [],
        f = [],
        p = [],
        m = [],
        h = [],
        g = r.req.param(`feeds`),
        _ = r.req.param(`parameters`);
    (_.search(`direction=`) === -1 && (_ += `&direction=desc`),
        (_ = _.split(`&`)
            .map((e) => l(e))
            .filter(Boolean)
            .join(`&`)));
    let v = r.req.query(`limit`),
        y;
    if (g.search(/feeds?=/g) !== -1 || !Number.isNaN(Number.parseInt(g.split(`&`).join(``)))) {
        let e = [g.replaceAll(/feeds?=/g, ``).split(`&`)].flat();
        if (o && v) {
            if (o < v) v = o * e.length;
            else {
                let t = Number.parseInt(v / e.length);
                t ? (o = t) : ((o = 1), (v = e.length));
            }
            _ += `&limit=${o}`;
        } else if (o) _ += `&limit=${o}`;
        else if (v) {
            let t = Number.parseInt(v / e.length);
            (t ? (o = t) : ((o = 1), (v = e.length)), (_ += `&limit=${o}`));
        }
        await Promise.all(
            e.map(async (e) => {
                let n = (await t({ method: `get`, url: `${s}/v1/feeds/${e}/entries?${_}`, headers: { 'X-Auth-Token': c } })).data.entries,
                    r = 0;
                for (let e of n) {
                    (u.push(e.id), (r ||= (d.push(e.feed.title), 1)));
                    let t = e.title;
                    (a && (t += ` | ${e.feed.title}`), f.push({ title: t, author: e.author, pubDate: e.published_at, description: e.content, link: e.url }));
                }
            })
        );
        let n = d.length,
            r,
            i;
        (n > 2
            ? ((r = `MiniFlux | Aggregator For ${n} Feeds`), (i = `An aggregator powered by MiniFlux and RSSHub. This aggregator truthfully preserves the contents in ${n} feeds, including: <li>${d.join(`<li></li>`)}</li>`))
            : n
              ? ((r = `MiniFlux | ${d.join(`, `)}`), (i = `A RSS feed powered by MiniFlux and RSSHub effortlessly republishes the contents in "${d.join(`" & "`)}".`))
              : ((r = `MiniFlux | Feeds Aggregator`), (i = `An aggregator powered by MiniFlux and RSSHub with empty content. If this is not your intention, please double-check your setting for parameters.`)),
            (y = { title: r, link: s, description: i, item: f, allowEmpty: !0 }));
    } else {
        o && v ? (o < v && (v = o), (_ += `&limit=${v}`)) : v ? (_ += `&limit=${v}`) : o && (_ += `&limit=${o}`);
        let e = (await t.get(`${s}/v1/entries?${_}`, { headers: { 'X-Auth-Token': c } })).data.entries,
            n = [];
        for (let t of e) {
            u.push(t.id);
            let e = t.title;
            (a && (e += ` | ${t.feed.title}`), n.push({ title: e, author: t.author, pubDate: t.published_at, description: t.content, link: t.url }));
        }
        y = { title: `MiniFlux | All`, link: s, description: `All feeds on ${s} powered by MiniFlux`, item: n, allowEmpty: !0 };
    }
    return (i !== `unchanged` && t({ method: `put`, url: `${s}/v1/entries`, headers: { 'Content-Type': `application/json`, 'X-Auth-Token': c }, json: { entry_ids: u, status: i } }), y);
}
export { r as route };
