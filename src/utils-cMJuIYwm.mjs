import { n as e } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import i from 'dayjs';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = `https://www.pornhub.com`,
    s = { accessAgeDisclaimerPH: 1, hasVisited: 1 },
    c = (e) =>
        a(
            r(t, {
                children: [
                    e.previewVideo ? n(`video`, { controls: !0, preload: `metadata`, poster: e.poster, children: n(`source`, { src: e.previewVideo, type: `video/webm` }) }) : null,
                    e.thumbs?.map((e, t) => n(`img`, { src: e.src }, `${e.src}-${t}`)),
                ],
            })
        ),
    l = (e) => {
        let t = e.match(/(\d{6})\/(\d{2})/);
        return t ? t.slice(1, 3).join(``) : null;
    },
    u = (t) => ({
        title: t.find(`span.title a`).text().trim(),
        link: o + t.find(`span.title a`).attr(`href`),
        description: c({ poster: t.find(`img`).data(`mediumthumb`), previewVideo: t.find(`img`).data(`mediabook`) }),
        author: t.find(`.usernameWrap a`).text(),
        pubDate: i(l(t.find(`img`).data(`mediumthumb`))).toDate() || e(t.find(`.added`).text()),
    }),
    d = (e) => [
        { source: [`www.pornhub.com${e}`, `www.pornhub.com${e}/*`], target: e },
        ...[`de`, `fr`, `es`, `it`, `pt`, `pl`, `rt`, `jp`, `nl`, `cz`, `cn`].map((t) => ({ source: [`${t}.pornhub.com${e}`, `${t}.pornhub.com${e}/*`], target: `${e}/${t}` })),
    ];
export { c as a, u as i, d as n, s as r, o as t };
