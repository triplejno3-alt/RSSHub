import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = `https://www.resetera.com`,
    r = (e, t = n) => e && (e.startsWith(`#`) ? t + e : e.startsWith(`//`) ? `https:` + e : e.startsWith(`/`) ? n + e : e),
    i = (e) => Number(e?.match(/post-(\d+)/)?.[1] || 0),
    a = (e) =>
        e
            ? e
                  .split(`,`)
                  .map((e) => e.trim().split(` `)[0])
                  .find(Boolean)
            : void 0,
    o = {
        path: `/thread/:id`,
        name: `Thread latest posts (text & images)`,
        url: `resetera.com`,
        example: `/resetera/thread/1076160`,
        parameters: { id: `Numeric thread ID at the end of the URL` },
        maintainers: [`ZEN-GUO`],
        categories: [`bbs`],
        radar: [{ source: [`resetera.com/threads/:slug.:id/`], target: `/thread/:id` }],
        handler: async (o) => {
            let { id: s } = o.req.param(),
                c = `${n}/threads/${s}/`,
                l = await e(c),
                u = t(l),
                d = 1;
            u(`a[href*="page-"]`).each((e, t) => {
                let n = (u(t).attr(`href`) || ``).match(/page-(\d+)/);
                n && (d = Math.max(d, Number(n[1])));
            });
            let f = d === 1 ? c : `${c}page-${d}`,
                p = d > 1 ? [d - 1, d] : [1],
                m = new Map([[1, l]]),
                h = await Promise.all(
                    p.map(async (t) => {
                        if (m.has(t)) return m.get(t);
                        let n = await e(t === 1 ? c : `${c}page-${t}`);
                        return (m.set(t, n), n);
                    })
                ),
                g = new Set(),
                _ = h.flatMap((e) => {
                    let n = t(e);
                    return n(`article.message`)
                        .toArray()
                        .map((e) => {
                            let t = n(e),
                                i = t.find(`.message-author, .username, .message-name a, [itemprop="name"]`).first().text().trim() || ``,
                                o = t.find(`.message-attribution-opposite a[href*="/post-"]`).last().attr(`href`) || t.find(`a[href*="#post"]`).last().attr(`href`) || ``,
                                s = o ? r(o, c) : f;
                            if (!s || g.has(s)) return null;
                            g.add(s);
                            let l = t.find(`time`).first(),
                                u = Number(l.attr(`data-time`) || 0),
                                d = l.attr(`datetime`) || (u ? new Date(u * 1e3).toUTCString() : void 0),
                                p = t.find(`.message-body .bbWrapper, .message-content .bbWrapper, .bbWrapper`).first().clone();
                            (p.find(`.bbCodeBlock--quote, blockquote.bbCodeBlock`).remove(), p.find(`.bbCodeBlock--spoiler .bbCodeBlock-title`).remove());
                            let m = p
                                    .find(`img, picture source`)
                                    .toArray()
                                    .map((e) => {
                                        let t = n(e);
                                        return r(t.attr(`src`) || t.attr(`data-src`) || t.attr(`data-original`) || t.attr(`data-url`) || a(t.attr(`srcset`)) || a(t.attr(`data-srcset`)) || ``, c);
                                    })
                                    .filter((e) => !!e),
                                h = m.length > 0,
                                _ = p.clone();
                            _.find(`img, picture`).remove();
                            let v = (_.html() || ``).trim(),
                                y = t.find(`.message-attribution-opposite a`).last().text().trim();
                            return {
                                title: i ? `${i}${y ? ` - ` + y : ``}` : y || `New post`,
                                link: s,
                                guid: s,
                                description: `
                    <p><a href="${s}">🔗 Source post</a></p>
                    ${v}${h ? m.map((e) => `<p><img src="${e}" referrerpolicy="no-referrer" /></p>`).join(``) : ``}
                `,
                                author: i,
                                pubDate: d,
                                category: h ? [`image`] : void 0,
                            };
                        })
                        .filter(Boolean);
                });
            return (
                _.sort((e, t) => {
                    let n = i(e.link),
                        r = i(t.link);
                    if (r !== n) return r - n;
                    let a = e.pubDate ? new Date(e.pubDate).getTime() : 0;
                    return (t.pubDate ? new Date(t.pubDate).getTime() : 0) - a;
                }),
                {
                    title:
                        t(h.at(-1) ?? ``)(`h1`)
                            .first()
                            .text()
                            .trim() || `ResetEra Thread ${s}`,
                    link: f,
                    item: _,
                }
            );
        },
    };
export { o as route };
