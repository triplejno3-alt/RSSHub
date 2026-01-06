import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { URL as i } from 'node:url';
import { load as a } from 'cheerio';
const o = {
    path: `/nea/sjzz/ghs`,
    categories: [`government`],
    example: `/gov/nea/sjzz/ghs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`nea.gov.cn/sjzz/ghs/`], target: `/nea/sjzz/ghs` }],
    name: `发展规划司`,
    maintainers: [`nczitzk`, `pseudoyu`],
    handler: s,
    url: `www.nea.gov.cn/sjzz/ghs/`,
};
async function s(o) {
    let s = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`), 10) : 35,
        c = `https://www.nea.gov.cn`,
        l = new i(`sjzz/ghs/`, c).href,
        u = a(await e(l))(`ul#showData0`)
            .attr(`data`)
            ?.split(/:/)
            .pop();
    if (!u) throw Error(`Data source ID not found`);
    let d = new i(`ds_${u}.json`, l).href,
        f = (await e(d)).datasource.slice(0, s).map((e) => {
            let t = new i(e.publishUrl, c).href,
                o = a(e.showTitle).text();
            return {
                title: o,
                link: t,
                pubDate: e.publishTime ? r(n(e.publishTime), 8) : void 0,
                description: e.summary?.trim() || o,
                author: [...new Set([e.sourceText, e.author, e.editor, e.responsibleEditor].filter(Boolean))].map((e) => ({ name: e })),
                category: e.keywords.split(/,/),
            };
        });
    return {
        item: (
            await Promise.all(
                f.map((i) =>
                    t.tryGet(i.link, async () => {
                        try {
                            let t = a(await e(i.link));
                            ((i.title = t(`meta[name="ArticleTitle"]`).prop(`content`) || i.title),
                                (i.description = t(`td.detail`).html() || t(`div.article-content`).html() || i.description),
                                (i.category = [...new Set([...(i.category ?? []), ...(t(`meta[name="keywords"]`).attr(`conetnt`)?.split(/,/) ?? [])])]));
                            let o = t(`meta[name="PubDate"]`).prop(`content`);
                            i.pubDate = o ? r(n(o), 8) : i.pubDate;
                        } catch {}
                        return i;
                    })
                )
            )
        ).filter(Boolean),
        title: `国家能源局 - 发展规划司工作进展`,
        link: l,
        description: `国家能源局 - 发展规划司工作进展`,
    };
}
export { o as route };
