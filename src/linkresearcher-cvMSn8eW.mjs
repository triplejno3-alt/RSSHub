import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import c from 'node:crypto';
import { renderToString as l } from 'hono/jsx/dom/server';
const u = (e, t) => l(o(a, { children: t.map((t, n) => s(a, { children: [n === 0 ? null : o(`br`, {}), o(`p`, { children: t }), o(`p`, { children: e[n] })] })) })),
    d = `https://www.linkresearcher.com`,
    f = `${d}/api`,
    p = {
        name: `Articles`,
        path: `/:params`,
        example: `/linkresearcher/category=theses&columns=Nature%20导读&subject=生物`,
        maintainers: [`y9c`, `KarasuShin`],
        handler: m,
        view: r.Articles,
        categories: [`journal`],
        parameters: { params: { description: 'search parameters, support `category`, `subject`, `columns`, `query`' } },
        zh: { name: `文章` },
        'zh-TW': { name: `文章` },
    };
async function m(r) {
    let a = { theses: `论文`, information: `新闻`, careers: `职业` },
        o = r.req.param(`params`),
        s = new URLSearchParams(o),
        l = s.get(`subject`),
        p = s.get(`columns`),
        m = s.get(`query`) ?? ``,
        h = s.get(`category`) ?? `theses`;
    if (!(h in a)) throw new i(`Invalid category`);
    let g = a[h],
        _ = c.randomUUID(),
        v = { filters: { status: !0 } };
    (l && ((v.filters.subject = l), (g = `${g}「${l}」`)), p && ((v.filters.columns = p), (g = `${g}「${p}」`)));
    let y = await e(`${d}/api/${h === `careers` ? `articles` : h}/search`, {
            method: `POST`,
            headers: { 'content-type': `application/json; charset=UTF-8`, 'x-xsrf-token': _, cookie: `XSRF-TOKEN=${_}` },
            params: { from: 0, size: 20, type: h === `careers` ? `CAREER` : `SEARCH` },
            body: { ...v, query: m },
        }),
        b = await Promise.all(
            y.hits.map((r) => {
                let i = `${d}/${h}/${r.id}`;
                return t.tryGet(i, async () => {
                    let t = await e(`${f}/${h === `theses` ? `theses` : `information`}/${r.id}`, { responseType: `json` }),
                        a = { title: t.title, pubDate: n(t.onlineTime), link: i, image: t.cover, description: `zhTextList` in t && `enTextList` in t ? u(t.zhTextList, t.enTextList) : t.content };
                    if (`paperList` in t) {
                        let { doi: e, authors: n } = t.paperList[0];
                        ((a.doi = e), (a.author = n.map((e) => ({ name: e }))));
                    }
                    return a;
                });
            })
        );
    return {
        title: `领研 | ${g}`,
        description: `领研是链接华人学者的人才及成果平台。领研为国内外高校、科研机构及科技企业提供科研人才招聘服务，也是青年研究者的职业发展指导及线上培训平台；研究者还可将自己的研究论文上传至领研，与超过五十万华人学者分享工作的最新进展。`,
        image: `${d}/assets/images/logo-app.png`,
        link: d,
        item: b,
    };
}
export { p as route };
