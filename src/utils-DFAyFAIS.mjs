import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = `https://www.newslaundry.com`;
async function c(t, n, r = !1) {
    let i = `${s}/api/v1/collections/${t}`,
        a = n || `${s}/${t}`,
        o = await e(i);
    if (!o.items || !o.items.length) throw Error(`No articles found`);
    let c = (r ? o.items.slice(1) : o.items).map((e) => l(e.story));
    return { title: `${o.name} - Newslaundry`, description: o.summary || `${o.name} articles from Newslaundry`, link: a, item: c, language: `en`, logo: `${s}/favicon.ico`, icon: `${s}/favicon.ico` };
}
function l(e) {
    let c = e.url,
        l = e[`published-at`] ? t(e[`published-at`]) : null,
        u = e[`hero-image-s3-key`] ? `https://media.assettype.com/${e[`hero-image-s3-key`]}?auto=format%2Ccompress&fit=max&dpr=1.0&format=webp` : null,
        d =
            e.cards?.flatMap(
                (e) =>
                    e?.[`story-elements`]
                        ?.map((e) => {
                            if (e.type === `text` && e.text) return { type: `text`, text: e.text };
                            if (e.type === `image` && e[`image-s3-key`])
                                return { type: `image`, url: `https://media.assettype.com/${e[`image-s3-key`]}?auto=format%2Ccompress&format=webp`, alt: e[`alt-text`] || ``, title: e.title || `` };
                            if (e.type === `jsembed` && e[`embed-js`])
                                try {
                                    return { type: `jsembed`, content: Buffer.from(e[`embed-js`], `base64`).toString() };
                                } catch {
                                    return null;
                                }
                            else if (e.type === `youtube-video` && e.url) return { type: `youtube-video`, url: e.url, embedUrl: e[`embed-url`] || `` };
                            return null;
                        })
                        .filter(Boolean) || []
            ) || [],
        f = e[`hero-image-caption`] || ``,
        p = e[`hero-image-attribution`],
        m = a(
            i(n, {
                children: [
                    e.subheadline ? r(`p`, { children: r(`strong`, { children: e.subheadline }) }) : null,
                    u ? i(`figure`, { children: [r(`img`, { src: u, alt: e[`hero-image-alt-text`] || `` }), r(`figcaption`, { children: p ? `${f} (${p})` : f })] }) : null,
                    d.map((e) =>
                        e.type === `text`
                            ? o(e.text)
                            : e.type === `image`
                              ? i(`figure`, { children: [r(`img`, { src: e.url, alt: e.alt }), r(`figcaption`, { children: e.title })] })
                              : e.type === `jsembed`
                                ? o(e.content)
                                : e.type === `youtube-video`
                                  ? i(`figure`, {
                                        children: [
                                            r(`iframe`, { width: `560`, height: `315`, src: e.embedUrl, frameBorder: `0`, allowFullScreen: !0 }),
                                            r(`figcaption`, { children: r(`a`, { href: e.url, target: `_blank`, rel: `noopener noreferrer`, children: `Watch on YouTube` }) }),
                                        ],
                                    })
                                  : null
                    ),
                ],
            })
        ),
        h = e.authors?.map((e) => ({ name: e.name, url: e.slug ? `${s}/author/${e.slug}` : void 0 })) || [];
    return {
        title: e.headline,
        link: c,
        image: u,
        description: m || e.subheadline,
        pubDate: l,
        updated: e[`last-correction-published-at`] ? t(e[`last-correction-published-at`]) : void 0,
        author: h.length > 0 ? h : e[`author-name`],
        category: e.tags?.map((e) => e.name) || [],
    };
}
export { s as n, c as t };
