import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { n, t as r } from './header-generator-BdIWHTob.mjs';
import { t as i } from './logger-_vmdpChp.mjs';
import { t as a } from './cache-DLkCV5c7.mjs';
import { t as o } from './reject-BES9cPty.mjs';
import { t as s } from './parse-date-DjdQS_Nt.mjs';
import { jsx as c } from 'hono/jsx/jsx-runtime';
import { renderToString as l } from 'hono/jsx/dom/server';
function u(e, t) {
    let n = [];
    for (let e = 0; e < 256; e++) n[e] = e;
    for (let e = 0, r = 0; e < 256; e++) {
        r = (r + n[e] + t.codePointAt(e % t.length)) % 256;
        let i = n[e];
        ((n[e] = n[r]), (n[r] = i));
    }
    let r = [];
    for (let t = 0, i = 0, a = 0; a < e.length; a++) {
        ((t = (t + 1) % 256), (i = (i + n[t]) % 256));
        let o = n[t];
        ((n[t] = n[i]), (n[i] = o));
        let s = (n[t] + n[i]) % 256;
        r.push(String.fromCodePoint(n[s] ^ e.codePointAt(a)));
    }
    return r.join(``);
}
function d(e, t) {
    return ((e << (t %= 32)) | (e >>> (32 - t))) >>> 0;
}
function f(e) {
    if (0 <= e && e < 16) return 2043430169;
    if (16 <= e && e < 64) return 2055708042;
    i.error(`invalid j for constant Tj`);
}
function p(e, t, n, r) {
    return 0 <= e && e < 16 ? (t ^ n ^ r) >>> 0 : 16 <= e && e < 64 ? ((t & n) | (t & r) | (n & r)) >>> 0 : (i.error(`invalid j for bool function FF`), 0);
}
function m(e, t, n, r) {
    return 0 <= e && e < 16 ? (t ^ n ^ r) >>> 0 : 16 <= e && e < 64 ? ((t & n) | (~t & r)) >>> 0 : (i.error(`invalid j for bool function GG`), 0);
}
function h() {
    ((this.reg[0] = 1937774191),
        (this.reg[1] = 1226093241),
        (this.reg[2] = 388252375),
        (this.reg[3] = 3666478592),
        (this.reg[4] = 2842636476),
        (this.reg[5] = 372324522),
        (this.reg[6] = 3817729613),
        (this.reg[7] = 2969243214),
        (this.chunk = []),
        (this.size = 0));
}
function g(e) {
    let t = encodeURIComponent(e).replaceAll(/%([0-9A-F]{2})/g, (e, t) => String.fromCodePoint(`0x` + t)),
        n = Array.from({ length: t.length });
    return (
        Array.prototype.forEach.call(t, (e, t) => {
            n[t] = e.codePointAt(0);
        }),
        n
    );
}
function _(e) {
    let t = typeof e == `string` ? g(e) : e;
    this.size += t.length;
    let n = 64 - this.chunk.length;
    if (t.length < n) this.chunk = this.chunk.concat(t);
    else for (this.chunk = this.chunk.concat(t.slice(0, n)); this.chunk.length >= 64; ) (this._compress(this.chunk), (this.chunk = n < t.length ? t.slice(n, Math.min(n + 64, t.length)) : []), (n += 64));
}
function v(e, t) {
    (e && (this.reset(), this.write(e)), this._fill());
    for (let e = 0; e < this.chunk.length; e += 64) this._compress(this.chunk.slice(e, e + 64));
    let n;
    if (t === `hex`) {
        n = ``;
        for (let e = 0; e < 8; e++) n += se(this.reg[e].toString(16), 8, `0`);
    } else {
        n = Array.from({ length: 32 });
        for (let e = 0; e < 8; e++) {
            let t = this.reg[e];
            ((n[4 * e + 3] = (255 & t) >>> 0), (t >>>= 8), (n[4 * e + 2] = (255 & t) >>> 0), (t >>>= 8), (n[4 * e + 1] = (255 & t) >>> 0), (t >>>= 8), (n[4 * e] = (255 & t) >>> 0));
        }
    }
    return (this.reset(), n);
}
function y(e) {
    let t = Array.from({ length: 132 });
    for (let n = 0; n < 16; n++) ((t[n] = e[4 * n] << 24), (t[n] |= e[4 * n + 1] << 16), (t[n] |= e[4 * n + 2] << 8), (t[n] |= e[4 * n + 3]), (t[n] >>>= 0));
    for (let e = 16; e < 68; e++) {
        let n = t[e - 16] ^ t[e - 9] ^ d(t[e - 3], 15);
        ((n = n ^ d(n, 15) ^ d(n, 23)), (t[e] = (n ^ d(t[e - 13], 7) ^ t[e - 6]) >>> 0));
    }
    for (let e = 0; e < 64; e++) t[e + 68] = (t[e] ^ t[e + 4]) >>> 0;
    return t;
}
function b(e) {
    if (e < 64) {
        i.error(`compress error: not enough data`);
        return;
    } else {
        let t = y(e),
            n = this.reg.slice(0);
        for (let e = 0; e < 64; e++) {
            let r = d(n[0], 12) + n[4] + d(f(e), e);
            ((r = (4294967295 & r) >>> 0), (r = d(r, 7)));
            let i = (r ^ d(n[0], 12)) >>> 0,
                a = p(e, n[0], n[1], n[2]);
            ((a = a + n[3] + i + t[e + 68]), (a = (4294967295 & a) >>> 0));
            let o = m(e, n[4], n[5], n[6]);
            ((o = o + n[7] + r + t[e]), (o = (4294967295 & o) >>> 0), (n[3] = n[2]), (n[2] = d(n[1], 9)), (n[1] = n[0]), (n[0] = a), (n[7] = n[6]), (n[6] = d(n[5], 19)), (n[5] = n[4]), (n[4] = (o ^ d(o, 9) ^ d(o, 17)) >>> 0));
        }
        for (let e = 0; e < 8; e++) this.reg[e] = (this.reg[e] ^ n[e]) >>> 0;
    }
}
function x() {
    let e = 8 * this.size,
        t = this.chunk.push(128) % 64;
    for (64 - t < 8 && (t -= 64); t < 56; t++) this.chunk.push(0);
    for (let t = 0; t < 4; t++) {
        let n = Math.floor(e / 4294967296);
        this.chunk.push((n >>> (8 * (3 - t))) & 255);
    }
    for (let t = 0; t < 4; t++) this.chunk.push((e >>> (8 * (3 - t))) & 255);
}
function S() {
    ((this.reg = []), (this.chunk = []), (this.size = 0), this.reset());
}
((S.prototype.reset = h), (S.prototype.write = _), (S.prototype.sum = v), (S.prototype._compress = b), (S.prototype._fill = x));
function C(e, t) {
    let n = {
            s0: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,
            s1: `Dkdpgh4ZKsQB80/Mfvw36XI1R25+WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=`,
            s2: `Dkdpgh4ZKsQB80/Mfvw36XI1R25-WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=`,
            s3: `ckdp1h4ZKsUB80/Mfvw36XIgR25+WQAlEi7NLboqYTOPuzmFjJnryx9HVGDaStCe`,
            s4: `Dkdpgh2ZmsQB80/MfvV36XI1R45-WUAlEixNLwoqYTOPuzKFjJnry79HbGcaStCe`,
        },
        r = { 0: 16515072, 1: 258048, 2: 4032, str: n[t] },
        i = ``,
        a = 0,
        o = w(a, e);
    for (let t = 0; t < (e.length / 3) * 4; t++) {
        Math.floor(t / 4) !== a && ((a += 1), (o = w(a, e)));
        let n = t % 4,
            s;
        switch (n) {
            case 0:
                ((s = (o & r[0]) >> 18), (i += r.str.charAt(s)));
                break;
            case 1:
                ((s = (o & r[1]) >> 12), (i += r.str.charAt(s)));
                break;
            case 2:
                ((s = (o & r[2]) >> 6), (i += r.str.charAt(s)));
                break;
            case 3:
                ((s = o & 63), (i += r.str.charAt(s)));
                break;
            default:
                break;
        }
    }
    return i;
}
function w(e, t) {
    return ((e *= 3), (t.codePointAt(e) << 16) | (t.codePointAt(e + 1) << 8) | t.codePointAt(e + 2));
}
function T(e, t) {
    return [(e & 170) | (t[0] & 85), (e & 85) | (t[0] & 170), ((e >> 8) & 170) | (t[1] & 85), ((e >> 8) & 85) | (t[1] & 170)];
}
function E(e, t, n, r = `cus`, i = [0, 1, 14]) {
    let a = new S(),
        o = Date.now(),
        s = a.sum(a.sum(e + r)),
        c = a.sum(a.sum(r)),
        l = a.sum(C(u(t, Reflect.apply(String.fromCharCode, null, [0.00390625, 1, 14])), `s3`)),
        d = Date.now(),
        f = {
            8: 3,
            10: d,
            15: { aid: 6383, pageId: 6241, boe: !1, ddrt: 7, paths: { include: [{}, {}, {}, {}, {}, {}, {}], exclude: [] }, track: { mode: 0, delay: 300, paths: [] }, dump: !0, rpU: `` },
            16: o,
            18: 44,
            19: [1, 0, 1, 5],
        };
    ((f[20] = (f[16] >> 24) & 255),
        (f[21] = (f[16] >> 16) & 255),
        (f[22] = (f[16] >> 8) & 255),
        (f[23] = f[16] & 255),
        (f[24] = (f[16] / 256 / 256 / 256 / 256) >> 0),
        (f[25] = (f[16] / 256 / 256 / 256 / 256 / 256) >> 0),
        (f[26] = (i[0] >> 24) & 255),
        (f[27] = (i[0] >> 16) & 255),
        (f[28] = (i[0] >> 8) & 255),
        (f[29] = i[0] & 255),
        (f[30] = (i[1] / 256) & 255),
        (f[31] = (i[1] % 256) & 255),
        (f[32] = (i[1] >> 24) & 255),
        (f[33] = (i[1] >> 16) & 255),
        (f[34] = (i[2] >> 24) & 255),
        (f[35] = (i[2] >> 16) & 255),
        (f[36] = (i[2] >> 8) & 255),
        (f[37] = i[2] & 255),
        (f[38] = s[21]),
        (f[39] = s[22]),
        (f[40] = c[21]),
        (f[41] = c[22]),
        (f[42] = l[23]),
        (f[43] = l[24]),
        (f[44] = (f[10] >> 24) & 255),
        (f[45] = (f[10] >> 16) & 255),
        (f[46] = (f[10] >> 8) & 255),
        (f[47] = f[10] & 255),
        (f[48] = f[8]),
        (f[49] = (f[10] / 256 / 256 / 256 / 256) >> 0),
        (f[50] = (f[10] / 256 / 256 / 256 / 256 / 256) >> 0),
        (f[51] = f[15].pageId),
        (f[52] = (f[15].pageId >> 24) & 255),
        (f[53] = (f[15].pageId >> 16) & 255),
        (f[54] = (f[15].pageId >> 8) & 255),
        (f[55] = f[15].pageId & 255),
        (f[56] = f[15].aid),
        (f[57] = f[15].aid & 255),
        (f[58] = (f[15].aid >> 8) & 255),
        (f[59] = (f[15].aid >> 16) & 255),
        (f[60] = (f[15].aid >> 24) & 255));
    let p = [];
    for (let e = 0; e < n.length; e++) p.push(n.codePointAt(e));
    ((f[64] = p.length),
        (f[65] = f[64] & 255),
        (f[66] = (f[64] >> 8) & 255),
        (f[69] = 0),
        (f[70] = f[69] & 255),
        (f[71] = (f[69] >> 8) & 255),
        (f[72] =
            f[18] ^
            f[20] ^
            f[26] ^
            f[30] ^
            f[38] ^
            f[40] ^
            f[42] ^
            f[21] ^
            f[27] ^
            f[31] ^
            f[35] ^
            f[39] ^
            f[41] ^
            f[43] ^
            f[22] ^
            f[28] ^
            f[32] ^
            f[36] ^
            f[23] ^
            f[29] ^
            f[33] ^
            f[37] ^
            f[44] ^
            f[45] ^
            f[46] ^
            f[47] ^
            f[48] ^
            f[49] ^
            f[50] ^
            f[24] ^
            f[25] ^
            f[52] ^
            f[53] ^
            f[54] ^
            f[55] ^
            f[57] ^
            f[58] ^
            f[59] ^
            f[60] ^
            f[65] ^
            f[66] ^
            f[70] ^
            f[71]));
    let m = [
        f[18],
        f[20],
        f[52],
        f[26],
        f[30],
        f[34],
        f[58],
        f[38],
        f[40],
        f[53],
        f[42],
        f[21],
        f[27],
        f[54],
        f[55],
        f[31],
        f[35],
        f[57],
        f[39],
        f[41],
        f[43],
        f[22],
        f[28],
        f[32],
        f[60],
        f[36],
        f[23],
        f[29],
        f[33],
        f[37],
        f[44],
        f[45],
        f[59],
        f[46],
        f[47],
        f[48],
        f[49],
        f[50],
        f[24],
        f[25],
        f[65],
        f[66],
        f[70],
        f[71],
    ];
    return ((m = m.concat(p).concat(f[72])), u(String.fromCharCode.apply(null, m), Reflect.apply(String.fromCharCode, null, [121])));
}
function D() {
    let e = [];
    return ((e = e.concat(T(Math.random() * 1e4, [3, 45]))), (e = e.concat(T(Math.random() * 1e4, [1, 0]))), (e = e.concat(T(Math.random() * 1e4, [1, 5]))), String.fromCharCode.apply(null, e));
}
function O(e, t) {
    return C(D() + E(e, t, `1536|747|1536|834|0|30|0|0|1536|834|1536|864|1525|747|24|24|Win32`), `s4`) + `=`;
}
const k = (e, t) => l(c(`video`, { controls: !0, preload: `metadata`, poster: t, children: c(`source`, { src: e, type: `video/mp4` }) })),
    A = {
        path: `/user/token/:token`,
        categories: [`new-media`],
        example: `/toutiao/user/token/MS4wLjABAAAAEmbqJP2CmC8XXv1BpMvQ3sQHKAxFsq8wHxj8XVIQWja6tMcB-QEbFkzkRNgMl12M`,
        parameters: { token: `用户 token，可在用户主页 URL 找到` },
        features: { antiCrawler: !0 },
        radar: [{ source: [`www.toutiao.com/c/user/token/:token`] }],
        name: `头条主页`,
        maintainers: [`TonyRL`],
        handler: j,
    };
