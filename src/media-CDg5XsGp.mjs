import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './jsonp-helper-CoFLhxde.mjs';
import { Fragment as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
import { raw as a } from 'hono/html';
const o = {
    path: `/media`,
    categories: [`live`],
    example: `/yoasobi-music/media`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.yoasobi-music.jp/`, `www.yoasobi-music.jp/media`] }],
    name: `Media`,
    maintainers: [`Kiotlin`],
    handler: s,
    url: `www.yoasobi-music.jp/`,
};
async function s() {
    let n = `https://www.yoasobi-music.jp/media`,
        r = await e(`https://www.sonymusic.co.jp/json/v2/artist/YOASOBI/media/start/0/count/-1`);
    return {
        title: `LATEST MEDIA`,
        link: n,
        description: `YOASOBI's Latest Media`,
        item: Object.values(t(r.data).items)
            .flat()
            .toSorted((e, t) => new Date(t.date) - new Date(e.date))
            .map((e) => ({ date: e.date, weekDay: e.youbi, startTime: e.startTime || null, endTime: e.endTime || null, tvStation: e.media || null, title: e.program || e.media, description: e.note }))
            .map((e) => ({
                title: e.title,
                description: c(e.date, e.weekDay, e.startTime && e.endTime && e.tvStation ? `${e.startTime} ~ ${e.endTime} ${e.tvStation}` : null, e.description),
                pubDate: e.date,
                guid: e.title + e.date,
                link: n,
            })),
    };
}
const c = (e, t, o, s) => i(r(n, { children: [r(`p`, { children: [e, ` [`, t, `] `, o || null] }), a(s)] }));
export { o as route };
