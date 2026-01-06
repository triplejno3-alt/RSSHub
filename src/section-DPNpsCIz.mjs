import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let { id: i = `trending` } = n.req.param(),
            a = Number.parseInt(n.req.query(`limit`) ?? `50`, 10),
            o = `wp-json/wp/v2`,
            s = `https://indianexpress.com`,
            c = new URL(`${o}/article`, s).href,
            l = new URL(`${o}/ie_section`, s).href,
            u = (await e(l, { query: { search: i } })).find((e) => e.slug === i || e.name === i || i.includes(e.slug)),
            d = u?.id ?? void 0,
            f = u?.link ?? void 0,
            p = await e(c, { query: { _embed: `true`, per_page: a, ie_section: d } }),
            m = f ?? new URL(`section/${i.endsWith(`/`) ? i : `${i}/`}`, s).href,
            h = r(await e(m)),
            g = h(`html`).attr(`lang`) ?? `en`,
            _ = [];
        _ = p.slice(0, a).map((e) => {
            let n = e.title?.rendered ?? e.title,
                r = e.content.rendered,
                i = e.date_gmt,
                a = e.link,
                o = e._embedded?.[`wp:term`]?.flat().map((e) => e.name) ?? [],
                s = e.guid?.rendered ?? e.guid,
                c = e.modified_gmt ?? i;
            return { title: n, description: r, pubDate: i ? t(i) : void 0, link: a ?? s, category: o, guid: s, id: s, content: { html: r, text: r }, updated: c ? t(c) : void 0, language: g };
        });
        let v = h(`meta[property="og:site_name"]`).attr(`content`) || h(`meta[property="og:title"]`).attr(`content`);
        return {
            title: `${v ? `${v} - ` : ``}${u?.name ?? i}`,
            description: h(`meta[property="og:description"]`).attr(`content`),
            link: m,
            item: _,
            allowEmpty: !0,
            image: h(`meta[property="og:image"]`).attr(`content`),
            author: v,
            language: g,
            feedLink: h(`link[type="application/rss+xml"]`).attr(`href`),
            id: h(`meta[property="og:url"]`).attr(`content`),
        };
    },
    a = {
        path: `/section/:id{.+}?`,
        name: `Section`,
        url: `indianexpress.com`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/indianexpress/section/explained`,
        parameters: { id: { description: 'Section ID, `trending` as Trending by default' } },
        description:
            ':::tip\nTo subscribe to [Section](https://indianexpress.com/), where the source URL is `https://indianexpress.com/`, extract the certain parts from this URL to be used as parameters, resulting in the route as [`/indianexpress/section/explained`](https://rsshub.app/indianexpress/section/explained).\n:::\n',
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`indianexpress.com/section/:id`], target: `/section/:id` }],
        view: n.Articles,
    };
export { i as handler, a as route };
