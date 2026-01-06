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
    path: `/jwc`,
    categories: [`university`],
    example: `/nankai/jwc`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`jwc.nankai.edu.cn/tzgg/list.htm`], target: `/jwc` }],
    name: `教务处通知公告`,
    maintainers: [`vicguo0724`],
    description: `南开大学教务处通知公告`,
    url: `jwc.nankai.edu.cn`,
    handler: async () => {
        let a = `https://jwc.nankai.edu.cn`,
            { data: o } = await n(`${a}/tzgg/list.htm`),
            s = i(o),
            c = s(`.page-con-list-news .item`)
                .toArray()
                .map((e) => {
                    let n = s(e),
                        i = n.find(`.t a`),
                        o = n.find(`.d .d-d`),
                        c = n.find(`.d .d-m`),
                        l = o.text().trim(),
                        u = `${c.text().trim()}/${l}`,
                        d = i.attr(`href`);
                    return (d && !d.startsWith(`http`) && (d = `${a}${d}`), { title: i.text().trim(), link: d, pubDate: r(t(u, `YYYY/MM/DD`), 8) });
                })
                .filter((e) => e.link),
            l = await Promise.all(
                c.map((o) =>
                    e.tryGet(o.link, async () => {
                        try {
                            let { data: e } = await n(o.link),
                                s = i(e),
                                c = s(`.page-news-souse`)
                                    .text()
                                    .match(/发布时间：(\d{4}-\d{2}-\d{2})/);
                            c && (o.pubDate = r(t(c[1]), 8));
                            let l = s(`.page-news-con .wp_articlecontent`);
                            l.length > 0
                                ? (l.find(`a`).each((e, t) => {
                                      let n = s(t),
                                          r = n.attr(`href`);
                                      r && !r.startsWith(`http`) && (r.startsWith(`/`) ? n.attr(`href`, `${a}${r}`) : n.attr(`href`, `${a}/${r}`));
                                  }),
                                  l.find(`.wp_pdf_player`).each((e, t) => {
                                      let n = s(t),
                                          r = n.attr(`pdfsrc`),
                                          i = (s(t).attr(`sudyfile-attr`) || `{}`).replaceAll(`'`, `"`),
                                          o = JSON.parse(i).title || `未命名文件.pdf`;
                                      if (r) {
                                          let e = r;
                                          (e.startsWith(`http`) || (e = `${a}${e}`), n.replaceWith(`<p><a href="${e}" target="_blank">${o}</a></p>`));
                                      }
                                  }),
                                  (o.description = l.html()))
                                : (o.description = `无法获取内容详情`);
                        } catch {
                            o.description = `获取内容失败`;
                        }
                        return o;
                    })
                )
            );
        return { title: `南开大学教务处-通知公告`, link: `${a}/tzgg/list.htm`, item: l };
    },
};
export { a as route };
