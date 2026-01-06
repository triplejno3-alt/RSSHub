import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { createRequire as n } from 'node:module';
import r from 'undici';
import i from 'http';
import a from 'https';
import { fileURLToPath as o } from 'url';
import { dirname as s, resolve as c } from 'path';
import { Writable as l } from 'stream';
import u from 'node:zlib';
import { isUtf8 as d } from 'node:buffer';
import f from 'net';
import p from 'node:path';
import { fileURLToPath as m } from 'node:url';
import h from 'fs';
import { fork as g } from 'child_process';
import { createFetch as _ } from 'ofetch';
var v = Object.create,
    y = Object.defineProperty,
    b = Object.getOwnPropertyDescriptor,
    x = Object.getOwnPropertyNames,
    S = Object.getPrototypeOf,
    C = Object.prototype.hasOwnProperty,
    w = (e, t) => () => (e && (t = e((e = 0))), t),
    T = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    E = (e, t, n, r) => {
        if ((t && typeof t == `object`) || typeof t == `function`)
            for (var i = x(t), a = 0, o = i.length, s; a < o; a++) ((s = i[a]), !C.call(e, s) && s !== n && y(e, s, { get: ((e) => t[e]).bind(null, s), enumerable: !(r = b(t, s)) || r.enumerable }));
        return e;
    },
    ee = (e, t, n) => ((n = e == null ? {} : v(S(e))), E(t || !e || !e.__esModule ? y(n, `default`, { value: e, enumerable: !0 }) : n, e)),
    D = n(import.meta.url),
    O = class e {
        constructor(t) {
            (typeof t == `string` && this.parse(t), t instanceof e && Object.assign(this, t));
        }
        parse(e) {
            if (e.match(/^\s*[-]{4,}$/)) return ((this.fileName = e), this);
            let t = e.match(/at (?:(.+?)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/);
            if (!t) return this;
            let n = null,
                r = null,
                i = null,
                a = null,
                o = null,
                s = t[5] === `native`;
            if (t[1]) {
                i = t[1];
                let e = i.lastIndexOf(`.`);
                if ((i[e - 1] == `.` && e--, e > 0)) {
                    ((n = i.substr(0, e)), (r = i.substr(e + 1)));
                    let t = n.indexOf(`.Module`);
                    t > 0 && ((i = i.substr(t + 1)), (n = n.substr(0, t)));
                }
            }
            (r && ((a = n), (o = r)), r === `<anonymous>` && ((o = null), (i = null)));
            let c = { fileName: t[2] || null, lineNumber: parseInt(t[3], 10) || null, functionName: i, typeName: a, methodName: o, columnNumber: parseInt(t[4], 10) || null, native: s };
            return (Object.assign(this, c), this);
        }
        valueOf() {
            return { fileName: this.fileName, lineNumber: this.lineNumber, functionName: this.functionName, typeName: this.typeName, methodName: this.methodName, columnNumber: this.columnNumber, native: this.native };
        }
        toString() {
            return JSON.stringify(this.valueOf());
        }
    };
const k = [/\((internal\/)?async_hooks\.js:/, /\(\//, /node_modules/];
function A(e) {
    let t = Object.create(null);
    return (
        e ? (t.stack = e) : ((Error.stackTraceLimit = 1 / 0), Error.captureStackTrace(t)),
        t.stack
            .split(
                `
`
            )
            .slice(1)
            .map((e) => new O(e))
    );
}
function j(e) {
    return e.filter((e) => !k.some((t) => t.test(e.fileName || ``)));
}
console.log.bind(console, `\x1B[36m[node-network-debugger]:`, `\x1B[32m`);
const te = console.warn.bind(console, `\x1B[36m[node-network-debugger](warn):`, `\x1B[33m`),
    M = (e) =>
        Object.keys(e).reduce((t, n) => {
            let r = e[n];
            return ((t[n] = typeof r == `object` && r ? M(r) : String(r)), t);
        }, {}),
    N = () => new Date().getTime() / 1e3;
function P() {
    let e = new Date().getTime();
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (t) {
        let n = ((e + Math.random() * 16) % 16) | 0;
        return ((e = Math.floor(e / 16)), (t === `x` ? n : (n & 3) | 8).toString(16));
    });
}
function ne(e) {
    let t = 0,
        n,
        r;
    if (e.length === 0) return t.toString(36);
    for (n = 0; n < e.length; n++) ((r = e.charCodeAt(n)), (t = (t << 5) - t + r), (t |= 0));
    return t.toString(36);
}
var re = class {
    constructor(e) {
        e ? ((this.id = e.id), (this.responseInfo = e.responseInfo), Object.assign(this, e)) : ((this.id = P()), (this.responseInfo = {}));
    }
    loadCallFrames(e) {
        let t = j(A(e)).map((e) => {
            let t = e.fileName || ``;
            return { columnNumber: e.columnNumber || 0, functionName: e.functionName || ``, lineNumber: e.lineNumber || 0, url: t.startsWith(`/`) ? `file://${t}` : t };
        });
        t.length > 0 && (this.initiator = { type: `script`, stack: { callFrames: t } });
    }
    isHiden() {
        return this.isWebSocket() && [`http://localhost/`, `ws://localhost/`].includes(this.url);
    }
    isWebSocket() {
        return this.requestHeaders?.Upgrade === `websocket` || this.requestHeaders?.upgrade === `websocket`;
    }
};
const F = Number(process.env.NETWORK_PORT || 5270),
    I = Number(process.env.NETWORK_SERVER_PORT || 5271);
(Number(process.env.REMOTE_DEBUGGER_PORT || 9333), process.env.NETWORK_DEBUG_MODE);
const L = s(o(import.meta.url));
var R = T((e, t) => {
        let n = [`nodebuffer`, `arraybuffer`, `fragments`],
            r = typeof Blob < `u`;
        (r && n.push(`blob`),
            (t.exports = {
                BINARY_TYPES: n,
                EMPTY_BUFFER: Buffer.alloc(0),
                GUID: `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`,
                hasBlob: r,
                kForOnEventAttribute: Symbol(`kIsForOnEventAttribute`),
                kListener: Symbol(`kListener`),
                kStatusCode: Symbol(`status-code`),
                kWebSocket: Symbol(`websocket`),
                NOOP: () => {},
            }));
    }),
    z,
    ie,
    B,
    ae = w(() => {
        ((z = () => m(import.meta.url)), (ie = () => p.dirname(z())), (B = ie()));
    }),
    oe = T((e, t) => {
        var n = D(`fs`),
            r = D(`path`),
            i = D(`os`),
            a = typeof __webpack_require__ == `function` ? __non_webpack_require__ : D,
            o = (process.config && process.config.variables) || {},
            s = !!process.env.PREBUILDS_ONLY,
            c = process.versions.modules,
            l = ee() ? `electron` : E() ? `node-webkit` : `node`,
            u = process.env.npm_config_arch || i.arch(),
            d = process.env.npm_config_platform || i.platform(),
            f = process.env.LIBC || (O(d) ? `musl` : `glibc`),
            p = process.env.ARM_VERSION || (u === `arm64` ? `8` : o.arm_version) || ``,
            m = (process.versions.uv || ``).split(`.`)[0];
        t.exports = h;
        function h(e) {
            return a(h.resolve(e));
        }
        h.resolve = h.path = function (e) {
            e = r.resolve(e || `.`);
            try {
                var t = a(r.join(e, `package.json`)).name.toUpperCase().replace(/-/g, `_`);
                process.env[t + `_PREBUILD`] && (e = process.env[t + `_PREBUILD`]);
            } catch {}
            if (!s) {
                var n = _(r.join(e, `build/Release`), v);
                if (n) return n;
                var i = _(r.join(e, `build/Debug`), v);
                if (i) return i;
            }
            var o = E(e);
            if (o) return o;
            var h = E(r.dirname(process.execPath));
            if (h) return h;
            var w = [
                `platform=` + d,
                `arch=` + u,
                `runtime=` + l,
                `abi=` + c,
                `uv=` + m,
                p ? `armv=` + p : ``,
                `libc=` + f,
                `node=` + process.versions.node,
                process.versions.electron ? `electron=` + process.versions.electron : ``,
                typeof __webpack_require__ == `function` ? `webpack=true` : ``,
            ]
                .filter(Boolean)
                .join(` `);
            throw Error(
                `No native build was found for ` +
                    w +
                    `
    loaded from: ` +
                    e +
                    `
`
            );
            function E(e) {
                var t = g(r.join(e, `prebuilds`)).map(y).filter(b(d, u)).sort(x)[0];
                if (t) {
                    var n = r.join(e, `prebuilds`, t.name),
                        i = g(n).map(S).filter(C(l, c)).sort(T(l))[0];
                    if (i) return r.join(n, i.file);
                }
            }
        };
        function g(e) {
            try {
                return n.readdirSync(e);
            } catch {
                return [];
            }
        }
        function _(e, t) {
            var n = g(e).filter(t);
            return n[0] && r.join(e, n[0]);
        }
        function v(e) {
            return /\.node$/.test(e);
        }
        function y(e) {
            var t = e.split(`-`);
            if (t.length === 2) {
                var n = t[0],
                    r = t[1].split(`+`);
                if (n && r.length && r.every(Boolean)) return { name: e, platform: n, architectures: r };
            }
        }
        function b(e, t) {
            return function (n) {
                return n == null || n.platform !== e ? !1 : n.architectures.includes(t);
            };
        }
        function x(e, t) {
            return e.architectures.length - t.architectures.length;
        }
        function S(e) {
            var t = e.split(`.`),
                n = t.pop(),
                r = { file: e, specificity: 0 };
            if (n === `node`) {
                for (var i = 0; i < t.length; i++) {
                    var a = t[i];
                    if (a === `node` || a === `electron` || a === `node-webkit`) r.runtime = a;
                    else if (a === `napi`) r.napi = !0;
                    else if (a.slice(0, 3) === `abi`) r.abi = a.slice(3);
                    else if (a.slice(0, 2) === `uv`) r.uv = a.slice(2);
                    else if (a.slice(0, 4) === `armv`) r.armv = a.slice(4);
                    else if (a === `glibc` || a === `musl`) r.libc = a;
                    else continue;
                    r.specificity++;
                }
                return r;
            }
        }
        function C(e, t) {
            return function (n) {
                return !(n == null || (n.runtime && n.runtime !== e && !w(n)) || (n.abi && n.abi !== t && !n.napi) || (n.uv && n.uv !== m) || (n.armv && n.armv !== p) || (n.libc && n.libc !== f));
            };
        }
        function w(e) {
            return e.runtime === `node` && e.napi;
        }
        function T(e) {
            return function (t, n) {
                return t.runtime === n.runtime ? (t.abi === n.abi ? (t.specificity === n.specificity ? 0 : t.specificity > n.specificity ? -1 : 1) : t.abi ? -1 : 1) : t.runtime === e ? -1 : 1;
            };
        }
        function E() {
            return !!(process.versions && process.versions.nw);
        }
        function ee() {
            return (process.versions && process.versions.electron) || process.env.ELECTRON_RUN_AS_NODE ? !0 : typeof window < `u` && window.process && window.process.type === `renderer`;
        }
        function O(e) {
            return e === `linux` && n.existsSync(`/etc/alpine-release`);
        }
        ((h.parseTags = S), (h.matchTags = C), (h.compareTags = T), (h.parseTuple = y), (h.matchTuple = b), (h.compareTuples = x));
    }),
    se = T((e, t) => {
        let n = typeof __webpack_require__ == `function` ? __non_webpack_require__ : D;
        typeof n.addon == `function` ? (t.exports = n.addon.bind(n)) : (t.exports = oe());
    }),
    ce = T((e, t) => {
        t.exports = {
            mask: (e, t, n, r, i) => {
                for (var a = 0; a < i; a++) n[r + a] = e[a] ^ t[a & 3];
            },
            unmask: (e, t) => {
                let n = e.length;
                for (var r = 0; r < n; r++) e[r] ^= t[r & 3];
            },
        };
    }),
    le = T((e, t) => {
        ae();
        try {
            t.exports = se()(B);
        } catch {
            t.exports = ce();
        }
    }),
    V = T((e, t) => {
        let { EMPTY_BUFFER: n } = R(),
            r = Buffer[Symbol.species];
        function i(e, t) {
            if (e.length === 0) return n;
            if (e.length === 1) return e[0];
            let i = Buffer.allocUnsafe(t),
                a = 0;
            for (let t = 0; t < e.length; t++) {
                let n = e[t];
                (i.set(n, a), (a += n.length));
            }
            return a < t ? new r(i.buffer, i.byteOffset, a) : i;
        }
        function a(e, t, n, r, i) {
            for (let a = 0; a < i; a++) n[r + a] = e[a] ^ t[a & 3];
        }
        function o(e, t) {
            for (let n = 0; n < e.length; n++) e[n] ^= t[n & 3];
        }
        function s(e) {
            return e.length === e.buffer.byteLength ? e.buffer : e.buffer.slice(e.byteOffset, e.byteOffset + e.length);
        }
        function c(e) {
            if (((c.readOnly = !0), Buffer.isBuffer(e))) return e;
            let t;
            return (e instanceof ArrayBuffer ? (t = new r(e)) : ArrayBuffer.isView(e) ? (t = new r(e.buffer, e.byteOffset, e.byteLength)) : ((t = Buffer.from(e)), (c.readOnly = !1)), t);
        }
        if (((t.exports = { concat: i, mask: a, toArrayBuffer: s, toBuffer: c, unmask: o }), !process.env.WS_NO_BUFFER_UTIL))
            try {
                let e = le();
                ((t.exports.mask = function (t, n, r, i, o) {
                    o < 48 ? a(t, n, r, i, o) : e.mask(t, n, r, i, o);
                }),
                    (t.exports.unmask = function (t, n) {
                        t.length < 32 ? o(t, n) : e.unmask(t, n);
                    }));
            } catch {}
    }),
    ue = T((e, t) => {
        let n = Symbol(`kDone`),
            r = Symbol(`kRun`);
        t.exports = class {
            constructor(e) {
                ((this[n] = () => {
                    (this.pending--, this[r]());
                }),
                    (this.concurrency = e || 1 / 0),
                    (this.jobs = []),
                    (this.pending = 0));
            }
            add(e) {
                (this.jobs.push(e), this[r]());
            }
            [r]() {
                if (this.pending !== this.concurrency && this.jobs.length) {
                    let e = this.jobs.shift();
                    (this.pending++, e(this[n]));
                }
            }
        };
    }),
    H = T((e, t) => {
        let n = D(`zlib`),
            r = V(),
            i = ue(),
            { kStatusCode: a } = R(),
            o = Buffer[Symbol.species],
            s = Buffer.from([0, 0, 255, 255]),
            c = Symbol(`permessage-deflate`),
            l = Symbol(`total-length`),
            u = Symbol(`callback`),
            d = Symbol(`buffers`),
            f = Symbol(`error`),
            p;
        t.exports = class {
            constructor(e, t, n) {
                ((this._maxPayload = n | 0),
                    (this._options = e || {}),
                    (this._threshold = this._options.threshold === void 0 ? 1024 : this._options.threshold),
                    (this._isServer = !!t),
                    (this._deflate = null),
                    (this._inflate = null),
                    (this.params = null),
                    (p ||= new i(this._options.concurrencyLimit === void 0 ? 10 : this._options.concurrencyLimit)));
            }
            static get extensionName() {
                return `permessage-deflate`;
            }
            offer() {
                let e = {};
                return (
                    this._options.serverNoContextTakeover && (e.server_no_context_takeover = !0),
                    this._options.clientNoContextTakeover && (e.client_no_context_takeover = !0),
                    this._options.serverMaxWindowBits && (e.server_max_window_bits = this._options.serverMaxWindowBits),
                    this._options.clientMaxWindowBits ? (e.client_max_window_bits = this._options.clientMaxWindowBits) : (this._options.clientMaxWindowBits ?? (e.client_max_window_bits = !0)),
                    e
                );
            }
            accept(e) {
                return ((e = this.normalizeParams(e)), (this.params = this._isServer ? this.acceptAsServer(e) : this.acceptAsClient(e)), this.params);
            }
            cleanup() {
                if (((this._inflate &&= (this._inflate.close(), null)), this._deflate)) {
                    let e = this._deflate[u];
                    (this._deflate.close(), (this._deflate = null), e && e(Error(`The deflate stream was closed while data was being processed`)));
                }
            }
            acceptAsServer(e) {
                let t = this._options,
                    n = e.find(
                        (e) =>
                            !(
                                (t.serverNoContextTakeover === !1 && e.server_no_context_takeover) ||
                                (e.server_max_window_bits && (t.serverMaxWindowBits === !1 || (typeof t.serverMaxWindowBits == `number` && t.serverMaxWindowBits > e.server_max_window_bits))) ||
                                (typeof t.clientMaxWindowBits == `number` && !e.client_max_window_bits)
                            )
                    );
                if (!n) throw Error(`None of the extension offers can be accepted`);
                return (
                    t.serverNoContextTakeover && (n.server_no_context_takeover = !0),
                    t.clientNoContextTakeover && (n.client_no_context_takeover = !0),
                    typeof t.serverMaxWindowBits == `number` && (n.server_max_window_bits = t.serverMaxWindowBits),
                    typeof t.clientMaxWindowBits == `number` ? (n.client_max_window_bits = t.clientMaxWindowBits) : (n.client_max_window_bits === !0 || t.clientMaxWindowBits === !1) && delete n.client_max_window_bits,
                    n
                );
            }
            acceptAsClient(e) {
                let t = e[0];
                if (this._options.clientNoContextTakeover === !1 && t.client_no_context_takeover) throw Error(`Unexpected parameter "client_no_context_takeover"`);
                if (!t.client_max_window_bits) typeof this._options.clientMaxWindowBits == `number` && (t.client_max_window_bits = this._options.clientMaxWindowBits);
                else if (this._options.clientMaxWindowBits === !1 || (typeof this._options.clientMaxWindowBits == `number` && t.client_max_window_bits > this._options.clientMaxWindowBits))
                    throw Error(`Unexpected or invalid parameter "client_max_window_bits"`);
                return t;
            }
            normalizeParams(e) {
                return (
                    e.forEach((e) => {
                        Object.keys(e).forEach((t) => {
                            let n = e[t];
                            if (n.length > 1) throw Error(`Parameter "${t}" must have only a single value`);
                            if (((n = n[0]), t === `client_max_window_bits`)) {
                                if (n !== !0) {
                                    let e = +n;
                                    if (!Number.isInteger(e) || e < 8 || e > 15) throw TypeError(`Invalid value for parameter "${t}": ${n}`);
                                    n = e;
                                } else if (!this._isServer) throw TypeError(`Invalid value for parameter "${t}": ${n}`);
                            } else if (t === `server_max_window_bits`) {
                                let e = +n;
                                if (!Number.isInteger(e) || e < 8 || e > 15) throw TypeError(`Invalid value for parameter "${t}": ${n}`);
                                n = e;
                            } else if (t === `client_no_context_takeover` || t === `server_no_context_takeover`) {
                                if (n !== !0) throw TypeError(`Invalid value for parameter "${t}": ${n}`);
                            } else throw Error(`Unknown parameter "${t}"`);
                            e[t] = n;
                        });
                    }),
                    e
                );
            }
            decompress(e, t, n) {
                p.add((r) => {
                    this._decompress(e, t, (e, t) => {
                        (r(), n(e, t));
                    });
                });
            }
            compress(e, t, n) {
                p.add((r) => {
                    this._compress(e, t, (e, t) => {
                        (r(), n(e, t));
                    });
                });
            }
            _decompress(e, t, i) {
                let a = this._isServer ? `client` : `server`;
                if (!this._inflate) {
                    let e = `${a}_max_window_bits`,
                        t = typeof this.params[e] == `number` ? this.params[e] : n.Z_DEFAULT_WINDOWBITS;
                    ((this._inflate = n.createInflateRaw({ ...this._options.zlibInflateOptions, windowBits: t })),
                        (this._inflate[c] = this),
                        (this._inflate[l] = 0),
                        (this._inflate[d] = []),
                        this._inflate.on(`error`, g),
                        this._inflate.on(`data`, h));
                }
                ((this._inflate[u] = i),
                    this._inflate.write(e),
                    t && this._inflate.write(s),
                    this._inflate.flush(() => {
                        let e = this._inflate[f];
                        if (e) {
                            (this._inflate.close(), (this._inflate = null), i(e));
                            return;
                        }
                        let n = r.concat(this._inflate[d], this._inflate[l]);
                        (this._inflate._readableState.endEmitted
                            ? (this._inflate.close(), (this._inflate = null))
                            : ((this._inflate[l] = 0), (this._inflate[d] = []), t && this.params[`${a}_no_context_takeover`] && this._inflate.reset()),
                            i(null, n));
                    }));
            }
            _compress(e, t, i) {
                let a = this._isServer ? `server` : `client`;
                if (!this._deflate) {
                    let e = `${a}_max_window_bits`,
                        t = typeof this.params[e] == `number` ? this.params[e] : n.Z_DEFAULT_WINDOWBITS;
                    ((this._deflate = n.createDeflateRaw({ ...this._options.zlibDeflateOptions, windowBits: t })), (this._deflate[l] = 0), (this._deflate[d] = []), this._deflate.on(`data`, m));
                }
                ((this._deflate[u] = i),
                    this._deflate.write(e),
                    this._deflate.flush(n.Z_SYNC_FLUSH, () => {
                        if (!this._deflate) return;
                        let e = r.concat(this._deflate[d], this._deflate[l]);
                        (t && (e = new o(e.buffer, e.byteOffset, e.length - 4)),
                            (this._deflate[u] = null),
                            (this._deflate[l] = 0),
                            (this._deflate[d] = []),
                            t && this.params[`${a}_no_context_takeover`] && this._deflate.reset(),
                            i(null, e));
                    }));
            }
        };
        function m(e) {
            (this[d].push(e), (this[l] += e.length));
        }
        function h(e) {
            if (((this[l] += e.length), this[c]._maxPayload < 1 || this[l] <= this[c]._maxPayload)) {
                this[d].push(e);
                return;
            }
            ((this[f] = RangeError(`Max payload size exceeded`)), (this[f].code = `WS_ERR_UNSUPPORTED_MESSAGE_LENGTH`), (this[f][a] = 1009), this.removeListener(`data`, h), this.reset());
        }
        function g(e) {
            if (((this[c]._inflate = null), this[f])) {
                this[u](this[f]);
                return;
            }
            ((e[a] = 1007), this[u](e));
        }
    }),
    U = T((e, t) => {
        function n(e) {
            let t = e.length,
                n = 0;
            for (; n < t; )
                if (!(e[n] & 128)) n++;
                else if ((e[n] & 224) == 192) {
                    if (n + 1 === t || (e[n + 1] & 192) != 128 || (e[n] & 254) == 192) return !1;
                    n += 2;
                } else if ((e[n] & 240) == 224) {
                    if (n + 2 >= t || (e[n + 1] & 192) != 128 || (e[n + 2] & 192) != 128 || (e[n] === 224 && (e[n + 1] & 224) == 128) || (e[n] === 237 && (e[n + 1] & 224) == 160)) return !1;
                    n += 3;
                } else if ((e[n] & 248) == 240) {
                    if (n + 3 >= t || (e[n + 1] & 192) != 128 || (e[n + 2] & 192) != 128 || (e[n + 3] & 192) != 128 || (e[n] === 240 && (e[n + 1] & 240) == 128) || (e[n] === 244 && e[n + 1] > 143) || e[n] > 244) return !1;
                    n += 4;
                } else return !1;
            return !0;
        }
        t.exports = n;
    }),
    W = T((e, t) => {
        ae();
        try {
            t.exports = se()(B);
        } catch {
            t.exports = U();
        }
    }),
    G = T((e, t) => {
        let { isUtf8: n } = D(`buffer`),
            { hasBlob: r } = R(),
            i = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0,
            ];
        function a(e) {
            return (e >= 1e3 && e <= 1014 && e !== 1004 && e !== 1005 && e !== 1006) || (e >= 3e3 && e <= 4999);
        }
        function o(e) {
            let t = e.length,
                n = 0;
            for (; n < t; )
                if (!(e[n] & 128)) n++;
                else if ((e[n] & 224) == 192) {
                    if (n + 1 === t || (e[n + 1] & 192) != 128 || (e[n] & 254) == 192) return !1;
                    n += 2;
                } else if ((e[n] & 240) == 224) {
                    if (n + 2 >= t || (e[n + 1] & 192) != 128 || (e[n + 2] & 192) != 128 || (e[n] === 224 && (e[n + 1] & 224) == 128) || (e[n] === 237 && (e[n + 1] & 224) == 160)) return !1;
                    n += 3;
                } else if ((e[n] & 248) == 240) {
                    if (n + 3 >= t || (e[n + 1] & 192) != 128 || (e[n + 2] & 192) != 128 || (e[n + 3] & 192) != 128 || (e[n] === 240 && (e[n + 1] & 240) == 128) || (e[n] === 244 && e[n + 1] > 143) || e[n] > 244) return !1;
                    n += 4;
                } else return !1;
            return !0;
        }
        function s(e) {
            return r && typeof e == `object` && typeof e.arrayBuffer == `function` && typeof e.type == `string` && typeof e.stream == `function` && (e[Symbol.toStringTag] === `Blob` || e[Symbol.toStringTag] === `File`);
        }
        if (((t.exports = { isBlob: s, isValidStatusCode: a, isValidUTF8: o, tokenChars: i }), n))
            t.exports.isValidUTF8 = function (e) {
                return e.length < 24 ? o(e) : n(e);
            };
        else if (!process.env.WS_NO_UTF_8_VALIDATE)
            try {
                let e = W();
                t.exports.isValidUTF8 = function (t) {
                    return t.length < 32 ? o(t) : e(t);
                };
            } catch {}
    }),
    de = T((e, t) => {
        let { Writable: n } = D(`stream`),
            r = H(),
            { BINARY_TYPES: i, EMPTY_BUFFER: a, kStatusCode: o, kWebSocket: s } = R(),
            { concat: c, toArrayBuffer: l, unmask: u } = V(),
            { isValidStatusCode: d, isValidUTF8: f } = G(),
            p = Buffer[Symbol.species];
        t.exports = class extends n {
            constructor(e = {}) {
                (super(),
                    (this._allowSynchronousEvents = e.allowSynchronousEvents === void 0 ? !0 : e.allowSynchronousEvents),
                    (this._binaryType = e.binaryType || i[0]),
                    (this._extensions = e.extensions || {}),
                    (this._isServer = !!e.isServer),
                    (this._maxPayload = e.maxPayload | 0),
                    (this._skipUTF8Validation = !!e.skipUTF8Validation),
                    (this[s] = void 0),
                    (this._bufferedBytes = 0),
                    (this._buffers = []),
                    (this._compressed = !1),
                    (this._payloadLength = 0),
                    (this._mask = void 0),
                    (this._fragmented = 0),
                    (this._masked = !1),
                    (this._fin = !1),
                    (this._opcode = 0),
                    (this._totalPayloadLength = 0),
                    (this._messageLength = 0),
                    (this._fragments = []),
                    (this._errored = !1),
                    (this._loop = !1),
                    (this._state = 0));
            }
            _write(e, t, n) {
                if (this._opcode === 8 && this._state == 0) return n();
                ((this._bufferedBytes += e.length), this._buffers.push(e), this.startLoop(n));
            }
            consume(e) {
                if (((this._bufferedBytes -= e), e === this._buffers[0].length)) return this._buffers.shift();
                if (e < this._buffers[0].length) {
                    let t = this._buffers[0];
                    return ((this._buffers[0] = new p(t.buffer, t.byteOffset + e, t.length - e)), new p(t.buffer, t.byteOffset, e));
                }
                let t = Buffer.allocUnsafe(e);
                do {
                    let n = this._buffers[0],
                        r = t.length - e;
                    (e >= n.length ? t.set(this._buffers.shift(), r) : (t.set(new Uint8Array(n.buffer, n.byteOffset, e), r), (this._buffers[0] = new p(n.buffer, n.byteOffset + e, n.length - e))), (e -= n.length));
                } while (e > 0);
                return t;
            }
            startLoop(e) {
                this._loop = !0;
                do
                    switch (this._state) {
                        case 0:
                            this.getInfo(e);
                            break;
                        case 1:
                            this.getPayloadLength16(e);
                            break;
                        case 2:
                            this.getPayloadLength64(e);
                            break;
                        case 3:
                            this.getMask();
                            break;
                        case 4:
                            this.getData(e);
                            break;
                        case 5:
                        case 6:
                            this._loop = !1;
                            return;
                    }
                while (this._loop);
                this._errored || e();
            }
            getInfo(e) {
                if (this._bufferedBytes < 2) {
                    this._loop = !1;
                    return;
                }
                let t = this.consume(2);
                if (t[0] & 48) {
                    e(this.createError(RangeError, `RSV2 and RSV3 must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_RSV_2_3`));
                    return;
                }
                let n = (t[0] & 64) == 64;
                if (n && !this._extensions[r.extensionName]) {
                    e(this.createError(RangeError, `RSV1 must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_RSV_1`));
                    return;
                }
                if (((this._fin = (t[0] & 128) == 128), (this._opcode = t[0] & 15), (this._payloadLength = t[1] & 127), this._opcode === 0)) {
                    if (n) {
                        e(this.createError(RangeError, `RSV1 must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_RSV_1`));
                        return;
                    }
                    if (!this._fragmented) {
                        e(this.createError(RangeError, `invalid opcode 0`, !0, 1002, `WS_ERR_INVALID_OPCODE`));
                        return;
                    }
                    this._opcode = this._fragmented;
                } else if (this._opcode === 1 || this._opcode === 2) {
                    if (this._fragmented) {
                        e(this.createError(RangeError, `invalid opcode ${this._opcode}`, !0, 1002, `WS_ERR_INVALID_OPCODE`));
                        return;
                    }
                    this._compressed = n;
                } else if (this._opcode > 7 && this._opcode < 11) {
                    if (!this._fin) {
                        e(this.createError(RangeError, `FIN must be set`, !0, 1002, `WS_ERR_EXPECTED_FIN`));
                        return;
                    }
                    if (n) {
                        e(this.createError(RangeError, `RSV1 must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_RSV_1`));
                        return;
                    }
                    if (this._payloadLength > 125 || (this._opcode === 8 && this._payloadLength === 1)) {
                        e(this.createError(RangeError, `invalid payload length ${this._payloadLength}`, !0, 1002, `WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH`));
                        return;
                    }
                } else {
                    e(this.createError(RangeError, `invalid opcode ${this._opcode}`, !0, 1002, `WS_ERR_INVALID_OPCODE`));
                    return;
                }
                if ((!this._fin && !this._fragmented && (this._fragmented = this._opcode), (this._masked = (t[1] & 128) == 128), this._isServer)) {
                    if (!this._masked) {
                        e(this.createError(RangeError, `MASK must be set`, !0, 1002, `WS_ERR_EXPECTED_MASK`));
                        return;
                    }
                } else if (this._masked) {
                    e(this.createError(RangeError, `MASK must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_MASK`));
                    return;
                }
                this._payloadLength === 126 ? (this._state = 1) : this._payloadLength === 127 ? (this._state = 2) : this.haveLength(e);
            }
            getPayloadLength16(e) {
                if (this._bufferedBytes < 2) {
                    this._loop = !1;
                    return;
                }
                ((this._payloadLength = this.consume(2).readUInt16BE(0)), this.haveLength(e));
            }
            getPayloadLength64(e) {
                if (this._bufferedBytes < 8) {
                    this._loop = !1;
                    return;
                }
                let t = this.consume(8),
                    n = t.readUInt32BE(0);
                if (n > 2 ** 21 - 1) {
                    e(this.createError(RangeError, `Unsupported WebSocket frame: payload length > 2^53 - 1`, !1, 1009, `WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH`));
                    return;
                }
                ((this._payloadLength = n * 2 ** 32 + t.readUInt32BE(4)), this.haveLength(e));
            }
            haveLength(e) {
                if (this._payloadLength && this._opcode < 8 && ((this._totalPayloadLength += this._payloadLength), this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)) {
                    e(this.createError(RangeError, `Max payload size exceeded`, !1, 1009, `WS_ERR_UNSUPPORTED_MESSAGE_LENGTH`));
                    return;
                }
                this._masked ? (this._state = 3) : (this._state = 4);
            }
            getMask() {
                if (this._bufferedBytes < 4) {
                    this._loop = !1;
                    return;
                }
                ((this._mask = this.consume(4)), (this._state = 4));
            }
            getData(e) {
                let t = a;
                if (this._payloadLength) {
                    if (this._bufferedBytes < this._payloadLength) {
                        this._loop = !1;
                        return;
                    }
                    ((t = this.consume(this._payloadLength)), this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0 && u(t, this._mask));
                }
                if (this._opcode > 7) {
                    this.controlMessage(t, e);
                    return;
                }
                if (this._compressed) {
                    ((this._state = 5), this.decompress(t, e));
                    return;
                }
                (t.length && ((this._messageLength = this._totalPayloadLength), this._fragments.push(t)), this.dataMessage(e));
            }
            decompress(e, t) {
                this._extensions[r.extensionName].decompress(e, this._fin, (e, n) => {
                    if (e) return t(e);
                    if (n.length) {
                        if (((this._messageLength += n.length), this._messageLength > this._maxPayload && this._maxPayload > 0)) {
                            t(this.createError(RangeError, `Max payload size exceeded`, !1, 1009, `WS_ERR_UNSUPPORTED_MESSAGE_LENGTH`));
                            return;
                        }
                        this._fragments.push(n);
                    }
                    (this.dataMessage(t), this._state === 0 && this.startLoop(t));
                });
            }
            dataMessage(e) {
                if (!this._fin) {
                    this._state = 0;
                    return;
                }
                let t = this._messageLength,
                    n = this._fragments;
                if (((this._totalPayloadLength = 0), (this._messageLength = 0), (this._fragmented = 0), (this._fragments = []), this._opcode === 2)) {
                    let r;
                    ((r = this._binaryType === `nodebuffer` ? c(n, t) : this._binaryType === `arraybuffer` ? l(c(n, t)) : this._binaryType === `blob` ? new Blob(n) : n),
                        this._allowSynchronousEvents
                            ? (this.emit(`message`, r, !0), (this._state = 0))
                            : ((this._state = 6),
                              setImmediate(() => {
                                  (this.emit(`message`, r, !0), (this._state = 0), this.startLoop(e));
                              })));
                } else {
                    let r = c(n, t);
                    if (!this._skipUTF8Validation && !f(r)) {
                        e(this.createError(Error, `invalid UTF-8 sequence`, !0, 1007, `WS_ERR_INVALID_UTF8`));
                        return;
                    }
                    this._state === 5 || this._allowSynchronousEvents
                        ? (this.emit(`message`, r, !1), (this._state = 0))
                        : ((this._state = 6),
                          setImmediate(() => {
                              (this.emit(`message`, r, !1), (this._state = 0), this.startLoop(e));
                          }));
                }
            }
            controlMessage(e, t) {
                if (this._opcode === 8) {
                    if (e.length === 0) ((this._loop = !1), this.emit(`conclude`, 1005, a), this.end());
                    else {
                        let n = e.readUInt16BE(0);
                        if (!d(n)) {
                            t(this.createError(RangeError, `invalid status code ${n}`, !0, 1002, `WS_ERR_INVALID_CLOSE_CODE`));
                            return;
                        }
                        let r = new p(e.buffer, e.byteOffset + 2, e.length - 2);
                        if (!this._skipUTF8Validation && !f(r)) {
                            t(this.createError(Error, `invalid UTF-8 sequence`, !0, 1007, `WS_ERR_INVALID_UTF8`));
                            return;
                        }
                        ((this._loop = !1), this.emit(`conclude`, n, r), this.end());
                    }
                    this._state = 0;
                    return;
                }
                this._allowSynchronousEvents
                    ? (this.emit(this._opcode === 9 ? `ping` : `pong`, e), (this._state = 0))
                    : ((this._state = 6),
                      setImmediate(() => {
                          (this.emit(this._opcode === 9 ? `ping` : `pong`, e), (this._state = 0), this.startLoop(t));
                      }));
            }
            createError(e, t, n, r, i) {
                ((this._loop = !1), (this._errored = !0));
                let a = new e(n ? `Invalid WebSocket frame: ${t}` : t);
                return (Error.captureStackTrace(a, this.createError), (a.code = i), (a[o] = r), a);
            }
        };
    }),
    fe = T((e, t) => {
        let { Duplex: n } = D(`stream`),
            { randomFillSync: r } = D(`crypto`),
            i = H(),
            { EMPTY_BUFFER: a, kWebSocket: o, NOOP: s } = R(),
            { isBlob: c, isValidStatusCode: l } = G(),
            { mask: u, toBuffer: d } = V(),
            f = Symbol(`kByteLength`),
            p = Buffer.alloc(4),
            m = 8 * 1024,
            h,
            g = m;
        t.exports = class e {
            constructor(e, t, n) {
                ((this._extensions = t || {}),
                    n && ((this._generateMask = n), (this._maskBuffer = Buffer.alloc(4))),
                    (this._socket = e),
                    (this._firstFragment = !0),
                    (this._compress = !1),
                    (this._bufferedBytes = 0),
                    (this._queue = []),
                    (this._state = 0),
                    (this.onerror = s),
                    (this[o] = void 0));
            }
            static frame(e, t) {
                let n,
                    i = !1,
                    a = 2,
                    o = !1;
                t.mask &&
                    ((n = t.maskBuffer || p),
                    t.generateMask ? t.generateMask(n) : (g === m && (h === void 0 && (h = Buffer.alloc(m)), r(h, 0, m), (g = 0)), (n[0] = h[g++]), (n[1] = h[g++]), (n[2] = h[g++]), (n[3] = h[g++])),
                    (o = (n[0] | n[1] | n[2] | n[3]) === 0),
                    (a = 6));
                let s;
                typeof e == `string` ? ((!t.mask || o) && t[f] !== void 0 ? (s = t[f]) : ((e = Buffer.from(e)), (s = e.length))) : ((s = e.length), (i = t.mask && t.readOnly && !o));
                let c = s;
                s >= 65536 ? ((a += 8), (c = 127)) : s > 125 && ((a += 2), (c = 126));
                let l = Buffer.allocUnsafe(i ? s + a : a);
                return (
                    (l[0] = t.fin ? t.opcode | 128 : t.opcode),
                    t.rsv1 && (l[0] |= 64),
                    (l[1] = c),
                    c === 126 ? l.writeUInt16BE(s, 2) : c === 127 && ((l[2] = l[3] = 0), l.writeUIntBE(s, 4, 6)),
                    !t.mask || ((l[1] |= 128), (l[a - 4] = n[0]), (l[a - 3] = n[1]), (l[a - 2] = n[2]), (l[a - 1] = n[3]), o) ? [l, e] : i ? (u(e, n, l, a, s), [l]) : (u(e, n, e, 0, s), [l, e])
                );
            }
            close(t, n, r, i) {
                let o;
                if (t === void 0) o = a;
                else if (typeof t != `number` || !l(t)) throw TypeError(`First argument must be a valid error code number`);
                else if (n === void 0 || !n.length) ((o = Buffer.allocUnsafe(2)), o.writeUInt16BE(t, 0));
                else {
                    let e = Buffer.byteLength(n);
                    if (e > 123) throw RangeError(`The message must not be greater than 123 bytes`);
                    ((o = Buffer.allocUnsafe(2 + e)), o.writeUInt16BE(t, 0), typeof n == `string` ? o.write(n, 2) : o.set(n, 2));
                }
                let s = { [f]: o.length, fin: !0, generateMask: this._generateMask, mask: r, maskBuffer: this._maskBuffer, opcode: 8, readOnly: !1, rsv1: !1 };
                this._state === 0 ? this.sendFrame(e.frame(o, s), i) : this.enqueue([this.dispatch, o, !1, s, i]);
            }
            ping(t, n, r) {
                let i, a;
                if ((typeof t == `string` ? ((i = Buffer.byteLength(t)), (a = !1)) : c(t) ? ((i = t.size), (a = !1)) : ((t = d(t)), (i = t.length), (a = d.readOnly)), i > 125))
                    throw RangeError(`The data size must not be greater than 125 bytes`);
                let o = { [f]: i, fin: !0, generateMask: this._generateMask, mask: n, maskBuffer: this._maskBuffer, opcode: 9, readOnly: a, rsv1: !1 };
                c(t) ? (this._state === 0 ? this.getBlobData(t, !1, o, r) : this.enqueue([this.getBlobData, t, !1, o, r])) : this._state === 0 ? this.sendFrame(e.frame(t, o), r) : this.enqueue([this.dispatch, t, !1, o, r]);
            }
            pong(t, n, r) {
                let i, a;
                if ((typeof t == `string` ? ((i = Buffer.byteLength(t)), (a = !1)) : c(t) ? ((i = t.size), (a = !1)) : ((t = d(t)), (i = t.length), (a = d.readOnly)), i > 125))
                    throw RangeError(`The data size must not be greater than 125 bytes`);
                let o = { [f]: i, fin: !0, generateMask: this._generateMask, mask: n, maskBuffer: this._maskBuffer, opcode: 10, readOnly: a, rsv1: !1 };
                c(t) ? (this._state === 0 ? this.getBlobData(t, !1, o, r) : this.enqueue([this.getBlobData, t, !1, o, r])) : this._state === 0 ? this.sendFrame(e.frame(t, o), r) : this.enqueue([this.dispatch, t, !1, o, r]);
            }
            send(e, t, n) {
                let r = this._extensions[i.extensionName],
                    a = t.binary ? 2 : 1,
                    o = t.compress,
                    s,
                    l;
                (typeof e == `string` ? ((s = Buffer.byteLength(e)), (l = !1)) : c(e) ? ((s = e.size), (l = !1)) : ((e = d(e)), (s = e.length), (l = d.readOnly)),
                    this._firstFragment
                        ? ((this._firstFragment = !1), o && r && r.params[r._isServer ? `server_no_context_takeover` : `client_no_context_takeover`] && (o = s >= r._threshold), (this._compress = o))
                        : ((o = !1), (a = 0)),
                    t.fin && (this._firstFragment = !0));
                let u = { [f]: s, fin: t.fin, generateMask: this._generateMask, mask: t.mask, maskBuffer: this._maskBuffer, opcode: a, readOnly: l, rsv1: o };
                c(e)
                    ? this._state === 0
                        ? this.getBlobData(e, this._compress, u, n)
                        : this.enqueue([this.getBlobData, e, this._compress, u, n])
                    : this._state === 0
                      ? this.dispatch(e, this._compress, u, n)
                      : this.enqueue([this.dispatch, e, this._compress, u, n]);
            }
            getBlobData(t, n, r, i) {
                ((this._bufferedBytes += r[f]),
                    (this._state = 2),
                    t
                        .arrayBuffer()
                        .then((t) => {
                            if (this._socket.destroyed) {
                                let e = Error(`The socket was closed while the blob was being read`);
                                process.nextTick(_, this, e, i);
                                return;
                            }
                            this._bufferedBytes -= r[f];
                            let a = d(t);
                            n ? this.dispatch(a, n, r, i) : ((this._state = 0), this.sendFrame(e.frame(a, r), i), this.dequeue());
                        })
                        .catch((e) => {
                            process.nextTick(v, this, e, i);
                        }));
            }
            dispatch(t, n, r, a) {
                if (!n) {
                    this.sendFrame(e.frame(t, r), a);
                    return;
                }
                let o = this._extensions[i.extensionName];
                ((this._bufferedBytes += r[f]),
                    (this._state = 1),
                    o.compress(t, r.fin, (t, n) => {
                        if (this._socket.destroyed) {
                            _(this, Error(`The socket was closed while data was being compressed`), a);
                            return;
                        }
                        ((this._bufferedBytes -= r[f]), (this._state = 0), (r.readOnly = !1), this.sendFrame(e.frame(n, r), a), this.dequeue());
                    }));
            }
            dequeue() {
                for (; this._state === 0 && this._queue.length; ) {
                    let e = this._queue.shift();
                    ((this._bufferedBytes -= e[3][f]), Reflect.apply(e[0], this, e.slice(1)));
                }
            }
            enqueue(e) {
                ((this._bufferedBytes += e[3][f]), this._queue.push(e));
            }
            sendFrame(e, t) {
                e.length === 2 ? (this._socket.cork(), this._socket.write(e[0]), this._socket.write(e[1], t), this._socket.uncork()) : this._socket.write(e[0], t);
            }
        };
        function _(e, t, n) {
            typeof n == `function` && n(t);
            for (let n = 0; n < e._queue.length; n++) {
                let r = e._queue[n],
                    i = r[r.length - 1];
                typeof i == `function` && i(t);
            }
        }
        function v(e, t, n) {
            (_(e, t, n), e.onerror(t));
        }
    }),
    pe = T((e, t) => {
        let { kForOnEventAttribute: n, kListener: r } = R(),
            i = Symbol(`kCode`),
            a = Symbol(`kData`),
            o = Symbol(`kError`),
            s = Symbol(`kMessage`),
            c = Symbol(`kReason`),
            l = Symbol(`kTarget`),
            u = Symbol(`kType`),
            d = Symbol(`kWasClean`);
        var f = class {
            constructor(e) {
                ((this[l] = null), (this[u] = e));
            }
            get target() {
                return this[l];
            }
            get type() {
                return this[u];
            }
        };
        (Object.defineProperty(f.prototype, `target`, { enumerable: !0 }), Object.defineProperty(f.prototype, `type`, { enumerable: !0 }));
        var p = class extends f {
            constructor(e, t = {}) {
                (super(e), (this[i] = t.code === void 0 ? 0 : t.code), (this[c] = t.reason === void 0 ? `` : t.reason), (this[d] = t.wasClean === void 0 ? !1 : t.wasClean));
            }
            get code() {
                return this[i];
            }
            get reason() {
                return this[c];
            }
            get wasClean() {
                return this[d];
            }
        };
        (Object.defineProperty(p.prototype, `code`, { enumerable: !0 }), Object.defineProperty(p.prototype, `reason`, { enumerable: !0 }), Object.defineProperty(p.prototype, `wasClean`, { enumerable: !0 }));
        var m = class extends f {
            constructor(e, t = {}) {
                (super(e), (this[o] = t.error === void 0 ? null : t.error), (this[s] = t.message === void 0 ? `` : t.message));
            }
            get error() {
                return this[o];
            }
            get message() {
                return this[s];
            }
        };
        (Object.defineProperty(m.prototype, `error`, { enumerable: !0 }), Object.defineProperty(m.prototype, `message`, { enumerable: !0 }));
        var h = class extends f {
            constructor(e, t = {}) {
                (super(e), (this[a] = t.data === void 0 ? null : t.data));
            }
            get data() {
                return this[a];
            }
        };
        (Object.defineProperty(h.prototype, `data`, { enumerable: !0 }),
            (t.exports = {
                CloseEvent: p,
                ErrorEvent: m,
                Event: f,
                EventTarget: {
                    addEventListener(e, t, i = {}) {
                        for (let a of this.listeners(e)) if (!i[n] && a[r] === t && !a[n]) return;
                        let a;
                        if (e === `message`)
                            a = function (e, n) {
                                let r = new h(`message`, { data: n ? e : e.toString() });
                                ((r[l] = this), g(t, this, r));
                            };
                        else if (e === `close`)
                            a = function (e, n) {
                                let r = new p(`close`, { code: e, reason: n.toString(), wasClean: this._closeFrameReceived && this._closeFrameSent });
                                ((r[l] = this), g(t, this, r));
                            };
                        else if (e === `error`)
                            a = function (e) {
                                let n = new m(`error`, { error: e, message: e.message });
                                ((n[l] = this), g(t, this, n));
                            };
                        else if (e === `open`)
                            a = function () {
                                let e = new f(`open`);
                                ((e[l] = this), g(t, this, e));
                            };
                        else return;
                        ((a[n] = !!i[n]), (a[r] = t), i.once ? this.once(e, a) : this.on(e, a));
                    },
                    removeEventListener(e, t) {
                        for (let i of this.listeners(e))
                            if (i[r] === t && !i[n]) {
                                this.removeListener(e, i);
                                break;
                            }
                    },
                },
                MessageEvent: h,
            }));
        function g(e, t, n) {
            typeof e == `object` && e.handleEvent ? e.handleEvent.call(e, n) : e.call(t, n);
        }
    }),
    me = T((e, t) => {
        let { tokenChars: n } = G();
        function r(e, t, n) {
            e[t] === void 0 ? (e[t] = [n]) : e[t].push(n);
        }
        function i(e) {
            let t = Object.create(null),
                i = Object.create(null),
                a = !1,
                o = !1,
                s = !1,
                c,
                l,
                u = -1,
                d = -1,
                f = -1,
                p = 0;
            for (; p < e.length; p++)
                if (((d = e.charCodeAt(p)), c === void 0))
                    if (f === -1 && n[d] === 1) u === -1 && (u = p);
                    else if (p !== 0 && (d === 32 || d === 9)) f === -1 && u !== -1 && (f = p);
                    else if (d === 59 || d === 44) {
                        if (u === -1) throw SyntaxError(`Unexpected character at index ${p}`);
                        f === -1 && (f = p);
                        let n = e.slice(u, f);
                        (d === 44 ? (r(t, n, i), (i = Object.create(null))) : (c = n), (u = f = -1));
                    } else throw SyntaxError(`Unexpected character at index ${p}`);
                else if (l === void 0)
                    if (f === -1 && n[d] === 1) u === -1 && (u = p);
                    else if (d === 32 || d === 9) f === -1 && u !== -1 && (f = p);
                    else if (d === 59 || d === 44) {
                        if (u === -1) throw SyntaxError(`Unexpected character at index ${p}`);
                        (f === -1 && (f = p), r(i, e.slice(u, f), !0), d === 44 && (r(t, c, i), (i = Object.create(null)), (c = void 0)), (u = f = -1));
                    } else if (d === 61 && u !== -1 && f === -1) ((l = e.slice(u, p)), (u = f = -1));
                    else throw SyntaxError(`Unexpected character at index ${p}`);
                else if (o) {
                    if (n[d] !== 1) throw SyntaxError(`Unexpected character at index ${p}`);
                    (u === -1 ? (u = p) : (a ||= !0), (o = !1));
                } else if (s)
                    if (n[d] === 1) u === -1 && (u = p);
                    else if (d === 34 && u !== -1) ((s = !1), (f = p));
                    else if (d === 92) o = !0;
                    else throw SyntaxError(`Unexpected character at index ${p}`);
                else if (d === 34 && e.charCodeAt(p - 1) === 61) s = !0;
                else if (f === -1 && n[d] === 1) u === -1 && (u = p);
                else if (u !== -1 && (d === 32 || d === 9)) f === -1 && (f = p);
                else if (d === 59 || d === 44) {
                    if (u === -1) throw SyntaxError(`Unexpected character at index ${p}`);
                    f === -1 && (f = p);
                    let n = e.slice(u, f);
                    ((a &&= ((n = n.replace(/\\/g, ``)), !1)), r(i, l, n), d === 44 && (r(t, c, i), (i = Object.create(null)), (c = void 0)), (l = void 0), (u = f = -1));
                } else throw SyntaxError(`Unexpected character at index ${p}`);
            if (u === -1 || s || d === 32 || d === 9) throw SyntaxError(`Unexpected end of input`);
            f === -1 && (f = p);
            let m = e.slice(u, f);
            return (c === void 0 ? r(t, m, i) : (l === void 0 ? r(i, m, !0) : a ? r(i, l, m.replace(/\\/g, ``)) : r(i, l, m), r(t, c, i)), t);
        }
        function a(e) {
            return Object.keys(e)
                .map((t) => {
                    let n = e[t];
                    return (
                        Array.isArray(n) || (n = [n]),
                        n
                            .map((e) =>
                                [t]
                                    .concat(
                                        Object.keys(e).map((t) => {
                                            let n = e[t];
                                            return (Array.isArray(n) || (n = [n]), n.map((e) => (e === !0 ? t : `${t}=${e}`)).join(`; `));
                                        })
                                    )
                                    .join(`; `)
                            )
                            .join(`, `)
                    );
                })
                .join(`, `);
        }
        t.exports = { format: a, parse: i };
    }),
    K = T((e, t) => {
        let n = D(`events`),
            r = D(`https`),
            i = D(`http`),
            a = D(`net`),
            o = D(`tls`),
            { randomBytes: s, createHash: c } = D(`crypto`),
            { Duplex: l, Readable: u } = D(`stream`),
            { URL: d } = D(`url`),
            f = H(),
            p = de(),
            m = fe(),
            { isBlob: h } = G(),
            { BINARY_TYPES: g, EMPTY_BUFFER: _, GUID: v, kForOnEventAttribute: y, kListener: b, kStatusCode: x, kWebSocket: S, NOOP: C } = R(),
            {
                EventTarget: { addEventListener: w, removeEventListener: T },
            } = pe(),
            { format: E, parse: ee } = me(),
            { toBuffer: O } = V(),
            k = Symbol(`kAborted`),
            A = [8, 13],
            j = [`CONNECTING`, `OPEN`, `CLOSING`, `CLOSED`],
            te = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
        var M = class e extends n {
            constructor(t, n, r) {
                (super(),
                    (this._binaryType = g[0]),
                    (this._closeCode = 1006),
                    (this._closeFrameReceived = !1),
                    (this._closeFrameSent = !1),
                    (this._closeMessage = _),
                    (this._closeTimer = null),
                    (this._errorEmitted = !1),
                    (this._extensions = {}),
                    (this._paused = !1),
                    (this._protocol = ``),
                    (this._readyState = e.CONNECTING),
                    (this._receiver = null),
                    (this._sender = null),
                    (this._socket = null),
                    t === null
                        ? ((this._autoPong = r.autoPong), (this._isServer = !0))
                        : ((this._bufferedAmount = 0), (this._isServer = !1), (this._redirects = 0), n === void 0 ? (n = []) : Array.isArray(n) || (typeof n == `object` && n ? ((r = n), (n = [])) : (n = [n])), N(this, t, n, r)));
            }
            get binaryType() {
                return this._binaryType;
            }
            set binaryType(e) {
                g.includes(e) && ((this._binaryType = e), this._receiver && (this._receiver._binaryType = e));
            }
            get bufferedAmount() {
                return this._socket ? this._socket._writableState.length + this._sender._bufferedBytes : this._bufferedAmount;
            }
            get extensions() {
                return Object.keys(this._extensions).join();
            }
            get isPaused() {
                return this._paused;
            }
            get onclose() {
                return null;
            }
            get onerror() {
                return null;
            }
            get onopen() {
                return null;
            }
            get onmessage() {
                return null;
            }
            get protocol() {
                return this._protocol;
            }
            get readyState() {
                return this._readyState;
            }
            get url() {
                return this._url;
            }
            setSocket(t, n, r) {
                let i = new p({
                        allowSynchronousEvents: r.allowSynchronousEvents,
                        binaryType: this.binaryType,
                        extensions: this._extensions,
                        isServer: this._isServer,
                        maxPayload: r.maxPayload,
                        skipUTF8Validation: r.skipUTF8Validation,
                    }),
                    a = new m(t, this._extensions, r.generateMask);
                ((this._receiver = i),
                    (this._sender = a),
                    (this._socket = t),
                    (i[S] = this),
                    (a[S] = this),
                    (t[S] = this),
                    i.on(`conclude`, L),
                    i.on(`drain`, z),
                    i.on(`error`, ie),
                    i.on(`message`, ae),
                    i.on(`ping`, oe),
                    i.on(`pong`, se),
                    (a.onerror = le),
                    t.setTimeout && t.setTimeout(0),
                    t.setNoDelay && t.setNoDelay(),
                    n.length > 0 && t.unshift(n),
                    t.on(`close`, U),
                    t.on(`data`, W),
                    t.on(`end`, K),
                    t.on(`error`, he),
                    (this._readyState = e.OPEN),
                    this.emit(`open`));
            }
            emitClose() {
                if (!this._socket) {
                    ((this._readyState = e.CLOSED), this.emit(`close`, this._closeCode, this._closeMessage));
                    return;
                }
                (this._extensions[f.extensionName] && this._extensions[f.extensionName].cleanup(), this._receiver.removeAllListeners(), (this._readyState = e.CLOSED), this.emit(`close`, this._closeCode, this._closeMessage));
            }
            close(t, n) {
                if (this.readyState !== e.CLOSED) {
                    if (this.readyState === e.CONNECTING) {
                        F(this, this._req, `WebSocket was closed before the connection was established`);
                        return;
                    }
                    if (this.readyState === e.CLOSING) {
                        this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end();
                        return;
                    }
                    ((this._readyState = e.CLOSING),
                        this._sender.close(t, n, !this._isServer, (e) => {
                            e || ((this._closeFrameSent = !0), (this._closeFrameReceived || this._receiver._writableState.errorEmitted) && this._socket.end());
                        }),
                        ue(this));
                }
            }
            pause() {
                this.readyState === e.CONNECTING || this.readyState === e.CLOSED || ((this._paused = !0), this._socket.pause());
            }
            ping(t, n, r) {
                if (this.readyState === e.CONNECTING) throw Error(`WebSocket is not open: readyState 0 (CONNECTING)`);
                if ((typeof t == `function` ? ((r = t), (t = n = void 0)) : typeof n == `function` && ((r = n), (n = void 0)), typeof t == `number` && (t = t.toString()), this.readyState !== e.OPEN)) {
                    I(this, t, r);
                    return;
                }
                (n === void 0 && (n = !this._isServer), this._sender.ping(t || _, n, r));
            }
            pong(t, n, r) {
                if (this.readyState === e.CONNECTING) throw Error(`WebSocket is not open: readyState 0 (CONNECTING)`);
                if ((typeof t == `function` ? ((r = t), (t = n = void 0)) : typeof n == `function` && ((r = n), (n = void 0)), typeof t == `number` && (t = t.toString()), this.readyState !== e.OPEN)) {
                    I(this, t, r);
                    return;
                }
                (n === void 0 && (n = !this._isServer), this._sender.pong(t || _, n, r));
            }
            resume() {
                this.readyState === e.CONNECTING || this.readyState === e.CLOSED || ((this._paused = !1), this._receiver._writableState.needDrain || this._socket.resume());
            }
            send(t, n, r) {
                if (this.readyState === e.CONNECTING) throw Error(`WebSocket is not open: readyState 0 (CONNECTING)`);
                if ((typeof n == `function` && ((r = n), (n = {})), typeof t == `number` && (t = t.toString()), this.readyState !== e.OPEN)) {
                    I(this, t, r);
                    return;
                }
                let i = { binary: typeof t != `string`, mask: !this._isServer, compress: !0, fin: !0, ...n };
                (this._extensions[f.extensionName] || (i.compress = !1), this._sender.send(t || _, i, r));
            }
            terminate() {
                if (this.readyState !== e.CLOSED) {
                    if (this.readyState === e.CONNECTING) {
                        F(this, this._req, `WebSocket was closed before the connection was established`);
                        return;
                    }
                    this._socket && ((this._readyState = e.CLOSING), this._socket.destroy());
                }
            }
        };
        (Object.defineProperty(M, `CONNECTING`, { enumerable: !0, value: j.indexOf(`CONNECTING`) }),
            Object.defineProperty(M.prototype, `CONNECTING`, { enumerable: !0, value: j.indexOf(`CONNECTING`) }),
            Object.defineProperty(M, `OPEN`, { enumerable: !0, value: j.indexOf(`OPEN`) }),
            Object.defineProperty(M.prototype, `OPEN`, { enumerable: !0, value: j.indexOf(`OPEN`) }),
            Object.defineProperty(M, `CLOSING`, { enumerable: !0, value: j.indexOf(`CLOSING`) }),
            Object.defineProperty(M.prototype, `CLOSING`, { enumerable: !0, value: j.indexOf(`CLOSING`) }),
            Object.defineProperty(M, `CLOSED`, { enumerable: !0, value: j.indexOf(`CLOSED`) }),
            Object.defineProperty(M.prototype, `CLOSED`, { enumerable: !0, value: j.indexOf(`CLOSED`) }),
            [`binaryType`, `bufferedAmount`, `extensions`, `isPaused`, `protocol`, `readyState`, `url`].forEach((e) => {
                Object.defineProperty(M.prototype, e, { enumerable: !0 });
            }),
            [`open`, `error`, `close`, `message`].forEach((e) => {
                Object.defineProperty(M.prototype, `on${e}`, {
                    enumerable: !0,
                    get() {
                        for (let t of this.listeners(e)) if (t[y]) return t[b];
                        return null;
                    },
                    set(t) {
                        for (let t of this.listeners(e))
                            if (t[y]) {
                                this.removeListener(e, t);
                                break;
                            }
                        typeof t == `function` && this.addEventListener(e, t, { [y]: !0 });
                    },
                });
            }),
            (M.prototype.addEventListener = w),
            (M.prototype.removeEventListener = T),
            (t.exports = M));
        function N(e, t, n, a) {
            let o = {
                allowSynchronousEvents: !0,
                autoPong: !0,
                protocolVersion: A[1],
                maxPayload: 100 * 1024 * 1024,
                skipUTF8Validation: !1,
                perMessageDeflate: !0,
                followRedirects: !1,
                maxRedirects: 10,
                ...a,
                socketPath: void 0,
                hostname: void 0,
                protocol: void 0,
                timeout: void 0,
                method: `GET`,
                host: void 0,
                path: void 0,
                port: void 0,
            };
            if (((e._autoPong = o.autoPong), !A.includes(o.protocolVersion))) throw RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${A.join(`, `)})`);
            let l;
            if (t instanceof d) l = t;
            else
                try {
                    l = new d(t);
                } catch {
                    throw SyntaxError(`Invalid URL: ${t}`);
                }
            (l.protocol === `http:` ? (l.protocol = `ws:`) : l.protocol === `https:` && (l.protocol = `wss:`), (e._url = l.href));
            let u = l.protocol === `wss:`,
                p = l.protocol === `ws+unix:`,
                m;
            if (
                (l.protocol !== `ws:` && !u && !p
                    ? (m = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`)
                    : p && !l.pathname
                      ? (m = `The URL's pathname is empty`)
                      : l.hash && (m = `The URL contains a fragment identifier`),
                m)
            ) {
                let t = SyntaxError(m);
                if (e._redirects === 0) throw t;
                P(e, t);
                return;
            }
            let h = u ? 443 : 80,
                g = s(16).toString(`base64`),
                _ = u ? r.request : i.request,
                y = new Set(),
                b;
            if (
                ((o.createConnection = o.createConnection || (u ? re : ne)),
                (o.defaultPort = o.defaultPort || h),
                (o.port = l.port || h),
                (o.host = l.hostname.startsWith(`[`) ? l.hostname.slice(1, -1) : l.hostname),
                (o.headers = { ...o.headers, 'Sec-WebSocket-Version': o.protocolVersion, 'Sec-WebSocket-Key': g, Connection: `Upgrade`, Upgrade: `websocket` }),
                (o.path = l.pathname + l.search),
                (o.timeout = o.handshakeTimeout),
                o.perMessageDeflate && ((b = new f(o.perMessageDeflate === !0 ? {} : o.perMessageDeflate, !1, o.maxPayload)), (o.headers[`Sec-WebSocket-Extensions`] = E({ [f.extensionName]: b.offer() }))),
                n.length)
            ) {
                for (let e of n) {
                    if (typeof e != `string` || !te.test(e) || y.has(e)) throw SyntaxError(`An invalid or duplicated subprotocol was specified`);
                    y.add(e);
                }
                o.headers[`Sec-WebSocket-Protocol`] = n.join(`,`);
            }
            if ((o.origin && (o.protocolVersion < 13 ? (o.headers[`Sec-WebSocket-Origin`] = o.origin) : (o.headers.Origin = o.origin)), (l.username || l.password) && (o.auth = `${l.username}:${l.password}`), p)) {
                let e = o.path.split(`:`);
                ((o.socketPath = e[0]), (o.path = e[1]));
            }
            let x;
            if (o.followRedirects) {
                if (e._redirects === 0) {
                    ((e._originalIpc = p), (e._originalSecure = u), (e._originalHostOrSocketPath = p ? o.socketPath : l.host));
                    let t = a && a.headers;
                    if (((a = { ...a, headers: {} }), t)) for (let [e, n] of Object.entries(t)) a.headers[e.toLowerCase()] = n;
                } else if (e.listenerCount(`redirect`) === 0) {
                    let t = p ? (e._originalIpc ? o.socketPath === e._originalHostOrSocketPath : !1) : e._originalIpc ? !1 : l.host === e._originalHostOrSocketPath;
                    (!t || (e._originalSecure && !u)) && (delete o.headers.authorization, delete o.headers.cookie, t || delete o.headers.host, (o.auth = void 0));
                }
                (o.auth && !a.headers.authorization && (a.headers.authorization = `Basic ` + Buffer.from(o.auth).toString(`base64`)), (x = e._req = _(o)), e._redirects && e.emit(`redirect`, e.url, x));
            } else x = e._req = _(o);
            (o.timeout &&
                x.on(`timeout`, () => {
                    F(e, x, `Opening handshake has timed out`);
                }),
                x.on(`error`, (t) => {
                    x === null || x[k] || ((x = e._req = null), P(e, t));
                }),
                x.on(`response`, (r) => {
                    let i = r.headers.location,
                        s = r.statusCode;
                    if (i && o.followRedirects && s >= 300 && s < 400) {
                        if (++e._redirects > o.maxRedirects) {
                            F(e, x, `Maximum redirects exceeded`);
                            return;
                        }
                        x.abort();
                        let r;
                        try {
                            r = new d(i, t);
                        } catch {
                            P(e, SyntaxError(`Invalid URL: ${i}`));
                            return;
                        }
                        N(e, r, n, a);
                    } else e.emit(`unexpected-response`, x, r) || F(e, x, `Unexpected server response: ${r.statusCode}`);
                }),
                x.on(`upgrade`, (t, n, r) => {
                    if ((e.emit(`upgrade`, t), e.readyState !== M.CONNECTING)) return;
                    x = e._req = null;
                    let i = t.headers.upgrade;
                    if (i === void 0 || i.toLowerCase() !== `websocket`) {
                        F(e, n, `Invalid Upgrade header`);
                        return;
                    }
                    let a = c(`sha1`)
                        .update(g + v)
                        .digest(`base64`);
                    if (t.headers[`sec-websocket-accept`] !== a) {
                        F(e, n, `Invalid Sec-WebSocket-Accept header`);
                        return;
                    }
                    let s = t.headers[`sec-websocket-protocol`],
                        l;
                    if ((s === void 0 ? y.size && (l = `Server sent no subprotocol`) : y.size ? y.has(s) || (l = `Server sent an invalid subprotocol`) : (l = `Server sent a subprotocol but none was requested`), l)) {
                        F(e, n, l);
                        return;
                    }
                    s && (e._protocol = s);
                    let u = t.headers[`sec-websocket-extensions`];
                    if (u !== void 0) {
                        if (!b) {
                            F(e, n, `Server sent a Sec-WebSocket-Extensions header but no extension was requested`);
                            return;
                        }
                        let t;
                        try {
                            t = ee(u);
                        } catch {
                            F(e, n, `Invalid Sec-WebSocket-Extensions header`);
                            return;
                        }
                        let r = Object.keys(t);
                        if (r.length !== 1 || r[0] !== f.extensionName) {
                            F(e, n, `Server indicated an extension that was not requested`);
                            return;
                        }
                        try {
                            b.accept(t[f.extensionName]);
                        } catch {
                            F(e, n, `Invalid Sec-WebSocket-Extensions header`);
                            return;
                        }
                        e._extensions[f.extensionName] = b;
                    }
                    e.setSocket(n, r, { allowSynchronousEvents: o.allowSynchronousEvents, generateMask: o.generateMask, maxPayload: o.maxPayload, skipUTF8Validation: o.skipUTF8Validation });
                }),
                o.finishRequest ? o.finishRequest(x, e) : x.end());
        }
        function P(e, t) {
            ((e._readyState = M.CLOSING), (e._errorEmitted = !0), e.emit(`error`, t), e.emitClose());
        }
        function ne(e) {
            return ((e.path = e.socketPath), a.connect(e));
        }
        function re(e) {
            return ((e.path = void 0), !e.servername && e.servername !== `` && (e.servername = a.isIP(e.host) ? `` : e.host), o.connect(e));
        }
        function F(e, t, n) {
            e._readyState = M.CLOSING;
            let r = Error(n);
            (Error.captureStackTrace(r, F),
                t.setHeader
                    ? ((t[k] = !0), t.abort(), t.socket && !t.socket.destroyed && t.socket.destroy(), process.nextTick(P, e, r))
                    : (t.destroy(r), t.once(`error`, e.emit.bind(e, `error`)), t.once(`close`, e.emitClose.bind(e))));
        }
        function I(e, t, n) {
            if (t) {
                let n = h(t) ? t.size : O(t).length;
                e._socket ? (e._sender._bufferedBytes += n) : (e._bufferedAmount += n);
            }
            if (n) {
                let t = Error(`WebSocket is not open: readyState ${e.readyState} (${j[e.readyState]})`);
                process.nextTick(n, t);
            }
        }
        function L(e, t) {
            let n = this[S];
            ((n._closeFrameReceived = !0), (n._closeMessage = t), (n._closeCode = e), n._socket[S] !== void 0 && (n._socket.removeListener(`data`, W), process.nextTick(ce, n._socket), e === 1005 ? n.close() : n.close(e, t)));
        }
        function z() {
            let e = this[S];
            e.isPaused || e._socket.resume();
        }
        function ie(e) {
            let t = this[S];
            (t._socket[S] !== void 0 && (t._socket.removeListener(`data`, W), process.nextTick(ce, t._socket), t.close(e[x])), t._errorEmitted || ((t._errorEmitted = !0), t.emit(`error`, e)));
        }
        function B() {
            this[S].emitClose();
        }
        function ae(e, t) {
            this[S].emit(`message`, e, t);
        }
        function oe(e) {
            let t = this[S];
            (t._autoPong && t.pong(e, !this._isServer, C), t.emit(`ping`, e));
        }
        function se(e) {
            this[S].emit(`pong`, e);
        }
        function ce(e) {
            e.resume();
        }
        function le(e) {
            let t = this[S];
            t.readyState !== M.CLOSED && (t.readyState === M.OPEN && ((t._readyState = M.CLOSING), ue(t)), this._socket.end(), t._errorEmitted || ((t._errorEmitted = !0), t.emit(`error`, e)));
        }
        function ue(e) {
            e._closeTimer = setTimeout(e._socket.destroy.bind(e._socket), 3e4);
        }
        function U() {
            let e = this[S];
            (this.removeListener(`close`, U), this.removeListener(`data`, W), this.removeListener(`end`, K), (e._readyState = M.CLOSING));
            let t;
            (!this._readableState.endEmitted && !e._closeFrameReceived && !e._receiver._writableState.errorEmitted && (t = e._socket.read()) !== null && e._receiver.write(t),
                e._receiver.end(),
                (this[S] = void 0),
                clearTimeout(e._closeTimer),
                e._receiver._writableState.finished || e._receiver._writableState.errorEmitted ? e.emitClose() : (e._receiver.on(`error`, B), e._receiver.on(`finish`, B)));
        }
        function W(e) {
            this[S]._receiver.write(e) || this.pause();
        }
        function K() {
            let e = this[S];
            ((e._readyState = M.CLOSING), e._receiver.end(), this.end());
        }
        function he() {
            let e = this[S];
            (this.removeListener(`error`, he), this.on(`error`, C), e && ((e._readyState = M.CLOSING), this.destroy()));
        }
    }),
    he = T((e, t) => {
        K();
        let { Duplex: n } = D(`stream`);
        function r(e) {
            e.emit(`close`);
        }
        function i() {
            !this.destroyed && this._writableState.finished && this.destroy();
        }
        function a(e) {
            (this.removeListener(`error`, a), this.destroy(), this.listenerCount(`error`) === 0 && this.emit(`error`, e));
        }
        function o(e, t) {
            let o = !0,
                s = new n({ ...t, autoDestroy: !1, emitClose: !1, objectMode: !1, writableObjectMode: !1 });
            return (
                e.on(`message`, function (t, n) {
                    let r = !n && s._readableState.objectMode ? t.toString() : t;
                    s.push(r) || e.pause();
                }),
                e.once(`error`, function (e) {
                    s.destroyed || ((o = !1), s.destroy(e));
                }),
                e.once(`close`, function () {
                    s.destroyed || s.push(null);
                }),
                (s._destroy = function (t, n) {
                    if (e.readyState === e.CLOSED) {
                        (n(t), process.nextTick(r, s));
                        return;
                    }
                    let i = !1;
                    (e.once(`error`, function (e) {
                        ((i = !0), n(e));
                    }),
                        e.once(`close`, function () {
                            (i || n(t), process.nextTick(r, s));
                        }),
                        o && e.terminate());
                }),
                (s._final = function (t) {
                    if (e.readyState === e.CONNECTING) {
                        e.once(`open`, function () {
                            s._final(t);
                        });
                        return;
                    }
                    e._socket !== null &&
                        (e._socket._writableState.finished
                            ? (t(), s._readableState.endEmitted && s.destroy())
                            : (e._socket.once(`finish`, function () {
                                  t();
                              }),
                              e.close()));
                }),
                (s._read = function () {
                    e.isPaused && e.resume();
                }),
                (s._write = function (t, n, r) {
                    if (e.readyState === e.CONNECTING) {
                        e.once(`open`, function () {
                            s._write(t, n, r);
                        });
                        return;
                    }
                    e.send(t, r);
                }),
                s.on(`end`, i),
                s.on(`error`, a),
                s
            );
        }
        t.exports = o;
    }),
    ge = T((e, t) => {
        let { tokenChars: n } = G();
        function r(e) {
            let t = new Set(),
                r = -1,
                i = -1,
                a = 0;
            for (; a < e.length; a++) {
                let o = e.charCodeAt(a);
                if (i === -1 && n[o] === 1) r === -1 && (r = a);
                else if (a !== 0 && (o === 32 || o === 9)) i === -1 && r !== -1 && (i = a);
                else if (o === 44) {
                    if (r === -1) throw SyntaxError(`Unexpected character at index ${a}`);
                    i === -1 && (i = a);
                    let n = e.slice(r, i);
                    if (t.has(n)) throw SyntaxError(`The "${n}" subprotocol is duplicated`);
                    (t.add(n), (r = i = -1));
                } else throw SyntaxError(`Unexpected character at index ${a}`);
            }
            if (r === -1 || i !== -1) throw SyntaxError(`Unexpected end of input`);
            let o = e.slice(r, a);
            if (t.has(o)) throw SyntaxError(`The "${o}" subprotocol is duplicated`);
            return (t.add(o), t);
        }
        t.exports = { parse: r };
    }),
    _e = T((e, t) => {
        let n = D(`events`),
            r = D(`http`),
            { Duplex: i } = D(`stream`),
            { createHash: a } = D(`crypto`),
            o = me(),
            s = H(),
            c = ge(),
            l = K(),
            { GUID: u, kWebSocket: d } = R(),
            f = /^[+/0-9A-Za-z]{22}==$/;
        t.exports = class extends n {
            constructor(e, t) {
                if (
                    (super(),
                    (e = {
                        allowSynchronousEvents: !0,
                        autoPong: !0,
                        maxPayload: 100 * 1024 * 1024,
                        skipUTF8Validation: !1,
                        perMessageDeflate: !1,
                        handleProtocols: null,
                        clientTracking: !0,
                        verifyClient: null,
                        noServer: !1,
                        backlog: null,
                        server: null,
                        host: null,
                        path: null,
                        port: null,
                        WebSocket: l,
                        ...e,
                    }),
                    (e.port == null && !e.server && !e.noServer) || (e.port != null && (e.server || e.noServer)) || (e.server && e.noServer))
                )
                    throw TypeError(`One and only one of the "port", "server", or "noServer" options must be specified`);
                if (
                    (e.port == null
                        ? e.server && (this._server = e.server)
                        : ((this._server = r.createServer((e, t) => {
                              let n = r.STATUS_CODES[426];
                              (t.writeHead(426, { 'Content-Length': n.length, 'Content-Type': `text/plain` }), t.end(n));
                          })),
                          this._server.listen(e.port, e.host, e.backlog, t)),
                    this._server)
                ) {
                    let e = this.emit.bind(this, `connection`);
                    this._removeListeners = p(this._server, {
                        listening: this.emit.bind(this, `listening`),
                        error: this.emit.bind(this, `error`),
                        upgrade: (t, n, r) => {
                            this.handleUpgrade(t, n, r, e);
                        },
                    });
                }
                (e.perMessageDeflate === !0 && (e.perMessageDeflate = {}), e.clientTracking && ((this.clients = new Set()), (this._shouldEmitClose = !1)), (this.options = e), (this._state = 0));
            }
            address() {
                if (this.options.noServer) throw Error(`The server is operating in "noServer" mode`);
                return this._server ? this._server.address() : null;
            }
            close(e) {
                if (this._state === 2) {
                    (e &&
                        this.once(`close`, () => {
                            e(Error(`The server is not running`));
                        }),
                        process.nextTick(m, this));
                    return;
                }
                if ((e && this.once(`close`, e), this._state !== 1))
                    if (((this._state = 1), this.options.noServer || this.options.server))
                        (this._server && (this._removeListeners(), (this._removeListeners = this._server = null)), this.clients && this.clients.size ? (this._shouldEmitClose = !0) : process.nextTick(m, this));
                    else {
                        let e = this._server;
                        (this._removeListeners(),
                            (this._removeListeners = this._server = null),
                            e.close(() => {
                                m(this);
                            }));
                    }
            }
            shouldHandle(e) {
                if (this.options.path) {
                    let t = e.url.indexOf(`?`);
                    if ((t === -1 ? e.url : e.url.slice(0, t)) !== this.options.path) return !1;
                }
                return !0;
            }
            handleUpgrade(e, t, n, r) {
                t.on(`error`, h);
                let i = e.headers[`sec-websocket-key`],
                    a = e.headers.upgrade,
                    l = +e.headers[`sec-websocket-version`];
                if (e.method !== `GET`) {
                    _(this, e, t, 405, `Invalid HTTP method`);
                    return;
                }
                if (a === void 0 || a.toLowerCase() !== `websocket`) {
                    _(this, e, t, 400, `Invalid Upgrade header`);
                    return;
                }
                if (i === void 0 || !f.test(i)) {
                    _(this, e, t, 400, `Missing or invalid Sec-WebSocket-Key header`);
                    return;
                }
                if (l !== 13 && l !== 8) {
                    _(this, e, t, 400, `Missing or invalid Sec-WebSocket-Version header`, { 'Sec-WebSocket-Version': `13, 8` });
                    return;
                }
                if (!this.shouldHandle(e)) {
                    g(t, 400);
                    return;
                }
                let u = e.headers[`sec-websocket-protocol`],
                    d = new Set();
                if (u !== void 0)
                    try {
                        d = c.parse(u);
                    } catch {
                        _(this, e, t, 400, `Invalid Sec-WebSocket-Protocol header`);
                        return;
                    }
                let p = e.headers[`sec-websocket-extensions`],
                    m = {};
                if (this.options.perMessageDeflate && p !== void 0) {
                    let n = new s(this.options.perMessageDeflate, !0, this.options.maxPayload);
                    try {
                        let e = o.parse(p);
                        e[s.extensionName] && (n.accept(e[s.extensionName]), (m[s.extensionName] = n));
                    } catch {
                        _(this, e, t, 400, `Invalid or unacceptable Sec-WebSocket-Extensions header`);
                        return;
                    }
                }
                if (this.options.verifyClient) {
                    let a = { origin: e.headers[`${l === 8 ? `sec-websocket-origin` : `origin`}`], secure: !!(e.socket.authorized || e.socket.encrypted), req: e };
                    if (this.options.verifyClient.length === 2) {
                        this.options.verifyClient(a, (a, o, s, c) => {
                            if (!a) return g(t, o || 401, s, c);
                            this.completeUpgrade(m, i, d, e, t, n, r);
                        });
                        return;
                    }
                    if (!this.options.verifyClient(a)) return g(t, 401);
                }
                this.completeUpgrade(m, i, d, e, t, n, r);
            }
            completeUpgrade(e, t, n, r, i, c, l) {
                if (!i.readable || !i.writable) return i.destroy();
                if (i[d]) throw Error(`server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration`);
                if (this._state > 0) return g(i, 503);
                let f = [
                        `HTTP/1.1 101 Switching Protocols`,
                        `Upgrade: websocket`,
                        `Connection: Upgrade`,
                        `Sec-WebSocket-Accept: ${a(`sha1`)
                            .update(t + u)
                            .digest(`base64`)}`,
                    ],
                    p = new this.options.WebSocket(null, void 0, this.options);
                if (n.size) {
                    let e = this.options.handleProtocols ? this.options.handleProtocols(n, r) : n.values().next().value;
                    e && (f.push(`Sec-WebSocket-Protocol: ${e}`), (p._protocol = e));
                }
                if (e[s.extensionName]) {
                    let t = e[s.extensionName].params,
                        n = o.format({ [s.extensionName]: [t] });
                    (f.push(`Sec-WebSocket-Extensions: ${n}`), (p._extensions = e));
                }
                (this.emit(`headers`, f, r),
                    i.write(
                        f.concat(`\r
`).join(`\r
`)
                    ),
                    i.removeListener(`error`, h),
                    p.setSocket(i, c, { allowSynchronousEvents: this.options.allowSynchronousEvents, maxPayload: this.options.maxPayload, skipUTF8Validation: this.options.skipUTF8Validation }),
                    this.clients &&
                        (this.clients.add(p),
                        p.on(`close`, () => {
                            (this.clients.delete(p), this._shouldEmitClose && !this.clients.size && process.nextTick(m, this));
                        })),
                    l(p, r));
            }
        };
        function p(e, t) {
            for (let n of Object.keys(t)) e.on(n, t[n]);
            return function () {
                for (let n of Object.keys(t)) e.removeListener(n, t[n]);
            };
        }
        function m(e) {
            ((e._state = 2), e.emit(`close`));
        }
        function h() {
            this.destroy();
        }
        function g(e, t, n, i) {
            ((n ||= r.STATUS_CODES[t]),
                (i = { Connection: `close`, 'Content-Type': `text/html`, 'Content-Length': Buffer.byteLength(n), ...i }),
                e.once(`finish`, e.destroy),
                e.end(
                    `HTTP/1.1 ${t} ${r.STATUS_CODES[t]}\r\n` +
                        Object.keys(i).map((e) => `${e}: ${i[e]}`).join(`\r
`) +
                        `\r
\r
` +
                        n
                ));
        }
        function _(e, t, n, r, i, a) {
            if (e.listenerCount(`wsClientError`)) {
                let r = Error(i);
                (Error.captureStackTrace(r, _), e.emit(`wsClientError`, r, n, t));
            } else g(n, r, i, a);
        }
    });
