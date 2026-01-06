import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { n as t } from './parse-date-DjdQS_Nt.mjs';
import { s as n } from './google-Ewtr97IX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = (e, t) =>
        s(
            a(r, {
                children: [
                    e?.length
                        ? e.map((e) => {
                              let t = e?.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;
                              return t
                                  ? i(`a`, { href: t.startsWith(`https://`) ? t : `https://www.youtube.com${t}`, children: e.text })
                                  : i(r, {
                                        children: c(
                                            (e?.text ?? ``).replaceAll(
                                                `
`,
                                                `<br>`
                                            )
                                        ),
                                    });
                          })
                        : null,
                    t?.length ? a(r, { children: [i(`br`, {}), t.map((e) => (e?.url ? i(`img`, { src: e.url }) : null))] }) : null,
                ],
            })
        ),
    u = { path: `/community/:handle`, categories: [`social-media`], example: `/youtube/community/@JFlaMusic`, parameters: { handle: `YouTube handles or channel id` }, name: `Community Posts`, maintainers: [`TonyRL`], handler: d };
async function d(r) {
    let i = r.req.param(`handle`),
        a = i;
    n(i) && (a = `channel/${i}`);
    let s = o(await e(`https://www.youtube.com/${a}/posts`)),
        c = JSON.parse(
            s(`script`)
                .text()
                .match(/ytInitialData = ({.*?});/)?.[1] ?? `{}`
        ),
        u = c.metadata.channelMetadataRenderer,
        d = u.title,
        f = c.contents.twoColumnBrowseResultsRenderer.tabs.find(
            (e) => e.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.endsWith(`/posts`) || e.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.endsWith(`/community`)
        ).tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    if (f[0].messageRenderer) throw Error(f[0].messageRenderer.text.runs[0].text);
    let p = f
        .filter((e) => e.backstagePostThreadRenderer)
        .map((e) => {
            let n = e.backstagePostThreadRenderer.post.backstagePostRenderer || e.backstagePostThreadRenderer.post.sharedPostRenderer.originalPost.backstagePostRenderer,
                r = n.backstageAttachment?.postMultiImageRenderer?.images.map((e) => e.backstageImageRenderer.image.thumbnails.pop()) ?? [n.backstageAttachment?.backstageImageRenderer?.image.thumbnails.pop()];
            return {
                title: n.contentText.runs?.[0].text ?? ``,
                description: l(n.contentText.runs, r),
                link: `https://www.youtube.com/post/${n.postId}`,
                author: n.authorText.runs[0].text,
                pubDate: t(n.publishedTimeText.runs[0].text.split(`(`)[0]),
            };
        });
    return { title: `${d} - Community Posts- YouTube`, link: u.channelUrl, description: u.description, item: p };
}
export { u as route };
