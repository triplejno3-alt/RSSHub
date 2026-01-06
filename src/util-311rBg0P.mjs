import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import c from 'iconv-lite';
const l = `https://www.56kog.com`,
    u = async (r, i, a) => {
        let { data: s } = await t(i, { responseType: `buffer` }),
            u = o(c.decode(s, `gbk`)),
            f = u(`p.line`)
                .toArray()
                .map((e) => {
                    e = u(e);
                    let t = e.find(`a`);
                    return { title: t.text(), link: new URL(t.prop(`href`), l).href, author: e.find(`span`).last().text() };
                });
        f = await Promise.all(
            f.map((r) =>
                a(r.link, async () => {
                    try {
                        let { data: i } = await t(r.link, { responseType: `buffer` }),
                            a = o(c.decode(i, `gbk`)),
                            s = a(`div.mohe-content p`)
                                .toArray()
                                .map((e) => {
                                    e = a(e);
                                    let t = e.find(`a`);
                                    return {
                                        label: e.find(`span.c-l-depths`).text().split(/：/)[0],
                                        value:
                                            t.length === 0
                                                ? a(
                                                      e
                                                          .contents()
                                                          .toArray()
                                                          .find((e) => e.nodeType === 3)
                                                  )
                                                      .text()
                                                      .trim()
                                                : { href: new URL(t.first().prop(`href`), l).href, text: t.first().text().trim() },
                                    };
                                }),
                            u = s.find((e) => e.label === `更新`).value;
                        ((r.title = a(`h1`).contents().first().text()),
                            (r.description = d({ images: [{ src: new URL(a(`a.mohe-imgs img`).prop(`src`), l).href, alt: r.title }], details: s })),
                            (r.author = s.find((e) => e.label === `作者`).value),
                            (r.category = [s.find((e) => e.label === `状态`).value, s.find((e) => e.label === `类型`).value.text].filter(Boolean)),
                            (r.guid = `56kog-${r.link.match(/\/(\d+)\.html$/)[1]}#${u}`),
                            (r.pubDate = n(e(u), 8)));
                    } catch {}
                    return r;
                })
            )
        );
        let p = new URL(`favicon.ico`, l).href;
        return {
            item: f.filter((e) => e.description).slice(0, r),
            title: u(`title`).text(),
            link: i,
            description: u(`meta[name="description"]`).prop(`content`),
            language: u(`html`).prop(`lang`),
            icon: p,
            logo: p,
            subtitle: u(`meta[name="keywords"]`).prop(`content`),
            author: u(`div.uni_footer a`).text(),
            allowEmpty: !0,
        };
    },
    d = ({ images: e, details: t }) =>
        s(
            a(r, {
                children: [
                    e?.map((e, t) => (e?.src ? i(`figure`, { children: i(`img`, { src: e.src, alt: e.alt }) }, `${e.src}-${t}`) : null)),
                    t
                        ? i(`table`, {
                              children: i(`tbody`, {
                                  children: t.map((e, t) =>
                                      a(
                                          `tr`,
                                          { children: [i(`th`, { children: e.label }), i(`td`, { children: e.value?.href && e.value?.text ? i(`a`, { href: e.value.href, children: e.value.text }) : e.value })] },
                                          `${e.label}-${t}`
                                      )
                                  ),
                              }),
                          })
                        : null,
                ],
            })
        );
export { l as n, u as t };