(he(), de(), fe());
var ve = ee(K(), 1);
_e();
var ye = ve.default;
function be(e) {
    let t = {};
    return (
        e.forEach((e, n) => {
            t[n] = e;
        }),
        t
    );
}
const xe = [`nodebuffer`, `arraybuffer`, `fragments`, typeof Blob < `u` ? `blob` : null].filter(Boolean),
    Se = Buffer.alloc(0),
    Ce = Symbol(`status-code`),
    we = Symbol(`websocket`),
    Te = Buffer[Symbol.species];
function q(e, t) {
    if (e.length === 0) return Se;
    if (e.length === 1) return e[0];
    let n = Buffer.allocUnsafe(t),
        r = 0;
    for (let t = 0; t < e.length; t++) {
        let i = e[t];
        (n.set(i, r), (r += i.length));
    }
    return r < t ? new Te(n.buffer, n.byteOffset, r) : n;
}
function Ee(e, t) {
    for (let n = 0; n < e.length; n++) e[n] ^= t[n & 3];
}
function De(e) {
    return e.length === e.buffer.byteLength ? e.buffer : e.buffer.slice(e.byteOffset, e.byteOffset + e.length);
}
const Oe = Symbol(`kDone`),
    ke = Symbol(`kRun`);
var Ae = class {
    constructor(e = 1 / 0) {
        ((this[Oe] = () => {
            (this.pending--, this[ke]());
        }),
            (this.concurrency = e),
            (this.jobs = []),
            (this.pending = 0));
    }
    add(e) {
        (this.jobs.push(e), this[ke]());
    }
    [ke]() {
        if (this.pending !== this.concurrency && this.jobs.length) {
            let e = this.jobs.shift();
            (this.pending++, e(this[Oe]));
        }
    }
};
const je = Buffer.from([0, 0, 255, 255]),
    J = Symbol(`permessage-deflate`),
    Y = Symbol(`total-length`),
    X = Symbol(`callback`),
    Z = Symbol(`buffers`),
    Me = Symbol(`error`);
