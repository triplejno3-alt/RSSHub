import { t as e } from './parse-date-DjdQS_Nt.mjs';
function t(t) {
    return t(`div.top-post-list article`)
        .toArray()
        .map((n) => {
            let r = t(n),
                i = r.find(`a`).first(),
                a = i.attr(`title`),
                o = i.attr(`href`),
                s = e(r.find(`span.date.gf.updated`).text()),
                c = r.find(`span.author span.fn`).text(),
                l = [r.find(`span.cat-name`).text()],
                u = r.find(`div.description p`).text(),
                d = r.find(`img`).attr(`data-src`);
            return { title: a, link: o, pubDate: s, author: c, category: l, description: u, image: d, banner: d };
        });
}
export { t };
