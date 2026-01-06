import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './md5-DQN6cWFb.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as i } from './parse-date-DjdQS_Nt.mjs';
import { t as a } from './got-CKQ7C9HX.mjs';
import { load as o } from 'cheerio';
const s = () => n.tryGet(`51cto:token`, async () => (await e(`https://api-media.51cto.com/api/token-get`)).data.data.token, 3600, !1),
    c = (e, t = {}, n, i) => {
        ((t.timestamp = n), (t.token = i));
        let a = Object.keys(t).toSorted();
        return r(r(e) + r(a + r(i) + n));
    },
    l = { path: `/index/recommend`, categories: [`programming`], example: `/51cto/index/recommend`, radar: [{ source: [`51cto.com/`] }], name: `推荐`, maintainers: [`cnkmmk`, `ovo-tim`], handler: f, url: `51cto.com/` },
    u = /'(WTKkN|bOYDu|wyeCN)':\s*(\d+)/g;
async function d(n, r = ``) {
    let a = null,
        s = await e(n.url, { headers: { cookie: r } }),
        c = o(s);
    if (((a = new URL(n.url).host === `ost.51cto.com` ? c(`.posts-content`).html() : c(`article`).html()), !a && r === ``))
        try {
            let [e, t, r] = s
                .match(u)
                .slice(0, 3)
                .map((e) => Number(e.split(`:`)[1]));
            return await d(n, `__tst_status=` + (e + t + r) + `#;`);
        } catch (e) {
            t.error(e);
        }
    return { title: n.title, link: n.url, pubDate: i(n.pubdate, 8), description: a || n.abstract };
}
async function f(e) {
    let t = `index/index/recommend`,
        r = await s(),
        i = Date.now(),
        o = { page: 1, page_size: e.req.query(`limit`) ? Number.parseInt(e.req.query(`limit`), 10) : 50, limit_time: 0, name_en: `` },
        l = (await a(`https://api-media.51cto.com/${t}`, { searchParams: { ...o, timestamp: i, token: r, sign: c(t, o, i, r) } })).data.data.data.list;
    return { title: `51CTO`, link: `https://www.51cto.com/`, description: `51cto - 推荐`, item: await Promise.all(l.map((e) => n.tryGet(e.url, async () => await d(e)))) };
}
export { l as route };