let Q;
var Ne = class {
    constructor(e = {}, t = !1, n = 0) {
        ((this._maxPayload = n | 0),
            (this._options = e),
            (this._threshold = this._options.threshold === void 0 ? 1024 : this._options.threshold),
            (this._isServer = !!t),
            (this._deflate = null),
            (this._inflate = null),
            (this.params = null),
            !Q && (Q = new Ae(this._options.concurrencyLimit === void 0 ? 10 : this._options.concurrencyLimit)));
    }
    static get extensionName() {
        return `permessage-deflate`;
    }
    offer() {
        let e = {};
        return (
            this._options.serverNoContextTakeover && (e.server_no_context_takeover = !0),
            this._options.clientNoContextTakeover && (e.client_no_context_takeover = !0),
            this._options.serverMaxWindowBits && (e.server_max_window_bits = this._options.serverMaxWindowBits),
            this._options.clientMaxWindowBits ? (e.client_max_window_bits = this._options.clientMaxWindowBits) : (this._options.clientMaxWindowBits ?? (e.client_max_window_bits = !0)),
            e
        );
    }
    accept(e) {
        return ((e = this.normalizeParams(e)), (this.params = this._isServer ? this.acceptAsServer(e) : this.acceptAsClient(e)), this.params);
    }
    cleanup() {
        if (((this._inflate &&= (this._inflate.close(), null)), this._deflate)) {
            let e = this._deflate[X];
            (this._deflate.close(), (this._deflate = null), e && e(Error(`The deflate stream was closed while data was being processed`)));
        }
    }
    acceptAsServer(e) {
        let t = this._options,
            n = e.find(
                (e) =>
                    !(
                        (t.serverNoContextTakeover === !1 && e.server_no_context_takeover) ||
                        (e.server_max_window_bits && (t.serverMaxWindowBits === !1 || (typeof t.serverMaxWindowBits == `number` && t.serverMaxWindowBits > e.server_max_window_bits))) ||
                        (typeof t.clientMaxWindowBits == `number` && !e.client_max_window_bits)
                    )
            );
        if (!n) throw Error(`None of the extension offers can be accepted`);
        return (
            t.serverNoContextTakeover && (n.server_no_context_takeover = !0),
            t.clientNoContextTakeover && (n.client_no_context_takeover = !0),
            typeof t.serverMaxWindowBits == `number` && (n.server_max_window_bits = t.serverMaxWindowBits),
            typeof t.clientMaxWindowBits == `number` ? (n.client_max_window_bits = t.clientMaxWindowBits) : (n.client_max_window_bits === !0 || t.clientMaxWindowBits === !1) && delete n.client_max_window_bits,
            n
        );
    }
    acceptAsClient(e) {
        let t = e[0];
        if (this._options.clientNoContextTakeover === !1 && t.client_no_context_takeover) throw Error(`Unexpected parameter "client_no_context_takeover"`);
        if (!t.client_max_window_bits) typeof this._options.clientMaxWindowBits == `number` && (t.client_max_window_bits = this._options.clientMaxWindowBits);
        else if (this._options.clientMaxWindowBits === !1 || (typeof this._options.clientMaxWindowBits == `number` && t.client_max_window_bits > this._options.clientMaxWindowBits))
            throw Error(`Unexpected or invalid parameter "client_max_window_bits"`);
        return t;
    }
    normalizeParams(e) {
        return (
            e.forEach((e) => {
                Object.keys(e).forEach((t) => {
                    let n = e[t];
                    if (n.length > 1) throw Error(`Parameter "${t}" must have only a single value`);
                    if (((n = n[0]), t === `client_max_window_bits`)) {
                        if (n !== !0) {
                            let e = +n;
                            if (!Number.isInteger(e) || e < 8 || e > 15) throw TypeError(`Invalid value for parameter "${t}": ${n}`);
                            n = e;
                        } else if (!this._isServer) throw TypeError(`Invalid value for parameter "${t}": ${n}`);
                    } else if (t === `server_max_window_bits`) {
                        let e = +n;
                        if (!Number.isInteger(e) || e < 8 || e > 15) throw TypeError(`Invalid value for parameter "${t}": ${n}`);
                        n = e;
                    } else if (t === `client_no_context_takeover` || t === `server_no_context_takeover`) {
                        if (n !== !0) throw TypeError(`Invalid value for parameter "${t}": ${n}`);
                    } else throw Error(`Unknown parameter "${t}"`);
                    e[t] = n;
                });
            }),
            e
        );
    }
    decompress(e, t, n) {
        Q?.add((r) => {
            this._decompress(e, t, (e, t) => {
                (r(), n(e, t));
            });
        });
    }
    compress(e, t, n) {
        Q?.add((r) => {
            this._compress(e, t, (e, t) => {
                (r(), n(e, t));
            });
        });
    }
    _decompress(e, t, n) {
        let r = this._isServer ? `client` : `server`;
        if (!this._inflate) {
            let e = `${r}_max_window_bits`,
                t = typeof this.params[e] == `number` ? this.params[e] : u.constants.Z_DEFAULT_WINDOWBITS;
            ((this._inflate = u.createInflateRaw({ ...this._options.zlibInflateOptions, windowBits: t })),
                (this._inflate[J] = this),
                (this._inflate[Y] = 0),
                (this._inflate[Z] = []),
                this._inflate.on(`error`, Pe),
                this._inflate.on(`data`, Fe));
        }
        ((this._inflate[X] = n),
            this._inflate.write(e),
            t && this._inflate.write(je),
            this._inflate.flush(() => {
                let e = this._inflate[Me];
                if (e) {
                    (this._inflate.close(), (this._inflate = null), n(e));
                    return;
                }
                let t = q(this._inflate[Z], this._inflate[Y]);
                if (this._maxPayload < 1 || t.length <= this._maxPayload) {
                    n(null, t);
                    return;
                }
                n(RangeError(`Max payload size exceeded`), null);
            }));
    }
    _compress(e, t, n) {
        let r = this._isServer ? `server` : `client`;
        if (!this._deflate) {
            let e = `${r}_max_window_bits`,
                t = typeof this.params[e] == `number` ? this.params[e] : u.constants.Z_DEFAULT_WINDOWBITS;
            ((this._deflate = u.createDeflateRaw({ ...this._options.zlibDeflateOptions, windowBits: t })), (this._deflate[Y] = 0), (this._deflate[Z] = []), this._deflate.on(`error`, Ie), this._deflate.on(`data`, Le));
        }
        ((this._deflate[X] = n),
            this._deflate.write(e),
            t &&
                this._deflate.flush(u.Z_SYNC_FLUSH, () => {
                    let e = q(this._deflate[Z], this._deflate[Y]);
                    if (this._maxPayload < 1 || e.length <= this._maxPayload) {
                        n(null, e);
                        return;
                    }
                    n(RangeError(`Max payload size exceeded`), null);
                }));
    }
};
function Pe(e) {
    this[J][X](e);
}
function Fe(e) {
    ((this[Y] += e.length), this[Z].push(e));
}
function Ie(e) {
    this[J][X](e);
}
function Le(e) {
    ((this[Y] += e.length), this[Z].push(e));
}
function Re(e) {
    return (e >= 1e3 && e <= 1014 && e !== 1004 && e !== 1005 && e !== 1006) || (e >= 3e3 && e <= 4999);
}
function ze(e) {
    let t = e.length,
        n = 0;
    for (; n < t; )
        if (!(e[n] & 128)) n++;
        else if ((e[n] & 224) == 192) {
            if (n + 1 === t || (e[n + 1] & 192) != 128 || (e[n] & 254) == 192) return !1;
            n += 2;
        } else if ((e[n] & 240) == 224) {
            if (n + 2 >= t || (e[n + 1] & 192) != 128 || (e[n + 2] & 192) != 128 || (e[n] === 224 && (e[n + 1] & 224) == 128) || (e[n] === 237 && (e[n + 1] & 224) == 160)) return !1;
            n += 3;
        } else if ((e[n] & 248) == 240) {
            if (n + 3 >= t || (e[n + 1] & 192) != 128 || (e[n + 2] & 192) != 128 || (e[n + 3] & 192) != 128 || (e[n] === 240 && (e[n + 1] & 240) == 128) || (e[n] === 244 && e[n + 1] > 143) || e[n] > 244) return !1;
            n += 4;
        } else return !1;
    return !0;
}
const Be = d
    ? function (e) {
          return e.length < 24 ? ze(e) : d(e);
      }
    : ze;
