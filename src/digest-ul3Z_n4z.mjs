import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let i = Number.parseInt(n.req.query(`limit`) ?? `20`, 10),
            a = `https://www.ifanr.com`,
            o = new URL(`digest`, a).href,
            s = new URL(`api/v5/wp/buzz`, `https://sso.ifanr.com`).href,
            c = await e(s, { query: { limit: i, offset: 0 } }),
            l = r(await e(o)),
            u = l(`html`).attr(`lang`) ?? `zh-CN`,
            d = c.objects.slice(0, i).map((e) => {
                let n = e.post_title,
                    r = e.post_content,
                    i = e.created_at,
                    o = `digest/${e.post_id}`,
                    s = `ifanr-digest-${e.post_id}`,
                    c = e.updated_at ?? i;
                return {
                    title: n,
                    description: r,
                    pubDate: i ? t(i, `X`) : void 0,
                    link: new URL(o, a).href,
                    guid: s,
                    id: s,
                    content: { html: r, text: e.post_content ?? r },
                    updated: c ? t(c) : void 0,
                    language: u,
                    _extra: { links: [{ url: e.buzz_original_url, type: `via`, content_html: e.post_content }] },
                };
            }),
            f = l(`title`).text();
        return {
            title: f,
            description: f,
            link: o,
            item: d,
            allowEmpty: !0,
            image: l(`img.c-header-navbar__logo`).attr(`src`),
            author: l(`meta[property="og:site_name"]`).attr(`content`),
            language: u,
            id: l(`meta[property="og:url"]`).attr(`content`),
        };
    },
    a = {
        path: `/digest`,
        name: `快讯`,
        url: `www.ifanr.com`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/ifanr/digest`,
        parameters: void 0,
        description: void 0,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.ifanr.comdigest`], target: `/digest` }],
        view: n.Articles,
    };
export { i as handler, a as route };
