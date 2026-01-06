import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/articles/:id?`,
    categories: [`new-media`],
    example: `/articles/9`,
    parameters: { id: `文章类型 ID，8 为得到头条，9 为得到精选，默认为 8` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`igetget.com`], target: `/articles/:id` }],
    name: `得到文章`,
    maintainers: [`Jacky-Chen-Pro`],
    handler: l,
    url: `www.igetget.com`,
};
function i(e) {
    let t = `<p>`;
    return (e.contents && Array.isArray(e.contents) && (t += e.contents.map((e) => c(e)).join(``)), (t += `</p>`), t);
}
function a(e) {
    let t = e.text?.content || ``;
    return ((e.text?.bold || e.text?.highlight) && (t = `<strong>${t}</strong>`), t);
}
function o(e) {
    return e.image?.src ? `<img src="${e.image.src}" alt="${e.image.alt || ``}" />` : ``;
}
function s() {
    return `<hr />`;
}
function c(e) {
    if (!e || typeof e != `object`) return ``;
    switch (e.type) {
        case `paragraph`:
            return i(e);
        case `text`:
            return a(e);
        case `image`:
            return o(e);
        case `hr`:
            return s();
        default:
            return ``;
    }
}
async function l(r) {
    let { id: i = `8` } = r.req.param(),
        a = {
            Accept: `application/json, text/plain, */*`,
            'Content-Type': `application/json;charset=UTF-8`,
            Referer: `https://m.igetget.com/share/course/free/detail?id=nb9L2q1e3OxKBPNsdoJrgN8P0Rwo6B`,
            Origin: `https://m.igetget.com`,
        },
        o = await t.post(`https://m.igetget.com/share/api/course/free/pageTurning`, {
            json: { chapter_id: 0, count: 5, max_id: 0, max_order_num: 0, pid: Number(i), ptype: 24, reverse: !0, since_id: 0, since_order_num: 0 },
            headers: a,
        }),
        s = JSON.parse(o.body);
    if (!s || !s.article_list) throw Error(`文章列表不存在或为空`);
    let l = s.article_list,
        u = await Promise.all(
            l.map((r) => {
                let i = `https://m.igetget.com/share/course/article/article_id/${r.id}`,
                    o = r.title,
                    s = new Date(r.publish_time * 1e3).toUTCString();
                return e.tryGet(i, async () => {
                    let e = n((await t.get(i, { headers: a })).body),
                        r = e(`script`)
                            .filter((t, n) => e(n).text()?.includes(`window.__INITIAL_STATE__`))
                            .text();
                    if (r) {
                        let e = r.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*\});/)?.[1];
                        if (e) {
                            let t = JSON.parse(e);
                            return {
                                title: o,
                                link: i,
                                description: JSON.parse(t.articleContent.content)
                                    .map((e) => c(e))
                                    .join(``),
                                pubDate: s,
                            };
                        }
                    }
                    return null;
                });
            })
        );
    return { title: `得到文章 - ${i === `8` ? `头条` : `精选`}`, link: `https://www.igetget.com`, item: u.filter(Boolean) };
}
export { r as route };
