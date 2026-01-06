import { t as e } from './invalid-parameter-DGZgOgO2.mjs';
import { n as t, t as n } from './readable-social--hCfpJhv.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import o from 'dayjs';
import { renderToString as s } from 'hono/jsx/dom/server';
import c from 'rss-parser';
const l = /(.+)\s+is\s+([A-Z]+)\s+\((.+)\)/,
    u = (e) => {
        let t = o.duration(e - 0, `seconds`),
            n = t.days(),
            r = t.hours(),
            i = t.minutes(),
            a = t.seconds();
        return n > 0 ? `${n}d ${r}h ${i}m ${a}s` : r > 0 ? `${r}h ${i}m ${a}s` : i > 0 ? `${i}m ${a}s` : `${a}s`;
    };
var d = class {
    constructor(e, t = 0, n = 0) {
        ((this.name = e), (this.uptime = t), (this.downtime = n));
    }
    uptimeRatio() {
        return this.uptime / (this.uptime + this.downtime);
    }
    downtimeRatio() {
        return this.downtime / (this.uptime + this.downtime);
    }
    up(e) {
        this.uptime += e - 0;
    }
    down(e) {
        this.downtime += e - 0;
    }
};
const f = {
    path: `/rss/:id/:routeParams?`,
    categories: [`forecast`],
    example: `/uptimerobot/rss/u358785-e4323652448755805d668f1a66506f2f`,
    parameters: {
        id: 'the last part of your RSS URL (e.g. `u358785-e4323652448755805d668f1a66506f2f` for `https://rss.uptimerobot.com/u358785-e4323652448755805d668f1a66506f2f`)',
        routeParams: `extra parameters, see the table below`,
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`rss.uptimerobot.com/:id`], target: `/rss/:id` }],
    name: `RSS`,
    maintainers: [`Rongronggg9`],
    handler: p,
    description: `| Key    | Description                                                              | Accepts        | Defaults to |
| ------ | ------------------------------------------------------------------------ | -------------- | ----------- |
| showID | Show monitor ID (disabling it will also disable link for each RSS entry) | 0/1/true/false | true        |`,
};
async function p(o) {
    let f = o.req.param(`id`),
        p = n(void 0, t(Object.fromEntries(new URLSearchParams(o.req.param(`routeParams`))).showID), !0),
        m = `https://rss.uptimerobot.com/${f}`,
        h = await new c({ customFields: { item: [`details:duration`] } }).parseURL(m),
        g = {},
        _ = h.items.toReversed().map((t) => {
            let n = t.title.match(l);
            if (!n) throw new e(`Unexpected title, please open an issue.`);
            let [o, c, f] = n.slice(1);
            if (f !== t.link) throw new e(`Monitor ID mismatch, please open an issue.`);
            let m;
            try {
                m = !f.startsWith(`http`) && f.includes(`.`) ? new URL(`http://${f}`).href : new URL(f).href;
            } catch {}
            let h = t[`details:duration`],
                _ = (g[o] = g[o] || new d(o));
            if (c === `UP`) _.up(h);
            else if (c === `DOWN`) _.down(h);
            else throw new e(`Unexpected status, please open an issue.`);
            let v = s(
                a(r, {
                    children: [
                        `Already `,
                        c,
                        ` for `,
                        u(h),
                        i(`br`, {}),
                        i(`br`, {}),
                        p && f ? a(r, { children: [`Monitor ID:`, ` `, m ? i(`a`, { href: m, target: `_blank`, children: f }) : f, i(`br`, {}), i(`br`, {})] }) : null,
                        `Uptime: `,
                        u(_.uptime),
                        i(`br`, {}),
                        `Downtime: `,
                        u(_.downtime),
                        i(`br`, {}),
                        `Availability:`,
                        ` `,
                        Number(_.uptimeRatio()).toLocaleString(void 0, { style: `percent`, minimumFractionDigits: 2 }),
                        t.content && t.content.trim() !== `Alert Details:` ? a(r, { children: [i(`br`, {}), i(`br`, {}), t.content] }) : null,
                    ],
                })
            );
            return { ...t, title: `[${c}] ${o}`, description: v, link: p ? m : null };
        });
    return { title: `Uptime Robot - RSS (enhanced)`, description: h.description, link: m, item: _, image: `https://uptimerobot.com/favicon.ico` };
}
export { f as route };
