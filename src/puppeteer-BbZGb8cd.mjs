import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './proxy-6vblFdo1.mjs';
import { anonymizeProxy as r } from 'proxy-chain';
import i from 'rebrowser-puppeteer';
var a = async () => {
    let a = {
            args: [`--no-sandbox`, `--disable-setuid-sandbox`, `--disable-blink-features=AutomationControlled`, `--window-position=0,0`, `--ignore-certificate-errors`, `--ignore-certificate-errors-spki-list`, `--user-agent=${e.ua}`],
            headless: !0,
            ignoreHTTPSErrors: !0,
        },
        o = i,
        s = n.getCurrentProxy();
    s &&
        n.proxyObj.url_regex === `.*` &&
        (s.urlHandler?.username || s.urlHandler?.password
            ? s.urlHandler.protocol === `http:`
                ? a.args.push(`--proxy-server=${await r(s.uri)}`)
                : t.warn(`SOCKS/HTTPS proxy with authentication is not supported by puppeteer, continue without proxy`)
            : a.args.push(`--proxy-server=${s.uri.replace(`socks5h://`, `socks5://`).replace(`socks4a://`, `socks4://`)}`));
    let c = await (e.puppeteerWSEndpoint ? o.connect({ browserWSEndpoint: e.puppeteerWSEndpoint }) : o.launch(e.chromiumExecutablePath ? { executablePath: e.chromiumExecutablePath, ...a } : a));
    return (
        setTimeout(async () => {
            await c.close();
        }, 3e4),
        c
    );
};
const o = async (r, a = {}) => {
    let o = {
            args: [`--no-sandbox`, `--disable-setuid-sandbox`, `--disable-blink-features=AutomationControlled`, `--window-position=0,0`, `--ignore-certificate-errors`, `--ignore-certificate-errors-spki-list`, `--user-agent=${e.ua}`],
            headless: !0,
            ignoreHTTPSErrors: !0,
        },
        s = i,
        c = !1,
        l = new RegExp(n.proxyObj.url_regex),
        u;
    try {
        u = new URL(r);
    } catch {}
    l.test(r) && r.startsWith(`http`) && !(u && u.host === n.proxyUrlHandler?.host) && (c = !0);
    let d = !1,
        f = null,
        p = n.getCurrentProxy();
    if (p && c)
        if (((f = p), p.urlHandler?.username || p.urlHandler?.password))
            if (p.urlHandler.protocol === `http:`) {
                let e = new URL(p.uri);
                ((e.username = ``), (e.password = ``), o.args.push(`--proxy-server=${e.toString().replace(/\/$/, ``)}`), (d = !0));
            } else t.warn(`SOCKS/HTTPS proxy with authentication is not supported by puppeteer, continue without proxy`);
        else (o.args.push(`--proxy-server=${p.uri.replace(`socks5h://`, `socks5://`).replace(`socks4a://`, `socks4://`)}`), (d = !0));
    let m;
    if (e.puppeteerWSEndpoint) {
        let t = new URL(e.puppeteerWSEndpoint);
        (t.searchParams.set(`launch`, JSON.stringify(o)), t.searchParams.set(`stealth`, `true`));
        let n = t.toString();
        m = await s.connect({ browserWSEndpoint: n });
    } else m = await s.launch(e.chromiumExecutablePath ? { executablePath: e.chromiumExecutablePath, ...o } : o);
    setTimeout(async () => {
        await m.close();
    }, 3e4);
    let h = await m.newPage();
    if (
        (d && f && t.debug(`Proxying request in puppeteer via ${f.uri}: ${r}`),
        d && f && (f.urlHandler?.username || f.urlHandler?.password) && (await h.authenticate({ username: f.urlHandler?.username, password: f.urlHandler?.password })),
        a.onBeforeLoad && (await a.onBeforeLoad(h, m)),
        !a.noGoto)
    )
        try {
            await h.goto(r, a.gotoConfig || { waitUntil: `domcontentloaded` });
        } catch (e) {
            throw d && f && n.multiProxy ? (t.warn(`Puppeteer navigation failed with proxy ${f.uri}, marking as failed: ${e}`), n.markProxyFailed(f.uri), e) : e;
        }
    return {
        page: h,
        destory: async () => {
            await m.close();
        },
        browser: m,
    };
};
export { a as n, o as t };