var Ve;
const $ = Buffer[Symbol.species];
var He = class extends ((Ve = l), Ve) {
    constructor(e = {}) {
        (super(),
            (this._allowSynchronousEvents = e.allowSynchronousEvents === void 0 ? !0 : e.allowSynchronousEvents),
            (this._binaryType = e.binaryType || xe[0]),
            (this._extensions = e.extensions || {}),
            (this._isServer = !!e.isServer),
            (this._maxPayload = e.maxPayload || 0),
            (this._skipUTF8Validation = !!e.skipUTF8Validation),
            (this[we] = void 0),
            (this._bufferedBytes = 0),
            (this._buffers = []),
            (this._compressed = !1),
            (this._payloadLength = 0),
            (this._mask = void 0),
            (this._fragmented = 0),
            (this._masked = !1),
            (this._fin = !1),
            (this._opcode = 0),
            (this._totalPayloadLength = 0),
            (this._messageLength = 0),
            (this._fragments = []),
            (this._errored = !1),
            (this._loop = !1),
            (this._state = 0));
    }
    _write(e, t, n) {
        if (this._opcode === 8 && this._state === 0) return n();
        ((this._bufferedBytes += e.length), this._buffers.push(e), this.startLoop(n));
    }
    consume(e) {
        if (((this._bufferedBytes -= e), e === this._buffers[0].length)) return this._buffers.shift();
        if (e < this._buffers[0].length) {
            let t = this._buffers[0];
            return ((this._buffers[0] = new $(t.buffer, t.byteOffset + e, t.length - e)), new $(t.buffer, t.byteOffset, e));
        }
        let t = Buffer.allocUnsafe(e);
        do {
            let n = this._buffers[0],
                r = t.length - e;
            (e >= n.length ? t.set(this._buffers.shift(), r) : (t.set(new Uint8Array(n.buffer, n.byteOffset, e), r), (this._buffers[0] = new $(n.buffer, n.byteOffset + e, n.length - e))), (e -= n.length));
        } while (e > 0);
        return t;
    }
    startLoop(e) {
        this._loop = !0;
        do
            switch (this._state) {
                case 0:
                    this.getInfo(e);
                    break;
                case 1:
                    this.getPayloadLength16(e);
                    break;
                case 2:
                    this.getPayloadLength64(e);
                    break;
                case 3:
                    this.getMask();
                    break;
                case 4:
                    this.getData(e);
                    break;
                case 5:
                case 6:
                    this._loop = !1;
                    return;
            }
        while (this._loop);
        this._errored || e();
    }
    getInfo(e) {
        if (this._bufferedBytes < 2) {
            this._loop = !1;
            return;
        }
        let t = this.consume(2);
        if (t[0] & 48) {
            e(this.createError(RangeError, `RSV2 and RSV3 must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_RSV_2_3`));
            return;
        }
        let n = (t[0] & 64) == 64;
        if (n && !this._extensions[Ne.extensionName]) {
            e(this.createError(RangeError, `RSV1 must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_RSV_1`));
            return;
        }
        if (((this._fin = (t[0] & 128) == 128), (this._opcode = t[0] & 15), (this._payloadLength = t[1] & 127), this._opcode === 0)) {
            if (n) {
                e(this.createError(RangeError, `RSV1 must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_RSV_1`));
                return;
            }
            if (!this._fragmented) {
                e(this.createError(RangeError, `invalid opcode 0`, !0, 1002, `WS_ERR_INVALID_OPCODE`));
                return;
            }
            this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
            if (this._fragmented) {
                e(this.createError(RangeError, `invalid opcode ${this._opcode}`, !0, 1002, `WS_ERR_INVALID_OPCODE`));
                return;
            }
            this._compressed = n;
        } else if (this._opcode > 7 && this._opcode < 11) {
            if (!this._fin) {
                e(this.createError(RangeError, `FIN must be set`, !0, 1002, `WS_ERR_EXPECTED_FIN`));
                return;
            }
            if (n) {
                e(this.createError(RangeError, `RSV1 must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_RSV_1`));
                return;
            }
            if (this._payloadLength > 125 || (this._opcode === 8 && this._payloadLength === 1)) {
                e(this.createError(RangeError, `invalid payload length ${this._payloadLength}`, !0, 1002, `WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH`));
                return;
            }
        } else {
            e(this.createError(RangeError, `invalid opcode ${this._opcode}`, !0, 1002, `WS_ERR_INVALID_OPCODE`));
            return;
        }
        if ((!this._fin && !this._fragmented && (this._fragmented = this._opcode), (this._masked = (t[1] & 128) == 128), this._isServer)) {
            if (!this._masked) {
                e(this.createError(RangeError, `MASK must be set`, !0, 1002, `WS_ERR_EXPECTED_MASK`));
                return;
            }
        } else if (this._masked) {
            e(this.createError(RangeError, `MASK must be clear`, !0, 1002, `WS_ERR_UNEXPECTED_MASK`));
            return;
        }
        this._payloadLength === 126 ? (this._state = 1) : this._payloadLength === 127 ? (this._state = 2) : this.haveLength(e);
    }
    getPayloadLength16(e) {
        if (this._bufferedBytes < 2) {
            this._loop = !1;
            return;
        }
        ((this._payloadLength = this.consume(2).readUInt16BE(0)), this.haveLength(e));
    }
    getPayloadLength64(e) {
        if (this._bufferedBytes < 8) {
            this._loop = !1;
            return;
        }
        let t = this.consume(8),
            n = t.readUInt32BE(0);
        if (n > 2 ** 21 - 1) {
            e(this.createError(RangeError, `Unsupported WebSocket frame: payload length > 2^53 - 1`, !1, 1009, `WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH`));
            return;
        }
        ((this._payloadLength = n * 2 ** 32 + t.readUInt32BE(4)), this.haveLength(e));
    }
    haveLength(e) {
        if (this._payloadLength && this._opcode < 8 && ((this._totalPayloadLength += this._payloadLength), this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)) {
            e(this.createError(RangeError, `Max payload size exceeded`, !1, 1009, `WS_ERR_UNSUPPORTED_MESSAGE_LENGTH`));
            return;
        }
        this._masked ? (this._state = 3) : (this._state = 4);
    }
    getMask() {
        if (this._bufferedBytes < 4) {
            this._loop = !1;
            return;
        }
        ((this._mask = this.consume(4)), (this._state = 4));
    }
    getData(e) {
        let t = Se;
        if (this._payloadLength) {
            if (this._bufferedBytes < this._payloadLength) {
                this._loop = !1;
                return;
            }
            ((t = this.consume(this._payloadLength)), this._masked && this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3] && Ee(t, this._mask));
        }
        if (this._opcode > 7) {
            this.controlMessage(t, e);
            return;
        }
        if (this._compressed) {
            ((this._state = 5), this.decompress(t, e));
            return;
        }
        (t.length && ((this._messageLength = this._totalPayloadLength), this._fragments.push(t)), this.dataMessage(e));
    }
    decompress(e, t) {
        this._extensions[Ne.extensionName].decompress(e, this._fin, (e, n) => {
            if (e) return t(e);
            if (n && n.length) {
                if (((this._messageLength += n.length), this._messageLength > this._maxPayload && this._maxPayload > 0)) {
                    t(this.createError(RangeError, `Max payload size exceeded`, !1, 1009, `WS_ERR_UNSUPPORTED_MESSAGE_LENGTH`));
                    return;
                }
                this._fragments.push(n);
            }
            (this.dataMessage(t), this._state === 0 && this.startLoop(t));
        });
    }
    dataMessage(e) {
        if (!this._fin) {
            this._state = 0;
            return;
        }
        let t = this._messageLength,
            n = this._fragments;
        if (((this._totalPayloadLength = 0), (this._messageLength = 0), (this._fragmented = 0), (this._fragments = []), this._opcode === 2)) {
            let r;
            ((r = this._binaryType === `nodebuffer` ? q(n, t) : this._binaryType === `arraybuffer` ? De(q(n, t)) : this._binaryType === `blob` ? new Blob(n) : n),
                this._allowSynchronousEvents
                    ? (this.emit(`message`, r, !0), (this._state = 0))
                    : ((this._state = 6),
                      setImmediate(() => {
                          (this.emit(`message`, r, !0), (this._state = 0), this.startLoop(e));
                      })));
        } else {
            let r = q(n, t);
            if (!this._skipUTF8Validation && !Be(r)) {
                e(this.createError(Error, `invalid UTF-8 sequence`, !0, 1007, `WS_ERR_INVALID_UTF8`));
                return;
            }
            this._state === 5 || this._allowSynchronousEvents
                ? (this.emit(`message`, r, !1), (this._state = 0))
                : ((this._state = 6),
                  setImmediate(() => {
                      (this.emit(`message`, r, !1), (this._state = 0), this.startLoop(e));
                  }));
        }
    }
    controlMessage(e, t) {
        if (this._opcode === 8) {
            if (e.length === 0) ((this._loop = !1), this.emit(`conclude`, 1005, Se), this.end());
            else {
                let n = e.readUInt16BE(0);
                if (!Re(n)) {
                    t(this.createError(RangeError, `invalid status code ${n}`, !0, 1002, `WS_ERR_INVALID_CLOSE_CODE`));
                    return;
                }
                let r = new $(e.buffer, e.byteOffset + 2, e.length - 2);
                if (!this._skipUTF8Validation && !Be(r)) {
                    t(this.createError(Error, `invalid UTF-8 sequence`, !0, 1007, `WS_ERR_INVALID_UTF8`));
                    return;
                }
                ((this._loop = !1), this.emit(`conclude`, n, r), this.end());
            }
            this._state = 0;
            return;
        }
        this._allowSynchronousEvents
            ? (this.emit(this._opcode === 9 ? `ping` : `pong`, e), (this._state = 0))
            : ((this._state = 6),
              setImmediate(() => {
                  (this.emit(this._opcode === 9 ? `ping` : `pong`, e), (this._state = 0), this.startLoop(t));
              }));
    }
    createError(e, t, n, r, i) {
        ((this._loop = !1), (this._errored = !0));
        let a = new e(n ? `Invalid WebSocket frame: ${t}` : t);
        return (Error.captureStackTrace(a, this.createError), (a.code = i), (a[Ce] = r), a);
    }
};
function Ue(e, t, n) {
    let r = e.write;
    return (
        (e.write = (n) => {
            try {
                t.requestData = JSON.parse(n.toString());
            } catch {
                t.requestData = n;
            }
            return r.bind(e)(n);
        }),
        e.on(`error`, () => {
            ((t.responseStatusCode = 0), (t.requestEndTime = new Date().getTime()), n.sendRequest(`endRequest`, t));
        }),
        t.isWebSocket()
            ? e.on(`upgrade`, async (e, r, i) => {
                  let a = r.write;
                  if (t.isHiden()) return;
                  await n.send({ type: `Network.webSocketCreated`, data: { requestId: t.id, url: t.url, initiator: t.initiator, response: e } });
                  let o = new He({ allowSynchronousEvents: !0, binaryType: xe[0], isServer: !1 }),
                      s = new He({ allowSynchronousEvents: !0, binaryType: xe[0], isServer: !0 });
                  (o.on(`message`, (e) => {
                      let r = e.toString();
                      n.send({ type: `Network.webSocketFrameReceived`, data: { requestId: t.id, response: { payloadData: r, opcode: 1, mask: !1 } } });
                  }),
                      s.on(`message`, (e) => {
                          let r = e.toString();
                          n.send({ type: `Network.webSocketFrameSent`, data: { requestId: t.id, response: { payloadData: r, opcode: 1, mask: !0 } } });
                      }));
                  let c;
                  ((r.write = (e, ...t) => {
                      let n = Buffer.from(e);
                      return (s.write(n), a.call(r, e, ...t));
                  }),
                      r.addListener(`data`, (e) => {
                          let t = Buffer.from(e);
                          o.write(t);
                      }),
                      r.addListener(`close`, () => {
                          ((c = r.read()),
                              c !== null && (o.write(c), s.write(c)),
                              o.end(),
                              s.end(),
                              o.removeAllListeners(),
                              s.removeAllListeners(),
                              n.send({ method: `Network.webSocketClosed`, params: { requestId: t.id, timestamp: N() } }));
                      }),
                      r.addListener(`end`, () => {
                          (o.end(), s.end(), o.removeAllListeners(), s.removeAllListeners());
                      }));
              })
            : n.sendRequest(`registerRequest`, t),
        e
    );
}
function We(e, t, n) {
    return (r) => {
        ((t.responseHeaders = r.headers), typeof e == `function` && e(r), n.responseRequest(t.id, r));
    };
}
function Ge(e, t) {
    let n = e.setHeader;
    e.setHeader = function (r, i) {
        return (
            Array.isArray(i)
                ? i.forEach((e) => {
                      t.requestHeaders[r] = e;
                  })
                : (t.requestHeaders[r] = i),
            n.call(e, r, i)
        );
    };
}
function Ke(e, t, n) {
    return (r, i, a) => {
        let o, s, c;
        typeof r == `string` || r instanceof URL ? ((o = r), (s = i), (c = a)) : ((s = r), (c = i));
        let l = new re();
        (typeof o == `string`
            ? ((l.url = o), (l.method = `GET`))
            : o instanceof URL
              ? ((l.url = o.toString()), (l.method = `GET`))
              : s && typeof s != `string` && !(s instanceof URL) && (l.url = `${t ? `https` : `http`}://${s.hostname || s.host}${s.path}`),
            s && typeof s != `string` && !(s instanceof URL) && ((l.method = s.method), (l.requestHeaders = s.headers)),
            l.loadCallFrames(),
            l.isWebSocket() && (l.url = l.url.replace(`http://`, `ws://`).replace(`https://`, `wss://`)),
            n.sendRequest(`initRequest`, l));
        let u = We(c, l, n);
        if (typeof r == `string` || r instanceof URL) {
            let t = e(o, s, u);
            return (Ge(t, l), Ue(t, l, n));
        } else {
            let t = e(s, u);
            return (Ge(t, l), Ue(t, l, n));
        }
    };
}
const qe = (e) => new Promise((t) => setTimeout(t, e)),
    Je = (e, t) => {
        try {
            return Number(e) === process.pid
                ? Promise.resolve(!0)
                : (process.kill(Number(e), 0),
                  new Promise((e) => {
                      let n = f.createServer();
                      (n.once(`error`, (t) => {
                          (t.code === `EADDRINUSE` && e(!1), e(!1));
                      }),
                          n.once(`listening`, () => {
                              n.close(() => e(!0));
                          }),
                          n.listen(t));
                  }));
        } catch {
            return Promise.resolve(!1);
        }
    },
    Ye = (e) => {
        try {
            h.unlinkSync(e);
        } catch {}
    };
