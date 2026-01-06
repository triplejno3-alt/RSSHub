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
    path: `/graduate/:type?`,
    categories: [`university`],
    example: `/nankai/graduate/zxdt`,
    parameters: { type: `栏目编号（若为空则默认为"zxdt"）` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`graduate.nankai.edu.cn`, `graduate.nankai.edu.cn/:type/list.htm`], target: `/graduate/:type?` }],
    name: `研究生院`,
    maintainers: [`ladeng07`],
    description: `| 最新动态 | 综合信息 | 招生工作 | 培养管理 | 国际交流 | 学科建设 | 学位管理 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| zxdt     | 82       | 83       | 84       | 85       | 86       | 87       |`,
    url: `graduate.nankai.edu.cn`,
    handler: async (a) => {
        let { type: o = `zxdt` } = a.req.param(),
            s = `https://graduate.nankai.edu.cn`,
            { data: c } = await n(`${s}/${o}/list.htm`),
            l = i(c),
            u = { zxdt: `最新动态`, 82: `综合信息`, 83: `招生工作`, 84: `培养管理`, 85: `国际交流`, 86: `学科建设`, 87: `学位管理` }[o] || `最新动态`,
            d = l(`.newslist li`)
                .not(`#wp_paging_w6 li`)
                .toArray()
                .map((e) => {
                    let n = l(e),
                        i = n.find(`.title`).find(`a`),
                        a = n.find(`.time`),
                        o = i.attr(`title`),
                        c = i.attr(`href`) || ``;
                    c = c && !c.startsWith(`http`) ? `${s}${c}` : c;
                    let u = r(t(a.text().trim(), `YYYY-MM-DD`), 8);
                    return { title: o, link: c, pubDate: u, author: `研究生院`, description: `` };
                })
                .filter((e) => e && e.link && e.title),
            f = await Promise.all(
                d.map((t) =>
                    e.tryGet(t.link, async () => {
                        try {
                            let { data: e } = await n(t.link),
                                r = i(e),
                                a = r(`.wp_articlecontent`);
                            (a.length > 0 &&
                                (a.find(`a`).each((e, t) => {
                                    let n = r(t),
                                        i = n.attr(`href`);
                                    i && !i.startsWith(`http`) && (i.startsWith(`/`) ? n.attr(`href`, `${s}${i}`) : n.attr(`href`, `${s}/${i}`));
                                }),
                                a.find(`img`).each((e, t) => {
                                    let n = r(t),
                                        i = n.attr(`src`);
                                    i && !i.startsWith(`http`) && ((i = i.startsWith(`/`) ? `${s}${i}` : `${s}/${i}`), n.attr(`src`, i));
                                }),
                                a.find(`.wp_pdf_player`).each((e, t) => {
                                    let n = r(t),
                                        i = n.attr(`pdfsrc`),
                                        a = (n.attr(`sudyfile-attr`) || `{}`).replaceAll(`'`, `"`);
                                    try {
                                        let e = JSON.parse(a).title || `未命名文件.pdf`;
                                        if (i) {
                                            let t = i;
                                            (t.startsWith(`http`) || (t = `${s}${t}`), n.replaceWith(`<p><a href="${t}" target="_blank">📄 ${e}</a></p>`));
                                        }
                                    } catch {}
                                })),
                                (t.description = a.html() || t.title));
                        } catch {
                            t.description = t.title + ` (获取详细内容失败)`;
                        }
                        return t;
                    })
                )
            );
        return { title: `南开大学研究生院-${u}`, link: `${s}/${o}/list.htm`, item: f };
    },
};
export { a as route };
