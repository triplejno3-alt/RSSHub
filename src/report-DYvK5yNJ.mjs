import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './description-Be7LtyKO.mjs';
import { load as a } from 'cheerio';
const o = {
    path: [`/lc_report/:id?`, `/report/:id?`],
    categories: [`new-media`],
    example: `/logclub/lc_report`,
    parameters: { id: `报告 id，见下表，默认为罗戈研究出品` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `报告`,
    maintainers: [`nczitzk`],
    handler: s,
    description: `| 罗戈研究出品 | 物流报告       | 绿色双碳报告          |
| ------------ | -------------- | --------------------- |
| Report       | IndustryReport | GreenDualCarbonReport |`,
};
async function s(o) {
    let { id: s = `Report` } = o.req.param(),
        c = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`), 10) : 11,
        l = `https://www.logclub.com`,
        u = new URL(`lc_report`, l).href,
        d = new URL(`front/lc_report/load${s}List`, l).href,
        { data: f } = await n.post(d, { json: { page: 1 } }),
        p = f.list
            .slice(0, c)
            .map((e) => ({
                title: e.title,
                link: new URL(`front/lc_report/get_report_info/${e.id}`, l).href,
                description: i({ image: { src: e.img_url?.split(/\?/)[0] ?? void 0, alt: e.title } }),
                author: e.author,
                category: [e.channel_name],
                guid: `logclub-report-${e.id}`,
                pubDate: r(t(e.release_time), 8),
            }));
    p = await Promise.all(
        p.map((t) =>
            e.tryGet(t.link, async () => {
                let { data: e } = await n(t.link),
                    r = a(e);
                return (
                    r(`img`).each((e, t) => {
                        ((t = r(t)), t.replaceWith(i({ image: { src: t.prop(`src`)?.split(/\?/)[0] ?? void 0, alt: t.prop(`title`) } })));
                    }),
                    (t.title = r(`h1`).first().text()),
                    (t.description += i({ description: r(`div.article-cont`).html() })),
                    (t.author = r(`div.lc-infos a`)
                        .toArray()
                        .map((e) => r(e).text())
                        .join(`/`)),
                    (t.category = [
                        ...new Set([
                            ...(t.category ?? []),
                            ...r(`div.article-label-r a.label`)
                                .toArray()
                                .map((e) => r(e).text()),
                        ]),
                    ].filter(Boolean)),
                    t
                );
            })
        )
    );
    let { data: m } = await n(u),
        h = a(m),
        g = h(`div.this_nav`).text().trim(),
        _ = new URL(h(`link[rel="shortcut icon"]`).prop(`href`), l).href,
        v = h(`meta[name="keywords"]`).prop(`content`);
    return {
        item: p,
        title: `${h(`title`).text()}${g}`,
        link: u,
        description: h(`meta[name="description"]`).prop(`content`),
        language: `zh`,
        image: new URL(h(`div.logo_img img`).prop(`src`), l).href,
        icon: _,
        logo: _,
        subtitle: v.replaceAll(`,`, ``),
        author: v.split(/,/)[0],
    };
}
export { o as route };
