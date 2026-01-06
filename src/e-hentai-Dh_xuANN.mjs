import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = { path: `/:what?/:id?/:needTorrents?/:needImages?`, name: `Unknown`, maintainers: [], features: { nsfw: !0 }, handler: c };
async function c(s) {
    let c = s.req.param(`id`) ?? ``,
        l = s.req.param(`what`) ?? ``,
        u = /t|y/i.test(s.req.param(`needTorrents`) ?? `true`),
        d = /t|y/i.test(s.req.param(`needImages`) ?? `true`),
        f = `https://e-hentai.org/${c ? (l === `search` ? `?${c}` : l === `category` ? c : `${l}/${c}`) : l}`,
        p = a((await n({ method: `get`, url: f })).data);
    p(`.itd`).parent().remove();
    let m = p(`table.gltc tbody tr`)
        .slice(1, s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`)) + 1 : d ? 16 : 26)
        .toArray()
        .map(
            (e) => (
                (e = p(e)),
                {
                    title: e.find(`div.glink`).text(),
                    author: e.find(`td.glhide div a`).text(),
                    link: e.find(`td.glname a`).attr(`href`),
                    pubDate: t(e.find(`div.ir`).prev().text()),
                    category: e
                        .find(`div.gt`)
                        .toArray()
                        .map((e) => p(e).attr(`title`).replace(/^:/, ``)),
                    description: d ? `` : `<img src="${e.find(`div.glthumb div img`).attr(`data-src`) ?? e.find(`div.glthumb div img`).attr(`src`)}">`,
                    enclosure_url: u && e.find(`div.gldown a img[title="Show torrents"]`).length > 0 ? e.find(`.gldown a`).attr(`href`) : void 0,
                }
            )
        );
    return (
        (m = await Promise.all(
            m.map(async (t) => {
                if (t.enclosure_url) {
                    let r = ``,
                        i = await e.get(t.enclosure_url);
                    if (!i) {
                        let o = a((await n({ method: `get`, url: t.enclosure_url })).data);
                        (o(`h1, input[name="torrent_info"]`).remove(),
                            (r = o(`form`).parent().html()),
                            (i = o(`table tbody tr td a`)
                                .toArray()
                                .map((e) => ((e = o(e)), { link: e.attr(`href`), title: e.text() }))),
                            e.set(t.enclosure_url, i));
                    }
                    ((t.description += r), (t.enclosure_url = i[0].link), (t.enclosure_type = `application/x-bittorrent`));
                }
                if (d) {
                    let s = await e.get(t.link);
                    if (!s) {
                        let r = a((await n({ method: `get`, url: t.link })).data);
                        ((s = await Promise.all(
                            r(`.gdtm a`)
                                .toArray()
                                .map((t) => e.tryGet(r(t).attr(`href`), async () => a((await n({ method: `get`, url: r(t).attr(`href`) })).data)(`#img`).attr(`src`)))
                        )),
                            e.set(t.link, s));
                    }
                    t.description += o(i(r, { children: s.map((e) => i(`div`, { children: i(`img`, { src: e }) })) }));
                }
                return t;
            })
        )),
        { title: `${c || l || `Front Page`} - E-Hentai Galleries`, link: f, item: m }
    );
}
export { s as route };
