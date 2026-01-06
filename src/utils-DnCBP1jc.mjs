import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './logger-_vmdpChp.mjs';
import { t as r } from './cache-DLkCV5c7.mjs';
import { t as i } from './parse-date-DjdQS_Nt.mjs';
import { t as a } from './timezone-CrV-DT8S.mjs';
import * as o from 'cheerio';
import s from 'crypto-js';
const c = [`globalThis`, `headless`, `languages`, `permHook`, `vendor`, `webDriverValue`, `webdriver`],
    l = `https://www.myzaker.com`,
    u = (e, t = 20) => {
        for (let n = 0; n < 1e8; n++) {
            let r = s.SHA256(e + n).toString(),
                i = 0;
            for (let e of r) {
                if (e !== `0`) {
                    i += 4 - Number.parseInt(e, 16).toString(2).length;
                    break;
                }
                i += 4;
            }
            if (i >= t) return n;
        }
        return 0;
    },
    d = (e) => {
        let t = `0`.repeat(16);
        return s.enc.Utf8.parse((e + t).slice(0, 16));
    },
    f = (e, t) => {
        let n = s.enc.Utf8.parse(`1234567890123456`);
        return s.AES.encrypt(JSON.stringify(e), d(t), { iv: n, padding: s.pad.Pkcs7 });
    },
    p = (e, t) => f(e, t).ciphertext.toString(),
    m = async (i) => {
        let a = `zaker:cookie`,
            o = await r.get(a, !1);
        if (o) return JSON.parse(o);
        let s = `https://challenge.rivers.chaitin.cn/captcha/api`,
            d = await e.raw(i),
            f = d.headers
                .getSetCookie()
                .find((e) => e.startsWith(`sl-session`))
                ?.split(`;`)[0]
                .split(`sl-session=`)[1],
            m = d._data.match(/once_id:\s*"(.*?)",/)?.[1];
        if ((n.debug(`getSafeLineCookie: sl-session=${f}, onceId=${m}`), !/window\.captcha/.test(d._data)))
            return (
                n.debug(`getSafeLineCookie: Failed to get once_id`),
                {
                    cookie: d.headers
                        .getSetCookie()
                        .map((e) => e.split(`;`)[0])
                        .join(`; `),
                    data: d._data,
                }
            );
        let h = await e(`${s}/seed`, { headers: { Referer: `${l}/` }, query: { once_id: m, v: `1.0.0`, hints: c.toSorted(() => Math.random() - 0.5).join(`,`) } }),
            g = t.ua,
            _ = h.seed,
            v = Math.trunc(Math.random() * 2e3 + 1e3);
        n.debug(`getSafeLineCookie: ua=${g}, seed=${_}, takeTime=${v}`);
        let y = p({ resolution: `1920x1080`, languages: [`en-US`], useragents: [g, g, g], hint: 0, salt: String(u(_, 16)), taketime: v }, _),
            b = await e(`${s}/inspect`, { method: `POST`, headers: { Referer: `${l}/`, 'Content-Type': `text/plain` }, query: { seed: _ }, body: y });
        if ((n.debug(`getSafeLineCookie: inspectResponse=${JSON.stringify(b)}`), b.reason))
            return (
                n.error(`getSafeLineCookie: reason=${b.reason}`),
                {
                    cookie: d.headers
                        .getSetCookie()
                        .map((e) => e.split(`;`)[0])
                        .join(`; `),
                    data: d._data,
                }
            );
        let x = await e.raw(i, { headers: { Cookie: `sl-session=${f}; sl_waf_recap=${b.jwt}` } }),
            S = x.headers
                .getSetCookie()
                .map((e) => e.split(`;`)[0])
                .join(`; `);
        return (n.debug(`getSafeLineCookie: ${S}`), r.set(a, JSON.stringify(S), 3600), { cookie: S, data: x._data });
    },
    h = (e) =>
        JSON.parse(
            e(`script:contains("window.WinPageData")`)
                .text()
                .match(/window\.WinPageData\s*=\s*({.*})/)?.[1] ?? `{}`
        ).data.article.map((e) => ({ title: e.title, description: e.desc, link: `https:` + e.url, author: e.author_name, pubDate: a(i(e.date, `MM月DD日`), 8), category: e.tag.map((e) => e.tag), image: e.thumbnail_mpic })),
    g = async (t, n) => {
        let r = await e(t.link, { headers: { Cookie: n } }),
            i = o.load(r),
            a = i(`div.article_content div`);
        return (
            a.find(`img`).each((e, t) => {
                let n = i(t);
                (n.attr(`src`, n.attr(`data-original`)), n.removeAttr(`data-original`));
            }),
            (t.description = a.html()),
            t
        );
    };
export { h as i, g as n, m as r, l as t };
