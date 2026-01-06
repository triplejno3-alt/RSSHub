import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
var s = (t) =>
    Promise.all(
        [`https://api.bgm.tv/calendar`, `https://cdn.jsdelivr.net/npm/bangumi-data/dist/data.json`].map((r, i) =>
            t(
                r,
                async () => {
                    let { data: e } = await n(r);
                    if (i === 1) {
                        let t = [];
                        for (let n of e.items) {
                            let e = n.sites.find((e) => e.site === `bangumi`);
                            e && ((n.bgmId = e.id), t.push(n));
                        }
                        e.items = t;
                    }
                    return e;
                },
                e.cache.contentExpire,
                !1
            )
        )
    );
const c = {
        path: `/calendar/today`,
        categories: [`anime`],
        example: `/bangumi.tv/calendar/today`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`bgm.tv/calendar`] }],
        name: `放送列表`,
        maintainers: [`magic-akari`],
        handler: u,
        url: `bgm.tv/calendar`,
    },
    l = (e, t) =>
        o(
            a(r, {
                children: [
                    i(`img`, { src: e.image }),
                    i(`ul`, {
                        children: e.sites.map((e) => {
                            let n = e.url ?? t[e.site].urlTemplate.replace(`{{id}}`, e.id),
                                r = t[e.site].title;
                            return i(`li`, { children: i(`a`, { href: n, children: r }) });
                        }),
                    }),
                ],
            })
        );
async function u() {
    let [e, n] = await s(t.tryGet),
        r = n.siteMeta,
        i = new Date(Date.now());
    i.setUTCHours(i.getUTCHours() + 9);
    let a = i.getUTCDay(),
        o = e.find((e) => e.weekday.id % 7 === a),
        c = new Set(o.items.map((e) => e.id.toString())),
        u = {};
    for (let e of o.items) u[e.id] = (e.images || {}).large;
    let d = n.items.filter((e) => c.has(e.bgmId));
    for (let e of d) e.image = u[e.bgmId];
    return {
        title: `bangumi 每日放送`,
        link: `https://bgm.tv/calendar`,
        item: d.map((e) => {
            let t = new Date(Date.now());
            t.setSeconds(0);
            let n = new Date(e.begin || t);
            (t.setHours(n.getHours()), t.setMinutes(n.getMinutes()), t.setSeconds(n.getSeconds()));
            let i = `https://bangumi.tv/subject/${e.bgmId}`,
                a = `${i}#${new Intl.DateTimeFormat(`zh-CN`).format(t)}`,
                o = l(e, r);
            return {
                id: a,
                guid: a,
                title: [
                    e.title,
                    Object.values(e.titleTranslate)
                        .map((e) => e.join(`｜`))
                        .join(`｜`),
                ]
                    .filter(Boolean)
                    .join(`｜`),
                updated: t.toISOString(),
                pubDate: t.toUTCString(),
                link: i,
                description: o,
                content: { html: o },
            };
        }),
    };
}
export { c as route };
