import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = () =>
        n.tryGet(
            `aeon:buildId`,
            async () => {
                let t = s(await e(`https://aeon.co`));
                return JSON.parse(t(`script#__NEXT_DATA__`).text()).buildId;
            },
            t.cache.routeExpire,
            !1
        ),
    d = (e) => {
        let t = e.hosterId;
        return (
            e.hoster === `vimeo` ? (t = `https://player.vimeo.com/video/${t}?dnt=1`) : e.hoster === `youtube` && (t = `https://www.youtube-nocookie.com/embed/${t}`),
            c(
                o(i, {
                    children: [
                        a(`iframe`, { width: `672`, height: `377`, src: t, frameborder: `0`, allowfullscreen: !0, referrerpolicy: `strict-origin-when-cross-origin` }),
                        e.credits ? l(e.credits) : null,
                        e.description ? l(e.description) : null,
                    ],
                })
            )
        );
    },
    f = ({ banner: e, authorsBio: t, content: n }) =>
        c(o(i, { children: [e?.url ? o(`figure`, { children: [a(`img`, { src: e.url, alt: e.alt }), e.caption ? a(`figcaption`, { children: e.caption }) : null] }) : null, t ? l(t) : null, n ? l(n) : null] })),
    p = async (t) =>
        await Promise.all(
            t.map((t) =>
                n.tryGet(t.link, async () => {
                    let n = (await e(`https://aeon.co/_next/data/${await u()}/${t.type}s/${t.slug}.json?id=${t.slug}`)).pageProps.article,
                        i = n.type.toLowerCase();
                    if (((t.pubDate = r(n.publishedAt)), i === `video`)) t.description = d(n);
                    else {
                        if (n.audio?.id) {
                            let r = await e(`https://api.aeonmedia.co/graphql`, {
                                method: `POST`,
                                body: {
                                    query: `query getAudio($audioId: ID!) {
                                    audio(id: $audioId) {
                                        id
                                        streamUrl
                                    }
                                }`,
                                    variables: { audioId: n.audio.id },
                                    operationName: `getAudio`,
                                },
                            });
                            (delete t.image, (t.enclosure_url = r.data.audio.streamUrl), (t.enclosure_type = `audio/mpeg`));
                        }
                        let r = s(n.body, null, !1),
                            i = n.image;
                        (r(`p.pullquote`).remove(), (t.description = f({ banner: i, authorsBio: n.authors.map((e) => `<p>` + e.name + e.authorBio.replaceAll(/^<p>/g, ` `)).join(``), content: r.html() })));
                    }
                    return t;
                })
            )
        );
export { p as n, u as t };
