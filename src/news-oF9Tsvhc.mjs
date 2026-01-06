import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = (e) =>
        e(`qianp:token`, async () => {
            let e = await n(`https://qianp.com/news/recommend/`);
            return {
                token: e.headers[`set-cookie`]
                    .find((e) => e.startsWith(`token=`))
                    ?.split(`;`)[0]
                    ?.split(`=`)[1],
                secret: e.headers[`set-cookie`]
                    .find((e) => e.startsWith(`secret=`))
                    ?.split(`;`)[0]
                    ?.split(`=`)[1],
            };
        }),
    a = { path: `/news/:path{.+}?`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let o = `https://qianp.com`,
        { path: s = `news/recommend` } = a.req.param(),
        c = `${o}/${s}/`,
        { token: l, secret: u } = await i(e.tryGet),
        d = { cookie: l ? `t=${l}; r=${u - 100}` : void 0 },
        { data: f } = await n(c, { headers: d }),
        p = r(f),
        m = p(`.newslist .infor`)
            .toArray()
            .map((e) => {
                e = p(e);
                let t = e.find(`a`).first();
                return { title: t.attr(`title`), link: t.attr(`href`) };
            }),
        h = await Promise.all(
            m.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link, { headers: d }),
                        a = r(e);
                    return (
                        (i.category = [...new Set(a(`meta[name=keywords]`).attr(`content`).split(`，`))]),
                        (i.author = a(`meta[name=author]`).attr(`content`)),
                        (i.pubDate = t(a(`meta[property="bytedance:published_time"]`).attr(`content`))),
                        (i.description = a(`.news_center`).html()),
                        i
                    );
                })
            )
        );
    return { title: p(`head title`).text(), description: p(`meta[name="description"]`).attr(`content`), link: c, image: `${o}/favicon.ico`, item: h };
}
export { a as route };
