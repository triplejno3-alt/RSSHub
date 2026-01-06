import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = async (a) => {
        let o = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 6,
            s = new URL(`ztzl/szcpxx/zyzc/index.htm`, `http://www.moa.gov.cn`).href,
            { data: c } = await n(s),
            l = i(c),
            u = l(`html`).prop(`lang`),
            d = l(`div.ztst_list_contBox_inner ul li`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    e = l(e);
                    let n = e.find(`a.content`);
                    return { title: n.prop(`title`), pubDate: t(e.find(`div.pubTime`).text().split(/：/).pop(), `YYYY.MM.DD`), link: new URL(n.prop(`href`), s).href, language: u };
                });
        d = await Promise.all(
            d.map((a) =>
                e.tryGet(a.link, async () => {
                    let { data: e } = await n(a.link),
                        o = i(e),
                        s = o(`h2.xxgk_title, h1.bjjMTitle`).text(),
                        c = o(`div.gsj_htmlcon_bot, div.TRS_Editor`).html(),
                        l = `moa-${o(`meta[name="contentid"]`).prop(`content`)}`;
                    return (
                        (a.title = s),
                        (a.description = c),
                        (a.pubDate = r(t(o(`meta[name="PubDate"]`).prop(`content`)), 8)),
                        (a.category = [
                            ...new Set([
                                o(`meta[name="SiteName"]`).prop(`content`),
                                o(`meta[name="ColumnName"]`).prop(`content`),
                                o(`meta[name="ColumnType"]`).prop(`content`),
                                o(`meta[name="ContentSource"]`).prop(`content`),
                                o(`meta[name="Keywords"]`).prop(`content`),
                            ]),
                        ].filter(Boolean)),
                        (a.author = o(`meta[name="Author"]`).prop(`content`) || o(`meta[name="source"]`).prop(`content`)),
                        (a.guid = l),
                        (a.id = l),
                        (a.content = { html: c, text: o(`div.gsj_htmlcon_bot, div.TRS_Editor`).text() }),
                        (a.language = u),
                        a
                    );
                })
            )
        );
        let f = `${l(`title`).text()} - ${l(`li.now`).text()}`,
            p = new URL(l(`img.leftLogo`).prop(`src`), s).href;
        return { title: f, description: f, link: s, item: d, allowEmpty: !0, image: p, author: `中华人民共和国农业农村部`, language: u };
    },
    o = {
        path: `/moa/szcpxx`,
        name: `中华人民共和国农业农村部生猪专题重要政策`,
        url: `www.moa.gov.cn`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/gov/moa/szcpxx`,
        parameters: void 0,
        description: void 0,
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.moa.gov.cn/ztzl/szcpxx/zyzc/index.htm`], target: `/moa/szcpxx` }],
    };
export { a as handler, o as route };
