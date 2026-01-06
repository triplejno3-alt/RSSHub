import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import s from 'dayjs';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = { path: `/programs`, categories: [`program-update`], example: `/appstorrent/programs`, name: `Programs`, maintainers: [`xzzpig`], handler: u, url: `appstorrent.ru/programs/` };
async function u(l) {
    let u = l?.req.query(`limit`) ? Number.parseInt(l?.req.query(`limit`) ?? `20`) : 20,
        d = `https://appstorrent.ru`,
        f = `${d}/programs/`,
        p = { http2: !0 },
        m = o((await n(f, p)).data),
        h = m(`article.soft-item:not(.locked)`)
            .slice(0, u)
            .toArray()
            .map((e) => {
                let t = m(e);
                return {
                    title: t.find(`.subtitle`).text().trim(),
                    link: t.find(`.subtitle a`).attr(`href`),
                    category: [t.find(`.info .category`).text().trim()],
                    version: t.find(`.version`).text(),
                    architecture: t.find(`.architecture`).text().trim(),
                    size: t.find(`.size`).text().trim(),
                };
            }),
        g = await Promise.all(
            h.map((l) =>
                e.tryGet(l.link, async () => {
                    let e = o((await n(l.link, p)).data),
                        u = t(e(`.tech-info .date-news a`).attr(`href`)?.replace(`https://appstorrent.ru/`, ``) ?? ``);
                    return {
                        title: l.title,
                        link: l.link,
                        category: l.category,
                        pubDate: u,
                        description: c(
                            a(r, {
                                children: [
                                    a(`p`, {
                                        children: [
                                            i(`img`, { src: d + e(`.main-title img`).attr(`src`)?.trim() }),
                                            i(`h1`, { children: l.title }),
                                            i(`br`, {}),
                                            i(`b`, { children: `Public Date` }),
                                            `: `,
                                            s(u).format(`YYYY-MM-DD`),
                                            i(`br`, {}),
                                            i(`b`, { children: `Version` }),
                                            `: `,
                                            l.version,
                                            i(`br`, {}),
                                            i(`b`, { children: `Architecture` }),
                                            `: `,
                                            l.architecture,
                                            i(`br`, {}),
                                            i(`b`, { children: `Compactibility` }),
                                            `: `,
                                            e(`div.right > div.info > div.right-container > div:nth-child(5) > div > span:nth-child(2) > a`).text(),
                                            i(`br`, {}),
                                            i(`b`, { children: `Size` }),
                                            `: `,
                                            l.size,
                                            i(`br`, {}),
                                            i(`b`, { children: `Activation` }),
                                            `: `,
                                            e(`div.right > div.info > div.right-container > div:nth-child(4) > div > span:nth-child(2) > a`).text(),
                                            i(`br`, {}),
                                        ],
                                    }),
                                    i(`b`, { children: `Description` }),
                                    `:`,
                                    i(`p`, { children: e(`.content .body-content`).first().text() }),
                                    i(`b`, { children: `Change Log` }),
                                    `:`,
                                    i(`p`, { children: e(`.content .body-content`).last().text() }),
                                    i(`b`, { children: `Screenshots` }),
                                    e(`.screenshots img`)
                                        .toArray()
                                        .map((t) => e(t).attr(`src`))
                                        .map((e) => d + e)
                                        .map((e) => i(`img`, { src: e })),
                                ],
                            })
                        ),
                    };
                })
            )
        );
    return { title: m(`title`).text(), link: f.toString(), allowEmpty: !0, item: g };
}
export { l as route };
