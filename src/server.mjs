import { n as e, t } from './ofetch-uhy-qh6X.mjs';
import { t as n } from './config-Cc-zZ5p-.mjs';
import { n as r, r as i } from './header-generator-BdIWHTob.mjs';
import { t as a } from './logger-_vmdpChp.mjs';
import { t as o } from './proxy-6vblFdo1.mjs';
import { n as s, t as c } from './cache-DLkCV5c7.mjs';
import { t as l } from './not-found-C-Horq2w.mjs';
import { t as u } from './reject-BES9cPty.mjs';
import { t as d } from './md5-DQN6cWFb.mjs';
import { t as f } from './request-in-progress-DJ9USKmm.mjs';
import { a as ee, n as te, t as ne } from './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { n as re, t as p } from './common-utils-uYpL50sT.mjs';
import { createRequire as ie } from 'node:module';
import m from 'node:http';
import h from 'node:https';
import ae, { FormData as oe, Headers as se, Request as g, Response as ce } from 'undici';
import _ from 'node:path';
import { RateLimiterMemory as le, RateLimiterQueue as ue } from 'rate-limiter-flexible';
import { Hono as de } from 'hono';
import { compress as fe } from 'hono/compress';
import { jsxRenderer as pe } from 'hono/jsx-renderer';
import { trimTrailingSlash as me } from 'hono/trailing-slash';
import { OpenAPIHono as he, createRoute as v, z as y } from '@hono/zod-openapi';
import { Scalar as ge } from '@scalar/hono-api-reference';
import { serveStatic as _e } from '@hono/node-server/serve-static';
import { routePath as b } from 'hono/route';
import { execSync as ve } from 'node:child_process';
import { Fragment as x, jsx as S, jsxs as C } from 'hono/jsx/jsx-runtime';
import { PrometheusExporter as ye, PrometheusSerializer as be } from '@opentelemetry/exporter-prometheus';
import { resourceFromAttributes as xe } from '@opentelemetry/resources';
import { MeterProvider as Se } from '@opentelemetry/sdk-metrics';
import { ATTR_SERVICE_NAME as Ce } from '@opentelemetry/semantic-conventions';
import { trace as we } from '@opentelemetry/api';
import { OTLPTraceExporter as Te } from '@opentelemetry/exporter-trace-otlp-http';
import { BasicTracerProvider as Ee, BatchSpanProcessor as De } from '@opentelemetry/sdk-trace-base';
import Oe from 'node:fs';
import { parse as w } from 'tldts';
import * as T from '@sentry/node';
import { load as E } from 'cheerio';
import ke from 'xxhash-wasm';
import Ae from 'etag';
import je from '@postlight/parser';
import * as D from 'entities';
import { convert as O } from 'html-to-text';
import Me from 'markdown-it';
import { RE2JS as k } from 're2js';
import Ne from 'sanitize-html';
import { simplecc as Pe } from 'simplecc-wasm';
import Fe from 'dayjs';
const Ie = new ue(new le({ points: 10, duration: 1, execEvenly: !0 }), { maxQueueSize: 4800 }),
    Le = (t) => {
        process.env.NODE_ENV === `dev` &&
            e((e) => {
                for (let [n, r] of t.entries()) e.requestHeaders[n] = r;
                return e;
            });
    };
var Re = async (e, t) => {
        let s = new g(e, t),
            c = {};
        a.debug(`Outgoing request: ${s.method} ${s.url}`);
        let l = r(t?.headerGeneratorOptions);
        s.headers.has(`user-agent`) || s.headers.set(`user-agent`, n.ua);
        for (let e of i) !s.headers.has(e) && l[e] && s.headers.set(e, l[e]);
        if (!s.headers.get(`referer`))
            try {
                let e = new URL(s.url);
                s.headers.set(`referer`, e.origin);
            } catch {}
        let u = !1;
        if ((s.headers.get(`x-prefer-proxy`) && ((u = !0), s.headers.delete(`x-prefer-proxy`)), n.enableRemoteDebugging && Le(s.headers), !t?.dispatcher && (o.proxyObj.strategy !== `on_retry` || u))) {
            let e = new RegExp(o.proxyObj.url_regex),
                t;
            try {
                t = new URL(s.url);
            } catch {}
            if (e.test(s.url) && s.url.startsWith(`http`) && !(t && t.host === o.proxyUrlHandler?.host)) {
                let e = o.getCurrentProxy();
                if (e) {
                    let t = o.getDispatcherForProxy(e);
                    t && ((c.dispatcher = t), a.debug(`Proxying request via ${e.uri}: ${s.url}`));
                }
            }
        }
        await Ie.removeTokens(1);
        let d = o.multiProxy?.allProxies.length || 1,
            f = async (e) => {
                try {
                    return await ae.fetch(s, c);
                } catch (t) {
                    if (c.dispatcher && o.multiProxy && e < d - 1) {
                        let n = o.getCurrentProxy();
                        if (n) {
                            (a.warn(`Request failed with proxy ${n.uri}, trying next proxy: ${t}`), o.markProxyFailed(n.uri));
                            let r = o.getCurrentProxy();
                            if (r && r.uri !== n.uri) {
                                let t = o.getDispatcherForProxy(r);
                                return (t && (c.dispatcher = t), a.debug(`Retrying request with proxy ${r.uri}: ${s.url}`), f(e + 1));
                            } else return (a.warn(`No more proxies available, trying without proxy`), delete c.dispatcher, f(e + 1));
                        }
                    }
                    throw t;
                }
            };
        return f(0);
    },
    A = (e) =>
        function (...t) {
            let s,
                c = {},
                l;
            if (typeof t[0] == `string` || t[0] instanceof URL) ((s = new URL(t[0])), typeof t[1] == `object` ? ((c = t[1]), (l = t[2])) : typeof t[1] == `function` && ((c = {}), (l = t[1])));
            else {
                c = t[0];
                try {
                    s = new URL(c.href || `${c.protocol || `http:`}//${c.hostname || c.host}${c.path}${c.search || (c.query ? `?${c.query}` : ``)}`);
                } catch {
                    s = null;
                }
                typeof t[1] == `function` && (l = t[1]);
            }
            if (!s) return Reflect.apply(e, this, t);
            (a.debug(`Outgoing request: ${c.method || `GET`} ${s}`), (c.headers = c.headers || {}));
            let u = new Set(Object.keys(c.headers).map((e) => e.toLowerCase())),
                d = r(c.headerGeneratorOptions);
            u.has(`user-agent`) || (c.headers[`user-agent`] = n.ua);
            for (let e of i) !u.has(e) && d[e] && (c.headers[e] = d[e]);
            (u.has(`referer`) || (c.headers.referer = s.origin),
                !c.agent &&
                    o.agent &&
                    new RegExp(o.proxyObj.url_regex).test(s.toString()) &&
                    s.protocol.startsWith(`http`) &&
                    s.host !== o.proxyUrlHandler?.host &&
                    s.host !== `localhost` &&
                    !s.host.startsWith(`127.`) &&
                    !(n.puppeteerWSEndpoint?.includes(s.host) ?? !1) &&
                    (c.agent = o.agent));
            let { headerGeneratorOptions: f, ...ee } = c;
            return Reflect.apply(e, this, [s, ee, l]);
        };
(Object.defineProperties(globalThis, {
    fetch: { value: Re, writable: !0, configurable: !0 },
    Headers: { value: se, writable: !0, configurable: !0 },
    FormData: { value: oe, writable: !0, configurable: !0 },
    Request: { value: g, writable: !0, configurable: !0 },
    Response: { value: ce, writable: !0, configurable: !0 },
}),
    (m.get = A(m.get)),
    (m.request = A(m.request)),
    (h.get = A(h.get)),
    (h.request = A(h.request)));
var ze = (e) => (e.header(`Cache-Control`, `no-cache`), e.text(`ok`));
const Be = { hitCache: 0, request: 0, etag: 0, error: 0, routes: {}, paths: {}, errorRoutes: {}, errorPaths: {} },
    j = () => Be,
    M = (e) => Object.assign(Be, e);
let N = process.env.HEROKU_SLUG_COMMIT?.slice(0, 8) || process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8),
    P;
if (!N)
    try {
        ((N = ve(`git rev-parse HEAD`).toString().trim().slice(0, 8)), (P = new Date(ve(`git log -1 --format=%cd`).toString().trim())));
    } catch {
        N = `unknown`;
    }
