import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { r as n } from './common-utils-uYpL50sT.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
import { Cookie as o, CookieJar as s } from 'tough-cookie';
const c = new s(),
    l = `中央纪委国家监委网站`,
    u = `https://www.ccdi.gov.cn`,
    d = /(?<key>[A-Z_]+)=(?<value>(?:.*?(?=; max-age)|[\dA-Fa-f]+))/gm,
    f = async (e) => {
        let t,
            n = [];
        for (; (t = d.exec(e)) !== null; ) {
            t.index === d.lastIndex && d.lastIndex++;
            let { key: e, value: r } = t.groups;
            n.push(new o({ key: e, value: r }));
        }
        await Promise.all(n.map((e) => c.setCookie(e, u)));
    },
    p = async (e, n, i) => {
        let o = (await r(e, { cookieJar: c })).data;
        await f(o);
        let s = a(o);
        return {
            list: s(n)
                .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 20)
                .toArray()
                .map((n) => ((n = s(n)), { title: n.find(`a`).first().text().trim(), link: new URL(n.find(`a`).first().attr(`href`), e).href, pubDate: t(n.find(`.more`).text(), `YYYY-MM-DD`) })),
            title: s(`.other_Location`)
                .text()
                .replace(/(.+)首页/, l),
        };
    },
    m = async () => {
        let e = (await c.getCookies(u)).find((e) => e.key === `HOY_TR`);
        if (e) {
            let t = e.value.split(`,`),
                n = t[0],
                r = [...t[1]],
                i = [...t[2]];
            i[0] = n.charAt(Number.parseInt(r[0], 16));
            let a = new o({ key: `HOY_TR`, value: n + `,` + r.join(``) + `,` + i.join(``) + `,0` });
            await c.setCookie(a, u);
        }
    },
    h = async (n) => (
        await m(),
        e.tryGet(n.link, async () => {
            let e = (await r(n.link, { cookieJar: c })).data;
            await f(e);
            let o = a(e),
                s = o(`.daty, .source-box`).text().trim();
            return (
                (n.author = s.match(/来源：(.*)发布时间/s)?.[1].trim() ?? l),
                (n.pubDate = i(t(s.match(/发布时间：(.*)分享/s)?.[1].trim() ?? n.pubDate), 8)),
                o(`.content, .bom-box`)
                    .find(`img`)
                    .each((e, t) => {
                        (o(t).attr(`src`, new URL(o(t).attr(`src`), n.link).href), o(t).removeAttr(`oldsrc`).removeAttr(`alt`));
                    }),
                (n.description = o(`.content, .bom-box`).html()),
                n
            );
        })
    ),
    g = { path: `/ccdi/*`, name: `Unknown`, maintainers: [], handler: _ };
async function _(e) {
    let t = n(e).replaceAll(/(^\/ccdi|\/$)/g, ``);
    t = t === `` ? `/yaowenn/` : t.endsWith(`/`) ? t : t + `/`;
    let r = `${u}${t}`,
        { list: i, title: a } = await p(r, `.list_news_dl2 li`, e);
    return { title: a, link: r, item: await Promise.all(i.map((e) => h(e))) };
}
export { g as route };
