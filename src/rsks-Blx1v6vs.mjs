import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://rlsbj.cq.gov.cn/ywzl/rsks/tzgg_109374/`,
    a = {
        path: `/chongqing/rsks`,
        categories: [`government`],
        example: `/gov/chongqing/rsks`,
        radar: [{ source: [`rlsbj.cq.gov.cn/`] }],
        name: `重庆市人民政府 人力社保局 - 人事考试通知`,
        maintainers: [`Mai19930513`],
        handler: o,
        url: `rlsbj.cq.gov.cn/`,
    };
async function o() {
    let { data: a } = await n(i),
        o = r(a),
        s = o(`div.page-list .tab-item > li`)
            .toArray()
            .map((e) => {
                e = o(e);
                let n = e.find(`a`).first();
                return { title: n.text(), link: `${i}${n.attr(`href`)}`, pubDate: t(e.find(`span`).text()) };
            });
    return {
        title: `重庆人事考试通知公告`,
        link: i,
        item: await Promise.all(
            s.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = r(e);
                    return ((i.pubDate = t(a(`meta[name="PubDate"]`).attr(`content`)) ?? i.pubDate), (i.description = a(`.view.TRS_UEDITOR.trs_paper_default.trs_word`).first().html()), i);
                })
            )
        ),
    };
}
export { a as route };