const Ve = (e) =>
        C(`html`, {
            children: [
                C(`head`, {
                    children: [
                        S(`title`, { children: `Welcome to RSSHub!` }),
                        S(`script`, { src: `https://cdn.tailwindcss.com` }),
                        S(`style`, {
                            children: `
                details::-webkit-scrollbar {
                    width: 0.25rem;
                }
                details::-webkit-scrollbar-thumb {
                    border-radius: 0.125rem;
                    background-color: #e4e4e7;
                }
                details::-webkit-scrollbar-thumb:hover {
                    background-color: #a1a1aa;
                }

                @font-face {
                    font-family: SN Pro;
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: url(https://cdn.jsdelivr.net/fontsource/fonts/sn-pro@latest/latin-400-normal.woff2) format(woff2);
                }
                @font-face {
                    font-family: SN Pro;
                    font-style: normal;
                    font-display: swap;
                    font-weight: 500;
                    src: url(https://cdn.jsdelivr.net/fontsource/fonts/sn-pro@latest/latin-500-normal.woff2) format(woff2);
                }
                @font-face {
                    font-family: SN Pro;
                    font-style: normal;
                    font-display: swap;
                    font-weight: 700;
                    src: url(https://cdn.jsdelivr.net/fontsource/fonts/sn-pro@latest/latin-700-normal.woff2) format(woff2);
                }
                body {
                    font-family: SN Pro, sans-serif;
                }
                `,
                        }),
                    ],
                }),
                S(`body`, { className: `antialiased min-h-screen text-zinc-700 flex flex-col`, children: e.children }),
            ],
        }),
    He = Date.now();
var Ue = ({ debugQuery: e }) => {
        let t = j(),
            r = !n.debugInfo || n.debugInfo === `false` ? !1 : n.debugInfo === `true` || n.debugInfo === e,
            { disallowRobot: i, nodeName: a, cache: o } = n,
            s = Date.now() - He,
            c = {
                showDebug: r,
                disallowRobot: i,
                debug: [
                    ...(a ? [{ name: `Node Name`, value: a }] : []),
                    ...(N ? [{ name: `Git Hash`, value: S(`a`, { className: `underline`, href: `https://github.com/DIYgod/RSSHub/commit/${N}`, children: N }) }] : []),
                    ...(P ? [{ name: `Git Date`, value: P.toUTCString() }] : []),
                    { name: `Cache Duration`, value: o.routeExpire + `s` },
                    { name: `Request Amount`, value: t.request },
                    { name: `Request Frequency`, value: ((t.request / (s / 1e3)) * 60).toFixed(3) + ` times/minute` },
                    { name: `Cache Hit Ratio`, value: t.request ? ((t.hitCache / t.request) * 100).toFixed(2) + `%` : 0 },
                    { name: `ETag Matched Ratio`, value: t.request ? ((t.etag / t.request) * 100).toFixed(2) + `%` : 0 },
                    { name: `Health`, value: t.request ? ((1 - t.error / t.request) * 100).toFixed(2) + `%` : 0 },
                    { name: `Uptime`, value: (s / 36e5).toFixed(2) + ` hour(s)` },
                    {
                        name: `Hot Routes`,
                        value: Object.keys(t.routes)
                            .toSorted((e, n) => t.routes[n] - t.routes[e])
                            .slice(0, 30)
                            .map((e) => C(x, { children: [t.routes[e], ` `, e, S(`br`, {})] })),
                    },
                    {
                        name: `Hot Paths`,
                        value: Object.keys(t.paths)
                            .toSorted((e, n) => t.paths[n] - t.paths[e])
                            .slice(0, 30)
                            .map((e) => C(x, { children: [t.paths[e], ` `, e, S(`br`, {})] })),
                    },
                    {
                        name: `Hot Error Routes`,
                        value: Object.keys(t.errorRoutes)
                            .toSorted((e, n) => t.errorRoutes[n] - t.errorRoutes[e])
                            .slice(0, 30)
                            .map((e) => C(x, { children: [t.errorRoutes[e], ` `, e, S(`br`, {})] })),
                    },
                    {
                        name: `Hot Error Paths`,
                        value: Object.keys(t.errorPaths)
                            .toSorted((e, n) => t.errorPaths[n] - t.errorPaths[e])
                            .slice(0, 30)
                            .map((e) => C(x, { children: [t.errorPaths[e], ` `, e, S(`br`, {})] })),
                    },
                ],
            };
        return C(Ve, {
            children: [
                S(`div`, {
                    className: `pointer-events-none absolute w-full min-h-screen`,
                    style: {
                        backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAzMicgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyBmaWxsPSdub25lJyBzdHJva2U9J3JnYigxNSAyMyA0MiAvIDAuMDQpJz48cGF0aCBkPSdNMCAuNUgzMS41VjMyJy8+PC9zdmc+')`,
                        maskImage: `linear-gradient(transparent, black, transparent)`,
                    },
                }),
                C(`div`, {
                    className: `w-full grow shrink-0 py-8 flex items-center justify-center flex-col space-y-4`,
                    children: [
                        S(`img`, { src: `./logo.png`, alt: `RSSHub`, width: `100`, loading: `lazy` }),
                        C(`h1`, { className: `text-4xl font-bold`, children: [`Welcome to `, S(`span`, { className: `text-[#F5712C]`, children: `RSSHub` }), `!`] }),
                        S(`p`, { className: `text-xl font-medium text-zinc-600`, children: `The world's largest RSS Network.` }),
                        S(`p`, { className: `text-zinc-500`, children: `If you see this page, the RSSHub is successfully installed and working.` }),
                        C(`div`, {
                            className: `font-bold space-x-4 text-sm`,
                            children: [
                                S(`a`, {
                                    target: `_blank`,
                                    href: `https://docs.rsshub.app`,
                                    children: S(`button`, { className: `text-white bg-[#F5712C] hover:bg-[#DD4A15] py-2 px-4 rounded-full transition-colors`, children: `Home` }),
                                }),
                                S(`a`, {
                                    target: `_blank`,
                                    href: `https://github.com/DIYgod/RSSHub`,
                                    children: S(`button`, { className: `bg-zinc-200 hover:bg-zinc-300 py-2 px-4 rounded-full transition-colors`, children: `GitHub` }),
                                }),
                            ],
                        }),
                        c.showDebug
                            ? C(`details`, {
                                  className: `text-xs w-96 !mt-8 max-h-[400px] overflow-auto`,
                                  children: [
                                      S(`summary`, { className: `text-sm cursor-pointer`, children: `Debug Info` }),
                                      c.debug.map((e) =>
                                          C(`div`, {
                                              class: `debug-item my-3 pl-8`,
                                              children: [
                                                  C(`span`, { class: `debug-key w-32 text-right inline-block mr-2`, children: [e.name, `: `] }),
                                                  S(`span`, { class: `debug-value inline-block break-all align-top`, children: e.value }),
                                              ],
                                          })
                                      ),
                                  ],
                              })
                            : null,
                    ],
                }),
                C(`div`, {
                    className: `text-center pt-4 pb-8 w-full text-sm font-medium space-y-2`,
                    children: [
                        C(`p`, {
                            className: `space-x-4`,
                            children: [
                                S(`a`, { target: `_blank`, href: `https://github.com/DIYgod/RSSHub`, children: S(`img`, { className: `inline`, src: `https://icons.ly/github/_/fff`, alt: `github`, width: `20`, height: `20` }) }),
                                S(`a`, { target: `_blank`, href: `https://t.me/rsshub`, children: S(`img`, { className: `inline`, src: `https://icons.ly/telegram`, alt: `telegram group`, width: `20`, height: `20` }) }),
                                S(`a`, { target: `_blank`, href: `https://t.me/awesomeRSSHub`, children: S(`img`, { className: `inline`, src: `https://icons.ly/telegram`, alt: `telegram channel`, width: `20`, height: `20` }) }),
                                S(`a`, {
                                    target: `_blank`,
                                    href: `https://x.com/intent/follow?screen_name=_RSSHub`,
                                    className: `text-[#F5712C]`,
                                    children: S(`img`, { className: `inline`, src: `https://icons.ly/x`, alt: `X`, width: `20`, height: `20` }),
                                }),
                            ],
                        }),
                        C(`p`, {
                            className: `!mt-6`,
                            children: [
                                `Please consider`,
                                ` `,
                                S(`a`, { target: `_blank`, href: `https://docs.rsshub.app/sponsor`, className: `text-[#F5712C]`, children: `sponsoring` }),
                                ` `,
                                `to help keep this open source project alive.`,
                            ],
                        }),
                        C(`p`, {
                            children: [
                                `Made with ❤️ by`,
                                ` `,
                                S(`a`, { target: `_blank`, href: `https://diygod.cc`, className: `text-[#F5712C]`, children: `DIYgod` }),
                                ` `,
                                `and`,
                                ` `,
                                S(`a`, { target: `_blank`, href: `https://github.com/DIYgod/RSSHub/graphs/contributors`, className: `text-[#F5712C]`, children: `Contributors` }),
                                ` `,
                                `under AGPL-3.0 License.`,
                            ],
                        }),
                    ],
                }),
            ],
        });
    },
    We = (e) => (e.header(`Cache-Control`, `no-cache`), e.html(S(Ue, { debugQuery: e.req.query(`debug`) })));
