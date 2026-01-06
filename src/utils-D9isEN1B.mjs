import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { JSDOM as i } from 'jsdom';
const a = `https://bbs.yamibo.com`;
function o(e) {
    return r(n(e), 8);
}
async function s(n, r, a = 0) {
    let { auth: o, salt: c } = t.yamibo,
        l = new URLSearchParams();
    (l.set(`mod`, `viewthread`), l.set(`tid`, n), r?.ordertype && l.set(`ordertype`, r.ordertype), r?._dsign && l.set(`_dsign`, r._dsign));
    let u = `https://bbs.yamibo.com/forum.php?${l.toString()}`,
        d = {};
    o && c && (d.cookie = `EeqY_2132_saltkey=${c}; EeqY_2132_auth=${o}`);
    let f = await e(u, { headers: d });
    if (f.startsWith(`<script type="text/javascript">`) && a <= 3) {
        let e = f.match(/<script type="text\/javascript">([\S\s]*?)<\/script>/)[1];
        ((e = e.replace(/= location;|=location;/, `=fakeLocation;`)),
            (e = e.replace(`location.replace`, `foo`)),
            (e = e.replace(`location.assign`, `foo`)),
            (e = e.replace(/location\[[^\]]*]\(/, `foo(`)),
            (e = e.replace(/location\[[^\]]*]=/, `window.locationValue=`)),
            (e = e.replace(`location.href=`, `window.locationValue=`)),
            (e = e.replace(`location=`, `window.locationValue=`)));
        let t = new i(
            `<script>
                function foo(value) { window.locationValue = value; };
                fakeLocation = { href: '', replace: foo, assign: foo };
                Object.defineProperty(fakeLocation, 'href', {
                    set: function (value) {
                        window.locationValue = value;
                    }
                });
                ${e}
            <\/script>`,
            { runScripts: `dangerously` }
        ).window.locationValue;
        if (t) {
            let e = new URLSearchParams(t).get(`_dsign`);
            e && (r = { ...r, _dsign: e });
        }
        return await s(n, r, ++a);
    }
    return { link: u, data: f };
}
function c(e, t) {
    let n = e.find(`#postmessage_${t}`).parent();
    n.find(`img`).each((e, t) => {
        let n = t.attribs.zoomfile ?? t.attribs.src;
        t.attribs.src = `${a}/${n}`;
    });
    let r = n.html() ?? ``,
        i = e.find(`.pattl img`).toArray();
    for (let e of i) {
        let t = e.attribs.zoomfile ?? e.attribs.src;
        r += `<img src="${a}/${t}" />`;
    }
    return r;
}
export { o as i, s as n, c as r, a as t };