let Xe = null;
function Ze() {
    return Xe;
}
function Qe(e) {
    Xe = e;
}
var $e = class extends Error {
        constructor(e) {
            super(e);
        }
    },
    et = class {
        constructor(e) {
            ((this.options = e),
                (this.ws = new Promise(async (t, n) => {
                    let r = c(L, `./${e.key}`);
                    if (h.existsSync(r)) {
                        let t = h.readFileSync(r, `utf-8`);
                        if ((await qe(1), await Je(t, e.port))) {
                            te(`The main process with same options is already running, skip it.`);
                            return;
                        }
                        Ye(r);
                    }
                    h.writeFileSync(r, `${process.pid}`);
                    let i = new ye(`ws://localhost:${e.port}`);
                    (i.on(`open`, () => {
                        (Ye(r), t(i));
                    }),
                        i.on(`error`, () => {
                            this.openProcess(() => {
                                Ye(r);
                                let i = new ye(`ws://localhost:${e.port}`);
                                (i.on(`open`, () => {
                                    t(i);
                                }),
                                    i.on(`error`, n));
                            });
                        }));
                })),
                this.ws
                    .then((e) => {
                        (this.healthCheck(),
                            e.on(`error`, (e) => {
                                console.error(`MainProcess Socket Error: `, e);
                            }));
                    })
                    .catch((e) => {
                        if (!(e instanceof $e)) throw e;
                    }));
        }
        openProcess(e) {
            (() => {
                let t = g(c(L, `./fork`), { env: { ...process.env, NETWORK_OPTIONS: JSON.stringify(this.options) } }),
                    n = (r) => {
                        r === `ready` && (e && e(t), t.off(`message`, n));
                    };
                (t.on(`message`, n), (this.cp = t));
            })();
        }
        async send(e) {
            if (Ze()?.isAborted) return;
            let t = await this.ws.catch((e) => {
                if (e instanceof $e) return null;
                throw e;
            });
            t && t.send(JSON.stringify(e));
        }
        sendRequest(e, t) {
            let n = Ze(),
                r = t;
            return (
                n &&
                    ((n.request = r),
                    n.pipes
                        .filter((t) => t.type === e)
                        .map((e) => e.pipe)
                        .forEach((e) => {
                            r = e(r);
                        }),
                    (n.request = r)),
                this.send({ type: e, data: t }),
                this
            );
        }
        async healthCheck() {
            let e = await this.ws,
                t = () => {
                    e.send(JSON.stringify({ type: `healthcheck`, data: {} }));
                };
            (t(), setInterval(t, 2e3));
        }
        responseRequest(e, t) {
            let n = [];
            (t.on(`data`, (e) => {
                n.push(e);
            }),
                t.on(`end`, () => {
                    let r = Buffer.concat(n);
                    this.ws.then((n) => {
                        n.send(JSON.stringify({ type: `responseData`, data: { id: e, rawData: r, statusCode: t.statusCode, headers: t.headers } }), { binary: !0 });
                    });
                }));
        }
        async dispose() {
            let e = await this.ws;
            (e.removeAllListeners(), e.terminate(), (this.cp &&= (this.cp.removeAllListeners(), this.cp.kill(), void 0)));
        }
    };