const F = `rsshub`,
    Ge = new ye({}),
    Ke = new Se({ resource: xe({ [Ce]: `rsshub` }), readers: [Ge] }),
    qe = new be(),
    I = Ke.getMeter(`rsshub`),
    Je = I.createCounter(`${F}_request_total`),
    Ye = I.createCounter(`${F}_request_error_total`),
    Xe = I.createHistogram(`${F}_request_duration_seconds_bucket`, { advice: { explicitBucketBoundaries: n.otel.seconds_bucket?.split(`,`).map(Number) } }),
    Ze = I.createHistogram(`${F}_request_duration_milliseconds_bucket`, { advice: { explicitBucketBoundaries: n.otel.milliseconds_bucket?.split(`,`).map(Number) } }),
    Qe = {
        success: (e, t) => {
            (Je.add(1, t), Ze.record(e, { unit: `millisecond`, ...t }), Xe.record(e / 1e3, { unit: `second`, ...t }));
        },
        error: (e) => {
            Ye.add(1, e);
        },
    },
    $e = () =>
        new Promise((e, t) => {
            Ge.collect()
                .then((t) => {
                    e(qe.serialize(t.resourceMetrics));
                })
                .finally(() => {
                    t(``);
                });
        }),
    et = new Te({}),
    tt = new Ee({ resource: xe({ [Ce]: `rsshub` }), spanProcessors: [new De(et, { maxQueueSize: 4096, scheduledDelayMillis: 3e4 })] });
we.setGlobalTracerProvider(tt);
const nt = tt.getTracer(`rsshub`);
nt.startSpan(`main`);
var rt = (e) =>
        $e()
            .then((t) => e.text(t))
            .catch((t) => {
                (e.status(500), e.json({ error: t }));
            }),
    it = (e) =>
        n.disallowRobot
            ? e.text(`User-agent: *
Disallow: /`)
            : (e.status(404), e.text(``));
const at = ie(import.meta.url),
    ot = new Set([`.js`, `.mjs`, `.cjs`, `.ts`, `.tsx`, `.json`]),
    st = (e, t) => {
        let n = Oe.readdirSync(e, { withFileTypes: !0 }),
            r = [];
        for (let i of n) {
            let n = _.join(e, i.name);
            if (i.isDirectory()) {
                t && r.push(...st(n, t));
                continue;
            }
            i.isFile() && r.push(n);
        }
        return r;
    },
    ct = ({ targetDirectoryPath: e, importPattern: t = /.*/, includeSubdirectories: n = !0 }) => {
        let r = {},
            i = st(e, n);
        for (let n of i) {
            let { ext: i } = _.parse(n),
                a = ot.has(i),
                o = n.endsWith(`.d.ts`) || n.endsWith(`.d.tsx`),
                s = t.test(n);
            if (!a || o || !s) continue;
            let c = n.slice(e.length);
            r[c] = at(n);
        }
        return r;
    },
    lt = import.meta.dirname;
function ut(e) {
    return Object.values(e).every((e) => !e.features?.nsfw);
}
function dt(e) {
    let t = {};
    for (let [n, r] of Object.entries(e)) (r.routes === null || r.routes === void 0 || ut(r.routes)) && (t[n] = r);
    return t;
}
let L = {},
    R = {};
if (n.isPackage) R = (await import(`./routes-tYlw6rum.mjs`)).default;
else
    switch (process.env.NODE_ENV || process.env.VERCEL_ENV) {
        case `production`:
            R = (await import(`./routes-tYlw6rum.mjs`)).default;
            break;
        case `test`:
            ((R = await import(`./routes-BzNYKK4X.mjs`)), R.default && (R = R.default));
            break;
        default:
            L = ct({ targetDirectoryPath: _.join(lt, `./routes`), importPattern: /\.tsx?$/ });
    }
if ((n.feature.disable_nsfw && (R = dt(R)), Object.keys(L).length))
    for (let e in L) {
        let t = L[e],
            n = e.split(/[/\\]/)[1];
        if (`namespace` in t) R[n] = Object.assign({ routes: {} }, R[n], t.namespace);
        else if (`route` in t)
            if ((R[n] || (R[n] = { name: n, routes: {}, apiRoutes: {} }), Array.isArray(t.route.path))) for (let r of t.route.path) R[n].routes[r] = { ...t.route, location: e.split(/[/\\]/).slice(2).join(`/`) };
            else R[n].routes[t.route.path] = { ...t.route, location: e.split(/[/\\]/).slice(2).join(`/`) };
        else if (`apiRoute` in t)
            if ((R[n] || (R[n] = { name: n, routes: {}, apiRoutes: {} }), Array.isArray(t.apiRoute.path))) for (let r of t.apiRoute.path) R[n].apiRoutes[r] = { ...t.apiRoute, location: e.split(/[/\\]/).slice(2).join(`/`) };
            else R[n].apiRoutes[t.apiRoute.path] = { ...t.apiRoute, location: e.split(/[/\\]/).slice(2).join(`/`) };
    }
const z = new de(),
    ft = (e) =>
        Object.entries(e).toSorted(([e], [t]) => {
            let n = e.split(`/`),
                r = t.split(`/`),
                i = n.length,
                a = r.length,
                o = Math.min(i, a);
            for (let e = 0; e < o; e++) {
                let t = n[e],
                    i = r[e];
                if (t.startsWith(`:`) !== i.startsWith(`:`)) return t.startsWith(`:`) ? 1 : -1;
            }
            return 0;
        });
for (let e in R) {
    let t = z.basePath(`/${e}`),
        n = R[e];
    if (!n || !n.routes) continue;
    let r = ft(n.routes);
    for (let [n, i] of r)
        t.get(n, async (t) => {
            if ((a.debug(`Matched route: ${b(t)}`), !t.get(`data`))) {
                if (typeof i.handler != `function`) {
                    if (process.env.NODE_ENV === `test`) {
                        let { route: t } = await import(`./routes/${e}/${i.location}`);
                        i.handler = t.handler;
                    } else if (i.module) {
                        let { route: e } = await i.module();
                        i.handler = e.handler;
                    }
                }
                let n = await i.handler(t);
                if (n instanceof Response) return n;
                t.set(`data`, n);
            }
        });
}
for (let e in R) {
    let t = z.basePath(`/api/${e}`),
        n = R[e];
    if (!n || !n.apiRoutes) continue;
    let r = Object.entries(n.apiRoutes);
    for (let [n, i] of r)
        t.get(n, async (t) => {
            if (!t.get(`apiData`)) {
                if (typeof i.handler != `function`) {
                    if (process.env.NODE_ENV === `test`) {
                        let { apiRoute: t } = await import(`./routes/${e}/${i.location}`);
                        i.handler = t.handler;
                    } else if (i.module) {
                        let { apiRoute: e } = await i.module();
                        i.handler = e.handler;
                    }
                }
                let n = await i.handler(t);
                t.set(`apiData`, n);
            }
        });
}
(z.get(`/`, We),
    z.get(`/healthz`, ze),
    z.get(`/robots.txt`, it),
    n.debugInfo && z.get(`/metrics`, rt),
    !n.isPackage && !process.env.VERCEL_ENV && !s && z.use(`/*`, _e({ root: _.join(lt, `assets`), rewriteRequestPath: (e) => (e === `/favicon.ico` ? `/favicon.png` : e) })));
var pt = z;
const B = {};
for (let e in R) for (let t in R[e].routes) if (R[e].routes[t].categories?.length) for (let n of R[e].routes[t].categories) (B[n] || (B[n] = {}), B[n][e] || (B[n][e] = { ...R[e], routes: {} }), (B[n][e].routes[t] = R[e].routes[t]));
const mt = y.object({ category: y.string().openapi({ param: { name: `category`, in: `path` }, example: `popular` }) }),
    ht = v({
        method: `get`,
        path: `/category/{category}`,
        tags: [`Category`],
        request: {
            query: y.object({
                categories: y
                    .string()
                    .transform((e) => e.split(`,`))
                    .optional(),
                lang: y.string().optional(),
            }),
            params: mt,
        },
        responses: { 200: { description: `Namespace list by categories and language` } },
    }),
    gt = (e) => {
        let { categories: t, lang: n } = e.req.valid(`query`),
            { category: r } = e.req.valid(`param`),
            i = [r];
        t && t.length > 0 && (i = [...i, ...t]);
        let a = Object.keys(B[r] || {}).filter((e) => i.every((t) => B[t]?.[e])),
            o = Object.fromEntries(a.map((e) => [e, B[r][e]]));
        return (n && (o = Object.fromEntries(Object.entries(o).filter(([, e]) => e.lang === n))), e.json(o));
    },
    _t = v({ method: `get`, path: `/follow/config`, tags: [`Follow`], responses: { 200: { description: `Follow config` } } }),
    vt = (e) => e.json({ ownerUserId: n.follow.ownerUserId, description: n.follow.description, price: n.follow.price, userLimit: n.follow.userLimit, cacheTime: n.cache.routeExpire, gitHash: N, gitDate: P?.getTime() }),
    yt = v({ method: `get`, path: `/namespace`, tags: [`Namespace`], responses: { 200: { description: `Information about all namespaces` } } }),
    bt = (e) => e.json(R),
    xt = v({
        method: `get`,
        path: `/namespace/{namespace}`,
        tags: [`Namespace`],
        request: { params: y.object({ namespace: y.string().openapi({ param: { name: `namespace`, in: `path` }, example: `github` }) }) },
        responses: { 200: { description: `Information about a namespace` } },
    }),
    St = (e) => {
        let { namespace: t } = e.req.valid(`param`);
        return e.json(R[t]);
    },
    V = {};
