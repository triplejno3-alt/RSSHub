import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = (e) =>
        a(
            i(n, {
                children: [
                    e.image ? i(n, { children: [r(`img`, { src: e.image }), r(`br`, {})] }) : null,
                    e.dvdId ? i(n, { children: [r(`b`, { children: `DVD ID:` }), ` `, e.dvdId, r(`br`, {})] }) : null,
                    e.contentId ? i(n, { children: [r(`b`, { children: `Content ID:` }), ` `, e.contentId, r(`br`, {})] }) : null,
                    e.releaseDate ? i(n, { children: [r(`b`, { children: `Release Date:` }), ` `, e.releaseDate, r(`br`, {})] }) : null,
                    e.duration ? i(n, { children: [r(`b`, { children: `Duration:` }), ` `, e.duration, ` mins`, r(`br`, {})] }) : null,
                    e.director ? i(n, { children: [r(`b`, { children: `Director:` }), ` `, e.director, ` `, e.jpDirector, r(`br`, {})] }) : null,
                    e.studio ? i(n, { children: [r(`b`, { children: `Studio:` }), ` `, e.studio.name, r(`br`, {})] }) : null,
                    e.categories?.length ? i(n, { children: [r(`b`, { children: `Categories:` }), e.categories.map((e) => i(n, { children: [` `, e.name, `,`] })), r(`br`, {})] }) : null,
                    e.casts?.length ? i(n, { children: [r(`b`, { children: `Cast(s):` }), e.casts.map((e) => i(n, { children: [` `, e.name, ` `, e.jpName] })), r(`br`, {})] }) : null,
                    e.gallery?.length ? e.gallery.map((e) => i(n, { children: [r(`img`, { src: e }), r(`br`, {})] })) : null,
                ],
            })
        ),
    s = `https://javtrailers.com`,
    c = { Authorization: `AELAbPQCh_fifd93wMvf_kxMD_fqkUAVf@BVgb2!md@TNW8bUEopFExyGCoKRcZX` },
    l = (e) => e.map((e) => (e.startsWith(`https://pics.dmm.co.jp/`) ? e.replace(/-(\d+)\.jpg$/, `jp-$1.jpg`) : e.startsWith(`https://image.mgstage.com/`) ? e.replace(/cap_t1_/, `cap_e_`) : e)),
    u = (e) => e.map((e) => ({ title: `${e.dvdId} ${e.title}`, link: `${s}/video/${e.contentId}`, pubDate: t(e.releaseDate), contentId: e.contentId })),
    d = async (t) => {
        let n = (await e(`${s}/api/video/${t.contentId}`, { headers: c })).video;
        return ((n.gallery = l(n.gallery)), (t.description = o(n)), (t.author = n.casts.map((e) => `${e.name} ${e.jpName}`).join(`, `)), (t.category = n.categories.map((e) => `${e.name}／${e.jpName}／${e.zhName}`)), t);
    };
export { u as i, d as n, c as r, s as t };