function tt(e) {
    if (!globalThis.fetch) return;
    let t = globalThis.fetch;
    return (
        (globalThis.fetch = nt(t, e)),
        () => {
            globalThis.fetch = t;
        }
    );
}
function nt(e, t) {
    return function (n, r) {
        let i = new re();
        ((i.requestStartTime = Date.now()), Qe({ request: i, pipes: [], isAborted: !1 }), typeof n == `string` ? (i.url = n) : n instanceof URL && (i.url = n.toString()), (i.method = r?.method ?? `GET`));
        let a = r?.headers;
        (a instanceof Headers ? (i.requestHeaders = be(a)) : (i.requestHeaders = a ?? {}), (i.requestData = r?.body));
        let o = e(n, r)
            .then(rt(i, t))
            .catch(it(i, t))
            .finally(() => {
                Qe(null);
            });
        return (t.sendRequest(`initRequest`, i).sendRequest(`registerRequest`, i), o);
    };
}
function rt(e, t) {
    return (n) => (
        (e.requestEndTime = new Date().getTime()),
        (e.responseHeaders = be(n.headers)),
        (e.responseStatusCode = n.status || 0),
        n
            .clone()
            .arrayBuffer()
            .then((t) => {
                let n = Buffer.from(t);
                ((e.responseData = n), (e.responseInfo.dataLength = n.length), (e.responseInfo.encodedDataLength = n.length));
            })
            .finally(() => {
                t.sendRequest(`updateRequest`, e).sendRequest(`endRequest`, e);
            }),
        n
    );
}
function it(e, t) {
    return (n) => {
        throw ((e.requestEndTime = Date.now()), (e.responseStatusCode = 0), t.sendRequest(`updateRequest`, e).sendRequest(`endRequest`, e), n);
    };
}
const at = (e) => {
        if (!r.fetch) return;
        let t = r.fetch;
        return (
            (r.fetch = nt(t, e)),
            () => {
                r.fetch = t;
            }
        );
    },
    ot = (e) => {
        let t = Ze();
        if (!t) throw Error(`useRegisterRequest must be used in request handler`);
        t.pipes.push({ pipe: e, type: `registerRequest` });
    };
