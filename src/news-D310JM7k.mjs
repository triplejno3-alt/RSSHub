import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/ilbolive/news`,
    name: `Il Bo Live - News`,
    url: `ilbolive.unipd.it/it/news`,
    maintainers: [`Gexi0619`],
    example: `/unipd/ilbolive/news`,
    parameters: {},
    description: `Il Bo Live - News`,
    categories: [`university`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ilbolive.unipd.it/it/news`], target: `/ilbolive/news` }],
    handler: o,
};
async function o() {
    let a = `https://ilbolive.unipd.it`,
        o = `${a}/it/news`,
        s = i((await n(o)).data),
        c = s(`#list-nodes .col.-s-6`)
            .toArray()
            .map((e) => {
                let t = s(e);
                return {
                    title: t.find(`.title a`).text().trim(),
                    link: a + t.find(`.title a`).attr(`href`),
                    category: t.find(`.category`).text().trim(),
                    enclosure_url: a + t.find(`.photo img`).attr(`src`),
                    enclosure_type: `image/jpeg`,
                };
            });
    return {
        title: `Il Bo Live - News`,
        link: o,
        item: await Promise.all(
            c.map((o) =>
                e.tryGet(o.link, async () => {
                    let e = i((await n(o.link)).data),
                        s = e(`article.post-generic`);
                    s.find(`img`).each((t, n) => {
                        let r = e(n),
                            i = r.attr(`src`);
                        (i && i.startsWith(`/`) && r.attr(`src`, a + i), r.attr(`style`, `max-width: 100%; height: auto;`));
                    });
                    let c = s.find(`time.date`).attr(`datetime`),
                        l = c ? r(t(c), 0) : void 0,
                        u = s.find(`.author a`).text().trim();
                    return (s.find(`.header`).remove(), { ...o, description: s.html() ?? ``, pubDate: l, author: u });
                })
            )
        ),
        language: `it`,
    };
}
export { a as route };
