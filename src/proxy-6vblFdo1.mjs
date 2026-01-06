import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { ProxyAgent as n } from 'undici';
import { HttpsProxyAgent as r } from 'https-proxy-agent';
import { PacProxyAgent as i } from 'pac-proxy-agent';
import { SocksProxyAgent as a } from 'socks-proxy-agent';
const o = `http`,
    s = [`http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`];
var c = (e, n) => {
        n ||= {};
        let [r, i] = [e, n];
        n = { ...n };
        let a = null;
        if (e && typeof e == `string`) {
            e.includes(`://`) || (t.warn(`PROXY_URI contains no protocol, assuming ${o}`), (e = `${o}://${e}`));
            try {
                a = new URL(e);
            } catch (e) {
                t.error(`Parse PROXY_URI error: ${e.stack}`);
            }
        }
        if (n.protocol || n.host || n.port)
            if (a) t.warn(`PROXY_URI is set, ignoring PROXY_{PROTOCOL,HOST,PORT}`);
            else if (n.host) {
                let e = n.host;
                e.includes(`://`) ? t.warn(`PROXY_HOST contains protocol, ignoring PROXY_PROTOCOL`) : n.protocol ? (e = `${n.protocol}://${e}`) : (t.warn(`PROXY_PROTOCOL is not set, assuming '${o}'`), (e = `${o}://${e}`));
                try {
                    ((a = new URL(e)),
                        a.port && n.port
                            ? t.warn(`PROXY_HOST contains port, ignoring PROXY_PORT`)
                            : n.port
                              ? Number.parseInt(n.port)
                                  ? (a.port = n.port)
                                  : t.warn(`PROXY_PORT is not a number, ignoring`)
                              : t.warn(`PROXY_PORT is not set, leaving proxy agent to determine`));
                } catch (e) {
                    t.error(`Parse PROXY_HOST error: ${e.stack}`);
                }
            } else t.warn(`Either PROXY_{PROTOCOL,PORT} is set, but PROXY_HOST is missing, ignoring`);
        if (n.auth && a) {
            let e = !1;
            (a.username || a.password
                ? (t.warn(`PROXY_URI contains username and/or password, ignoring PROXY_AUTH`), (n.auth = void 0))
                : [`http:`, `https:`].includes(a.protocol)
                  ? (t.info(`PROXY_AUTH is set and will be used for requests from Node.js. However, requests from puppeteer will not use it`), (e = !0))
                  : (t.warn(`PROXY_AUTH is only supported by HTTP(S) proxies, but got ${a.protocol}, ignoring`), (n.auth = void 0), (e = !0)),
                e && t.info(`To get rid of this, set PROXY_URI like protocol://username:password@host:port and clear PROXY_{AUTH,PROTOCOL,HOST,PORT}`));
        }
        let c = !1;
        if (a) {
            let r = a.protocol.replace(`:`, ``);
            s.includes(r)
                ? (r !== `http` &&
                      (a.username || a.password) &&
                      (t.warn(`PROXY_URI is an HTTPS/SOCKS proxy with authentication, which is not supported by puppeteer (ignore if you don't need it)`), t.info(`To get rid of this, consider using an HTTP proxy instead`)),
                  (n.protocol = r),
                  (n.host = a.hostname),
                  (n.port = a.port || void 0),
                  (e = a.href.endsWith(`/`) ? a.href.slice(0, -1) : a.href),
                  (c = !0))
                : t.error(`Unsupported proxy protocol: ${r}, expect one of ${s.join(`, `)}`);
        }
        return (
            c || (((r && typeof r == `string`) || i.protocol || i.host || i.port || i.auth) && t.error(`Proxy is disabled due to misconfiguration`), (n.protocol = n.host = n.port = n.auth = void 0), (e = void 0), (a = null)),
            { proxyUri: e, proxyObj: n, proxyUrlHandler: a }
        );
    },
    l = (e, n) => {
        let r = [],
            i = 0;
        for (let t of e) {
            let e = c(t, n);
            e.proxyUri && r.push({ uri: e.proxyUri, isActive: !0, failureCount: 0, urlHandler: e.proxyUrlHandler });
        }
        if (r.length === 0) return (t.warn(`No valid proxies found in the provided list`), { allProxies: [], proxyObj: n || {}, getNextProxy: () => null, markProxyFailed: () => {}, resetProxy: () => {} });
        let a = n?.healthCheckInterval || 6e4;
        setInterval(() => {
            let e = Date.now();
            for (let n of r) !n.isActive && n.lastFailureTime && e - n.lastFailureTime > a && ((n.isActive = !0), (n.failureCount = 0), delete n.lastFailureTime, t.info(`Proxy ${n.uri} marked as active again after health check`));
        }, a);
        let o = () => {
                let e = r.filter((e) => e.isActive);
                if (e.length === 0) return (t.warn(`No active proxies available`), null);
                let n = e[i % e.length],
                    a = 0;
                for (; !n.isActive && a < e.length; ) ((i = (i + 1) % e.length), (n = e[i]), a++);
                return n.isActive ? n : null;
            },
            s = (e) => {
                let n = r.find((t) => t.uri === e);
                if (n) {
                    (n.failureCount++, (n.lastFailureTime = Date.now()), n.failureCount >= 3 ? ((n.isActive = !1), t.warn(`Proxy ${e} marked as inactive after 3 failures`)) : t.warn(`Proxy ${e} failed (${n.failureCount}/3)`));
                    let a = r.filter((e) => e.isActive);
                    if (a.length > 0) {
                        i = (i + 1) % a.length;
                        let e = o();
                        e && t.info(`Switching to proxy: ${e.uri}`);
                    }
                }
            },
            l = (e) => {
                let n = r.find((t) => t.uri === e);
                n && ((n.isActive = !0), (n.failureCount = 0), delete n.lastFailureTime, t.info(`Proxy ${e} manually reset`));
            },
            u = o();
        return (u && t.info(`Initial proxy selected: ${u.uri}`), { currentProxy: u, allProxies: r, proxyObj: n || {}, getNextProxy: o, markProxyFailed: s, resetProxy: l });
    };
