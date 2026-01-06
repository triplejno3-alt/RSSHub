import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/seiee/:path/:catID?/:searchCatCode?`,
    categories: [`university`],
    example: `/sjtu/seiee/xzzx_notice_bks`,
    parameters: { path: `不含'.html'的最后一部分路径`, catID: `'本科生人才培养'与'研究生人才培养'的类别ID`, searchCatCode: `'本科生人才培养'与'研究生人才培养'下类别名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.seiee.sjtu.edu.cn/:path.html`], target: `/seiee/:path` }],
    name: `电子信息与电气工程学院`,
    maintainers: [`dzx-dzx`],
    handler: o,
};
async function o(a) {
    let { path: o, catID: s = ``, searchCatCode: c = `` } = a.req.param(),
        l = `https://www.seiee.sjtu.edu.cn`,
        u = `${l}/${o}.html`,
        d = `${l}/active/ajax_article_list.html`,
        f = i(
            s
                ? (
                      await e(d, {
                          method: `POST`,
                          body: new URLSearchParams({ page: `1`, cat_id: s, search_cat_code: c, search_cat_title: ``, template: `v_ajax_normal_list1` }),
                          headers: { 'Content-Type': `application/x-www-form-urlencoded; charset=UTF-8` },
                          parseResponse: JSON.parse,
                      })
                  ).content
                : await e(u)
        ),
        p = f(s ? `li` : `.u10 li`)
            .toArray()
            .map((e) => ((e = f(e)), { title: e.find(`.name`).text().trim(), link: e.find(`a`).attr(`href`) })),
        m = await Promise.all(
            p.map((a) =>
                t.tryGet(a.link, async () => {
                    let t = i(await e(a.link));
                    return (
                        (a.description = t(`.nr`).html()),
                        (a.pubDate = r(
                            n(
                                t(`.jj`)
                                    .text()
                                    .trim()
                                    .match(/日期：([\d-]+) /)[1]
                            ),
                            8
                        )),
                        a
                    );
                })
            )
        );
    return { title: f(`title`).text() || i(await e(u))(`title`).text(), link: u, item: m };
}
export { a as route };
