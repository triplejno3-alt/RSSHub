import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = (t) => e(t),
    i = (e) =>
        e.map((e) => {
            let { id: r, title: i, content: a, date_gmt: o, modified_gmt: s, link: c, _embedded: l, featured_media: u } = e,
                { 'wp:featuredmedia': d, author: f } = l,
                p = d?.find((e) => e.id === u) || { source_url: `` };
            return {
                id: r,
                title: i.rendered,
                description: a.rendered,
                link: c,
                itunes_item_image: p.source_url,
                category: l[`wp:term`][0].map((e) => e.name),
                author: f?.map((e) => e.name).join(`, `),
                pubDate: n(t(o), 0),
                updated: n(t(s), 0),
            };
        });
export { i as n, r as t };
