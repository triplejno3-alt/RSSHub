import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { n as t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import * as r from 'cheerio';
const i = { path: `/analytic`, categories: [`finance`], view: n.Articles, example: `/zhizhuan100/analytic`, radar: [{ source: [`www.zhizhuan100.com.cn/analysis`] }], name: `analytic`, maintainers: [`Cedaric`], handler: a };
async function a() {
    let n = await e(`https://www.zhizhuan100.com.cn/analysis`),
        i = r.load(n)(`script[src*="Body.js"]`).attr(`src`);
    if (!i) throw Error(`无法找到 Body.js 脚本文件`);
    let a = (await e(i, { parseResponse: (e) => e })).match(/document\.write\('(.*)'\);/s);
    if (!a) throw Error(`无法找到HTML内容`);
    let o = JSON.parse(`"${a[1]}"`),
        s = r.load(o);
    return {
        title: `智篆商业-消费报告`,
        link: `https://www.zhizhuan100.com.cn/analysis`,
        allowEmpty: !0,
        item: s(`.w-list-item`)
            .toArray()
            .map((e) => {
                let n = s(e),
                    r = n.find(`.w-list-title`),
                    i = n.find(`.w-list-date`),
                    a = n.find(`.w-list-link`),
                    o = n.find(`.w-listpic-in`),
                    c = r.text().trim() || ``,
                    l = i.text().trim() || ``,
                    u = a.attr(`href`) || ``,
                    d = o.attr(`src`) || ``,
                    f = u.match(/\/productinfo\/(\d+)\.html/),
                    p = f ? f[1] : ``;
                return { title: c, pubDate: t(l), link: u.startsWith(`http`) ? u : `https://www.zhizhuan100.com.cn${u}`, description: `<img src="${d.startsWith(`//`) ? `https:` + d : d}" alt="${c}">`, guid: p };
            })
            .filter((e) => e.title),
    };
}
export { i as route };
