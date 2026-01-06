import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://www.alwayscontrol.com.cn`,
    a = {
        path: `/news`,
        categories: [`other`],
        example: `/alwayscontrol/news`,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `最新动态`,
        maintainers: [`moss-xxh`],
        url: `alwayscontrol.com.cn`,
        handler: o,
        radar: [{ source: [`www.alwayscontrol.com.cn/zh-CN/news/list`], target: `/news` }],
        description: `Always Control（旭衡电子）智能能源管理系统解决方案专家的最新动态`,
    };
async function o() {
    let a = `${i}/zh-CN/news/list`,
        o = r((await n(a)).data),
        s = o(`article`)
            .toArray()
            .map((e) => {
                let n = o(e),
                    r = n.find(`h2`).text().trim(),
                    a = n.find(`time`).text().trim(),
                    s = n.find(`a`).attr(`href`),
                    c = n.find(`img`).attr(`src`);
                return { title: r, link: s ? `${i}${s}` : ``, pubDate: t(a, `YYYY-MM-DD`), image: c ? (c.startsWith(`http`) ? c : `${i}${c}`) : `` };
            });
    return {
        title: `Always Control - 最新动态`,
        link: a,
        description: `Always Control（旭衡电子）- 智能能源管理系统解决方案专家最新动态`,
        language: `zh-CN`,
        item: await Promise.all(
            s.map((t) =>
                e.tryGet(t.link, async () => {
                    if (!t.link) return t;
                    try {
                        let e = r((await n(t.link)).data);
                        return (
                            e(`article img`).each((t, n) => {
                                let r = e(n),
                                    a = r.attr(`src`);
                                a && a.startsWith(`/`) && r.attr(`src`, `${i}${a}`);
                            }),
                            e(`article *`).each((t, n) => {
                                let r = e(n),
                                    i = new Set([`src`, `href`, `alt`, `title`]),
                                    a = Object.keys(n.attribs || {});
                                for (let e of a) i.has(e) || r.removeAttr(e);
                            }),
                            (t.description = e(`article`).html() || ``),
                            (t.author = `旭衡电子(深圳)有限公司`),
                            (t.category = [`公司动态`, `最新资讯`]),
                            t
                        );
                    } catch {
                        return ((t.description = t.image ? `<img src="${t.image}">` : ``), t);
                    }
                })
            )
        ),
        image: `${i}/logo.png`,
    };
}
export { a as route };
