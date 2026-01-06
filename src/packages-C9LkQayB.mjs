import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let { id: i } = n.req.param(),
            a = `https://community.chocolatey.org`,
            o = new URL(`packages/${i}`, a).href,
            s = r(await e(o)),
            c = s(`html`).attr(`lang`) ?? `en`,
            l = s(`meta[property="og:title"]`).attr(`content`),
            u = s(`div#description`).html(),
            d = s(`h3.mt-0.mb-3`).last().text(),
            f = s(`a[data-package-tag]`).toArray(),
            p = [...new Set(f.map((e) => s(e).text()).filter(Boolean))],
            m = s(`img[alt="gravatar"]`)
                .toArray()
                .map((e) => {
                    let t = s(e).parent();
                    return { name: t.find(`span`).text(), url: t.attr(`href`) ? new URL(t.attr(`href`), a).href : void 0, avatar: t.attr(`src`) };
                }),
            h = `chocolatey-${l}`,
            g = s(`div.package-logo img`).attr(`src`) ? new URL(s(`div.package-logo img`).attr(`src`), a).href : void 0,
            _ = d,
            v = [{ title: l, description: u, pubDate: d ? t(d) : void 0, link: o, category: p, author: m, guid: h, id: h, content: { html: u, text: u }, image: g, banner: g, updated: _ ? t(_) : void 0, language: c }];
        return {
            title: s(`title`).first().text(),
            description: s(`meta[property="og:description"]`).attr(`content`),
            link: o,
            item: v,
            allowEmpty: !0,
            image: s(`meta[property="og:image"]`).attr(`content`),
            author: s(`meta[property="og:site_name"]`).attr(`content`),
            language: c,
            id: s(`meta[property="og:url"]`).attr(`content`),
        };
    },
    a = {
        path: `/packages/:id`,
        name: `Package`,
        url: `community.chocolatey.org`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/chocolatey/packages/microsoft-edge`,
        parameters: { id: { description: `Package ID` } },
        description: void 0,
        categories: [`program-update`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`community.chocolatey.org/packages`],
                target: (e) => {
                    let t = e.id;
                    return `/chocolatey/package${t ? `/${t}` : ``}`;
                },
            },
        ],
        view: n.Notifications,
        zh: {
            path: `/packages/:id`,
            name: `程序包`,
            url: `community.chocolatey.org`,
            maintainers: [`nczitzk`],
            handler: i,
            example: `/chocolatey/package/microsoft-edge`,
            parameters: { id: { description: `程序包 ID` } },
            description: void 0,
        },
    };
export { i as handler, a as route };
