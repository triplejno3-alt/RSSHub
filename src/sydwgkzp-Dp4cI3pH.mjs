import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/chongqing/sydwgkzp/:year?`,
    url: `rlsbj.cq.gov.cn/`,
    categories: [`government`],
    example: `/gov/chongqing/sydwgkzp`,
    parameters: { year: '需要订阅的年份，格式为`YYYY`，必须小于等于当前年份，默认为当前年份' },
    radar: [{ source: [`rlsbj.cq.gov.cn/`] }],
    name: `重庆市人民政府 人力社保局 - 事业单位公开招聘`,
    maintainers: [`MajexH`],
    handler: a,
};
async function a(i) {
    let a = o(),
        { year: s } = i.req.param(),
        c = /^\d{4}$/.test(s) ? +s : a,
        l = `https://rlsbj.cq.gov.cn/zwxx_182/sydw/${c === a ? `` : `sydwgkzp${c}/`}`,
        { data: u } = await n(l),
        d = r(u),
        f = d(`meta[http-equiv="Refresh"]`).attr(`content`);
    if (f) {
        let e = f.split(`URL=`)[1];
        l = new URL(e, l).href;
        let { data: t } = await n(l);
        d = r(t);
    }
    let p = d(`ul[class="rsj-list1"] > li`)
            .toArray()
            .map((e) => {
                e = d(e);
                let n = e.find(`a`).first();
                return { title: n.text(), link: new URL(n.attr(`href`), l).href, pubDate: t(e.find(`span`).text()) };
            }),
        m = await Promise.all(
            p.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link);
                    return ((t.description = r(e)(`.trs_editor_view`).first().html()), t);
                })
            )
        );
    return { title: `重庆市事业单位${c}年公开招聘`, link: l, item: m };
}
function o() {
    return new Date().getFullYear();
}
export { i as route };
