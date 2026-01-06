import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './config-not-found-DGyG6Tbz.mjs';
import { load as r } from 'cheerio';
const i = `pianyuan-security_session_verify`,
    a = `pianyuan-PHPSESSID`,
    o = `pianyuan-py_loginauth`,
    s = async (e, t) =>
        await Promise.all(
            e.map(async (e) => {
                let n = new URL(e, `https://pianyuan.org`).href;
                return await t.tryGet(n, async () => {
                    let e = r((await l(n, t)).data),
                        i = e(`.btn-primary`).attr(`href`),
                        a = e(`body > div.jumbotron.masthead > div > div > div.col-sm-10.col-md-10.col-lg-10.text-left > h1`).text(),
                        o = e(`body > div.jumbotron.masthead > div > div > div.col-sm-10.col-md-10.col-lg-10.text-left > h2 > a`).text(),
                        s = e(`#main-container > div > div.col-sm-10.col-md-8.col-lg-8 > div > ul > li:nth-child(2)`).text(),
                        c;
                    return (
                        s.includes(`MB`) ? (c = s.replace(`MB`, ``) * 1024) : s.includes(`GB`) && (c = s.replace(`GB`, ``) * 1024 * 1024),
                        { title: `${a} [${o}] [${s}]`, size: c, enclosure_url: i, enclosure_type: `application/x-bittorrent`, enclosure_length: c }
                    );
                });
            })
        );
async function c(t) {
    let r = await t.get(i),
        s = await t.get(a),
        c = await t.get(o);
    if (!c) {
        if (!e.pianyuan || !e.pianyuan.cookie) throw new n(`pianyuan is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
        c = e.pianyuan.cookie;
    }
    return `${c};${r};${s};`;
}
async function l(e, r) {
    let s = await t({ method: `get`, url: e, headers: { Cookie: await c(r) } }),
        l = s.headers[`set-cookie`];
    if (l) for (let e of l) e.includes(`security_session_verify`) ? r.set(i, e.split(`;`)[0]) : e.includes(`PHPSESSID`) ? r.set(a, e.split(`;`)[0]) : e.includes(`py_loginauth`) && r.set(o, e.split(`;`)[0]);
    if (s.data.includes(`会员登录后才能访问`)) throw new n(`pianyuan Cookie已失效`);
    return s;
}
var u = { ProcessFeed: s, request: l };
export { u as t };
