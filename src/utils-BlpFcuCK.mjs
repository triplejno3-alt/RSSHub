import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = `https://www.capitalmind.in`;
async function i(i) {
    let a = n(await e(`${r}/${i}/page/1`)),
        o = a(`.article-wrapper a.article-card-wrapper`)
            .toArray()
            .map(async (i) => {
                let o = a(i),
                    s = r + o.attr(`href`);
                return await t.tryGet(s, async () => {
                    let t = o.find(`h3`).text().trim(),
                        i = o
                            .find(String.raw`div.text-[16px]`)
                            .text()
                            .trim(),
                        a = o.find(`img`).attr(`src`),
                        c = a?.startsWith(`/_next/image`) ? a.split(`url=`)[1].split(`&`)[0] : a,
                        l = c ? decodeURIComponent(c) : ``,
                        u = n(await e(s)),
                        d = u(`article`).clone(),
                        f = d
                            .find(`footer div`)
                            .toArray()
                            .map((e) => {
                                let t = u(e);
                                return (t.find(`.sr-only`).remove(), t.text().trim());
                            })
                            .filter(Boolean),
                        p = ``,
                        m = d.find(`header`).find(`time`);
                    m.length && (p = m.attr(`datetime`) || m.text().trim());
                    let h = d.find(`section[aria-label="Post content"]`).clone();
                    h.find(`footer`).remove();
                    let g = {},
                        _ = h.find(`iframe[src*="libsyn.com/embed/episode/id/"]`);
                    if (_.length) {
                        let t = _.attr(`src`);
                        if (t) {
                            let n = t.match(/\/id\/(\d+)\//);
                            if (n && n[1]) {
                                let t = n[1];
                                try {
                                    let n = await e(`https://html5-player.libsyn.com/api/episode/id/${t}`);
                                    n &&
                                        n._item &&
                                        n._item._primary_content &&
                                        (g = { mediaUrl: n._item._primary_content._download_url, image: `https://assets.libsyn.com/item/${t}`, itunes_duration: n._item._primary_content.duration });
                                } catch {
                                    logger.info(`Failed to fetch podcast data for episode ID ${t}`);
                                }
                            }
                        }
                    }
                    return (
                        h.find(`figure img`).each((e, t) => {
                            let n = u(t),
                                i = n.attr(`src`);
                            if ((n.removeAttr(`srcset`), i && i.startsWith(`/_next/image`))) {
                                let e = i.match(/url=([^&]+)/);
                                if (e && e[1]) {
                                    let t = decodeURIComponent(e[1]);
                                    n.attr(`src`, t);
                                } else i.startsWith(`/`) && n.attr(`src`, r + i);
                            }
                        }),
                        {
                            title: t,
                            link: s,
                            author: i,
                            description: h.html() || `<p><img src="${l}" alt="${t}"></p><p>Author: ${i}</p>`,
                            guid: s,
                            itunes_item_image: g?.image || l,
                            category: f,
                            pubDate: p,
                            enclosure_url: g?.mediaUrl || null,
                            itunes_duration: g?.itunes_duration || null,
                            enclosure_type: g?.mediaUrl ? `audio/mpeg` : null,
                        }
                    );
                });
            });
    return Promise.all(o);
}
export { i as n, r as t };
