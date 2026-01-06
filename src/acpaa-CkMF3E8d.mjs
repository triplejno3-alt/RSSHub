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
    path: `/:id?/:name?`,
    categories: [`other`],
    example: `/acpaa`,
    parameters: { id: `标签 id，默认为 1，可在对应标签页 URL 中找到`, name: `标签名称，默认为重要通知，可在对应标签页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `标签`,
    maintainers: [`nczitzk`],
    handler: o,
};
async function o(a) {
    let { id: o = `1`, name: s = `重要通知` } = a.req.param(),
        c = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 30,
        l = `http://www.acpaa.cn`,
        u = new URL(`article/taglist.jhtml?tagIds=${o}&tagname=${s}`, l).href,
        { data: d } = await n(u),
        f = i(d),
        p = f(`div.text01 ul li a[title]`)
            .slice(0, c)
            .toArray()
            .map((e) => ((e = f(e)), { title: e.prop(`title`), link: new URL(e.prop(`href`), l).href, pubDate: r(t(e.find(`span[title]`).prop(`title`)), 8) }));
    p = await Promise.all(
        p.map((t) =>
            e.tryGet(t.link, async () => {
                let { data: e } = await n(t.link),
                    r = i(e);
                return ((t.title = r(`div.xhjj_head01`).text()), (t.description = r(`div.text01`).html()), t);
            })
        )
    );
    let m = f(`title`).text().replaceAll(`-`, ``),
        h = f(`span.myTitle`).text().trim();
    return { item: p, title: `${m} - ${h}`, link: u, description: f(`meta[property="og:description"]`).prop(`content`), language: `zh`, subtitle: h, author: m };
}
export { a as route };