for (let e in R)
    for (let t in R[e].routes) {
        let n = `/${e}${t}`,
            r = R[e].routes[t];
        if (r.radar?.length)
            for (let t of r.radar) {
                let i = w(new URL(`https://` + t.source[0]).hostname),
                    a = i.subdomain || `.`,
                    o = i.domain;
                o &&
                    (V[o] || (V[o] = { _name: R[e].name }),
                    V[o][a] || (V[o][a] = []),
                    V[o][a].push({
                        title: t.title || r.name,
                        docs: `https://docs.rsshub.app/routes/${r.categories?.[0] || `other`}`,
                        source: t.source.map((e) => {
                            let t = new URL(`https://` + e);
                            return t.pathname + t.search + t.hash;
                        }),
                        target: t.target ? `/${e}${t.target}` : n,
                    }));
            }
    }
const Ct = v({ method: `get`, path: `/radar/rules`, tags: [`Radar`], responses: { 200: { description: `All Radar rules` } } }),
    wt = (e) => e.json(V),
    H = {};
for (let e in R)
    for (let t in R[e].routes) {
        let n = `/${e}${t}`,
            r = R[e].routes[t];
        if (r.radar?.length)
            for (let t of r.radar) {
                let i = w(new URL(`https://` + t.source[0]).hostname),
                    a = i.subdomain || `.`,
                    o = i.domain;
                o &&
                    (H[o] || (H[o] = { _name: R[e].name }),
                    H[o][a] || (H[o][a] = []),
                    H[o][a].push({
                        title: t.title || r.name,
                        docs: `https://docs.rsshub.app/routes/${r.categories?.[0] || `other`}`,
                        source: t.source.map((e) => {
                            let t = new URL(`https://` + e);
                            return t.pathname + t.search + t.hash;
                        }),
                        target: t.target ? `/${e}${t.target}` : n,
                    }));
            }
    }
const Tt = v({
        method: `get`,
        path: `/radar/rules/{domain}`,
        tags: [`Radar`],
        request: { params: y.object({ domain: y.string().openapi({ param: { name: `domain`, in: `path` }, example: `github.com` }) }) },
        responses: { 200: { description: `Radar rules for a domain name (does not support subdomains)` } },
    }),
    Et = (e) => {
        let { domain: t } = e.req.valid(`param`);
        return e.json(H[t]);
    },
    U = new he();
