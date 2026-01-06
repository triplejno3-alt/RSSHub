import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: `/user/:user`,
    categories: [`social-media`],
    example: `/rattibha/user/elonmusk`,
    parameters: { user: `Twitter username, without @` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`rattibha.com/:user`] }],
    name: `User Threads`,
    maintainers: [`yshalsager`],
    handler: u,
};
async function u(l) {
    let u = `https://rattibha.com`,
        { user: d } = l.req.param(),
        f = await n.tryGet(`rattibha:user:${d}`, async () => (await e(`${u}/user`, { query: { id: d } })).user),
        p = (await n.tryGet(`rattibha:userThreads:${d}`, () => e(`${u}/u_threads`, { query: { id: f.account_user_id, page: 0, post_type: 0 } }), t.cache.routeExpire, !1)).map((e) => ({
            title: e.thread.t.info.text.split(`
`)[0],
            link: `${u}/thread/${e.thread_id}`,
            pubDate: r(e.thread.created_at),
            updated: r(e.thread.updated_at),
            author: f.name,
            category: e.thread.categories.map((e) => e.tag.name),
            description: s(
                o(i, {
                    children: [
                        e.thread.m
                            ? o(i, {
                                  children: [
                                      e.thread.m.type === 1
                                          ? a(`video`, { controls: !0, preload: `metadata`, poster: e.thread.m.picture_url, children: a(`source`, { src: e.thread.m.video_url, type: `video/mp4` }) })
                                          : e.thread.m.type === 2
                                            ? a(`img`, { src: e.thread.m.picture_url })
                                            : null,
                                      a(`br`, {}),
                                  ],
                              })
                            : null,
                        c(
                            e.thread.t.info.text.replaceAll(
                                `
`,
                                `<br>`
                            )
                        ),
                    ],
                })
            ),
        }));
    return { title: `سلاسل تغريدات ${d}`, link: `${u}/${d}`, item: p };
}
export { l as route };
