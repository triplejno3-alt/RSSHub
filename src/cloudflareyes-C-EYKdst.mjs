import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = ({ line: e, latency: t, loss: n, speed: i, node: o, ip: c }) => s(a(r, { children: [`[`, e, ` | `, t, ` | `, n, ` | `, i, ` | `, o, `] `, c] })),
    l = ({ line: e, latency: t, loss: n, speed: r, node: o, ip: c }) =>
        s(
            i(`table`, {
                children: a(`tbody`, {
                    children: [
                        a(`tr`, { children: [i(`th`, { children: `Line` }), i(`td`, { children: e })] }),
                        a(`tr`, { children: [i(`th`, { children: `Latency` }), i(`td`, { children: t })] }),
                        a(`tr`, { children: [i(`th`, { children: `Loss` }), i(`td`, { children: n })] }),
                        a(`tr`, { children: [i(`th`, { children: `Speed` }), i(`td`, { children: r })] }),
                        a(`tr`, { children: [i(`th`, { children: `Node` }), i(`td`, { children: o })] }),
                        a(`tr`, { children: [i(`th`, { children: `IP` }), i(`td`, { children: c })] }),
                    ],
                }),
            })
        ),
    u = { CM: `中国移动`, CU: `中国联通`, CT: `中国电信` },
    d = {
        path: `/cloudflareyes/:type?`,
        categories: [`other`],
        example: `/hostmonit/cloudflareyes`,
        parameters: { type: `类型，见下表，默认为 v4` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `CloudFlareYes`,
        maintainers: [`nczitzk`],
        handler: f,
        description: `| v4 | v6 |
| -- | -- |
|    | v6 |`,
    };
async function f(r) {
    let { type: i = `v4` } = r.req.param(),
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 30,
        s = `hostmonit.com`,
        d = `CloudFlareYes${i === `v6` ? i.toUpperCase() : ``}`,
        f = `https://stock.${s}`,
        p = `https://api.${s}`,
        m = new URL(`get_optimization_ip`, p).href,
        h = new URL(d, f).href,
        { data: g } = await t.post(m, { json: { key: `iDetkOys`, ...(i === `v6` ? { type: `v6` } : {}) } }),
        _ = g.info.slice(0, a).map((t) => {
            let r = t.ip,
                i = t.latency === void 0 ? void 0 : `${t.latency}ms`,
                a = t.line === void 0 ? void 0 : Object.hasOwn(u, t.line) ? u[t.line] : t.line,
                o = t.loss === void 0 ? void 0 : `${t.loss}%`,
                f = t.node,
                p = t.speed === void 0 ? void 0 : `${t.speed} KB/s`,
                m = n(e(t.time), 8);
            return {
                title: c({ line: a, latency: i, loss: o, speed: p, node: f, ip: r }),
                link: h,
                description: l({ line: a, node: f, ip: r, latency: i, loss: o, speed: p }),
                author: f,
                category: [a, i, o, f].filter(Boolean),
                guid: `${s}-${d}-${r}#${m.toISOString()}`,
                pubDate: m,
            };
        }),
        { data: v } = await t(h),
        y = o(v),
        b = new URL(y(`link[rel="icon"]`).prop(`href`), f).href;
    return {
        item: _,
        title: y(`title`).text().replace(/- .*$/, `- ${d}`),
        link: h,
        description: y(`meta[name="description"]`).prop(`content`),
        language: y(`html`).prop(`lang`),
        icon: b,
        logo: b,
        subtitle: d,
        author: y(`title`).text().split(/\s-/)[0],
        allowEmpty: !0,
    };
}
export { d as route };
