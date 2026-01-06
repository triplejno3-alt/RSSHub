import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://www.plurk.com`,
    i = async (e) => {
        let { data: n } = await t.post(`${r}/Users/fetchFriends`, { form: { ids: JSON.stringify(e), r: `gp` } });
        return n;
    },
    a = (t, r, i, a) =>
        a(t, () => {
            let a = n(r.content || r.rendered, null, !1);
            return (
                a(`img`).each((e, t) => {
                    ((t = a(t)), t.removeAttr(`height`).removeAttr(`width`), t.attr(`alt`) && t.attr(`alt`).startsWith(`http`) && (t.attr(`src`, t.attr(`alt`)), t.removeAttr(`alt`)));
                }),
                { title: r.content_raw ?? (a.text() || t), description: a.html(), guid: t, link: r.rendered ? r.link_url : null, author: i, pubDate: e(r.posted) }
            );
        });
export { i as n, a as r, r as t };
