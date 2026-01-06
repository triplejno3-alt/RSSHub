import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = async (n, r) =>
        await Promise.all(
            n.map(async (n) => {
                let i = n.uuid;
                return await r.tryGet(i, async () => {
                    let r = `https://www.infoq.cn/article/${i}`,
                        o = (await t.post(`https://www.infoq.cn/public/v1/article/getDetail`, { headers: { Referer: r }, json: { uuid: i } })).data.data,
                        s = o.author ? o.author.map((e) => e.nickname).join(`,`) : o.no_author,
                        c = [...n.topic.map((e) => e.name), ...n.label.map((e) => e.name)],
                        l = o.content_url ? (await t(o.content_url)).body : o.content;
                    return { title: o.article_title, description: a(l), pubDate: e(n.publish_time, `x`), category: c, author: s, link: r };
                });
            })
        ),
    r = (e) => i(e).join(``),
    i = (e) =>
        e.map((e) => {
            let t = {
                doc: () =>
                    i(e.content)
                        .map((e) => `<p>${e}</p>`)
                        .join(``),
                text: () => e.text,
                heading: () => {
                    if (e.content) {
                        let t = e.attrs.level;
                        return `<h${t}>${r(e.content)}</h${t}>`;
                    } else return ``;
                },
                blockquote: () => (e.content ? `<blockquote>${r(e.content)}</blockquote>` : ``),
                image: () => `<img src="${e.attrs.src}"></img>`,
                codeblock: () => (e.content ? `<code lang="${e.attrs.lang}">${r(e.content)}</code>` : ``),
                link: () => `<a href="${e.attrs.href}">${e.content ? r(e.content) : ``}</a>"`,
            };
            return e.type in t ? t[e.type]() : e.content ? r(e.content) : ``;
        });
function a(e) {
    return e.startsWith(`{"`) ? r([JSON.parse(e)]) : e;
}
var o = { ProcessFeed: n };
export { o as t };