const u = [`http`, `https`, `ftp`, `file`, `data`];
var d = (e, n, r) => {
    let i = null;
    if ((n && (typeof n == `string` ? (e = `data:text/javascript;charset=utf-8,` + encodeURIComponent(n)) : t.error(`Invalid PAC_SCRIPT, use PAC_URI instead`)), e && typeof e == `string`))
        try {
            i = new URL(e);
        } catch (n) {
            ((e = void 0), (i = null), t.error(`Parse PAC_URI error: ${n.stack}`));
        }
    else e = void 0;
    if (
        (e && (!i?.protocol || !u.includes(i.protocol.replace(`:`, ``))) && (t.error(`Unsupported PAC protocol: ${i?.protocol?.replace(`:`, ``)}, expect one of ${u.join(`, `)}`), (e = void 0), (i = null)),
        i ? ((r.host = i.hostname), (r.port = i.port), (r.protocol = i.protocol.replace(`:`, ``))) : (r.protocol = r.host = r.port = r.auth = void 0),
        r.auth && i)
    ) {
        let e = !1;
        (i.username || i.password
            ? (t.warn(`PAC_URI contains username and/or password, ignoring PROXY_AUTH`), (r.auth = void 0))
            : [`http:`, `https:`].includes(i.protocol)
              ? (t.info(`PROXY_AUTH is set and will be used for requests from Node.js. However, requests from puppeteer will not use it`), (e = !0))
              : (t.warn(`PROXY_AUTH is only supported by HTTP(S) proxies, but got ${i.protocol}, ignoring`), (r.auth = void 0), (e = !0)),
            e && t.info(`To get rid of this, set PAC_URI like protocol://username:password@host:port and clear PROXY_{AUTH,PROTOCOL,HOST,PORT}`));
    }
    return { proxyUri: e, proxyObj: r, proxyUrlHandler: i };
};
const f = e.pacUri || e.pacScript;
let p,
    m = {},
    h = null,
    g;
const _ = (e, t) => (e.startsWith(`http`) ? new r(e, { headers: { 'proxy-authorization': t?.auth ? `Basic ${t.auth}` : void 0 } }) : e.startsWith(`socks`) ? new a(e) : null),
    v = (e, t) => (e.startsWith(`http`) ? new n({ uri: e, token: t?.auth ? `Basic ${t.auth}` : void 0, requestTls: { rejectUnauthorized: process.env.NODE_TLS_REJECT_UNAUTHORIZED !== `0` } }) : null);
if (f) {
    let t = d(e.pacUri, e.pacScript, e.proxy);
    ((p = t.proxyUri), (m = t.proxyObj), (h = t.proxyUrlHandler));
} else if (e.proxyUris && e.proxyUris.length > 0) {
    ((g = l(e.proxyUris, e.proxy)), (m = g.proxyObj));
    let n = g.getNextProxy();
    (n && ((p = n.uri), (h = n.urlHandler)), t.info(`Multi-proxy initialized with ${e.proxyUris.length} proxies`));
} else {
    let t = c(e.proxyUri, e.proxy);
    ((p = t.proxyUri), (m = t.proxyObj), (h = t.proxyUrlHandler));
}
let y = null,
    b = null;
f && p ? (y = new i(`pac+${p}`)) : p && ((y = _(p, m)), (b = v(p, m)));
var x = {
    agent: y,
    dispatcher: b,
    proxyUri: p,
    proxyObj: m,
    proxyUrlHandler: h,
    multiProxy: g,
    getCurrentProxy: () => (g ? g.getNextProxy() : p ? { uri: p, isActive: !0, failureCount: 0, urlHandler: h } : null),
    markProxyFailed: (e) => {
        if (g) {
            g.markProxyFailed(e);
            let n = g.getNextProxy();
            n ? ((p = n.uri), (h = n.urlHandler || null), (y = _(n.uri, m)), (b = v(n.uri, m)), t.info(`Switched to proxy: ${n.uri}`)) : (t.warn(`No available proxies remaining`), (y = null), (b = null), (p = void 0));
        }
    },
    getAgentForProxy: (e) => _(e.uri, m),
    getDispatcherForProxy: (e) => v(e.uri, m),
};
export { x as t };
