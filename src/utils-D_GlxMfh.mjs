import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { jsx as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = async (e, t, r, i) => {
        let { data: a } = await n(`https://${e}.news.yahoo.com/_td-news/api/resource/NCPListService;api=archive;ncpParams=${encodeURIComponent(JSON.stringify({ query: { count: t, start: 0, providerid: i, tag: r } }))}`);
        return a;
    },
    s = async (e, t) => {
        let { data: r } = await n(`https://${e}.news.yahoo.com/_td-news/api/resource/StreamService;category=LISTID%3A${t};useNCP=true`);
        return r;
    },
    c = (e, t) =>
        t(`yahoo:${e}:categoryMap`, async () => {
            let { PageStore: n } = await u(e, t),
                { Col1: r } = n.pagesConfigRaw.base.section.regions,
                { categoryMap: i } = r.find((e) => e.name === `ArchiveFilterBar`).props;
            for (let [e, t] of Object.entries(i)) i[e] = { name: t, yctMap: r.find((e) => e.name === `StreamContainerArchive`).props.yctMap[e] };
            return i;
        }),
    l = (e, t) =>
        t(`yahoo:${e}:providerList`, async () => {
            let { ProviderListStore: n } = await u(e, t);
            return n.providerList.flatMap((t) => t.providers.map((n) => ({ title: `${t.title} - ${n.title}`, key: n.key, link: new URL(n.url, `https://${e}.news.yahoo.com`).href })));
        }),
    u = (e, t) =>
        t(`yahoo:${e}:stores`, async () => {
            let { data: t } = await n(`https://${e}.news.yahoo.com/archive`),
                r = i(t);
            return JSON.parse(
                r(`script:contains("root.App.main")`)
                    .text()
                    .match(/root.App.main\s+=\s+({.+});/)?.[1]
            ).context.dispatcher.stores;
        }),
    d = (e, n) => n.map((n) => ({ title: n.title, link: n.url.startsWith(`http`) ? n.url : new URL(n.url, `https://${e}.news.yahoo.com`).href, description: n.summary, pubDate: t(n.published_at, `X`) })),
    f = (o, s) =>
        s(o.link, async () => {
            let { data: s } = await n(o.link, { headers: { 'User-Agent': e.trueUA } }),
                c = i(s),
                l = JSON.parse(
                    c(`script[type="application/ld+json"]`)
                        .toArray()
                        .find((e) => c(e).text().includes(`"@type":"NewsArticle"`))?.children[0].data
                ),
                u = l.author.name,
                d = c(`.atoms`);
            return (
                d.find(`noscript, .text-gandalf, [id^="sda-inbody-"]`).remove(),
                d.find(`.caas-figure-with-pb, .caas-img-container`).each((e, t) => {
                    c(t).removeAttr(`style`);
                }),
                d.find(`img`).each((e, t) => {
                    let n = c(t),
                        r = n.data(`src`);
                    if (r) {
                        let e = r.match(/.*--\/.*--\/(.*)/);
                        (e?.[1] && (r = e?.[1]), n.attr(`src`, r), n.removeAttr(`data-src`));
                    }
                }),
                d.find(`.caas-iframe`).each((e, t) => {
                    let n = c(t);
                    if (n.data(`type`) === `youtube`) {
                        let e = n.find(`blockquote`).data(`src`);
                        n.replaceWith(
                            a(
                                r(`iframe`, {
                                    width: `560`,
                                    height: `315`,
                                    src: `https://www.youtube-nocookie.com/embed/${e.split(`/`).pop()?.split(`?`)?.[0]}`,
                                    frameborder: `0`,
                                    allow: `encrypted-media; picture-in-picture; web-share`,
                                    allowfullscreen: !0,
                                    referrerpolicy: `strict-origin-when-cross-origin`,
                                })
                            )
                        );
                    }
                }),
                (o.description = d.html()),
                (o.author = u),
                (o.category = l.keywords),
                (o.pubDate = t(l.datePublished)),
                (o.updated = t(l.dateModified)),
                o
            );
        });
export { f as a, l as i, c as n, d as o, s as r, o as t };
