import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let i = Number.parseInt(n.req.query(`limit`) ?? `30`, 10),
            a = new URL(`download/`, `https://anytxt.net`).href,
            o = r(await e(a)),
            s = o(`html`).attr(`lang`) ?? `en-US`,
            c = o(`meta[property="og:image"]`).attr(`content`),
            l = o(`p.has-medium-font-size`)
                .slice(0, i)
                .toArray()
                .map((e) => {
                    let n = o(e),
                        r = n.text(),
                        i = n.next().html() ?? ``,
                        l = r.split(/\s/)[0],
                        u = a,
                        d = l;
                    return { title: r, description: i, pubDate: l ? t(l) : void 0, link: u, content: { html: i, text: i }, image: c, banner: c, updated: d ? t(d) : void 0, language: s };
                })
                .filter((e) => !0);
        return {
            title: o(`title`).text(),
            description: o(`meta[property="og:description"]`).attr(`content`),
            link: a,
            item: l,
            allowEmpty: !0,
            image: c,
            author: o(`meta[property="og:site_name"]`).attr(`content`),
            language: s,
            id: o(`meta[property="og:url"]`).attr(`content`),
        };
    },
    a = {
        path: `/release-notes`,
        name: `Release Notes`,
        url: `anytxt.net`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/anytxt/release-notes`,
        parameters: void 0,
        description: void 0,
        categories: [`program-update`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`anytxt.net`], target: `/anytxt/release-notes` }],
        view: n.Articles,
    };
export { i as handler, a as route };
