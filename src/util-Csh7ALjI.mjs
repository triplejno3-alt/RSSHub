import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = ({ description: e, image: t, video: n, attachments: o }) =>
        s(
            a(r, {
                children: [
                    e ? c(e) : null,
                    t ? i(`figure`, { children: i(`img`, { src: t.src, alt: t.alt, width: t.width }) }) : null,
                    n ? i(`video`, { controls: !0, width: n.width, height: n.height, children: i(`source`, { src: n.src, type: `video/${n.src.split(`.`).pop()}` }) }) : null,
                    o?.length ? a(r, { children: [i(`b`, { children: `附件` }), i(`ul`, { children: o.map((e) => i(`li`, { children: i(`a`, { href: e.link, children: e.title }) })) })] }) : null,
                ],
            })
        ),
    u = `whu.edu.cn`,
    d = (e) => {
        let t = {};
        return (
            e.replaceAll(/<meta name="(.*?)" content="(.*?)"/gi, (e, n, r) => {
                t[n] = r;
            }),
            t
        );
    },
    f = (e, t) => (Object.hasOwn(e, t) ? e[t] : void 0),
    p = async (r, i) => {
        try {
            let { data: a } = await t(r.link),
                s = o(a);
            (s(`p.vsbcontent_img`).each(function () {
                let e = s(this).find(`img`);
                s(this).replaceWith(l({ image: { src: new URL(e.prop(`orisrc`), i).href, width: e.prop(`width`) } }));
            }),
                s(`script[name="_videourl"]`).each(function () {
                    let e = s(this);
                    e.replaceWith(l({ video: { src: new URL(e.prop(`vurl`).split(`?`)[0], i).href, width: s(e).prop(`vwidth`), height: s(e).prop(`vheight`) } }));
                }));
            let c = s(`div.v_news_content`).html();
            s(`form[name="_newscontent_fromname"] table`).remove();
            let u = s(`form[name="_newscontent_fromname"] ul li`)
                    .toArray()
                    .map((e) => ((e = s(e).find(`a`)), { title: e.text(), link: new URL(e.prop(`href`), i).href })),
                p = d(a);
            ((r.title = f(p, `ArticleTitle`) ?? r.title),
                (r.description = l({ description: c, attachments: u })),
                (r.author = f(p, `ContentSource`)),
                (r.category = f(p, `Keywords`)?.split(` `).filter(Boolean) ?? []),
                (r.guid = f(p, `Url`) ?? r.link),
                (r.pubDate = f(p, `PubDate`) ? n(e(f(p, `PubDate`)), 8) : r.pubDate),
                u.length > 0 && ((r.enclosure_url = u[0].link), (r.enclosure_type = `application/${u[0].title.split(`.`).pop()}`)));
        } catch {}
        return r;
    },
    m = async (e, t, n) => await Promise.all(e.map((e) => (e.link.includes(u) ? t(e.link, async () => await p(e, n)) : e)));
export { l as a, d as i, f as n, m as r, u as t };