function st(e) {
    let { port: t = F, serverPort: n = I, autoOpenDevtool: r = !0, intercept: o = {} } = e || {},
        { fetch: s = !0, normal: c = !0, undici: l = !1 } = o,
        u = l && l.fetch,
        d = new et({ port: t, serverPort: n, autoOpenDevtool: r, key: ne(JSON.stringify({ port: t, serverPort: n, autoOpenDevtool: r })) }),
        f = s ? tt(d) : void 0,
        p = new WeakMap(),
        m = [i, a];
    c &&
        m.forEach((e) => {
            p.set(e, e.request);
            let t = e.request;
            e.request = Ke(t, e === a, d);
        });
    let h = u ? at(d) : void 0;
    return () => {
        (f && f(),
            c &&
                m.forEach((e) => {
                    ((e.request = p.get(e)), p.delete(e));
                }),
            h && h(),
            d.dispose());
    };
}
e.enableRemoteDebugging && process.env.NODE_ENV === `dev` && st();
var ct = _().create({
    retryStatusCodes: [400, 408, 409, 425, 429, 500, 502, 503, 504],
    retry: e.requestRetry,
    retryDelay: 1e3,
    onResponseError({ request: e, response: n, options: r }) {
        r.retry && (t.warn(`Request ${e} with error ${n.status} remaining retry attempts: ${r.retry}`), (r.headers ||= {}), r.headers instanceof Headers ? r.headers.set(`x-prefer-proxy`, `1`) : (r.headers[`x-prefer-proxy`] = `1`));
    },
    onRequestError({ request: e, error: n }) {
        t.error(`Request ${e} fail: ${n.cause} ${n}`);
    },
    onResponse({ request: e, response: n }) {
        n.redirected && t.http(`Redirecting to ${n.url} for ${e}`);
    },
});
export { ot as n, ct as t };
