import { jsx as e, jsxs as t } from 'hono/jsx/jsx-runtime';
import { renderToString as n } from 'hono/jsx/dom/server';
const r = ({ videoId: r, preview: i, width: a, mp4: o, webm: s }) =>
        n(
            r
                ? e(`iframe`, {
                      id: `ytplayer`,
                      type: `text/html`,
                      width: `640`,
                      height: `360`,
                      src: `https://www.youtube-nocookie.com/embed/${r}`,
                      frameborder: `0`,
                      allowfullscreen: !0,
                      referrerpolicy: `strict-origin-when-cross-origin`,
                  })
                : s || o
                  ? t(`video`, { controls: !0, preload: `metadata`, poster: i, width: a, children: [s ? e(`source`, { src: s, type: `video/webm` }) : null, o ? e(`source`, { src: o, type: `video/mp4` }) : null] })
                  : null
        ),
    i = `https://pikabu.ru`,
    a = (e) => {
        (e.find(`.story-image__stretch`).remove(),
            e.find(`.story-image__image`).each((e, t) => {
                t.attribs[`data-src`] && t.attribs[`data-large-image`] && ((t.attribs.src = t.attribs[`data-large-image`]), delete t.attribs[`data-src`], delete t.attribs[`data-large-image`]);
            }));
    },
    o = (e) => {
        let t = e
                .find(`.player__preview`)
                .attr(`style`)
                .match(/url\((.+)\);/)[1],
            n = e.attr(`data-type`),
            i = ``;
        if (n === `video`) {
            let t = e.attr(`data-source`).match(/\/embed\/(.+)$/)[1];
            i = r({ videoId: t });
        } else if (n === `video-file`) i = r({ preview: t, width: e.find(`.player__svg-stretch`).attr(`width`), mp4: `${e.attr(`data-source`)}.mp4`, webm: e.attr(`data-webm`) });
        else throw Error(`Unknown video type: ${n}`);
        e.replaceWith(i);
    };
export { a as n, o as r, i as t };