(U.openapi(yt, bt), U.openapi(xt, St), U.openapi(Ct, wt), U.openapi(Tt, Et), U.openapi(ht, gt), U.openapi(_t, vt));
const W = U.getOpenAPI31Document({ openapi: `3.1.0`, info: { version: `0.0.1`, title: `RSSHub API` } });
for (let e in W.paths) ((W.paths[`/api${e}`] = W.paths[e]), delete W.paths[e]);
(U.get(`/openapi.json`, (e) => e.json(W)), U.get(`/reference`, ge({ content: W })));
var Dt = U,
    Ot = ({ requestPath: e, message: t, errorRoute: n, nodeVersion: r }) =>
        C(Ve, {
            children: [
                S(`div`, {
                    className: `pointer-events-none absolute w-full min-h-screen`,
                    style: {
                        backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAzMicgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyBmaWxsPSdub25lJyBzdHJva2U9J3JnYigxNSAyMyA0MiAvIDAuMDQpJz48cGF0aCBkPSdNMCAuNUgzMS41VjMyJy8+PC9zdmc+')`,
                        maskImage: `linear-gradient(transparent, black, transparent)`,
                    },
                }),
                C(`div`, {
                    className: `w-full grow shrink-0 py-8 flex items-center justify-center flex-col space-y-4`,
                    children: [
                        S(`img`, { className: `grayscale`, src: `/logo.png`, alt: `RSSHub`, width: `100`, loading: `lazy` }),
                        S(`h1`, { className: `text-4xl font-bold`, children: `Looks like something went wrong` }),
                        C(`div`, {
                            className: `text-left w-[800px] space-y-6 !mt-10`,
                            children: [
                                C(`div`, {
                                    className: `space-y-2`,
                                    children: [
                                        S(`p`, { className: `mb-2 font-bold`, children: `Helpful Information` }),
                                        C(`p`, {
                                            className: `message`,
                                            children: [`Error Message:`, S(`br`, {}), S(`code`, { className: `mt-2 block max-h-28 overflow-auto bg-zinc-100 align-bottom w-fit details whitespace-pre-line`, children: t })],
                                        }),
                                        C(`p`, { className: `message`, children: [`Route: `, S(`code`, { className: `ml-2 bg-zinc-100`, children: n })] }),
                                        C(`p`, { className: `message`, children: [`Full Route: `, S(`code`, { className: `ml-2 bg-zinc-100`, children: e })] }),
                                        C(`p`, { className: `message`, children: [`Node Version: `, S(`code`, { className: `ml-2 bg-zinc-100`, children: r })] }),
                                        C(`p`, { className: `message`, children: [`Git Hash: `, S(`code`, { className: `ml-2 bg-zinc-100`, children: N })] }),
                                        C(`p`, { className: `message`, children: [`Git Date: `, S(`code`, { className: `ml-2 bg-zinc-100`, children: P?.toUTCString() })] }),
                                    ],
                                }),
                                C(`div`, {
                                    children: [
                                        S(`p`, { className: `mb-2 font-bold`, children: `Report` }),
                                        C(`p`, {
                                            children: [
                                                `After carefully reading the`,
                                                ` `,
                                                S(`a`, { className: `text-[#F5712C]`, href: `https://docs.rsshub.app/`, target: `_blank`, children: `document` }),
                                                `, if you think this is a bug of RSSHub, please`,
                                                ` `,
                                                S(`a`, {
                                                    className: `text-[#F5712C]`,
                                                    href: `https://github.com/DIYgod/RSSHub/issues/new?assignees=&labels=RSS+bug&template=bug_report_en.yml`,
                                                    target: `_blank`,
                                                    children: `submit an issue`,
                                                }),
                                                ` `,
                                                `on GitHub.`,
                                            ],
                                        }),
                                        C(`p`, {
                                            children: [
                                                `在仔细阅读`,
                                                S(`a`, { className: `text-[#F5712C]`, href: `https://docs.rsshub.app/zh/`, target: `_blank`, children: `文档` }),
                                                `后，如果你认为这是 RSSHub 的 bug，请在 GitHub`,
                                                ` `,
                                                S(`a`, {
                                                    className: `text-[#F5712C]`,
                                                    href: `https://github.com/DIYgod/RSSHub/issues/new?assignees=&labels=RSS+bug&template=bug_report_zh.yml`,
                                                    target: `_blank`,
                                                    children: `提交 issue`,
                                                }),
                                                `。`,
                                            ],
                                        }),
                                    ],
                                }),
                                C(`div`, {
                                    children: [
                                        S(`p`, { className: `mb-2 font-bold`, children: `Community` }),
                                        C(`p`, {
                                            children: [
                                                `You can also join our`,
                                                ` `,
                                                S(`a`, { className: `text-[#F5712C]`, target: `_blank`, href: `https://t.me/rsshub`, children: `Telegram group` }),
                                                `, or follow our`,
                                                ` `,
                                                S(`a`, { className: `text-[#F5712C]`, target: `_blank`, href: `https://t.me/awesomeRSSHub`, children: `Telegram channel` }),
                                                ` `,
                                                `and`,
                                                ` `,
                                                S(`a`, { target: `_blank`, href: `https://x.com/intent/follow?screen_name=_RSSHub`, className: `text-[#F5712C]`, children: `Twitter` }),
                                                ` `,
                                                `to get community support and news.`,
                                            ],
                                        }),
                                        C(`p`, {
                                            children: [
                                                `你也可以加入我们的`,
                                                ` `,
                                                S(`a`, { className: `text-[#F5712C]`, target: `_blank`, href: `https://t.me/rsshub`, children: `Telegram 群组` }),
                                                `，或关注我们的`,
                                                ` `,
                                                S(`a`, { className: `text-[#F5712C]`, target: `_blank`, href: `https://t.me/awesomeRSSHub`, children: `Telegram 频道` }),
                                                `和`,
                                                ` `,
                                                S(`a`, { target: `_blank`, href: `https://x.com/intent/follow?screen_name=_RSSHub`, className: `text-[#F5712C]`, children: `Twitter` }),
                                                ` `,
                                                `获取社区支持和新闻。`,
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                C(`div`, {
                    className: `mt-4 pb-8 text-center w-full text-sm font-medium space-y-2`,
                    children: [
                        C(`p`, {
                            className: `space-x-4`,
                            children: [
                                S(`a`, { target: `_blank`, href: `https://github.com/DIYgod/RSSHub`, children: S(`img`, { className: `inline`, src: `https://icons.ly/github/_/fff`, alt: `github`, width: `20`, height: `20` }) }),
                                S(`a`, { target: `_blank`, href: `https://t.me/rsshub`, children: S(`img`, { className: `inline`, src: `https://icons.ly/telegram`, alt: `telegram group`, width: `20`, height: `20` }) }),
                                S(`a`, { target: `_blank`, href: `https://t.me/awesomeRSSHub`, children: S(`img`, { className: `inline`, src: `https://icons.ly/telegram`, alt: `telegram channel`, width: `20`, height: `20` }) }),
                                S(`a`, {
                                    target: `_blank`,
                                    href: `https://x.com/intent/follow?screen_name=_RSSHub`,
                                    className: `text-[#F5712C]`,
                                    children: S(`img`, { className: `inline`, src: `https://icons.ly/x`, alt: `X`, width: `20`, height: `20` }),
                                }),
                            ],
                        }),
                        C(`p`, {
                            className: `!mt-6`,
                            children: [
                                `Please consider`,
                                ` `,
                                S(`a`, { target: `_blank`, href: `https://docs.rsshub.app/sponsor`, className: `text-[#F5712C]`, children: `sponsoring` }),
                                ` `,
                                `to help keep this open source project alive.`,
                            ],
                        }),
                        C(`p`, {
                            children: [
                                `Made with ❤️ by`,
                                ` `,
                                S(`a`, { target: `_blank`, href: `https://diygod.cc`, className: `text-[#F5712C]`, children: `DIYgod` }),
                                ` `,
                                `and`,
                                ` `,
                                S(`a`, { target: `_blank`, href: `https://github.com/DIYgod/RSSHub/graphs/contributors`, className: `text-[#F5712C]`, children: `Contributors` }),
                                ` `,
                                `under AGPL-3.0 License.`,
                            ],
                        }),
                    ],
                }),
            ],
        });
const kt = (e, t) => {
        let r = t.req.path,
            i = b(t),
            o = i !== `/*`,
            s = j();
        try {
            t.res.headers.get(`RSSHub-Cache-Status`) && s.hitCache++;
        } catch {}
        (s.error++,
            s.errorPaths[r] || (s.errorPaths[r] = 0),
            s.errorPaths[r]++,
            !s.errorRoutes[i] && o && (s.errorRoutes[i] = 0),
            o && s.errorRoutes[i]++,
            M(s),
            n.sentry.dsn &&
                T.withScope((t) => {
                    (t.setTag(`name`, r.split(`/`)[1]), T.captureException(e));
                }));
        let c = (process.env.NODE_ENV || process.env.VERCEL_ENV) === `production` ? e.message : e.stack || e.message;
        switch (e.constructor.name) {
            case `HTTPError`:
            case `RequestError`:
            case `FetchError`:
                t.status(503);
                break;
            case `RequestInProgressError`:
                (t.header(`Cache-Control`, `public, max-age=${n.requestTimeout / 1e3}`), t.status(503));
                break;
            case `RejectError`:
                t.status(403);
                break;
            case `NotFoundError`:
                (t.status(404), (c += `The route does not exist or has been deleted.`));
                break;
            default:
                t.status(503);
                break;
        }
        let l = `${e.name}: ${c}`;
        return (
            a.error(`Error in ${r}: ${l}`),
            Qe.error({ path: i, method: t.req.method, status: t.res.status }),
            n.isPackage || t.req.query(`format`) === `json` ? t.json({ error: { message: e.message ?? e } }) : t.html(S(Ot, { requestPath: r, message: l, errorRoute: o ? i : r, nodeVersion: process.version }))
        );
    },
    At = (e) => kt(new l(), e),
    jt = (e) => {
        throw new u(`Authentication failed. Access denied.\n${e}`);
    };
var Mt = async (e, t) => {
    let r = new URL(e.req.url).pathname,
        i = e.req.query(`key`),
        a = e.req.query(`code`);
    if (r === `/` || r === `/robots.txt` || r === `/favicon.ico` || r === `/logo.png`) await t();
    else {
        if (n.accessKey && !(n.accessKey === i || a === d(r + n.accessKey))) return jt(r);
        await t();
    }
};
const Nt = /\${([^{}]+)}/g,
    Pt = new Set([`hash`, `host`, `hostname`, `href`, `origin`, `password`, `pathname`, `port`, `protocol`, `search`, `searchParams`, `username`]),
    Ft = (e, t) => {
        for (let n of t) if (e.startsWith(n) && (e.length === n.length || e[n.length] === `/`)) return !0;
        return !1;
    },
    It = (e) => {
        let t = n.hotlink.includePaths,
            r = n.hotlink.excludePaths;
        return !(t && !Ft(e, t)) && !(r && Ft(e, r));
    },
    Lt = (e, t) =>
        e.replaceAll(Nt, (e, n) => {
            let r = !1;
            return (n.endsWith(`_ue`) && ((n = n.slice(0, -3)), (r = !0)), r ? encodeURIComponent(t[n]) : t[n]);
        }),
    Rt = (e) => {
        let t;
        try {
            t = new URL(e);
        } catch {
            a.error(`Failed to parse ${e}`);
        }
        return t;
    },
    G = (e, t) => {
        if (!e || !t) return t;
        let n = Rt(t);
        return n && n.protocol !== `data:` ? Lt(e, n) : t;
    },
    K = (e, t, n, r = `src`) => {
        e(t).each(function () {
            let t = e(this).attr(r);
            if (t) {
                let i = Rt(t);
                i && i.protocol !== `data:` && e(this).attr(r, Lt(n, i));
            }
        });
    },
    zt = (e, t, n) => {
        let r = E(e, void 0, !1);
        return (
            t && (K(r, `img, picture > source`, t), K(r, `video[poster]`, t, `poster`), K(r, `*[data-rsshub-image="href"]`, t, `href`)),
            n && (K(r, `video, video > source, audio, audio > source`, n), t || K(r, `video[poster]`, n, `poster`)),
            r.html()
        );
    },
    Bt = (e) => {
        if (e)
            for (let t of e.matchAll(Nt)) {
                let e = t[1].endsWith(`_ue`) ? t[1].slice(0, -3) : t[1];
                if (!Pt.has(e)) throw Error(`Invalid URL property: ${e}`);
            }
    };
var Vt = async (e, t) => {
    await t();
    let r, i;
    if (
        (n.feature.allow_user_hotlink_template && ((i = e.req.query(`multimedia_hotlink_template`)), (r = e.req.query(`image_hotlink_template`))),
        n.hotlink.template && ((r = It(e.req.path) ? n.hotlink.template : void 0), (i = It(e.req.path) ? n.hotlink.template : void 0)),
        !r && !i)
    )
        return;
    (Bt(r), Bt(i));
    let a = e.get(`data`);
    if (a) {
        if (((a.image &&= G(r, a.image)), (a.description &&= zt(a.description, r, i)), a.item))
            for (let e of a.item)
                ((e.description &&= zt(e.description, r, i)),
                    e.enclosure_url && e.enclosure_type && (e.enclosure_type.startsWith(`image/`) ? (e.enclosure_url = G(r, e.enclosure_url)) : /^(video|audio)\//.test(e.enclosure_type) && (e.enclosure_url = G(i, e.enclosure_url))),
                    (e.image &&= G(r, e.image)),
                    (e.itunes_item_image &&= G(r, e.itunes_item_image)));
        e.set(`data`, a);
    }
};
const Ht = new Set([`/`, `/robots.txt`, `/logo.png`, `/favicon.ico`]);
var Ut = async (e, t) => {
        if (!c.status.available || Ht.has(e.req.path)) {
            await t();
            return;
        }
        let r = e.req.path,
            i = `:${e.req.query(`format`) || `rss`}`,
            a = e.req.query(`limit`) ? `:${e.req.query(`limit`)}` : ``,
            { h64ToString: o } = await ke(),
            s = `rsshub:koa-redis-cache:` + o(r + i + a),
            l = `rsshub:path-requested:` + o(r + i + a);
        if ((await c.globalCache.get(l)) === `1`) {
            let e = process.env.NODE_ENV === `test` ? 1 : 10,
                t = !1;
            for (; e > 0; ) {
                if ((await new Promise((e) => setTimeout(e, process.env.NODE_ENV === `test` ? 3e3 : 6e3)), (await c.globalCache.get(l)) !== `1`)) {
                    t = !0;
                    break;
                }
                e--;
            }
            if (!t) throw new f(`This path is currently fetching, please come back later!`);
        }
        let u = await c.globalCache.get(s);
        if (u) {
            (e.status(200), e.header(`RSSHub-Cache-Status`, `HIT`), e.set(`data`, JSON.parse(u)), await t());
            return;
        }
        (await c.globalCache.set(l, `1`, n.cache.requestTimeout), e.set(`cacheKey`, s), e.set(`cacheControlKey`, l));
        try {
            await t();
        } catch (e) {
            throw (await c.globalCache.set(l, `0`, n.cache.requestTimeout), e);
        }
        let d = e.get(`data`);
        if (e.res.headers.get(`Cache-Control`) !== `no-cache` && d) {
            ((d.lastBuildDate = new Date().toUTCString()), e.set(`data`, d));
            let t = JSON.stringify(d);
            await c.globalCache.set(s, t, n.cache.routeExpire);
        }
        await c.globalCache.set(l, `0`, n.cache.requestTimeout);
    },
    Wt = async (e, t) => {
        {
            let t = j();
            (t.paths[e.req.path] || (t.paths[e.req.path] = 0), t.paths[e.req.path]++, t.request++, M(t));
        }
        await t();
        {
            let t = j(),
                n = b(e),
                r = n !== `/*`;
            (!t.routes[n] && r && (t.routes[n] = 0), r && t.routes[n]++, e.res.headers.get(`RSSHub-Cache-Status`) && t.hitCache++, e.res.status === 304 && t.etag++, M(t));
        }
    };
const q = { 'Access-Control-Allow-Methods': `GET`, 'Content-Type': `application/xml; charset=utf-8`, 'Cache-Control': `public, max-age=${n.cache.routeExpire}`, 'X-Content-Type-Options': `nosniff` };
n.nodeName && (q[`RSSHub-Node`] = n.nodeName);
function Gt(e, t) {
    return t !== null && t.split(/,\s*/).includes(e);
}
var Kt = async (e, t) => {
        for (let t in q) e.header(t, q[t]);
        (e.header(`Access-Control-Allow-Origin`, n.allowOrigin || new URL(e.req.url).host), await t());
        let r = b(e);
        r !== `/*` && e.header(`X-RSSHub-Route`, r);
        let i = e.get(`data`);
        if (!i || e.res.headers.get(`ETag`)) return;
        let { lastBuildDate: a, ...o } = i,
            s = Ae(JSON.stringify(o));
        (e.header(`ETag`, s), Gt(s, e.req.header(`If-None-Match`) ?? null) ? (e.status(304), e.set(`no-content`, !0)) : e.header(`Last-Modified`, a));
    },
    J = (function (e) {
        return ((e.Outgoing = `-->`), (e.Incoming = `<--`), (e.Error = `xxx`), e);
    })(J || {});
const qt = (e) =>
    ({ 7: `\u001B[35m${e}\u001B[0m`, 5: `\u001B[31m${e}\u001B[0m`, 4: `\u001B[33m${e}\u001B[0m`, 3: `\u001B[36m${e}\u001B[0m`, 2: `\u001B[32m${e}\u001B[0m`, 1: `\u001B[32m${e}\u001B[0m`, 0: `\u001B[33m${e}\u001B[0m` })[
        Math.trunc(e / 100)
    ];
var Jt = async (e, t) => {
    let { method: n, raw: r, routePath: i } = e.req,
        o = ne(r);
    a.info(`${J.Incoming} ${n} ${o}`);
    let s = Date.now();
    await t();
    let c = e.res.status;
    (a.info(`${J.Outgoing} ${n} ${o} ${qt(c)} ${ee(s)}`), Qe.success(Date.now() - s, { path: i, method: n, status: c }));
};
const Yt = Me({ html: !0 }),
    Y = (e, t, n, r) => {
        let i = e(t);
        if (r)
            try {
                let e = i.attr(n);
                e && i.attr(n, new URL(e, r).href);
            } catch {}
    },
    X = async (e, r) =>
        (
            await t(`${n.openai.endpoint}/chat/completions`, {
                method: `POST`,
                body: {
                    model: n.openai.model,
                    max_tokens: n.openai.maxTokens,
                    messages: [
                        { role: `system`, content: e },
                        { role: `user`, content: r },
                    ],
                    temperature: n.openai.temperature,
                },
                headers: { Authorization: `Bearer ${n.openai.apiKey}` },
            })
        ).choices[0].message.content,
    Z = (e) => {
        let t = ``;
        return (e.author && (t = typeof e.author == `string` ? e.author : e.author.map((e) => e.name).join(` `)), t);
    };
var Xt = async (e, r) => {
    await r();
    let i = e.get(`data`);
    if (i) {
        if ((!i.item || i.item.length === 0) && !i.allowEmpty) throw Error(`this route is empty, please check the original site or <a href="https://github.com/DIYgod/RSSHub/issues/new/choose">create an issue</a>`);
        ((i.item = i.item || []),
            (i.title &&= D.decodeXML(i.title + ``)),
            (i.description &&= D.decodeXML(i.description + ``)),
            e.req.query(`sorted`) !== `false` && (i.item = i.item.toSorted((e, t) => new Date(t.pubDate || 0) - +new Date(e.pubDate || 0))));
        let r = (e) => {
            if (((e.title &&= D.decodeXML(e.title + ``)), (e.pubDate &&= new Date(e.pubDate).toUTCString()), e.link)) {
                let t = i.link;
                (t && !/^https?:\/\//.test(t) && (t = /^\/\//.test(t) ? `http:` + t : `http://` + t), (e.link = new URL(e.link, t).href));
            }
            if (e.description) {
                let t = E(e.description),
                    r = e.link || i.link;
                (r && !/^https?:\/\//.test(r) && (r = /^\/\//.test(r) ? `http:` + r : `http://` + r),
                    t(`script`).remove(),
                    t(`img`).each((e, n) => {
                        let r = t(n);
                        if (!r.attr(`src`)) {
                            let e = r.attr(`data-src`) || r.attr(`data-original`);
                            if (e) r.attr(`src`, e);
                            else
                                for (let e in n.attribs) {
                                    let t = n.attribs[e].trim();
                                    if ([`.gif`, `.png`, `.jpg`, `.webp`].some((e) => t.includes(e))) {
                                        r.attr(`src`, t);
                                        break;
                                    }
                                }
                        }
                        for (let e of [`onclick`, `onerror`, `onload`]) r.removeAttr(e);
                    }),
                    t(`a, area`).each((e, n) => {
                        Y(t, n, `href`, r);
                    }),
                    t(`img, video, audio, source, iframe, embed, track`).each((e, n) => {
                        Y(t, n, `src`, r);
                    }),
                    t(`video[poster]`).each((e, n) => {
                        Y(t, n, `poster`, r);
                    }),
                    t(`img, iframe`).each((e, n) => {
                        t(n).attr(`referrerpolicy`) || t(n).attr(`referrerpolicy`, `no-referrer`);
                    }),
                    (e.description = t(`body`).html() + `` + (n.suffix || ``)),
                    e._extra?.links && t(`.rsshub-quote`).length && e._extra?.links?.map((e) => ((e.content_html = t.html(t(`.rsshub-quote`))), e)));
            }
            return ((e.category &&= (Array.isArray(e.category) || (e.category = [e.category]), e.category.filter((e) => typeof e == `string`))), e);
        };
        i.item = await Promise.all(i.item.map((e) => r(e)));
        let a = n.feature.filter_regex_engine,
            o = (t) => {
                let n = e.req.query(`filter_case_sensitive`) === `false`;
                switch (a) {
                    case `regexp`:
                        return new RegExp(t, n ? `i` : ``);
                    case `re2`:
                        return k.compile(t, n ? k.CASE_INSENSITIVE : 0);
                    default:
                        throw Error(`Invalid Engine Value: ${a}, please check your config.`);
                }
            };
        if (e.req.query(`filter`)) {
            let t = o(e.req.query(`filter`));
            i.item = i.item.filter((e) => {
                let n = e.title || ``,
                    r = e.description || n,
                    i = Z(e),
                    a = e.category || [];
                return t instanceof k ? t.matcher(n).find() || t.matcher(r).find() || t.matcher(i).find() || a.some((e) => t.matcher(e).find()) : n.match(t) || r.match(t) || i.match(t) || a.some((e) => e.match(t));
            });
        }
        if (
            (!e.req.query(`filter`) &&
                (e.req.query(`filter_title`) || e.req.query(`filter_description`) || e.req.query(`filter_author`) || e.req.query(`filter_category`)) &&
                (i.item = i.item.filter((t) => {
                    let n = t.title || ``,
                        r = t.description || n,
                        i = Z(t),
                        a = t.category || [],
                        s = !0;
                    if (e.req.query(`filter_title`)) {
                        let t = o(e.req.query(`filter_title`));
                        s = t instanceof k ? t.matcher(n).find() : !!t.test(n);
                    }
                    if (e.req.query(`filter_description`)) {
                        let t = o(e.req.query(`filter_description`));
                        s &&= t instanceof k ? t.matcher(r).find() : !!t.test(r);
                    }
                    if (e.req.query(`filter_author`)) {
                        let t = o(e.req.query(`filter_author`));
                        s &&= t instanceof k ? t.matcher(i).find() : !!t.test(i);
                    }
                    if (e.req.query(`filter_category`)) {
                        let t = o(e.req.query(`filter_category`));
                        s &&= a.some((e) => (t instanceof k ? t.matcher(e).find() : e.match(t)));
                    }
                    return s;
                })),
            (e.req.query(`filterout`) || e.req.query(`filterout_title`) || e.req.query(`filterout_description`) || e.req.query(`filterout_author`) || e.req.query(`filterout_category`)) &&
                (i.item = i.item.filter((t) => {
                    let n = t.title,
                        r = t.description || n,
                        i = Z(t),
                        a = t.category || [],
                        s = !0;
                    if (e.req.query(`filterout`) || e.req.query(`filterout_title`)) {
                        let t = o(e.req.query(`filterout_title`) || e.req.query(`filterout`));
                        s = t instanceof k ? !t.matcher(n).find() : !t.test(n);
                    }
                    if (e.req.query(`filterout`) || e.req.query(`filterout_description`)) {
                        let t = o(e.req.query(`filterout_description`) || e.req.query(`filterout`));
                        s &&= t instanceof k ? !t.matcher(r).find() : !t.test(r);
                    }
                    if (e.req.query(`filterout_author`)) {
                        let t = o(e.req.query(`filterout_author`));
                        s &&= t instanceof k ? !t.matcher(i).find() : !t.test(i);
                    }
                    if (e.req.query(`filterout_category`)) {
                        let t = o(e.req.query(`filterout_category`));
                        s &&= !a.some((e) => (t instanceof k ? t.matcher(e).find() : e.match(t)));
                    }
                    return s;
                })),
            e.req.query(`filter_time`))
        ) {
            let t = Date.now();
            i.item = i.item.filter(({ pubDate: n }) => {
                let r = !0;
                try {
                    r = !n || t - new Date(n).getTime() <= Number.parseInt(e.req.query(`filter_time`)) * 1e3;
                } catch {}
                return r;
            });
        }
        if (
            (e.req.query(`limit`) && (i.item = i.item.slice(0, Number.parseInt(e.req.query(`limit`)))),
            e.req.query(`tgiv`) && i.item.map((t) => ((t.link &&= `https://t.me/iv?url=${encodeURIComponent(t.link)}&rhash=${e.req.query(`tgiv`)}`), t)),
            e.req.query(`mode`)?.toLowerCase() === `fulltext`)
        ) {
            let e = i.item.map(async (e) => {
                let { link: n, author: r, description: i } = e,
                    a = await c.tryGet(`mercury-cache-${n}`, async () => {
                        if (n)
                            try {
                                let e = E(await t(n));
                                return await je.parse(n, { html: e.html() });
                            } catch {}
                    });
                ((e.author = r || a?.author), (e.description = a && a.content.length > 40 ? D.decodeXML(a.content) : i));
            });
            await Promise.all(e);
        }
        if (
            (e.req.query(`chatgpt`) &&
                n.openai.apiKey &&
                (i.item = await Promise.all(
                    i.item.map(async (e) => {
                        try {
                            if (n.openai.inputOption === `description` && e.description) {
                                let t = await c.tryGet(`openai:description:${e.link}`, async () => {
                                    let t = O(e.description),
                                        r = await X(n.openai.promptDescription, t);
                                    return Yt.render(r);
                                });
                                t !== `` && (e.description = t + `<hr/><br/>` + e.description);
                            } else if (n.openai.inputOption === `title` && e.title) {
                                let t = await c.tryGet(`openai:title:${e.link}`, async () => {
                                    let t = O(e.title);
                                    return await X(n.openai.promptTitle, t);
                                });
                                t !== `` && (e.title = t + ``);
                            } else if (n.openai.inputOption === `both` && e.title && e.description) {
                                let t = await c.tryGet(`openai:title:${e.link}`, async () => {
                                    let t = O(e.title);
                                    return await X(n.openai.promptTitle, t);
                                });
                                t !== `` && (e.title = t + ``);
                                let r = await c.tryGet(`openai:description:${e.link}`, async () => {
                                    let t = O(e.description),
                                        r = await X(n.openai.promptDescription, t);
                                    return Yt.render(r);
                                });
                                r !== `` && (e.description = r + `<hr/><br/>` + e.description);
                            }
                        } catch {}
                        return e;
                    })
                )),
            e.req.query(`scihub`) && i.item.map((e) => ((e.link = e.doi ? `${n.scihub.host}${e.doi}` : `${n.scihub.host}${e.link}`), e)),
            e.req.query(`opencc`))
        )
            for (let t of i.item) ((t.title = Pe(t.title ?? t.link, e.req.query(`opencc`))), (t.description = Pe(t.description ?? t.title ?? t.link, e.req.query(`opencc`))));
        if (e.req.query(`brief`))
            if (/[1-9]\d{2,}/.test(e.req.query(`brief`))) {
                let t = Number.parseInt(e.req.query(`brief`));
                for (let e of i.item) {
                    let n;
                    e.description &&= ((n = Ne(e.description, { allowedTags: [], allowedAttributes: {} })), n.length > t ? `<p>${n.slice(0, t)}…</p>` : `<p>${n}</p>`);
                }
            } else throw Error(`Invalid parameter brief. Please check the doc https://docs.rsshub.app/guide/parameters#shu-chu-jian-xun`);
        e.set(`data`, i);
    }
};
n.sentry.dsn && (T.init({ dsn: n.sentry.dsn }), T.getCurrentScope().setTag(`node_name`, n.nodeName), a.info(`Sentry inited.`));
var Zt = async (e, t) => {
        let r = Date.now();
        (await t(),
            n.sentry.dsn &&
                Date.now() - r >= n.sentry.routeTimeout &&
                T.withScope((t) => {
                    (t.setTag(`name`, te(e.req.path)), T.captureException(Error(`Route Timeout`)));
                }));
    },
    Qt = ({ data: e }) =>
        C(`feed`, {
            xmlns: `http://www.w3.org/2005/Atom`,
            'xmlns:rsshub': `http://rsshub.app/xml/schemas`,
            children: [
                S(`title`, { children: e.title || `RSSHub` }),
                S(`link`, { href: e.link || `https://docs.rsshub.app` }),
                S(`id`, { children: e.id || e.link }),
                C(`subtitle`, { children: [e.description || e.title, ` - Powered by RSSHub`] }),
                S(`generator`, { children: `RSSHub` }),
                S(`webMaster`, { children: `contact@rsshub.app (RSSHub)` }),
                S(`language`, { children: e.language || `en` }),
                S(`updated`, { children: e.lastBuildDate }),
                S(`author`, { children: S(`name`, { children: e.author || `RSSHub` }) }),
                e.icon && S(`icon`, { children: e.icon }),
                e.logo && S(`logo`, { children: e.logo }),
                e.item?.map((e) =>
                    C(`entry`, {
                        children: [
                            S(`title`, { children: e.title }),
                            S(`content`, { type: `html`, src: e.link, children: e.description }),
                            S(`link`, { href: e.link }),
                            S(`id`, { children: e.guid || e.link || e.title }),
                            e.pubDate && S(`published`, { children: e.pubDate }),
                            e.updated && S(`updated`, { children: e.updated || e.pubDate }),
                            e.author && S(`author`, { children: S(`name`, { children: e.author }) }),
                            typeof e.category == `string` ? S(`category`, { term: e.category }) : e.category?.map((e) => S(`category`, { term: e })),
                            e.media && Object.entries(e.media).map(([e, t]) => S(`media:${e}`, { ...t })),
                            e.upvotes ? S(`rsshub:upvotes`, { children: e.upvotes }) : ``,
                            e.downvotes ? S(`rsshub:downvotes`, { children: e.downvotes }) : ``,
                            e.comments ? S(`rsshub:comments`, { children: e.comments }) : ``,
                        ],
                    })
                ),
            ],
        }),
    $t = (e) => {
        let t = {
            version: `https://jsonfeed.org/version/1.1`,
            title: e.title || `RSSHub`,
            home_page_url: e.link || `https://docs.rsshub.app`,
            feed_url: e.feedLink,
            description: `${e.description || e.title} - Powered by RSSHub`,
            icon: e.image,
            authors: typeof e.author == `string` ? [{ name: e.author }] : e.author,
            language: e.language || `zh-cn`,
            items: e.item?.map((e) => ({
                id: e.guid || e.id || e.link,
                url: e.link,
                title: e.title,
                content_html: (e.content && e.content.html) || e.description || e.title,
                content_text: e.content && e.content.text,
                summary: e.description,
                image: e.image || e.itunes_item_image,
                banner_image: e.banner,
                date_published: e.pubDate,
                date_modified: e.updated,
                authors: typeof e.author == `string` ? [{ name: e.author }] : e.author,
                tags: typeof e.category == `string` ? [e.category] : e.category,
                language: e.language,
                attachments: e.attachments || (e.enclosure_url ? [{ url: e.enclosure_url, mime_type: e.enclosure_type, title: e.enclosure_title, size_in_bytes: e.enclosure_length, duration_in_seconds: e.itunes_duration }] : void 0),
                _extra: e._extra || void 0,
            })),
        };
        return JSON.stringify(t);
    },
    en = ({ data: e }) => {
        let t = e.itunes_author || e.itunes_category || (e.item && e.item.some((e) => e.itunes_item_image || e.itunes_duration)),
            n = e.item?.some((e) => e.media),
            r = e.link?.startsWith(`https://t.me/s/`);
        return S(`rss`, {
            'xmlns:atom': `http://www.w3.org/2005/Atom`,
            'xmlns:itunes': t ? `http://www.itunes.com/dtds/podcast-1.0.dtd` : void 0,
            'xmlns:media': n ? `http://search.yahoo.com/mrss/` : void 0,
            version: `2.0`,
            children: C(`channel`, {
                children: [
                    S(`title`, { children: e.title || `RSSHub` }),
                    S(`link`, { children: e.link || `https://docs.rsshub.app` }),
                    S(`atom:link`, { href: e.atomlink, rel: `self`, type: `application/rss+xml` }),
                    C(`description`, { children: [e.description || e.title, ` - Powered by RSSHub`] }),
                    S(`generator`, { children: `RSSHub` }),
                    S(`webMaster`, { children: `contact@rsshub.app (RSSHub)` }),
                    e.itunes_author && S(`itunes:author`, { children: e.itunes_author }),
                    e.itunes_category && S(`itunes:category`, { text: e.itunes_category }),
                    e.itunes_author && S(`itunes:explicit`, { children: e.itunes_explicit || `false` }),
                    S(`language`, { children: e.language || `en` }),
                    e.image &&
                        C(`image`, {
                            children: [
                                S(`url`, { children: e.image }),
                                S(`title`, { children: e.title || `RSSHub` }),
                                S(`link`, { children: e.link }),
                                r && C(x, { children: [S(`height`, { children: `31` }), S(`width`, { children: `88` })] }),
                            ],
                        }),
                    S(`lastBuildDate`, { children: e.lastBuildDate }),
                    S(`ttl`, { children: e.ttl }),
                    e.item?.map((e) =>
                        C(`item`, {
                            children: [
                                S(`title`, { children: e.title }),
                                S(`description`, { children: e.description }),
                                S(`link`, { children: e.link }),
                                S(`guid`, { isPermaLink: `false`, children: e.guid || e.link || e.title }),
                                e.pubDate && S(`pubDate`, { children: e.pubDate }),
                                e.author && S(`author`, { children: e.author }),
                                e.image && S(`enclosure`, { url: e.image, type: `image/jpeg` }),
                                e.itunes_item_image && S(`itunes:image`, { href: e.itunes_item_image }),
                                e.enclosure_url && S(`enclosure`, { url: e.enclosure_url, length: e.enclosure_length, type: e.enclosure_type }),
                                e.itunes_duration && S(`itunes:duration`, { children: e.itunes_duration }),
                                typeof e.category == `string` ? S(`category`, { children: e.category }) : e.category?.map((e) => S(`category`, { children: e })),
                                e.media && Object.entries(e.media).map(([e, t]) => S(`media:${e}`, { ...t })),
                            ],
                        })
                    ),
                ],
            }),
        });
    };
const Q = `feed`,
    tn = (e) => {
        let t = Fe().unix();
        return {
            data: e.item.map((e) => {
                let n = nn(e);
                return {
                    owner: n,
                    id: e.link,
                    network: `rsshub`,
                    from: n,
                    to: n,
                    tag: `RSS`,
                    type: Q,
                    direction: `out`,
                    feeValue: `0`,
                    actions: [
                        {
                            tag: `RSS`,
                            type: Q,
                            platform: `RSSHub`,
                            from: n,
                            to: n,
                            metadata: {
                                authors: typeof e.author == `string` ? [{ name: e.author }] : e.author,
                                description: e.description,
                                pub_date: e.pubDate,
                                tags: typeof e.category == `string` ? [e.category] : e.category,
                                title: e.title,
                            },
                            related_urls: [e.link],
                        },
                    ],
                    timestamp: Fe(e.updated).unix() || t,
                };
            }),
        };
    };
function nn(e) {
    try {
        return new URL(e.link).hostname;
    } catch {
        return e.link;
    }
}
var rn = tn,
    an = async (e, t) => {
        let r = (c.status.available && Math.trunc(n.cache.routeExpire / 60)) || 1;
        await t();
        let i = e.get(`apiData`);
        if (i) return e.json(i);
        let a = e.get(`data`),
            o = e.req.query(`format`) || `rss`;
        if (n.debugInfo) {
            if (o === `debug.json`) return e.json(e.get(`json`) || { message: `plugin does not set debug json` });
            if (/(\d+)\.debug\.html$/.test(o)) {
                let t = Number.parseInt(o.match(/(\d+)\.debug\.html$/)?.[1] || `0`);
                return e.html(a?.item?.[t]?.description || `data.item[${t}].description not found`);
            }
        }
        if (a && ((a.title = p(a.title) || ``), (a.description &&= p(a.description) || ``), (a.author &&= p(a.author) || ``), a.item))
            for (let e of a.item) {
                if (e.title) {
                    e.title = p(e.title) || ``;
                    for (let t = 0, r = 0; r < e.title.length; r++)
                        if (((t += Buffer.from(e.title[r]).length === 1 ? 1 : 2), t > n.titleLengthLimit)) {
                            e.title = `${e.title.slice(0, r)}...`;
                            break;
                        }
                }
                if (((e.description &&= e.description.replaceAll(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F\u200B\uFFFF]/g, ``)), typeof e.author == `string`)) e.author = p(e.author) || ``;
                else if (typeof e.author == `object` && e.author !== null) {
                    for (let t of e.author) t.name = p(t.name) || ``;
                    o !== `json` && (e.author = e.author.map((e) => e.name).join(`, `));
                }
                if (
                    (e.itunes_duration &&
                        ((typeof e.itunes_duration == `string` && !e.itunes_duration.includes(`:`)) || (typeof e.itunes_duration == `number` && !Number.isNaN(e.itunes_duration))) &&
                        ((e.itunes_duration = +e.itunes_duration),
                        (e.itunes_duration =
                            Math.floor(e.itunes_duration / 3600) + `:` + (Math.floor((e.itunes_duration % 3600) / 60) / 100).toFixed(2).slice(-2) + `:` + (((e.itunes_duration % 3600) % 60) / 100).toFixed(2).slice(-2))),
                    o !== `rss`)
                ) {
                    try {
                        e.pubDate &&= re(e.pubDate) || ``;
                    } catch {
                        e.pubDate = ``;
                    }
                    try {
                        e.updated &&= re(e.updated) || ``;
                    } catch {
                        e.updated = ``;
                    }
                }
            }
        let s = new Date(),
            l = { lastBuildDate: s.toUTCString(), updated: s.toISOString(), ttl: r, atomlink: e.req.url, ...a };
        if (n.isPackage) return e.json(l);
        if (e.get(`redirect`)) return e.redirect(e.get(`redirect`), 301);
        if (e.get(`no-content`)) return e.body(null);
        switch (o) {
            case `ums`:
            case `rss3`:
                return e.json(rn(l));
            case `json`:
                return (e.header(`Content-Type`, `application/feed+json; charset=UTF-8`), e.body($t(l)));
            case `atom`:
                return e.render(S(Qt, { data: l }));
            default:
                return e.render(S(en, { data: l }));
        }
    },
    on = async (e, t) => {
        if (n.debugInfo) {
            let { method: n, raw: r } = e.req,
                i = ne(r),
                a = nt.startSpan(`${n} ${i}`, { kind: 1, attributes: {} });
            (a.addEvent(`invoking handleRequest`), await t(), a.end());
        } else await t();
    };
process.on(`uncaughtException`, (e) => {
    a.error(`uncaughtException: ` + e);
});
const $ = new de();
($.use(me()),
    $.use(fe()),
    $.use(pe(({ children: e }) => S(x, { children: e }), { docType: `<?xml version="1.0" encoding="UTF-8"?>`, stream: {} })),
    $.use(Jt),
    $.use(on),
    $.use(Zt),
    $.use(Mt),
    $.use(Wt),
    $.use(an),
    $.use(Kt),
    $.use(Vt),
    $.use(Xt),
    $.use(Ut),
    $.route(`/`, pt),
    $.route(`/api`, Dt),
    $.notFound(At),
    $.onError(kt));
var sn = $;
export { sn as default };
