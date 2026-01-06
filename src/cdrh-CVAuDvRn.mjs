import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/cdrh/:titleOnly?`,
    radar: [{ source: [`fda.gov/medical-devices/news-events-medical-devices/cdrhnew-news-and-updates`, `fda.gov/`], target: `/cdrh/:titleOnly` }],
    name: `Unknown`,
    maintainers: [],
    handler: a,
    url: `fda.gov/medical-devices/news-events-medical-devices/cdrhnew-news-and-updates`,
};
async function a(i) {
    let a = !!(i.req.param(`titleOnly`) ?? ``),
        o = `https://www.fda.gov`,
        s = `${o}/medical-devices/news-events-medical-devices/cdrhnew-news-and-updates`,
        c = r((await n({ method: `get`, url: s })).data),
        l = c(`div[role="main"] a`)
            .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 30)
            .toArray()
            .map((e) => {
                e = c(e);
                let t = e.attr(`href`);
                return { title: e.text(), link: t.startsWith(`http`) ? t : `${o}${t}` };
            });
    return (
        (l = await Promise.all(
            l.map((i) =>
                e.tryGet(a ? `${i.link}#${i.title}#titleOnly` : `${i.link}#${i.title}`, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data);
                    i.author = e(`meta[property="article:publisher"]`).attr(`content`);
                    try {
                        i.pubDate = t(e(`meta[property="article:published_time"]`).attr(`content`).split(`, `).pop(), `MM/DD/YYYY - HH:mm`);
                    } catch {
                        i.pubDate = t(e(`meta[property="article:published_time"]`).attr(`content`));
                    }
                    return ((i.description = a ? null : e(`div[role="main"], .doc-content-area`).html()), (i.guid = a ? `${i.link}#${i.title}#titleOnly` : `${i.link}#${i.title}`), i);
                })
            )
        )),
        { title: c(`title`).text(), link: s, item: l }
    );
}
export { i as route };
