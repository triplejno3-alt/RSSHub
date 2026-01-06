import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
import s from 'crypto-js';
const c = `https://api.creative-comic.tw`,
    l = `web_desktop`,
    u = (e, t) => n(`${c}/book/${e}/info`, { headers: { device: l, uuid: t } }),
    d = (e, t) => n(`${c}/book/chapter/${e}`, { headers: { device: l, uuid: t } }),
    f = (e, t) => n(`${c}/book/${e}/chapter`, { headers: { device: l, uuid: t } }),
    p = async (e, t) => {
        let { data: r } = await n(`https://storage.googleapis.com/ccc-www/fs/chapter_content/encrypt/${e}/${t}`, { headers: { device: l }, responseType: `buffer` });
        return Buffer.from(r).toString(`base64`);
    },
    m = (e, t) => n(`${c}/book/chapter/image/${e}`, { headers: { device: l, uuid: t } }),
    h = (e) =>
        e(`creative-comic:uuid`, async () => {
            let { data: e } = await n(`${c}/guest`, { headers: { device: l } });
            return e.data;
        }),
    g = (e, t) => s.AES.decrypt(e, s.enc.Hex.parse(t.key), { iv: s.enc.Hex.parse(t.iv), mode: s.mode.CBC, padding: s.pad.Pkcs7 }).toString(s.enc.Utf8),
    _ = (e) => {
        let t = s.SHA512(e).toString();
        return { key: t.slice(0, 64), iv: t.slice(30, 62) };
    },
    v = (e, t = `freeforccc2020reading`) => {
        let n = g(e, _(t)).split(`:`);
        return { key: n[0], iv: n[1] };
    },
    y = {
        path: `/book/:id/:coverOnly?/:quality?`,
        categories: [`anime`],
        example: `/creative-comic/book/117`,
        parameters: { id: `漫畫 ID，可在 URL 中找到`, coverOnly: '僅獲取封面，非 `true` 時將獲取**全部**頁面，預設 `true`', quality: '閱讀品質，標準畫質 `1`，高畫質 `2`，預設 `1`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`creative-comic.tw/book/:id/*`], target: `/:id` }],
        name: `漫畫`,
        maintainers: [`TonyRL`],
        handler: b,
    };
async function b(n) {
    let { id: r, coverOnly: i = `true`, quality: a = `1` } = n.req.param(),
        o = await h(e.tryGet),
        {
            data: { data: s },
        } = await u(r, o),
        {
            data: { data: l },
        } = await f(r, o),
        _ = await Promise.all(
            l.chapters
                .toSorted((e, t) => t.idx - e.idx)
                .slice(0, n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 3)
                .map(async (n) => {
                    let r;
                    if (i !== `true` && i !== `1`) {
                        let {
                            data: { data: t },
                        } = await d(n.id, o);
                        (t.chapter.free_day === null || t.chapter.free_day === 0) &&
                            (r = await Promise.all(
                                t.chapter.proportion.map(async (t) => {
                                    let { data: n } = await m(t.id, o);
                                    n = n.data.key;
                                    let r = v(n),
                                        i = await p(t.id, a);
                                    return e.tryGet(`${c}/fs/chapter_content/encrypt/${t.id}/${a}`, () => g(i, r));
                                })
                            ));
                    }
                    return {
                        title: n.vol_name,
                        description: x(n, r, n.image1),
                        pubDate: t(n.online_at),
                        updated: t(n.updated_at),
                        link: `https://www.creative-comic.tw/reader_comic/${n.id}`,
                        author: s.author.map((e) => e.name).join(`, `),
                        category: s.tags.map((e) => e.name),
                    };
                })
        );
    return { title: `${s.name} | CCC創作集`, description: `${s.brief} ${s.description}`, link: s.share_link, image: s.image1, item: _, language: `zh-hant` };
}
const x = (e, t, n) => o(a(r, { children: [e ? i(`p`, { children: e.name }) : null, t?.map((e) => a(r, { children: [i(`br`, {}), i(`img`, { src: e })] })), n ? i(`img`, { src: n }) : null] }));
export { y as route };
