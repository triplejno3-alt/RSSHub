import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './config-not-found-DGyG6Tbz.mjs';
import { load as a } from 'cheerio';
import { Cookie as o, CookieJar as s } from 'tough-cookie';
const c = new Set([`javdb.com`, `javdb36.com`, `javdb007.com`, `javdb521.com`]);
var l = {
    ProcessItems: async (l, u, d) => {
        let f = l.req.query(`domain`) ?? `javdb.com`,
            p = new URL(u, `https://${f}`);
        if (!e.feature.allow_user_supply_unsafe_domain && !c.has(p.hostname)) throw new i(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);
        let m = `https://${f}`,
            h = new s();
        if (e.javdb.session) {
            let t = o.fromJSON({ key: `_jdb_session`, value: e.javdb.session, domain: f, path: `/` });
            t && h.setCookie(t, m);
        }
        let g = a((await r({ method: `get`, url: p.href, cookieJar: h, headers: { 'User-Agent': e.trueUA } })).data);
        g(`.tags, .tag-can-play, .over18-modal`).remove();
        let _ = g(`div.item`)
            .slice(0, l.req.query(`limit`) ? Number.parseInt(l.req.query(`limit`)) : 20)
            .toArray()
            .map((e) => ((e = g(e)), { title: e.find(`.video-title`).text(), link: `${m}${e.find(`.box`).attr(`href`)}`, pubDate: n(e.find(`.meta`).text()) }));
        _ = await Promise.all(
            _.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = a((await r({ method: `get`, url: n.link, cookieJar: h, headers: { 'User-Agent': e.trueUA } })).data);
                    return (
                        (n.enclosure_type = `application/x-bittorrent`),
                        (n.enclosure_url = t(`#magnets-content button[data-clipboard-text]`).first().attr(`data-clipboard-text`)),
                        t(`icon`).remove(),
                        t(`#modal-review-watched, #modal-comment-warning, #modal-save-list`).remove(),
                        t(`.review-buttons, .copy-to-clipboard, .preview-video-container, .play-button`).remove(),
                        t(`.preview-images img`).each(function () {
                            (t(this).removeAttr(`data-src`), t(this).attr(`src`, t(this).parent().attr(`href`)));
                        }),
                        (n.category = t(`.panel-block .value a`)
                            .toArray()
                            .map((e) => t(e).text())),
                        (n.author = t(`.panel-block .value`).last().parent().find(`.value a`).first().text()),
                        (n.description = t(`.cover-container, .column-video-cover`).html() + t(`.movie-panel-info`).html() + t(`#magnets-content`).html() + t(`.preview-images`).html()),
                        n
                    );
                })
            )
        );
        let v = g(`title`).text(),
            y = v.includes(`|`) ? v.split(`|`)[0] : ``;
        return { title: y === `` ? d : `${y} - ${d}`, link: p.href, item: _ };
    },
};
export { l as t };
