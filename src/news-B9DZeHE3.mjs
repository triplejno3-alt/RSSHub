import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = `https://www.huijin-inv.cn`,
    a = `${i}/huijin-inv/Corporate_History/index.shtml`;
async function o() {
    let o = r(await e(a)),
        s = o(`head script`),
        c = `/huijin-inv/SC20252/Information_Center.shtml`;
    s.each((e, t) => {
        let n = o(t).text();
        if (n !== null) {
            let e = n.match(/window\.location\.href\s*=\s*["']([^"']+)["']/);
            e && (c = e[1]);
        }
    });
    let l = r(await e(`${i}${c}`)),
        u = l(`title`).text()?.trim(),
        d = l(`div.logo a`).attr(`title`)?.trim();
    return {
        item: l(`div.infor-list-item`)
            .toArray()
            .map((e) => {
                let r = l(e),
                    a = r.find(`h1`).text(),
                    o = `${r.find(`span.year`).text()}.${r.find(`span.day`).text()}`,
                    s = r.find(`a`).prop(`href`),
                    c = s ? (s.startsWith(`http`) ? s : new URL(s, i).href) : i,
                    u = r.find(`p`).text();
                return { title: a, link: c, pubDate: n(t(o), 8), description: u };
            }),
        title: u,
        link: i,
        description: `${d} - ${u}`,
        author: d,
        language: `zh-CN`,
    };
}
const s = {
    path: `/news`,
    categories: [`finance`],
    example: `/huijin-inv/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.huijin-inv.cn/`] }],
    name: `资讯中心`,
    maintainers: [`la3rence`],
    handler: o,
    description: `中央汇金投资有限责任公司 - 资讯中心`,
};
export { s as route };
