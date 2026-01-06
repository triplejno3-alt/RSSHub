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
    path: `/yzb/:type?`,
    categories: [`university`],
    example: `/nankai/yzb/5509`,
    parameters: { type: `栏目名（若为空则默认为“硕士招生”）` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yzb.nankai.edu.cn`, `yzb.nankai.edu.cn/:type/list.htm`], target: `/yzb/:type?` }],
    name: `研究生招生网`,
    maintainers: [`sddzhyc`],
    description: `| 硕士招生 | 博士招生 | 港澳台研究生最新信息 |
| -------- | -------- | -------- |
| 5509     | 2552    | 2562   |`,
    url: `yzb.nankai.edu.cn`,
    handler: async (a) => {
        let { type: o = `5509` } = a.req.param(),
            s = `https://yzb.nankai.edu.cn`,
            { data: c } = await n(`${s}/${o}/list.htm`),
            l = i(c),
            u = l(`#wp_news_w9`)
                .find(`span.col_news_date`)
                .toArray()
                .map((e) => l(e).text()),
            d = l(`#wp_news_w9`)
                .find(`a[title]`)
                .toArray()
                .map((e, n) => {
                    let i = l(e),
                        a = i.attr(`href`) || ``;
                    return ((a = a.startsWith(`http://`) ? a.replace(`http://`, `https://`) : `${s}${a}`), { title: i.text(), link: a, pubDate: r(t(u[n]), 8) });
                }),
            f = await Promise.all(
                d.map((t) =>
                    e.tryGet(t.link.toString(), async () => {
                        let { data: e } = await n(t.link),
                            r = i(e);
                        t.description = r(`.read`).first().html();
                        let a = r(`div[pdfsrc$=".pdf"]`)
                            .toArray()
                            .map((e) => {
                                let t = r(e).attr(`pdfsrc`) || ``,
                                    n = (r(e).attr(`sudyfile-attr`) || `{}`).replaceAll(`'`, `"`),
                                    i = JSON.parse(n).title || `未命名文件.pdf`;
                                return `<a href="${new URL(t, s).href}">${i}</a>`;
                            })
                            .join(`<br>`);
                        return (a && (t.description += `<h4>相关附件：</h4>${a}`), t);
                    })
                )
            );
        return { title: `南开大学研究生招生网-${l(`.column-title`).text()}`, link: `${s}/${o}/list.htm`, item: f };
    },
};
export { a as route };
