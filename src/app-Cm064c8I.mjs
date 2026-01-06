import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { FetchError as n } from 'ofetch';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import o from 'dayjs';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
import l from 'dayjs/plugin/timezone.js';
import u from 'dayjs/plugin/utc.js';
import d from 'dayjs/plugin/advancedFormat.js';
const f = {
    path: `/app/:category{.+}?`,
    categories: [`traditional-media`],
    example: `/washingtonpost/app/national`,
    parameters: { category: `Category from the path of the URL of the corresponding site, see below` },
    features: { requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `App`,
    maintainers: [`quiniapiezoelectricity`],
    radar: [{ source: [`www.washingtonpost.com/:category`], target: `/app/:category` }],
    handler: m,
    description: `::: tip
For example, the category for https://www.washingtonpost.com/national/investigations would be /national/investigations.
:::`,
};
function p(e) {
    let t = {};
    for (let n of e) t[n.id] = t[n.id] ? Object.assign(t[n.id], n) : n;
    return Object.values(t);
}
async function m(r) {
    let i = r.req.param(`category`) ?? ``,
        a = { Accept: `*/*`, Connection: `keep-alive`, 'User-Agent': `Classic/6.70.0` };
    (o.extend(u), o.extend(l), o.extend(d));
    let s = `https://jsonapp1.washingtonpost.com/fusion_prod/v2/${i}`,
        c = await t.get(s, { headers: a }),
        f = c.data.tracking.page_title.includes(`Washington Post`) ? c.data.tracking.page_title : `The Washington Post - ${c.data.tracking.page_title}`,
        m = `https://washingtonpost.com` + c.data.tracking.page_path,
        g = p(
            c.data.regions[0].items
                .filter((e) => e.items)
                .flatMap((e) =>
                    e.items[0].items
                        .filter((e) => e.is_from_feed === !0)
                        .map((e) => {
                            let t = { id: e.id, title: e.headline.text, link: e.link.url, pubDate: e.link.display_date, updated: e.link.last_modified };
                            return (e.blurbs?.items[0]?.text && (t.description = e.blurbs?.items[0]?.text), t);
                        })
                )
        );
    return {
        title: f,
        link: m,
        item: await Promise.all(
            g.map((r) =>
                e.tryGet(r.link, async () => {
                    let e;
                    try {
                        e = await t(`https://rainbowapi-a.wpdigital.net/rainbow-data-service/rainbow/content-by-url.json?followLinks=false&url=${r.link}`, { headers: a });
                    } catch (e) {
                        if (e instanceof n && e.statusCode === 415) return r;
                        throw e;
                    }
                    return (
                        (r.title = e.data.title ?? r.title),
                        (r.author =
                            e.data.items
                                .filter((e) => e.type === `byline`)
                                ?.flatMap((e) => e.authors.map((e) => e.name))
                                ?.join(`, `) ?? ``),
                        (r.description = h(e.data.items)),
                        r
                    );
                })
            )
        ),
    };
}
const h = (e) =>
    s(
        i(r, {
            children: e?.map((e, t) => {
                if (!e) return null;
                if (e.type === `title` && e.subtype !== `h1`) return i(e.subtype || `h2`, { children: e.mime === `text/html` ? c(e.content) : e.content }, `title-${t}`);
                if (e.type === `sanitized_html`) {
                    if (e.subtype === `paragraph`) return a(`p`, { children: [e.mime === `text/html` ? c(e.content) : e.content, e.oembed ? c(e.oembed) : null] }, `paragraph-${t}`);
                    if (e.subtype === `subhead`) return a(`h${e.subhead_level || 4}`, { children: [e.mime === `text/html` ? c(e.content) : e.content, e.oembed ? c(e.oembed) : null] }, `subhead-${t}`);
                }
                if (e.type === `deck`) return i(`blockquote`, { children: i(`p`, { children: e.mime === `text/html` ? c(e.content) : e.content }) }, `deck-${t}`);
                if (e.type === `image`) return a(`figure`, { children: [i(`img`, { src: e.imageURL, alt: e.blurb }), i(`figcaption`, { children: e.fullcaption })] }, `image-${t}`);
                if (e.type === `video`) {
                    if (e.content?.html) return i(`span`, { children: c(e.content.html) }, `video-html-${t}`);
                    if (e.mediaURL)
                        return a(
                            `figure`,
                            { children: [i(`video`, { controls: !0, poster: e.imageURL, children: i(`source`, { src: e.mediaURL }) }), e.fullcaption ? i(`figcaption`, { children: e.fullcaption }) : null] },
                            `video-${t}`
                        );
                }
                return e.type === `list`
                    ? i(e.subtype === `ordered` ? `ol` : `ul`, { children: (e.content ?? []).map((n, r) => i(`li`, { children: e.mime === `text/html` ? c(n) : n }, `list-${t}-${r}`)) }, `list-${t}`)
                    : e.type === `divider`
                      ? a(`span`, { children: [i(`br`, {}), i(`hr`, {}), i(`br`, {})] }, `divider-${t}`)
                      : e.type === `byline` && (e.subtype === `live-update` || e.subtype === `live-reporter-insight`)
                        ? i(`p`, { children: i(`i`, { children: e.mime === `text/html` ? c(e.content) : e.content }) }, `byline-${t}`)
                        : e.type === `date` && e.subtype === `live-update` && e.content
                          ? i(`span`, { children: o.tz(e.content, `America/New_York`).locale(`en`).format(`dddd, MMMM D, YYYY h:mm A z`) }, `date-${t}`)
                          : null;
            }),
        })
    );
export { f as route };
