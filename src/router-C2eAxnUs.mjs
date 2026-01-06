import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import i from 'node:crypto';
import { load as a } from 'cheerio';
import o from 'dayjs';
import s from 'dayjs/plugin/customParseFormat.js';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
import u from 'city-timezones';
import d from 'dayjs/plugin/timezone.js';
import f from 'dayjs/plugin/utc.js';
(o.extend(s), o.extend(f), o.extend(d));
var p = {
    expandOdd: (e) => {
        e.prototype.odd = function () {
            let t = [];
            return (
                this.each((e, n) => {
                    e % 2 == 1 && t.push(n);
                }),
                e(t)
            );
        };
    },
    expandEven: (e) => {
        e.prototype.even = function () {
            let t = [];
            return (
                this.each((e, n) => {
                    e % 2 == 0 && t.push(n);
                }),
                e(t)
            );
        };
    },
    expandReverse: (e) => {
        e.prototype.reverse = function () {
            let t = [];
            return (
                this.each((e, n) => {
                    t.push(n);
                }),
                t.reverse(),
                e(t)
            );
        };
    },
    generateGuid: (e) => {
        let t = i.createHash(`sha512`);
        return (t.update(e), t.digest(`hex`).toUpperCase());
    },
    parseDatetime: (e, t, n, r, i) => {
        let a = `YYYY/MM/DD`,
            s = `YYYY/MM/DD HH:mm`,
            c = `MM/DD/YYYY`,
            l = `MM/DD/YYYY HH:mm`,
            d;
        switch (i) {
            case `ja`:
                d = o(e, a, !0).isValid() ? a : o(e, s, !0).isValid() ? s : void 0;
                break;
            case `en`:
                d = o(e, c, !0).isValid() ? c : o(e, l, !0).isValid() ? l : void 0;
                break;
        }
        if (t) {
            let e = [[`郵便局`], [`都`, `道`, `府`, `県`]];
            if (e[0].some((e) => t.includes(e)) || e[1].some((e) => n.includes(e))) r = `Asia/Tokyo`;
            else {
                let e = t.replace(` EMS`, ``).replace(` INT`, ``);
                try {
                    try {
                        r = u.lookupViaCity(e)[0].timezone;
                    } catch {
                        r = u.lookupViaCity(n)[0].timezone;
                    }
                } catch {}
            }
        }
        return d ? [o.tz(e, d, r).valueOf(), r] : [new Date(e).getTime(), r];
    },
};
let m = `日本郵便`;
async function h(i) {
    let o = i.req.param(`reqCode`),
        s = `reqCodeNo1=` + o,
        u = `ja`;
    i.req.param(`locale`) === `en` && ((u = `en`), (m = `Japanpost`));
    let d = `&locale=` + u,
        f = `https://trackings.post.japanpost.jp/services/srv/search/direct?` + s + d,
        h = a((await e({ method: `get`, url: f })).data);
    (p.expandEven(h), p.expandOdd(h));
    let g = h(`.tableType01`).eq(1).find(`tr`).slice(2),
        _ = h(`.tableType03`).eq(0).find(`tr`).slice(1),
        v;
    if (
        (_.length &&
            (v = _.toArray().map((e) => {
                let t = h(e).find(`td`);
                return { officeType: t.eq(0).text().trim(), officeName: t.eq(1).html().trim(), officeTel: t.eq(2).html().trim() };
            })),
        !g.length)
    ) {
        let e = h(`.tableType01`).eq(0).find(`tr`).eq(2).find(`td`).eq(1).text().trim();
        throw Error(e);
    }
    let y = g.even(),
        b = g.odd(),
        x = h(`.tableType01`).eq(0).find(`tr`).eq(1).find(`td`).eq(1).text().trim(),
        S = h(`.tableType01`).eq(0).find(`tr`).eq(1).find(`td`).eq(2).text().trim(),
        C = u === `ja` ? `付加サービス：` : `Additional services: `,
        w,
        T;
    return {
        title: `${m} ${o} ${x}`,
        link: f,
        description: `${m} ${o} ${x}`,
        language: u,
        icon: `https://www.post.japanpost.jp/favicon.ico`,
        logo: `https://www.post.japanpost.jp/favicon.ico`,
        item: y.toArray().map((e, i) => {
            let a = h(e).find(`td`),
                s = a.eq(1).text().trim(),
                d = a.eq(4).text().trim(),
                m = a.eq(3).text().trim(),
                g = b.eq(i).find(`td`).eq(0).text().trim(),
                _ = `${s} ${m} ${d}`,
                y = a.eq(2).text().trim(),
                x = c(
                    r(t, {
                        children: [
                            s,
                            n(`br`, {}),
                            y ? r(t, { children: [y, n(`br`, {})] }) : null,
                            g ? `${g} ` : ``,
                            m ? `${m} ` : ``,
                            d,
                            i === 0
                                ? r(t, {
                                      children: [
                                          v?.length ? r(t, { children: [n(`br`, {}), v.map((e) => r(t, { children: [n(`br`, {}), e.officeType, ` `, l(e.officeName), ` `, e.officeTel] }))] }) : null,
                                          S ? r(t, { children: [n(`br`, {}), C, S] }) : null,
                                      ],
                                  })
                                : null,
                        ],
                    })
                ),
                E = a.eq(0).text().trim(),
                D = p.generateGuid(o + _ + x + E),
                O;
            return (([O, T] = p.parseDatetime(E, m, d, T, u)), w && O <= w && (O = w + 1e3), (w = O), { title: _, description: x, pubDate: new Date(O), link: f, guid: D.slice(0, 32) });
        }),
    };
}
const g = {
    name: `Track & Trace Service`,
    path: `/track/:reqCode/:locale?`,
    example: `/japanpost/track/EJ123456789JP/en`,
    url: `trackings.post.japanpost.jp/services/srv/search/`,
    handler: h,
    categories: [`other`],
    maintainers: [`tuzi3040`],
    parameters: { reqCode: `Package Number`, locale: 'Language, default to japanese `ja`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    description: `| Japanese | English |
| -------- | ------- |
| ja       | en      |`,
    zh: {
        name: `邮件追踪查询`,
        description: `| 日语 | 英语 |
| ---- | ---- |
| ja   | en   |`,
    },
    ja: {
        name: `郵便追跡サービス`,
        description: `| 日本語 | 英語 |
| ---- | ---- |
| ja   | en   |`,
    },
};
export { g as route };
