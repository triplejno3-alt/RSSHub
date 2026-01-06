import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './md5-DQN6cWFb.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import r from 'node:crypto';
import i from 'sanitize-html';
import a from 'crypto-js';
const o = a.enc.Utf8.parse(`eRtYuIoPaSdFgHqW`),
    s = a.enc.Utf8.parse(`Nmc09JkLzX8765Vb`),
    c = `https://pubscholar.cn`,
    l = (e) => r.createHash(`sha1`).update(e).digest(`hex`),
    u = () => r.randomUUID(),
    d = (e) => {
        if (!e) return null;
        let t = ``;
        for (; t.length < e; ) {
            let e = Math.random().toString(36).slice(2).toUpperCase();
            t += e;
        }
        return t.slice(0, e);
    },
    f = (e) =>
        Math.floor(Math.random() * (2 ** 53 - 1))
            .toString(16)
            .slice(-e)
            .padStart(e, `0`),
    p = () => {
        let e = d(6),
            t = Date.now().toString();
        return { nonce: e, timestamp: t, signature: l([`6m6pingbinwaktg227gngifoocrfbo95`, t, e].toSorted().join(``)), 'x-finger': `${f(8)}${f(8)}${f(8)}${f(8)}` };
    },
    m = (e) => a.AES.encrypt(a.enc.Utf8.parse(e), o, { iv: s, mode: a.mode.CBC, padding: a.pad.Pkcs7 }).ciphertext.toString(),
    h = {
        path: `/explore/:category?/:keyword?`,
        name: `Explore`,
        maintainers: [`TonyRL`],
        example: `/pubscholar/explore`,
        parameters: { category: 'Category, see the table below, `articles` by default', keyword: `Search Keyword` },
        handler: g,
        description: `| Articles / 论文 | Patents / 专利 | Reports / 领域快报 | Information / 动态快讯 | Datasets / 科学数据 | Books / 图书 |
| --------------- | -------------- | ------------------ | ---------------------- | ------------------- | ------------ |
| articles        | patents        | bulletins          | reports                | sciencedata         | books        |`,
    };
async function g(r) {
    let { category: a = `articles`, keyword: o } = r.req.param(),
        s = u(),
        l = (
            await e(`${c}/hky/open/resources/api/v1/${a}`, {
                method: `POST`,
                headers: { ...p(), Cookie: `XSRF-TOKEN=${s}`, 'X-XSRF-TOKEN': s },
                body: { page: 1, size: 10, order_field: `date`, order_direction: `desc`, user_id: t(Date.now().toString()), lang: `zh`, query: o, strategy: null, orderField: `default` },
            })
        ).content.map((e) => ({
            title: (e.is_free || e.links.some((e) => e.is_open_access) ? `「Open Access」` : ``) + i(e.title, { allowedTags: [], allowedAttributes: {} }),
            description: e.abstracts + `<br>${e.links.map((e) => `<a href="${e.url}">${e.is_open_access ? `「Open Access」` : ``}${e.name}</a>`).join(`<br>`)}`,
            author: e.author.join(`; `),
            pubDate: n(e.date),
            category: e.keywords.map((e) => i(e, { allowedTags: [], allowedAttributes: {} })),
            link: `${c}/${a}/${m(e.id)}`,
        }));
    return { title: `PubScholar 公益学术平台`, link: `${c}/explore`, item: l };
}
export { h as route };
