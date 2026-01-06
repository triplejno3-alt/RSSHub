import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
import { CookieJar as i } from 'tough-cookie';
const a = (e, t) => {
        let n = e.attr(`name`),
            r = e.attr(`value`)?.split(`data:`)[1]?.replace(`undefined`, ``),
            i = JSON.parse(decodeURIComponent(r || `[]`)),
            a = ``;
        switch (n) {
            case `board`:
            case `emoji`:
            case `flowchart2`:
            case `image`:
            case `math`:
            case `mindmap`:
            case `puml`:
                a = `<img src='${i.src}'>`;
                break;
            case `bookmarkInline`:
            case `bookmarklink`:
            case `yuqueinline`:
                a = `<a href='${i.src}'>${i.detail.title}</a>`;
                break;
            case `checkbox`:
                a = `<input type='checkbox' ${i === !0 ? `checked` : ``}>`;
                break;
            case `codeblock`:
                a = `<code>${i.code.replaceAll(
                    `
`,
                    `<br>`
                )}</code>`;
                break;
            case `diagram`:
                a = `<img src='${i.url}'>`;
                break;
            case `file`:
            case `localdoc`:
                a = `<a href='${i.src}'>${i.name}</a>`;
                break;
            case `hr`:
                a = `<hr>`;
                break;
            case `label`:
                a = `<b>${i.label}</b>`;
                break;
            case `mention`:
                a = `<a href='https://www.yuque.com/${i.login}'>${i.name}</a>`;
                break;
            case `table`:
                a = i.html;
                break;
            case `thirdparty`:
            case `youku`:
                if (e.attr(`alias`) === `music163`) a = `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" height=66 src="${i.src}"></iframe>`;
                else if (e.attr(`alias`) === `bilibili` || e.attr(`alias`) === void 0)
                    a = `<iframe src="${i.src}&high_quality=1&autoplay=0" width="650" height="477" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>`;
                else if (i.type === `codepen`) a = `<iframe height="265" style="width: 100%;" scrolling="no" title="codepen" src="${i.url}" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>`;
                else throw Error(`Unhandled thirdparty on ${t}: ${e.attr(`alias`)}`);
                break;
            case `yuque`:
                if (i.mode === `card`) a = `<a href='${i.src}'>${i.detail.title}</a>`;
                else if (i.mode === `embed`) a = `<iframe src="${i.url}" width="100%" height="518"></iframe>`;
                else throw Error(`Unhandled mode on ${t}: ${i.mode}`);
                break;
            case `video`:
                a = `<video src='${i.videoId}'></video>`;
                break;
            default:
                throw Error(`Unhandled card on ${t}: ${n}`);
        }
        e.replaceWith(a);
    },
    o = /window\.appData = JSON\.parse\(decodeURIComponent\("(.+?)"\)\);/,
    s = `https://www.yuque.com`,
    c = {
        path: `/:name/:book`,
        categories: [`study`],
        example: `/yuque/ruanyf/weekly`,
        parameters: { name: `用戶名`, book: `知识库 ID` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`yuque.com/:name/:book`] }],
        name: `知识库`,
        maintainers: [`aha2mao`, `ltaoo`],
        handler: l,
        description: `| Node.js 专栏                                             | 阮一峰每周分享                                                 | 语雀使用手册                                             |
| -------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------- |
| [/yuque/egg/nodejs](https://rsshub.app/yuque/egg/nodejs) | [/yuque/ruanyf/weekly](https://rsshub.app/yuque/ruanyf/weekly) | [/yuque/yuque/help](https://rsshub.app/yuque/yuque/help) |`,
    };
async function l(c) {
    let l = new i(),
        { name: u, book: d } = c.req.param(),
        f = `${s}/${u}/${d}`,
        { data: p } = await n(f, { cookieJar: l }),
        m = r(p),
        h = JSON.parse(decodeURIComponent(m(`script`).text().match(o)[1])),
        g = h.book.id,
        {
            data: { data: _ },
        } = await n(`${s}/api/docs`, { searchParams: { book_id: g }, cookieJar: l }),
        v = _.map((e) => ({ title: e.title, description: e.description, link: `${s}/${u}/${d}/${e.slug}`, pubDate: t(e.published_at), slug: e.slug })),
        y = await Promise.all(
            v.map((t) =>
                e.tryGet(t.link, async () => {
                    let {
                            data: { data: e },
                        } = await n(`${s}/api/docs/${t.slug}`, { searchParams: { book_id: g, include_contributors: !0 } }),
                        i = r(e.content, null, !1);
                    (i(`card`).each((e, n) => {
                        a(i(n), t.link);
                    }),
                        i(`[data-lake-id]`).removeAttr(`data-lake-id`),
                        i(`[id]`).removeAttr(`id`),
                        i(`p`).each((e, t) => {
                            ((t = i(t)),
                                t.children().length === 1 && t.children().is(`br`) && t.remove(),
                                t.children().length === 2 && t.children().eq(0).is(`span`) && t.children().eq(0).text().length === 1 && t.children().eq(1).is(`br`) && t.remove());
                        }));
                    for await (let e of i(`video`).toArray()) {
                        let t = i(e),
                            r = t.attr(`src`);
                        if (r.startsWith(`inputs`)) {
                            let { data: e } = await n(`${s}/api/video`, { searchParams: { video_id: r } }),
                                { info: i } = e.data;
                            t.replaceWith(`<video controls preload='none' poster='${i.cover}'><source src='${i.url}' type='video/mp4'></video>`);
                        }
                    }
                    return ((t.description = i.html()), (t.author = e.contributors.map((e) => e.name).join(`, `)), t);
                })
            )
        );
    return { title: h.book.name, description: h.book.description, image: h.group.avatar, link: f, item: y };
}
export { c as route };
