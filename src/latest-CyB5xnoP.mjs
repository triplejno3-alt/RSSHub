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
import { raw as c } from 'hono/html';
const l = (e, t) => s(a(r, { children: [t ? i(`p`, { children: i(`img`, { src: t }) }) : null, e ? i(r, { children: c(e) }) : null] })),
    u = { path: `/`, radar: [{ source: [`tribalfootball.com/`], target: `` }], name: `Unknown`, maintainers: [`Rongronggg9`], handler: d, url: `tribalfootball.com/` };
async function d() {
    let r = o((await n(`https://www.tribalfootball.com/rss/mediafed/general/rss.xml`)).data, { xmlMode: !0 }),
        i = r(`rss > channel > item`)
            .toArray()
            .map((e) => {
                let n = r(e),
                    i = n.find(`link`).text();
                return (
                    (i = new URL(i)),
                    (i.search = ``),
                    (i = i.href),
                    {
                        title: n.find(`title`).text(),
                        description: n.find(`description`).text(),
                        link: i,
                        guid: n.find(`guid`).text(),
                        pubDate: t(n.find(`pubDate`).text()),
                        author: n.find(String.raw`dc\:creator`).text(),
                        _header_image: n.find(`enclosure`).attr(`url`),
                    }
                );
            });
    return (
        await Promise.all(
            i.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = o((await n(t.link)).data),
                        r = e(`head > title`).text().replace(` - Tribal Football`, ``),
                        i = e(`.articleBody`);
                    i.find(`.ad`).remove();
                    let a = i.find(`p > br:first-child`).next(`i`),
                        s = a.next(`span`);
                    return (s.length && !s.text() && !s.next().length && a.parent().remove(), (i = i.html()), (i = l(i, t._header_image)), (t.title = r || t.title), (t.description = i || t.description), delete t._header_image, t);
                })
            )
        ),
        {
            title: `Tribal Football - Latest`,
            description: `Tribal Football - Football News, Soccer News, Transfers & Rumours`,
            link: `https://www.tribalfootball.com/articles`,
            image: `https://www.tribalfootball.com/images/tribal-logo-rss.png`,
            item: i,
        }
    );
}
export { u as route };
