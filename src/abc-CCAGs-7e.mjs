import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = ({ image: e, enclosure: t, description: n }) => {
        let o = t?.type?.split(`/`)[0];
        return a(r, {
            children: [
                e ? a(`figure`, { children: [i(`img`, { src: e.src, alt: e.alt }), i(`figcaption`, { children: e.alt })] }) : null,
                t && o ? i(r, { children: (() => a(o, { controls: !0, children: [i(`source`, { src: t.src, type: t.type }), i(`object`, { data: t.src, children: i(`embed`, { src: t.src }) })] }))() }) : null,
                n ? c(n) : null,
            ],
        });
    },
    u = (e) => s(i(l, { ...e })),
    d = {
        path: `/:category{.+}?`,
        example: `/wa`,
        radar: [{ source: [`abc.net.au/:category*`], target: `/:category` }],
        parameters: { category: 'Category, can be found in the URL, can also be filled in with the `documentId` in the source code of the page, `news/justin` as **Just In** by default' },
        name: `Channel & Topic`,
        categories: [`traditional-media`],
        description:
            '\n::: tip\n  All Topics in [Topic Library](https://abc.net.au/news/topics) are supported, you can fill in the field after `topic` in its URL, or fill in the `documentId`.\n\n  For example, the URL for [Computer Science](https://www.abc.net.au/news/topic/computer-science) is `https://www.abc.net.au/news/topic/computer-science`, the `category` is `news/topic/computer-science`, and the `documentId` of the Topic is `2302`, so the route is [/abc/news/topic/computer-science](https://rsshub.app/abc/news/topic/computer-science) and [/abc/2302](https://rsshub.app/abc/2302).\n\n  The supported channels are all listed in the table below. For other channels, please find the `documentId` in the source code of the channel page and fill it in as above.\n:::',
        maintainers: [`nczitzk`, `pseudoyu`],
        handler: f,
    };
async function f(r) {
    let { category: i = `news/justin` } = r.req.param(),
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 30,
        s = `https://www.abc.net.au`,
        c = new URL(`news-web/api/loader/channelrefetch`, s).href,
        l = ``,
        d;
    if (Number.isNaN(i)) l = new URL(i, s).href;
    else {
        d = i;
        let t = new URL(`news/feed/${d}/rss.xml`, s).href;
        l = (await e(t)).match(/<link>([\w-./:?]+)<\/link>/)[1];
    }
    let f = o(await e(l));
    d ??= f(`div[data-uri^="coremedia://collection/"]`).first().prop(`data-uri`).split(/\//).pop();
    let p = (await e(c, { query: { name: `PaginationArticles`, documentId: d, size: a } })).collection.slice(0, a).map((e) => {
        let t = {
            title: e.title.children ?? e.title,
            link: e.link.startsWith(`https://`) ? e.link : new URL(e.link, s).href,
            description: u({ image: e.image ? { src: e.image.imgSrc.split(/\?/)[0], alt: e.image.alt } : void 0 }),
            author: e.newsBylineProps?.authors?.map((e) => e.name).join(`/`) ?? void 0,
            guid: `abc-${e.id}`,
            pubDate: n(e.dates.firstPublished),
            updated: e.dates.lastUpdated ? n(e.dates.lastUpdated) : void 0,
        };
        return (e.mediaIndicator && ((t.enclosure_type = `audio/mpeg`), (t.itunes_item_image = e.image?.imgSrc.split(/\?/)[0] ?? void 0), (t.itunes_duration = e.mediaIndicator.duration)), t);
    });
    p = await Promise.all(
        p.map((r) =>
            t.tryGet(r.link, async () => {
                try {
                    let t = await e(r.link),
                        i = o(t);
                    (i(`aside, header, [data-print="inline-media"], [data-component="EmbedBlock"]`).remove(),
                        i(`#body *, div[data-component="FeatureMedia"]`)
                            .children()
                            .each(function () {
                                let e = i(this);
                                e.prop(`tagName`).toLowerCase() === `figure`
                                    ? e.replaceWith(u({ image: { src: e.find(`img`).prop(`src`).split(/\?/)[0], alt: e.find(`figcaption`).text().trim() } }))
                                    : e.removeAttr(`id class role data-component data-uri`);
                            }),
                        (r.title = i(`meta[property="og:title"]`).prop(`content`)),
                        (r.description = ``));
                    let a = String.raw`"(?:MIME|content)?Type":"([\w]+/[\w]+)".*?"(?:fileS|s)?ize":(\d+),.*?"url":"([\w-.:/?]+)"`,
                        s = t.match(new RegExp(a, `g`));
                    if (s) {
                        let e = s
                            .map((e) => e.match(new RegExp(a)))
                            .toSorted((e, t) => Number.parseInt(e[2], 10) - Number.parseInt(t[2], 10))
                            .pop();
                        ((r.enclosure_url = e[3]), (r.enclosure_length = e[2]), (r.enclosure_type = e[1]), (r.description = u({ enclosure: { src: r.enclosure_url, type: r.enclosure_type } })));
                    }
                    ((r.description = u({ description: (i(`div[data-component="FeatureMedia"]`).html() || ``) + (i(`#body div[data-component="LayoutContainer"] div`).first().html() || ``) }) + r.description),
                        (r.category = i(`meta[property="article:tag"]`)
                            .toArray()
                            .flatMap((e) =>
                                i(e)
                                    .prop(`content`)
                                    .split(/，/)
                                    .map((e) => e.trim())
                            )),
                        (r.guid = `abc-${i(`meta[name="ContentId"]`).prop(`content`)}`),
                        (r.pubDate = n(i(`meta[property="article:published_time"]`).prop(`content`))),
                        (r.updated = n(i(`meta[property="article:modified_time"]`).prop(`content`))));
                } catch {}
                return r;
            })
        )
    );
    let m = new URL(f(`link[rel="apple-touch-icon"]`).prop(`href`) || ``, s).href;
    return {
        item: p,
        title: f(`title`).first().text(),
        link: l,
        description: f(`meta[property="og:description"]`).prop(`content`),
        language: f(`html`).prop(`lang`),
        image: f(`meta[property="og:image"]`).prop(`content`).split(`?`)[0],
        icon: m,
        logo: m,
        subtitle: f(`meta[property="og:title"]`).prop(`content`),
        author: f(`meta[name="generator"]`).prop(`content`),
        allowEmpty: !0,
    };
}
export { d as route };
