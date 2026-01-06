import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = ({ image: e, nameZh: t, nameEn: n, alias: o, update: c, links: l, categories: u, downLinks: d }) => {
        let f = `${t ?? ``}${n ? ` - ${n}` : ``}`;
        return s(
            a(r, {
                children: [
                    e ? i(`figure`, { children: i(`img`, { src: e, alt: f }) }) : null,
                    i(`table`, {
                        children: a(`tbody`, {
                            children: [
                                t ? a(`tr`, { children: [i(`th`, { children: `中文名` }), i(`td`, { children: t })] }) : null,
                                n ? a(`tr`, { children: [i(`th`, { children: `英文名` }), i(`td`, { children: n })] }) : null,
                                o?.length ? a(`tr`, { children: [i(`th`, { children: `又名` }), i(`td`, { children: o.join(` / `) })] }) : null,
                                c ? a(`tr`, { children: [i(`th`, { children: `更新频率` }), i(`td`, { children: c })] }) : null,
                                l?.length ? l.map((e) => a(`tr`, { children: [i(`th`, { children: e.title }), i(`td`, { children: i(`a`, { href: e.link, children: e.link }) })] })) : null,
                                u?.length ? a(`tr`, { children: [i(`th`, { children: `标签` }), i(`td`, { children: u.join(` / `) })] }) : null,
                                d?.length ? d.map((e) => a(`tr`, { children: [i(`th`, { children: e.title }), i(`td`, { children: i(`a`, { href: e.link, children: e.link }) })] })) : null,
                            ],
                        }),
                    }),
                ],
            })
        );
    },
    l = `https://nzmz.xyz`,
    u = async (e, t, r, i, a) => {
        let s = o(
            await e(t, async () => {
                let { data: e } = await n(t);
                return e;
            })
        );
        return s(i)
            .eq(Number.parseInt(r, 10))
            .find(a)
            .toArray()
            .map((e) => ((e = s(e)), { link: new URL(e.prop(`href`), l).href }));
    },
    d = (e, r) =>
        e(`newzmz#${r.match(/details-(.*?)\.html/)[1]}`, async () => {
            let { data: e } = await n(r),
                i = o(e),
                a = i(`div.chsname`).text(),
                s = i(`div.engname`).text(),
                c = i(`div.aliasname`)
                    .text()
                    .replace(/又名：/, ``)
                    .split(`/`)
                    .map((e) => e.trim())
                    .filter(Boolean);
            return {
                link: i(`a.addgz`).prop(`href`),
                pubDate: t(
                    i(`span.duration`)
                        .first()
                        .text()
                        .match(/(\d{4}-\d{2}-\d{2})/)[1]
                ),
                description: {
                    image: i(`div.details-bg img`).prop(`src`),
                    nameZh: a,
                    nameEn: s,
                    alias: c,
                    update: i(`span.upday`).text(),
                    links: i(`div.ep-infos a[title]`)
                        .toArray()
                        .map((e) => ((e = i(e)), { title: e.prop(`title`), link: e.prop(`href`) })),
                },
                author: i(`ul.sws-list`)
                    .first()
                    .find(`h5.title`)
                    .toArray()
                    .map((e) => i(e).text())
                    .join(` / `),
                category: [a, s, ...c],
            };
        }),
    f = async (e, t, r, i, a) => {
        let { data: s } = await n(e.link),
            l = o(s);
        return l(r)
            .toArray()
            .map((n) => {
                n = l(n);
                let r = n
                        .find(i)
                        .toArray()
                        .map((e) => l(e).text()),
                    o = n
                        .find(a)
                        .toArray()
                        .map((e) => ((e = l(e)), { title: e.find(`p.link-name`).text(), link: e.find(`a[title]`).prop(`href`) })),
                    s = n
                        .find(`span.up`)
                        .text()
                        .replaceAll(/[\s-]+/g, ``),
                    u = `${e.description.nameZh || e.description.nameEn}|${s}`;
                return {
                    guid: `newzmz#${e.link.match(/view\/(.*?)\.html/)[1]}-${s}`,
                    title: u,
                    link: e.link,
                    description: c({ ...e.description, categories: r, downLinks: o }),
                    author: e.author,
                    category: [...e.category, ...r].filter(Boolean),
                    pubDate: e.pubDate,
                    enclosure_url: o.findLast((e) => e.title === t)?.link ?? o[0].link,
                    enclosure_type: `application/x-bittorrent`,
                };
            });
    },
    p = {
        path: `/:id?/:downLinkType?`,
        categories: [`multimedia`],
        example: `/newzmz/qEzRyY3v`,
        parameters: { id: `剧集 id，可在剧集下载页 URL 中找到`, downLinkType: `下载链接类型，默认为磁力链` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`newzmz.com/`], target: `` }],
        name: `指定剧集`,
        maintainers: [`nczitzk`],
        handler: m,
        url: `newzmz.com/`,
        description: '::: tip\n  [雪国列车 (剧版)](https://nzmz.xyz/details-qEzRyY3v.html) 的下载页 URL 为 `https://v.ys99.xyz/view/qEzRyY3v.html`，即剧集 id 为 `qEzRyY3v`\n:::',
    };
async function m(t) {
    let { id: r = `1`, downLinkType: i = `磁力链` } = t.req.param(),
        a = t.req.query(`limit`) ? Number.parseInt(t.req.query(`limit`), 10) : 50,
        s = !Number.isNaN(r),
        c = new URL(s ? `index.html` : `details-${r}.html`, l).href,
        p = o(
            await e.tryGet(c, async () => {
                let { data: e } = await n(c);
                return e;
            })
        ),
        m = s ? await u(e.tryGet, c, r, `div.rowMod`, `ul.slides li a`) : [{ link: c }];
    ((m = await Promise.all(m.slice(0, a).map((t) => d(e.tryGet, t.link)))), (m = await Promise.all(m.filter((e) => e.link !== `#`).map((e) => f(e, i, `div.team-con-area`, `div.item-label a`, `ul.team-icons li`)))), (m = m.flat()));
    let h = s ? p(`div.rowMod`).eq(Number.parseInt(r, 10)).find(`h2.row-header-title`).text() : ``,
        g = `${p(`title`).text()}${h ? ` - ${h}` : ``}`,
        _ = p(`link[rel="shortcut icon"]`).prop(`href`);
    return {
        item: s ? m : m.slice(0, a),
        title: g,
        link: c,
        description: p(`meta[name="description"]`).prop(`content`),
        language: `zh-cn`,
        image: p(`img.logo-img`).prop(`src`),
        icon: _,
        logo: _,
        subtitle: p(`meta[name="keywords"]`).prop(`content`),
        author: g,
        allowEmpty: !0,
    };
}
export { p as route };
