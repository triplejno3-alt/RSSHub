import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { load as a } from 'cheerio';
const o = { news: 0, blogs: 1 },
    s = {
        path: `/:category?`,
        categories: [`finance`],
        view: r.Articles,
        example: `/finviz`,
        parameters: { category: { description: `Category, see below, News by default`, options: Object.keys(o).map((e) => ({ value: e, label: e })) } },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`finviz.com/news.ashx`, `finviz.com/`] }],
        name: `News`,
        maintainers: [`nczitzk`],
        handler: c,
        url: `finviz.com/news.ashx`,
        description: `| News | Blogs |
| ---- | ---- |
| news | blogs |`,
    };
async function c(r) {
    let { category: s = `News` } = r.req.param(),
        c = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 200;
    if (!Object.hasOwn(o, s.toLowerCase())) throw new i(`No category '${s}'.`);
    let l = `https://finviz.com`,
        u = new URL(`news.ashx`, l).href,
        { data: d } = await t(u),
        f = a(d),
        p = f(`table.table-fixed`)
            .eq(o[s.toLowerCase()])
            .find(`tr`)
            .slice(0, c)
            .toArray()
            .map((t) => {
                t = f(t);
                let r = t.find(`a.nn-tab-link`),
                    i = r
                        .parent()
                        .prop(`data-boxover`)
                        ?.match(/<td class='news_tooltip-tab'>(.*?)<\/td>/),
                    a = t
                        .find(`use`)
                        .first()
                        .prop(`href`)
                        ?.match(/#(.*?)-(light|dark)/);
                return { title: r.text(), link: r.prop(`href`), description: i ? i[1] : void 0, author: a ? a[1].replaceAll(`-`, ` `) : `finviz`, pubDate: n(e(t.find(`td.news_date-cell`).text(), [`HH:mmA`, `MMM-DD`]), -4) };
            })
            .filter((e) => e.title),
        m = f(`link[rel="icon"]`).prop(`href`);
    return {
        item: p,
        title: `finviz - ${s}`,
        link: u,
        description: f(`meta[name="description"]`).prop(`content`),
        language: `en-US`,
        image: new URL(f(`a.logo svg use`).first().prop(`href`), l).href,
        icon: m,
        logo: m,
        subtitle: f(`title`).text(),
    };
}
export { s as route };