async function j(i) {
    let { token: c } = i.req.param(),
        l = await a.tryGet(
            `toutiao:user:${c}`,
            async () => {
                let t = `category=profile_all&token=${c}&max_behot_time=0&entrance_gid&aid=24&app_name=toutiao_web`,
                    i = n(r.MODERN_WINDOWS_CHROME)[`user-agent`];
                return (await e(`https://www.toutiao.com/api/pc/list/feed?${t}&a_bogus=${O(t, i)}`, { headerGeneratorOptions: r.MODERN_WINDOWS_CHROME })).data;
            },
            t.cache.routeExpire,
            !1
        );
    if (!l) throw new o(`无法获取用户信息`);
    let u = l.map((e) => {
        switch (e.cell_type) {
            case 0:
            case 49: {
                let t = e.video.play_addr_list.toSorted((e, t) => t.bitrate - e.bitrate)[0];
                return {
                    title: e.title,
                    description: k(e.video.play_addr_list.toSorted((e, t) => t.bitrate - e.bitrate)[0].play_url_list[0], e.video.origin_cover.url_list[0]),
                    link: `https://www.toutiao.com/video/${e.id}/`,
                    pubDate: s(e.publish_time, `X`),
                    author: e.user?.info.name ?? e.source,
                    enclosure_url: t?.play_url_list[0],
                    enclosure_type: t?.play_url_list[0] ? `video/mp4` : void 0,
                    user: { name: e.user?.info.name, avatar: e.user?.info.avatar_url, description: e.user?.info.desc },
                };
            }
            case 32: {
                let t = e.large_image_list?.pop();
                return {
                    title: e.content?.split(`
`)[0],
                    description: e.rich_content,
                    link: `https://www.toutiao.com/w/${e.id}/`,
                    pubDate: s(e.publish_time, `X`),
                    author: e.user?.name,
                    enclosure_url: t?.url,
                    enclosure_type: t?.url ? `image/${new URL(t.url).pathname.split(`.`).pop()}` : void 0,
                    user: { name: e.user?.name, avatar: e.user?.avatar_url, description: e.user?.desc },
                };
            }
            case 60:
            default:
                return {
                    title: e.title,
                    description: e.abstract,
                    link: `https://www.toutiao.com/article/${e.id}/`,
                    pubDate: s(e.publish_time, `X`),
                    author: e.user_info?.name,
                    user: { name: e.user_info?.name, avatar: e.user_info?.avatar_url, description: e.user_info?.description },
                };
        }
    });
    return { title: `${u[0].user.name}的头条主页 - 今日头条(www.toutiao.com)`, description: u[0].user.description, link: `https://www.toutiao.com/c/user/token/${c}/`, image: u[0].user.avatar, item: u };
}
export { A as route };
