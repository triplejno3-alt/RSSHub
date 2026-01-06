import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = (e, t = 30) => {
        let n = new URLSearchParams(e);
        return (n.set(`offset`, `0`), n.set(`limit`, t.toString()), n);
    },
    a = (e) => {
        let t = {};
        for (let [n, r] of e.entries()) t[n] = r;
        return t;
    },
    o = async (n) => {
        let { filters: o } = n.req.param(),
            s = Number.parseInt(n.req.query(`limit`) ?? `30`, 10),
            c = i(o, s),
            l = `https://digitalpolicyalert.org`,
            u = new URL(`activity-tracker?${c.toString()}`, l).href,
            d = new URL(`dpa/intervention`, `https://api.globaltradealert.org`).href,
            f = await e(d, { query: a(c) }),
            p = r(await e(u)),
            m = p(`html`).attr(`lang`) ?? `en`,
            h = [];
        return (
            (h = f.results.slice(0, s).map((e) => {
                let n = e.title,
                    r = e.latest_event?.description ?? void 0,
                    i = e.latest_event?.date,
                    a = e.slug ? `change/${e.slug}` : void 0,
                    o = [...new Set([...(e.economic_activities?.map((e) => e.name) ?? []), ...(e.implementers?.map((e) => e.name) ?? []), ...(e.policies?.map((e) => e.name) ?? []), e.status?.name, e.type?.name])].filter(Boolean),
                    s = e.implementers?.map((e) => ({ name: e.name, url: void 0, avatar: void 0 })) ?? void 0,
                    c = i;
                return { title: n, description: r, pubDate: i ? t(i) : void 0, link: a ? new URL(a, l).href : void 0, category: o, author: s, content: { html: r, text: r }, updated: c ? t(c) : void 0, language: m };
            })),
            {
                title: p(`title`).text(),
                description: p(`meta[property="og:description"]`).attr(`content`),
                link: u,
                item: h,
                allowEmpty: !0,
                image: p(`meta[property="og:image"]`).attr(`content`) ? new URL(p(`meta[property="og:image"]`).attr(`content`), l).href : void 0,
                author: p(`meta[property="og:site_name"]`).attr(`content`),
                language: m,
                id: p(`meta[property="og:url"]`).attr(`content`),
            }
        );
    },
    s = {
        path: `/activity-tracker/:filters?`,
        name: `Activity Tracker`,
        url: `digitalpolicyalert.org`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/digitalpolicyalert/activity-tracker`,
        parameters: { filter: { description: `Filter, all by default` } },
        description:
            '::: tip\nTo subscribe to [Activity Tracker - International trade](https://digitalpolicyalert.org/activity-tracker?policy=1), where the source URL is `https://digitalpolicyalert.org/activity-tracker?policy=1`, extract the certain parts from this URL to be used as parameters, resulting in the route as [`/digitalpolicyalert/activity-tracker/policy=1`](https://rsshub.app/digitalpolicyalert/activity-tracker/policy=1).\n:::\n',
        categories: [`other`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`digitalpolicyalert.org`],
                target: (e, t) => {
                    let n = i(new URL(t).searchParams.toString()).toString();
                    return `/digitalpolicyalert/activity-tracker${n ? `/${n}` : ``}`;
                },
            },
        ],
        view: n.Articles,
    };
export { o as handler, s as route };
