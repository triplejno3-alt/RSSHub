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
    path: `/jwc/:type?`,
    categories: [`university`],
    example: `/upc/jwc/tzgg`,
    parameters: { type: `分类，见下表，其值与对应网页url路径参数一致，默认为所有通知` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`jwc.upc.edu.cn`, `jwc.upc.edu.cn/:type/list.htm`], target: `/jwc/:type?` }],
    name: `教务处`,
    maintainers: [`sddzhyc`],
    description: `| 所有通知 | 教学·运行 | 学业·学籍 | 教学·研究 | 课程·教材 | 实践·教学 | 创新·创业 | 语言·文字 | 继续·教育 | 本科·招生 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| tzgg     | 18519    | 18520   | 18521    |    18522 |    18523 | 18524    |  yywwz   |  jxwjy   |   bkwzs  |`,
    url: `jwc.upc.edu.cn/tzgg/list.htm`,
    handler: async (a) => {
        let { type: o = `tzgg` } = a.req.param(),
            s = `https://jwc.upc.edu.cn`,
            { data: c } = await n(`${s}/${o}/list.htm`),
            l = i(c),
            u = l(`ul.news_list`)
                .find(`li`)
                .toArray()
                .map((e) => {
                    e = l(e);
                    let n = e.find(`a`).first(),
                        i = n.attr(`href`);
                    return ((i = i.replace(`http://`, `https://`)), n.attr(`href`).startsWith(`https://`) || (i = `${s}${n.attr(`href`)}`), { title: n.text(), link: i, pubDate: r(t(e.find(`.news_meta`).text()), 8) });
                }),
            d = await Promise.all(
                u.map((t) =>
                    e.tryGet(t.link, async () => {
                        try {
                            let { data: e } = await n(t.link),
                                r = i(e);
                            if (t.link.includes(`news.upc.edu.cn`)) ((t.description = r(`.v_news_content`).html()), (t.author = r(`.nr-zz h2`).html()));
                            else if (t.link.includes(`app.upc.edu.cn`)) {
                                let e = r(`body script`).first().html(),
                                    n = null;
                                if (e) {
                                    let t = e.match(/data\s*:\s*function\s*\(\)\s*{\s*return\s*{[^}]*data\s*:\s*({[\s\S]*?})/);
                                    if (t && t[1]) {
                                        let e = t[1];
                                        n = JSON.parse(e);
                                    }
                                }
                                ((t.description = n.content), (t.author = n.author));
                            } else ((t.description = r(`.read`).first().html() || `无法获取正文内容，请手动访问`), (t.author = r(`.arti_publisher`).html()));
                        } catch {
                            t.description = `正文内容获取失败`;
                        }
                        return t;
                    })
                )
            );
        return { title: `${l(`title`).text()}-教务处通知-中国石油大学（华东）`, link: `${s}/${o}/list.htm`, item: d };
    },
};
export { a as route };
