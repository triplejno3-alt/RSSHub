import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { i as n } from './common-utils-uYpL50sT.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:region/:eventType?/:includePromoted?`,
    categories: [`other`],
    example: `/eventbrite/canada--toronto/all-events`,
    parameters: { eventType: `category of events for filtering`, region: `Region or scope of events` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [
        { source: [`eventbrite.com/d/:region/:eventType`], target: `/:region/:eventType` },
        { source: [`eventbrite.ca/d/:region/:eventType`], target: `/:region/:eventType` },
    ],
    name: `Events`,
    maintainers: [`elibroftw`],
    handler: async (i) => {
        let c = i.req.param(),
            { region: l, includePromoted: u = `false` } = c,
            d = c.eventType || `all-events`;
        d === `events` && (d = `all-events`);
        let f = `https://www.eventbrite.com/d/${l}/${d}/`,
            p = r(await e(f)),
            m = new URL(`https://www.eventbrite.com/api/v3/destination/events`),
            h = u !== `false`,
            g = p(`div.search-results-panel-content section>ul>li`)
                .toArray()
                .filter((e) => h || !p(e).text().includes(`Promoted`)),
            _ = g.map((e) => p(e).find(`a.event-card-link`).first().attr(`data-event-id`));
        (m.searchParams.append(`event_ids`, _.join(`,`)), m.searchParams.append(`page_size`, _.length.toString()), m.searchParams.append(`expand`, `image,primary_venue,ticket_availability,primary_organizer`));
        let v = (await e(m.href)).events,
            y = g.map((e, n) => {
                let r = p(e),
                    i = r.find(`.event-card-details a.event-card-link`).first(),
                    c = i.attr(`aria-label`) || i.text() || i.html(),
                    l = v[n];
                if (l === void 0) {
                    let e = r.find(`p`);
                    return { title: c, author: e.length > 1 ? p(e[1]).text() : void 0 };
                }
                return {
                    title: r.text().includes(`Promoted`) ? `${l.name} (Promoted)` : l.name,
                    link: l.url,
                    pubDate: t(l.published),
                    author: l.primary_organizer === void 0 ? JSON.stringify(l) : l.primary_organizer.name,
                    category: l.tags.map((e) => e.display_name),
                    image: l.image.original.url,
                    description: l.summary,
                    id: l.eventbrite_event_id,
                    content: { html: `${s(l)}<br>${a(l)}<br>${o(l)}`, text: `` },
                };
            });
        return { title: `${n(d.replaceAll(`-`, ` `))} in ${n(l.replaceAll(`-`, ` `))}`, link: f, item: y };
    },
};
function a(e) {
    return `<a href="${e.primary_organizer.url}">${e.primary_organizer.name}</a>`;
}
function o(e) {
    let t = e.ticket_availability.minimum_ticket_price.display,
        n = e.ticket_availability.maximum_ticket_price.display;
    return t === n ? t : `${t} - ${n}`;
}
function s(e) {
    let t = e.end_date,
        n = e.start_date,
        r = e.start_time,
        i = e.end_time;
    return n === t ? `${n} ${r} - ${i}` : `${n} ${r} - ${t} ${i}`;
}
export { i as route };
