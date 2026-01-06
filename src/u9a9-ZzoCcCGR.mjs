import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://u9a9.com`,
    o = { path: [`/:preview?`, `/search/:keyword/:preview?`], example: `/u9a9/search/新片速递`, radar: [{ source: [`u9a9.com/`], target: `` }], name: `Search`, maintainers: [`TonyRL`], handler: s, url: `u9a9.com/` };
async function s(o) {
    let { preview: s, keyword: c } = o.req.param(),
        l,
        u;
    c ? ((l = `${a}/?type=2&search=${c}`), (u = `${c} - U9A9`)) : ((l = a), (u = `U9A9`));
    let { data: d } = await n(l),
        f = i(d),
        p = f(`table tr`)
            .slice(1)
            .toArray()
            .map((e) => {
                e = f(e);
                let n = e.find(`td`).eq(1).find(`a`),
                    { size: i, unit: o } = e
                        .find(`td`)
                        .eq(3)
                        .text()
                        .match(/(?<size>\d+\.\d+)\s(?<unit>\w+)/).groups;
                return {
                    title: n.attr(`title`),
                    link: `${a}${n.attr(`href`)}`,
                    pubDate: r(t(e.find(`td`).eq(4).text()), 8),
                    enclosure_url: e.find(`td`).eq(2).find(`a`).eq(1).attr(`href`),
                    enclosure_length: Number.parseInt(i * (o === `GB` ? 1024 * 1024 * 1024 : 1024 * 1024)),
                    enclosure_type: `application/x-bittorrent`,
                };
            }),
        m = s
            ? await Promise.all(
                  p.map((t) =>
                      e.tryGet(t.link, async () => {
                          let { data: e } = await n(t.link);
                          return ((t.description = i(e)(`.panel-body`).eq(1).html()), t);
                      })
                  )
              )
            : p;
    return { title: u, link: l, item: m };
}
export { o as route };
