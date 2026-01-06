import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = (e, i) => a(r(t, { children: [e ? r(t, { children: [n(`img`, { src: e }), n(`br`, {})] }) : null, i ? n(t, { children: o(i) }) : null] })),
    c = (t, n) =>
        n(t.link, async () => {
            let n = i((await e(t.link, { responseType: `buffer` })).data);
            return (
                n(`.post_main img`).each((e, t) => {
                    if (!t.attribs.src) return;
                    let n = new URL(t.attribs.src);
                    n.host === `nimg.ws.126.net` && (t.attribs.src = n.searchParams.get(`url`));
                }),
                (t.description = s(t.imgsrc ? new URL(t.imgsrc).searchParams.get(`url`) : !1, n(`.post_body`).html())),
                (t.feedLink = n(`.post_wemedia_name a`).attr(`href`)),
                (t.feedDescription = n(`.post_wemedia_title`).text()),
                (t.feedImage = n(`.post_wemedia_avatar img`).attr(`src`)),
                t
            );
        });
export { c as t };
