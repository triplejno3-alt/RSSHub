import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import o from 'markdown-it';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = o({ html: !0 }),
    u = {
        path: `/nice`,
        categories: [`blog`],
        example: `/chuanliu/nice`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`chuanliu.org/nice`] }],
        name: `严选`,
        maintainers: [`nczitzk`],
        handler: d,
        url: `chuanliu.org/nice`,
    };
async function d(o) {
    let u = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`), 10) : 100,
        d = new URL(`nice/`, `https://chuanliu.org`).href,
        f = new URL(`api/dis/api/v1/memo`, `https://s.chuanliu.org`).href,
        { data: p } = await t(f, { searchParams: { creatorId: 1, offset: 0, limit: u } }),
        m = p.slice(0, u).map((t) => {
            let a = t.content.split(/\n/),
                o = a?.[0].replace(/^#/, ``) ?? void 0,
                u = a?.[1] ?? void 0,
                d = a?.[2] ?? void 0,
                f = a?.[3] ?? void 0,
                p = (a?.[5] && a[5] === `star`) ?? !1;
            return (
                p && a.splice(5, 1),
                {
                    title: `${p ? `[STAR] ` : ``}${u}`,
                    link: d,
                    description: s(
                        i(n, {
                            children: [
                                t.resourceList.map((e) => (e.externalLink ? r(`figure`, { children: e.filename ? r(`img`, { src: e.externalLink, alt: e.filename }) : r(`img`, { src: e.externalLink }) }) : null)),
                                c(
                                    l.render(
                                        a?.join(`

`) ?? ``
                                    )
                                ),
                            ],
                        })
                    ),
                    author: f,
                    category: [o, p ? `STAR` : void 0].filter(Boolean),
                    guid: `chuanliu-nice#${t.id}`,
                    pubDate: e(t.createdTs, `X`),
                    updated: e(t.updatedTs, `X`),
                }
            );
        }),
        { data: h } = await t(d),
        g = a(h),
        _ = new URL(g(`link[rel="shortcut icon"]`).prop(`href`), d).href;
    return {
        item: m,
        title: g(`title`).text(),
        link: d,
        description: g(`span.rainbow-text`).first().text(),
        language: g(`html`).prop(`lang`),
        icon: _,
        logo: _,
        subtitle: g(`title`).text(),
        author: g(`meta[name="author"]`).prop(`content`),
        allowEmpty: !0,
    };
}
export { u as route };
