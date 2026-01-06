import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let i = Number.parseInt(n.req.query(`limit`) ?? `100`, 10),
            a = `https://cursor.com`,
            o = new URL(`changelog`, a).href,
            s = r(await e(o, { headers: { cookie: `NEXT_LOCALE=en` } })),
            c = s(`html`).attr(`lang`) ?? `en`,
            l = s(`article.relative`)
                .slice(0, i)
                .toArray()
                .map((e) => {
                    let n = s(e),
                        r = ``,
                        i;
                    n.find(`div`).each((e, t) => {
                        let n = s(t)
                            .text()
                            .trim()
                            .match(/^(\w+\s+\d{1,2},\s+\d{4})(\d+\.\d+)$/);
                        if (n) return ((i = n[1]), (r = n[2]), !1);
                    });
                    let o = n.find(`a[href^="/changelog/"]`).first(),
                        l = o.length ? o.text().trim() : n.find(`h2`).first().text().trim(),
                        u = r ? `[${r}] ${l}` : l,
                        d = o.attr(`href`),
                        f = `cursor-changelog-${r || `unknown`}`,
                        p = i,
                        m = n.find(`h2`).first();
                    m.length && (m.prevAll().remove(), m.remove());
                    let h = n.html() || ``;
                    return { title: u, description: h, pubDate: i ? t(i) : void 0, link: d ? new URL(d, a).href : void 0, guid: f, id: f, content: { html: h, text: h }, updated: p ? t(p) : void 0, language: c };
                });
        return { title: s(`title`).text(), description: s(`meta[property="og:description"]`).attr(`content`), link: o, item: l, allowEmpty: !0, image: s(`meta[property="og:image"]`).attr(`content`), language: c };
    },
    a = {
        path: `/changelog`,
        name: `Changelog`,
        url: `cursor.com`,
        maintainers: [`p3psi-boo`, `nczitzk`],
        handler: i,
        example: `/cursor/changelog`,
        parameters: void 0,
        description: void 0,
        categories: [`program-update`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`cursor.com/changelog`], target: `/changelog` }],
        view: n.Articles,
    };
export { i as handler, a as route };
