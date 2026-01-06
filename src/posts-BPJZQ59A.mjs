import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { t as a } from './valid-host-Bsy2BS2p.mjs';
import { load as o } from 'cheerio';
import s from 'markdown-it';
const c = s({ html: !0 }),
    l = {
        path: `/posts/:site`,
        categories: [`blog`],
        example: `/posts/walnut`,
        parameters: { site: '站点名，原则上只要是 `{site}.hedwig.pub` 都可以匹配' },
        features: { supportRadar: !1 },
        name: `Posts`,
        url: `hedwig.pub`,
        maintainers: [`zwithz`, `GetToSet`],
        view: r.Articles,
        handler: async (r) => {
            let { site: s } = r.req.param();
            if (!a(s)) throw new i(`Invalid site`);
            let l = `https://${s}.hedwig.pub`,
                u = o(await e(l))(`script#__NEXT_DATA__`).text(),
                d = JSON.parse(u).props.pageProps,
                f = d.issuesByNewsletter.map((e) => {
                    let r = e.blocks.reduce((e, t) => e + c.render(t.markdown.text), ``);
                    return { title: e.subject, description: r, pubDate: n(t(e.publishAt, `YYYY-MM-DDTHH:mm:ss.SSS[Z]`), 0), link: `${l}/i/${e.urlFriendlyName}` };
                });
            return { title: d.newsletter.name, description: d.newsletter.about, link: l, item: f };
        },
    };
export { l as route };
