import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
import o from 'crypto-js';
function s(n) {
    return t.tryGet(
        `sis001:cookie`,
        async () => {
            let e = (await r(n)).data,
                t = /toNumbers\("([a-fA-F0-9]+)"\)/g,
                i = [],
                a;
            for (; (a = t.exec(e)) !== null; ) i.push(a[1]);
            if (i.length !== 3) return ``;
            let s = o.enc.Hex.parse(i[0]),
                c = o.enc.Hex.parse(i[1]),
                l = o.enc.Hex.parse(i[2]);
            return `CeRaHigh1=` + o.AES.decrypt({ ciphertext: l }, s, { iv: c, padding: o.pad.NoPadding }).toString(o.enc.Hex);
        },
        e.cache.routeExpire,
        !1
    );
}
async function c(e, t) {
    let o = a((await r(t.link, { headers: { cookie: e } })).data);
    return (
        (t.guid = t.link?.replace(/^https?:\/\/.+?\//, `https://www.sis001.com/`)),
        (t.category = o(`.posttags a`)
            .toArray()
            .map((e) => o(e).text())),
        (t.pubDate = i(
            n(
                o(`.postinfo`)
                    .eq(0)
                    .text()
                    .match(/发表于 (.*)\s*只看该作者/)[1],
                `YYYY-M-D HH:mm`
            ),
            8
        )),
        o(`div[id^=postmessage_] table, fieldset, .posttags, strong font, span:empty`).remove(),
        (t.description =
            o(`div[id^=postmessage_]`)
                .eq(0)
                .html()
                ?.replaceAll(
                    `
`,
                    ``
                )
                .replaceAll(/\u3000{2}.+?(((?:<br>){2})|(&nbsp;))/g, (e) => `<p>${e.replaceAll(`<br>`, ``)}</p>`)
                .replaceAll(/<p>\u3000{6,}(.+?)<\/p>/g, `<center><p style="text-align:center;">$1</p></center>`)
                .replaceAll(`&nbsp;`, ``)
                .replace(/<br><br> +<br><br>/, ``) + (o(`.defaultpost .postattachlist`).html() ?? ``)),
        t
    );
}
export { c as n, s as t };
