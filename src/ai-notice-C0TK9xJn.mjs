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
    path: `/ai/:type?`,
    categories: [`university`],
    example: `/nankai/ai/zxdt`,
    parameters: { type: `栏目类型（若为空则默认为"最新动态"）` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ai.nankai.edu.cn`, `ai.nankai.edu.cn/xwzx/:type.htm`], target: `/ai/:type?` }],
    name: `人工智能学院`,
    maintainers: [`LMark`],
    description: `| 最新动态 | 学院公告 | 学生之窗 | 科研信息 | 本科生教学 | 党团园地 | 研究生招生 | 研究生教学 | 就业信息 | 国际交流 |
| -------- | -------- | -------- | -------- | ---------- | -------- | ---------- | ---------- | -------- | -------- |
| zxdt     | xygg     | xszc     | kyxx     | bksjx      | dtyd     | yjszs      | yjsjx      | jyxx     | gjjl     |`,
    url: `ai.nankai.edu.cn`,
    handler: async (a) => {
        let { type: o = `zxdt` } = a.req.param(),
            s = `https://ai.nankai.edu.cn`,
            { data: c } = await n(`${s}/xwzx/${o}.htm`),
            l = i(c),
            u = { zxdt: `最新动态`, xygg: `学院公告`, xszc: `学生之窗`, kyxx: `科研信息`, bksjx: `本科生教学`, dtyd: `党团园地`, yjszs: `研究生招生`, yjsjx: `研究生教学`, jyxx: `就业信息`, gjjl: `国际交流` }[o] || `最新动态`,
            d = l(`.gage-list-news table tr`)
                .slice(1)
                .toArray()
                .map((e) => {
                    let n = l(e).find(`td`);
                    if (n.length < 3) return null;
                    let i = n.eq(0),
                        a = n.eq(1),
                        o = n.eq(2),
                        c = i.find(`a`),
                        u = c.text().trim(),
                        d = c.attr(`href`) || ``;
                    d = d && !d.startsWith(`http`) ? `${s}/${d}` : d;
                    let f = o.text().trim(),
                        p = f.includes(`/`) ? r(t(f, `YYYY/MM/DD`), 8) : r(t(f), 8),
                        m = a.text().trim();
                    return { title: u, link: d, pubDate: p, author: m || `人工智能学院`, description: `` };
                })
                .filter((e) => e && e.link && e.title),
            f = await Promise.all(
                d.map((t) =>
                    t
                        ? e.tryGet(t.link, async () => {
                              try {
                                  let { data: e } = await n(t.link),
                                      r = i(e),
                                      a = r(`.v_news_content`);
                                  (a.length > 0 &&
                                      a.find(`img`).each((e, t) => {
                                          let n = r(t),
                                              i = n.attr(`src`);
                                          i && !i.startsWith(`http`) && ((i = `${s}${i}`), n.attr(`src`, i));
                                      }),
                                      (t.description = a.html() || t.title));
                              } catch {
                                  t.description = t.title + ` (获取详细内容失败)`;
                              }
                              return t;
                          })
                        : null
                )
            );
        return { title: `南开大学人工智能学院-${u}`, link: `${s}/xwzx/${o}.htm`, item: f };
    },
};
export { a as route };
