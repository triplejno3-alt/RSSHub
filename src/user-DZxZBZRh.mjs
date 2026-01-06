import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = { pub_pst: `Published a post: `, shares_cm: `Shared a comment: `, shares_pst: `Shared a post: ` },
    l = {
        path: `/user/:id`,
        categories: [`social-media`],
        view: n.SocialMedia,
        example: `/gettr/user/jasonmillerindc`,
        parameters: { id: `User id` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`gettr.com/user/:id`] }],
        name: `User timeline`,
        maintainers: [`TonyRL`],
        handler: u,
    };
async function u(n) {
    let r = `https://gettr.com`,
        a = `https://media.gettr.com`,
        s = n.req.param(`id`),
        { data: l } = await t(`https://api.gettr.com/u/user/${s}/posts`, { searchParams: { offset: 0, max: 20, dir: `fwd`, incl: `posts|stats|userinfo|shared|liked|pvotes`, fp: `f_uo` } }),
        u = l.result.aux.uinf[s],
        f = l.result.data.list.map((t) => {
            let n = l.result.aux.post[t.activity.pstid].txt,
                s = o(i(d, { post: l.result.aux.post[t.activity.pstid], mediaHost: a }));
            return { title: `${c[t.action]} ${n}`, description: s, pubDate: e(t.cdate), updated: e(t.udate), link: `${r}/post/${t.activity.pstid}` };
        });
    return { title: `${u.nickname} on Gettr`, description: u.dsc, link: `${r}/user/${s}`, image: `${a}/${u.ico}`, language: `en`, item: f };
}
const d = ({ post: e, mediaHost: t }) =>
    a(r, {
        children: [
            e.txt
                ? a(r, {
                      children: [
                          s(
                              e.txt.replaceAll(
                                  `
`,
                                  `<br>`
                              )
                          ),
                          i(`br`, {}),
                      ],
                  })
                : null,
            e.previmg ? a(r, { children: [i(`img`, { src: e.previmg }), i(`br`, {})] }) : null,
            e.ttl && e.prevsrc ? a(r, { children: [i(`b`, { children: i(`a`, { href: e.prevsrc, children: e.ttl }) }), i(`br`, {})] }) : null,
            e.dsc && e.prevsrc ? a(r, { children: [i(`a`, { href: e.prevsrc, children: e.dsc }), i(`br`, {})] }) : null,
            e.imgs ? i(r, { children: e.imgs.map((e) => i(`img`, { src: `${t}/${e}` })) }) : null,
        ],
    });
export { l as route };
