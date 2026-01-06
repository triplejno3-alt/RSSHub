import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
import { raw as a } from 'hono/html';
const o = ({ summary: e, images: o }) =>
        i(
            r(t, {
                children: [
                    e
                        ? r(t, {
                              children: [
                                  a(
                                      e.replaceAll(
                                          `
`,
                                          `<br>`
                                      )
                                  ),
                                  n(`br`, {}),
                              ],
                          })
                        : null,
                    o.map((e) => n(`img`, { src: e.url, height: e.height, width: e.width, alt: e.alt ?? void 0 })),
                ],
            })
        ),
    s = ({ summary: e, image: o, video: s }) =>
        i(
            r(t, {
                children: [
                    e
                        ? r(t, {
                              children: [
                                  a(
                                      e.replaceAll(
                                          `
`,
                                          `<br>`
                                      )
                                  ),
                                  n(`br`, {}),
                              ],
                          })
                        : null,
                    n(`video`, { controls: !0, preload: `metadata`, poster: o, width: s.width, children: n(`source`, { src: s.url, type: `video/mp4` }) }),
                ],
            })
        ),
    c = (t) =>
        t.map((t) => {
            let n = t.product_type,
                r = t.caption?.text ?? ``,
                i = ``;
            switch (n) {
                case `carousel_container`:
                    i = o({ summary: r, images: t.carousel_media.map((e) => ({ ...e.image_versions2.candidates.toSorted((e, t) => t.width - e.width)[0], alt: t.accessibility_caption })) });
                    break;
                case `clips`:
                case `igtv`:
                    i = s({ summary: r, image: t.image_versions2.candidates.toSorted((e, t) => t.width - e.width)[0].url, video: t.video_versions[0] });
                    break;
                case `feed`:
                    i = o({ summary: r, images: [{ ...t.image_versions2.candidates.toSorted((e, t) => t.width - e.width)[0], alt: t.accessibility_caption }] });
                    break;
                default:
                    throw Error(`Instagram: Unhandled feed type: ${n}`);
            }
            let a = `https://www.instagram.com/p/${t.code}/`,
                c = e(t.caption?.created_at_utc || t.taken_at, `X`);
            return {
                title: r.split(`
`)[0],
                id: t.pk,
                pubDate: c,
                author: t.user.username,
                link: a,
                summary: r,
                description: i,
            };
        });
export { s as n, o as r, c as t };
