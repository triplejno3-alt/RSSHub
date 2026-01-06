import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = `https://dribbble.com`;
async function u(t) {
    let r = o(await e(t)),
        i = JSON.parse(
            r(`script`)
                .text()
                .match(/shotData:\s({.+?}),\n/)?.[1] ?? `{}`
        ),
        a = r(`.media-shot, .main-shot, .block-media-wrapper`)
            .toArray()
            .map((e) => {
                let t = r(e);
                return (
                    t.find(`span.cropped-indicator, button`).remove(),
                    t.find(`video`).each((e, t) => {
                        ((t = r(t)), !t.attr(`src`) && t.data(`src`) && (t.attr(`src`, t.data(`src`)), t.removeAttr(`data-src`), t.removeAttr(`data-video-small`), t.removeAttr(`data-video-medium`), t.removeAttr(`data-video-large`)));
                    }),
                    t.find(`img`).each((e, t) => {
                        ((t = r(t)),
                            t.data(`animated-url`) && (t.attr(`src`, t.data(`animated-url`)), t.removeAttr(`data-animated-url`), t.removeAttr(`srcset`)),
                            !t.attr(`src`) && t.data(`src`) && (t.attr(`src`, t.data(`src`).split(`?`)[0]), t.removeAttr(`data-src`)),
                            t.attr(`src`, t.attr(`src`).split(`?`)[0]),
                            t.removeAttr(`srcset`),
                            t.removeAttr(`data-srcset`));
                    }),
                    t.find(`a`).each((e, t) => {
                        ((t = r(t)), t.removeAttr(`data-pswp-srcset`));
                    }),
                    t.html()
                );
            })
            .join(``),
        s = r(`.shot-description-container`),
        c = `${i.shotUser.name}${i.shotUser.team.length ? ` for ${i.shotUser.team.name}` : ``}`;
    return { description: d({ shotMedia: a, shotData: i, descriptionHtml: s.length ? s.html() : void 0 }), pubDate: n(i.postedOn), author: c, category: i.tags };
}
const d = ({ shotMedia: e, shotData: t, descriptionHtml: n }) =>
    s(
        a(r, {
            children: [
                e ? a(r, { children: [c(e), i(`br`, {})] }) : null,
                n ? a(r, { children: [c(n), i(`br`, {})] }) : null,
                t.likesCount ? a(r, { children: [t.likesCount, ` likes`, i(`br`, {})] }) : null,
                t.savesCount ? a(r, { children: [t.savesCount, ` saves`] }) : null,
            ],
        })
    );
function f(e) {
    return Promise.all(
        e.map((e) => {
            let n = o(e),
                r = n(e).data(`thumbnail-id`),
                i = new URL(`/shots/${r}`, l).href,
                a = new URL(n(e).find(`.shot-thumbnail-link`).attr(`href`), l).href;
            return t.tryGet(i, async () => {
                let { description: e, pubDate: t, author: r, category: o } = await u(a);
                return { title: n(`.shot-title`).text(), link: a, guid: i, description: e, pubDate: t, author: r, category: o };
            });
        })
    );
}
var p = {
    getData: async (t, n) => {
        let r = o(await e(t)),
            i = await f(r(`ol.dribbbles.group > li`).toArray());
        return { title: n, link: t, description: r(`meta[name="description"]`).attr(`content`), item: i };
    },
};
export { p as t };
