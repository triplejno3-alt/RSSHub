import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { n as a } from './wechat-mp-HNgcLN2K.mjs';
import { load as o } from 'cheerio';
const s = `https://www.nmpa.gov.cn`,
    c = { path: `/nmpa/*`, name: `Unknown`, maintainers: [], handler: l };
async function l(c) {
    let l = c.params[0],
        u = `${s}/${l.endsWith(`/`) ? l.slice(0, -1) : l}/index.html`,
        d = await t.tryGet(
            u,
            async () => {
                let { data: e } = await r(u),
                    t = o(e);
                return {
                    title: t(`head title`).text(),
                    description: t(`meta[name=ColumnDescription]`).attr(`content`),
                    items: t(`.list ul li`)
                        .toArray()
                        .map((e) => ((e = t(e)), { title: e.find(`a`).text().trim(), link: new URL(e.find(`a`).attr(`href`), s).href, pubDate: n(e.find(`span`).text(), `YYYY-MM-DD`) })),
                };
            },
            e.cache.routeExpire,
            !1
        ),
        f = await Promise.all(
            d.items.map((e) =>
                /^https:\/\/www\.nmpa\.gov\.cn\//.test(e.link)
                    ? t.tryGet(e.link, async () => {
                          let { data: t } = await r(e.link),
                              a = o(t);
                          return ((e.description = a(`.text`).html()), (e.pubDate = i(n(a(`meta[name="PubDate"]`).attr(`content`)), 8)), e);
                      })
                    : /^https:\/\/mp\.weixin\.qq\.com\//.test(e.link)
                      ? a(e)
                      : e
            )
        );
    return { title: d.title, description: d.description, link: u, item: f };
}
export { c as route };
