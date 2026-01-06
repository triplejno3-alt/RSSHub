import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = {
    path: `/paper/:id?`,
    categories: [`traditional-media`],
    example: `/cntheory/paper`,
    parameters: { id: `板块，默认为全部` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `学习时报`,
    maintainers: [`nczitzk`],
    handler: l,
    description: '如订阅 **第 A1 版：国内大局**，路由为 [`/cntheory/paper/国内大局`](https://rsshub.app/cntheory/paper/国内大局)。',
};
async function l(c) {
    let l = c.req.param(`id`),
        u = `https://paper.cntheory.com`,
        d = await n({ method: `get`, url: u });
    d = await n({ method: `get`, url: `${u}/${d.data.match(/URL=(.*)"/)[1]}` });
    let f = a(d.data),
        p = d.data.match(/images\/(\d{4}-\d{2}\/\d{2})\/\w+\/\w+_brief/),
        m = `${u}/html/${p[1]}`,
        h = [];
    return (
        await Promise.all(
            f(`#pageLink`)
                .toArray()
                .filter((e) => (l ? f(e).text().split(`：`).pop() === l : !0))
                .map((e) => `${m}/${f(e).attr(`href`).replace(/\.\//, ``)}`)
                .map(async (e) => {
                    let t = a((await n({ method: `get`, url: e })).data);
                    h.push(
                        ...t(`table`)
                            .last()
                            .find(`a`)
                            .toArray()
                            .map((e) => `${m}/${f(e).attr(`href`)}`)
                    );
                })
        ),
        (h = await Promise.all(
            h.map((c) =>
                e.tryGet(c, async () => {
                    let e = a((await n({ method: `get`, url: c })).data);
                    return {
                        link: c,
                        title: e(`h1`).text(),
                        pubDate: t(p[1], `YYYY-MM/DD`),
                        enclosure_url: `${u}${
                            e(`.ban_t a`)
                                .first()
                                .attr(`href`)
                                .match(/(\/images.*)/)[1]
                        }`,
                        description: o(i(r, { children: [e(`#reslist`).html() ? s(e(`#reslist`).html().replaceAll(`display:none;`, ``)) : null, e(`founder-content`).html() ? s(e(`founder-content`).html()) : null] })),
                    };
                })
            )
        )),
        { title: `学习时报${l ? ` - ${l}` : ``}`, link: u, item: h, allowEmpty: !0 }
    );
}
export { c as route };
