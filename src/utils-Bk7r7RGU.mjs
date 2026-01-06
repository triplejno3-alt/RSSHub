import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './md5-DQN6cWFb.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = `https://www.techpowerup.com`,
    a = { cookie: `botcheck=${t(Date.now().toString())}` },
    o = (e) => {
        (e(`div.responsive-image-xx`).each((e, t) => {
            l(t);
        }),
            e(`figure`).each((e, t) => {
                c(t);
            }),
            e(`.newspost img`).each((e, t) => {
                s(t);
            }));
    },
    s = (e) => {
        ((e.attribs.src = e.attribs.src.replace(`_thm`, ``).replace(`_small`, ``)),
            e.parentNode.name === `a` &&
                e.parentNode.attribs[`data-width`] &&
                e.parentNode.attribs[`data-height`] &&
                ((e.attribs.width = e.parentNode.attribs[`data-width`]), (e.attribs.height = e.parentNode.attribs[`data-height`])));
    },
    c = (e) => {
        delete e.attribs.style;
    },
    l = (e) => {
        delete e.attribs.style;
    },
    u = async (t, o) => {
        let { review: u } = JSON.parse(t(`script[type="application/ld+json"]`).text()),
            d = t(`.text`),
            f = t(`#pagesel option`)
                .toArray()
                .map((e) => `${i}${e.attribs.value}`)
                .slice(1, -1);
        if (f.length) {
            let t = await Promise.all(
                f.map(async (t) => {
                    let n = r(await e(t, { headers: a }));
                    return (
                        n(`.text div.responsive-image-xx`).each((e, t) => {
                            l(t);
                        }),
                        n(`.text figure`).each((e, t) => {
                            c(t);
                        }),
                        n(`.text img`).each((e, t) => {
                            s(t);
                        }),
                        n(`.text`).html()
                    );
                })
            );
            d.append(t);
        }
        ((o.author = u.author.name), (o.pubDate = n(u.datePublished)), (o.updated = n(u.dateModified)), (o.description = d.html()));
    };
export { u as i, o as n, a as r, i as t };
