import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = async (i) => {
        let a = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 10,
            o = `https://junhe.com`,
            s = new URL(`legal-updates`, o).href,
            { data: c } = await n(s),
            l = r(c),
            u = l(`html`).prop(`lang`),
            d = l(`a.content-wrap`)
                .slice(0, a)
                .toArray()
                .map((e) => ((e = l(e)), { title: e.find(`h1.news.detail`).text(), pubDate: t(e.find(`p.date`).text(), `YYYY.MM.DD`), link: new URL(e.prop(`href`), o).href }));
        d = await Promise.all(
            d.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = r(e),
                        o = a(`h1.d-title`).text(),
                        s = a(`div.d-content`).html(),
                        c = a(`p.d-pub-date`).text().split(/\s/);
                    return ((i.title = o), (i.description = s), (i.pubDate = t(c[0], `YYYY.MM.DD`)), (i.author = c.slice(1).join(`/`)), (i.content = { html: s, text: a(`div.d-content`).text() }), (i.language = u), i);
                })
            )
        );
        let f = new URL(l(`a.site-logo img`).prop(`src`), o).href;
        return { title: l(`title`).text(), description: l(`meta[name="description"]`).prop(`content`), link: s, item: d, allowEmpty: !0, image: f, author: `君合律师事务所`, language: u };
    },
    a = {
        path: `/legal-updates`,
        name: `君合法评`,
        url: `junhe.com`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/junhe/legal-updates`,
        description: ``,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`/legal-updates`], target: `/legal-updates` }],
    };
export { i as handler, a as route };
