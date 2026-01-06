import { t as e } from './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
async function o(o) {
    let { category: s, topic: c } = o.req.param(),
        l = `https://www.dnaindia.com`,
        u;
    s ? (u = `/${s}`) : c ? (u = `/topic/${c}`) : e.error(`Invalid URL`);
    let d = `${l}${u}`,
        { data: f } = await r(d),
        p = a(f),
        m = p(`div.list-news`)
            .toArray()
            .map((e) => {
                e = p(e);
                let t = e.find(`div.explainer-subtext a`);
                return { title: t.text(), link: `${l}${t.attr(`href`)}` };
            });
    return {
        title: `DNA India`,
        link: d,
        item: await Promise.all(
            m.map((e) =>
                t.tryGet(e.link, async () => {
                    let { data: t } = await r(e.link),
                        o = a(t),
                        s = o(`div.article-img img`).attr(`src`),
                        c = o(`div.tags ul li`)
                            .toArray()
                            .map((e) => o(e).find(`a`).text()),
                        l = o(`p.dna-update`)
                            .text()
                            .match(/Updated\s*:\s*([\w\s,:\d]+?)(?:\s*\||$)/),
                        u = l ? l[1].trim() : ``;
                    u = u.replace(/\s+IST$/, ``);
                    let d = i(n(u), 5.5),
                        f = o(`meta[name="author"]`).attr(`content`) || `DNA Web Team`,
                        p = o(`div.article-description`)
                            .clone()
                            .children(`div`)
                            .remove()
                            .end()
                            .toArray()
                            .map((e) => o(e).html())
                            .join(``);
                    return { ...e, itunes_item_image: s, category: c, pubDate: d, author: f, description: p };
                })
            )
        ),
        description: `Latest News on dnaIndia.com`,
        logo: `https://cdn.dnaindia.com/sites/all/themes/dnaindia/favicon-1016.ico`,
        icon: `https://cdn.dnaindia.com/sites/all/themes/dnaindia/favicon-1016.ico`,
        language: `en-us`,
    };
}
export { o as t };
