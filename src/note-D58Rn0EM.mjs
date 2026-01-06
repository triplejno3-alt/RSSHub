import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { a as n, s as r } from './utils-i-Akwp6Q.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = ({ content: e, picture: t }) => c(o(i, { children: [e, t ? o(i, { children: [a(`br`, {}), a(`img`, { src: t })] }) : null] })),
    u = {
        path: `/notes/:lang?/note/:id`,
        categories: [`anime`],
        example: `/qoo-app/notes/en/note/2329113`,
        parameters: { lang: 'Language, see the table above, empty means `中文`', id: `Note ID, can be found in URL` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Note Comments`,
        maintainers: [`TonyRL`],
        handler: d,
    };
async function d(i) {
    let a = i.req.param(`id`),
        o = `${r}/api/v1/comments`,
        c = `${n}/note/${a}`,
        { data: u } = await t(c),
        d = s(u),
        { data: f } = await t(o, { searchParams: { sort: `newest`, for: `web`, limit: i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 100, type: `note`, object_id: a } }),
        p = f.data.map((t) => ({ title: t.content, description: l({ content: t.content, picture: t.picture }), pubDate: e(t.created_timestamp), author: t.user.name, guid: `qoo-app:notes:note:${a}:${t.id}` }));
    return { title: d(`head title`).text(), link: c, language: d(`html`).attr(`lang`), item: p };
}
export { u as route };
