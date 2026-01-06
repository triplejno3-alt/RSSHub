import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './md5-DQN6cWFb.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
const i = `newrank_cookie_token`,
    a = `newrank_cookie_count`,
    o = (e) => {
        let t = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `a`, `b`, `c`, `d`, `e`, `f`],
            n = [...t],
            r = t.length,
            i,
            a,
            o = ``,
            s = r - e;
        for (; r-- > s; ) ((a = Math.floor((r + 1) * Math.random())), (i = n[a]), (o += i));
        return o;
    },
    s = (e, t, r) => n(`/nr/user/login/loginByAccount?AppKey=joker&account=` + e + `&password=` + t + `&state=1&nonce=` + r),
    c = (e, t) => n(`/xdnphb/detail/v1/rank/article/lists?AppKey=joker&account=` + e + `&nonce=` + t),
    l = (e) => n(`/xdnphb/nr/cloud/douyin/detail/accountInfoAll?AppKey=joker&nonce=` + e),
    u = (e) => n(`/xdnphb/nr/cloud/douyin/detail/aweme?AppKey=joker&nonce=` + e),
    d = (e) => {
        let t = [];
        for (let n of e) Array.isArray(n) ? t.push(...d(n)) : t.push(n);
        return t;
    };
function f(e = !1) {
    if (e) t.set(a, 0);
    else {
        let e = t.get(a);
        e ? (e > 30 ? (t.set(a, 0), p()) : t.set(a, e + 1)) : t.set(a, 1);
    }
}
function p() {
    t.set(i, null);
}
async function m() {
    f();
    let a = await t.get(i),
        c = String(e.newrank.username),
        l = n(n(String(e.newrank.password)) + `daddy`),
        u = o(9),
        d = s(c, l, u);
    if (!a) {
        let e = (await r({ method: `post`, url: `https://www.newrank.cn/nr/user/login/loginByAccount`, form: { account: c, password: l, state: 1, nonce: u, xyz: d } })).headers[`set-cookie`];
        if (e) for (let t of e) t.indexOf(`token`) === 0 && (a = t.split(`;`)[0]);
        (t.set(i, a, 600), f(!0));
    }
    return a;
}
var h = { getCookie: m, random_nonce: o, decrypt_wechat_detail_xyz: c, decrypt_douyin_account_xyz: l, decrypt_douyin_detail_xyz: u, flatten: d };
export { h as t };
