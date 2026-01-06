import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = (e, i, o, s) =>
        a(
            r(t, {
                children: [
                    r(`p`, { children: [n(`span`, { children: n(`big`, { children: e }) }), n(`br`, {})] }),
                    r(`p`, {
                        children: [
                            n(`span`, { children: n(`small`, { children: n(`i`, { children: i }) }) }),
                            n(`br`, {}),
                            n(`span`, { children: n(`small`, { children: r(`i`, { children: [`https://doi.org/`, o] }) }) }),
                            n(`br`, {}),
                            s ? n(`img`, { src: s }) : null,
                        ],
                    }),
                ],
            })
        ),
    s = {
        path: `/:pub/:jrn`,
        categories: [`journal`],
        example: `/aip/aapt/ajp`,
        parameters: { pub: `Publisher id`, jrn: `Journal id` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !0 },
        radar: [{ source: [`pubs.aip.org/:pub/:jrn`] }],
        name: `Journal`,
        maintainers: [`Derekmini`, `auto-bot-ty`],
        handler: c,
        description: `Refer to the URL format \`pubs.aip.org/:pub/:jrn\`

::: tip
  More jounals can be found in [AIP Publications](https://publishing.aip.org/publications/find-the-right-journal).
:::`,
    };
async function c(t) {
    let n = `https://pubs.aip.org/${t.req.param(`pub`)}/${t.req.param(`jrn`)}/issue`,
        { data: r } = await e.get(n),
        a = i(r);
    return {
        title: a(`meta[property="og:title"]`)
            .attr(`content`)
            .match(/(?:[^=]*=)?\s*([^>]+)\s*/)[1],
        link: n,
        item: a(`.al-article-item-wrap.al-normal`)
            .toArray()
            .map((e) => {
                let t = a(e).find(`.item-title a:first`).text(),
                    n = a(e).find(`.item-title a:first`).attr(`href`),
                    r = a(e).find(`.citation-label a`).attr(`href`),
                    i = r && r.match(/10\.\d+\/\S+/)[0],
                    s = a(e).find(`h5[data-resource-id-access]`).data(`resource-id-access`),
                    c = a(e)
                        .find(`.al-authors-list`)
                        .find(`a`)
                        .toArray()
                        .map((e) => a(e).text())
                        .join(`; `),
                    l = a(e).find(`.issue-featured-image a img`).attr(`src`),
                    u = l ? l.replace(/\?.+$/, ``) : ``;
                return { title: t, link: n, doilink: r, id: s, authors: c, img: u, doi: i, description: o(t, c, i, u) };
            }),
        allowEmpty: !0,
    };
}
export { s as route };
