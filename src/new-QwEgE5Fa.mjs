import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
import s from 'iconv-lite';
const c = {
    path: `/new`,
    categories: [`blog`],
    example: `/xys/new`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`xys.org/`, `xys.org/new.html`] }],
    name: `新到资料`,
    maintainers: [`wenzhenl`],
    handler: l,
    url: `xys.org/`,
};
async function l(r) {
    let i = `http://www.xys.org`,
        o = `${i}/new.html`,
        c = await n({ method: `get`, url: o, responseType: `buffer` }),
        l = a(s.decode(c.data, `gb2312`)),
        d = l(`li a`)
            .slice(4, r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 30)
            .toArray()
            .map((e) => {
                e = l(e);
                let n = e.attr(`href`);
                /^https?:\/\//.test(n) || (n = i + `/` + n.replace(/^\//, ``));
                let r = e.parent().text().trim().slice(0, 8);
                return ((r = t(r, `YY.MM.DD`)), { title: e.text(), link: n, pubDate: r });
            });
    return (
        (d = await Promise.all(
            d
                .filter((e) => !e.link.endsWith(`.zip`))
                .map((t) =>
                    e.tryGet(t.link, async () => {
                        if (t.link.match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-]+)&?/g)) t.description = u(t.link.slice(32));
                        else {
                            let e = await n({ method: `get`, url: t.link, responseType: `buffer` });
                            t.description = a(s.decode(e.data, `gb2312`))
                                .text()
                                .replaceAll(
                                    `
`,
                                    `<br>
`
                                );
                        }
                        return t;
                    })
                )
        )),
        { title: `新语丝 - 新到资料`, link: o, item: d }
    );
}
const u = (e) =>
    o(i(r, { children: e ? i(`iframe`, { width: `560`, height: `315`, src: `https://www.youtube-nocookie.com/embed/${e}`, frameborder: `0`, allowfullscreen: !0, referrerpolicy: `strict-origin-when-cross-origin` }) : null }));
export { c as route };
