import { n as e } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as t, jsx as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = (e) =>
        r(n(t, { children: e.previewVideo ? n(`video`, { controls: !0, preload: `metadata`, poster: e.poster, children: n(`source`, { src: e.previewVideo, type: `video/mp4` }) }) : e.poster ? n(`img`, { src: e.poster }) : null })),
    a = (t) => ({
        title: t.find(`a > img`).attr(`alt`),
        link: t.find(`a`).attr(`href`),
        description: i({ poster: t.find(`a > img`).data(`src`), previewVideo: t.find(`a > span`).data(`trailer`) }),
        pubDate: e(t.find(`.video-addtime`).text()),
    });
export { a as t };
