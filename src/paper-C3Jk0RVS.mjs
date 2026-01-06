import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './utils-Cz5FGufb.mjs';
import { load as a } from 'cheerio';
import o from 'p-map';
const s = {
    path: `/paper/:type/:magazine`,
    categories: [`journal`],
    example: `/x-mol/paper/0/9`,
    parameters: { type: `type`, magazine: `magazine` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Journal`,
    maintainers: [`cssxsh`],
    handler: c,
};
async function c(s) {
    let { type: c, magazine: l } = s.req.param(),
        u = `paper/${c}/${l}`,
        d = new URL(u, i.host).href,
        f = await n(d, { headers: { Cookie: `journalIndexViewType=grid` } }),
        p = f.data,
        m = a(p),
        h = await o(
            m(`.magazine-model-content-new li`)
                .toArray()
                .slice(0, s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`), 10) : 20)
                .map(
                    (e) => (
                        (e = m(e)),
                        {
                            title: e.find(`.magazine-text-title a`).text().trim(),
                            link: new URL(e.find(`.magazine-model-btn a`).first().attr(`href`), i.host).href,
                            pubDate: r(
                                t(
                                    e
                                        .find(`.magazine-text-atten`)
                                        .text()
                                        .match(/\d{4}-\d{2}-\d{2}/)[0],
                                    8
                                )
                            ),
                        }
                    )
                ),
            (t) =>
                e.tryGet(t.link, async () => {
                    let e = a((await n(t.link)).data)(`.maga-content`);
                    return (
                        (t.doi = e.find(`.itsmblue`).eq(1).text().trim()),
                        e.find(`.itgaryfirst`).remove(),
                        e.find(`span`).eq(0).remove(),
                        (t.author = e.find(`span`).eq(0).text().trim()),
                        e.find(`span`).eq(0).remove(),
                        (t.description = e.html()),
                        t
                    );
                }),
            { concurrency: 2 }
        );
    return { title: m(`title`).text(), link: f.url, description: m(`meta[name="description"]`).attr(`content`), item: h };
}
export { s as route };
