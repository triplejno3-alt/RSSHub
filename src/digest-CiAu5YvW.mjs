import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { load as c } from 'cheerio';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
const d = {
    path: `/digest/:tid`,
    categories: [`bbs`],
    example: `/saraba1st/digest/forum-6-1`,
    parameters: { tid: `论坛 id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `论坛摘要`,
    maintainers: [`shinemoon`],
    handler: f,
    description: '版面网址如果为 `https://stage1st.com/2b/forum-6-1.html` 那么论坛 id 就是 `forum-6-1`。',
};
async function f(a) {
    let o = a.req.param(`tid`),
        s = e.saraba1st.cookie ?? ``,
        l = e.saraba1st.host,
        u = c((await r(`${l}/2b/${o}.html`, { headers: { Cookie: s } })).data),
        d = u(`head title`).text().replace(/-.*/, ``),
        f = u(`#threadlisttableid tbody[id^="normalthread_"] tr`)
            .slice(0, a.req.query(`limit`) ? Number(a.req.query(`limit`)) : 20)
            .toArray()
            .map((e) => {
                e = u(e);
                let t = e.find(`th.new a.s.xst`).text(),
                    r = e.find(`th.new a.s.xst`).attr(`href`);
                return { title: `${d}:${t}`, link: new URL(r, `${l}/2b/`).href, author: e.find(`td.by cite`).text(), pubDate: i(n(e.find(`td.by em`).first().text()), 8) };
            }),
        m = await Promise.all(f.map((e) => t.tryGet(e.link, async () => ((e.description = await p(e.link)), e))));
    return { title: `Stage1 论坛 - ${d}`, link: `${l}/2b/${o}.html`, item: m };
}
async function p(t) {
    let n = c((await r(t, { headers: { Cookie: e.saraba1st.cookie ?? `` } })).data),
        i = n(`<div>`);
    return (
        n(`#postlist`)
            .find(`div[id*="post_"] `)
            .each(function () {
                if (n(this).find(`td[id*="postmessage_"]`).length > 0) {
                    let t = l(
                        o(m, {
                            author: { link: n(this).find(`.pls.favatar div.authi a`).attr(`href`), name: n(this).find(`.pls.favatar div.authi`).text(), postinfo: n(this).find(`div.authi em[id*=authorposton]`).text() },
                            msg: n(this).find(`td[id*="postmessage_"]`).html(),
                            host: e.saraba1st.host,
                        })
                    );
                    i.append(t);
                }
            }),
        i.find(`img`).each(function () {
            let e = n(this),
                t = e.attr(`file`);
            t && (e.attr(`src`, t), e.removeAttr(`zoomfile`), e.removeAttr(`file`), e.removeAttr(`onmouseover`), e.removeAttr(`onclick`));
        }),
        i.html()
    );
}
const m = ({ author: e, msg: t, host: n }) =>
    s(a, {
        children: [
            s(`div`, {
                class: `quoted`,
                style: `background:rgba(220,220,220,0.3);`,
                children: [o(`a`, { style: `text-decoration: none;`, href: `${n}/2b/${e.link ?? ``}`, children: e.name }), o(`span`, { style: `text-decoration: none;color:#aaa;`, children: e.postinfo })],
            }),
            o(`div`, { class: `content`, style: `margin-bottom:20px!important;`, children: t ? u(t) : null }),
        ],
    });
export { d as route };
