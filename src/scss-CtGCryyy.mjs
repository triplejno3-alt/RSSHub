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
    path: `/scss/tzgg`,
    categories: [`university`],
    example: `/bupt/scss/tzgg`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`scss.bupt.edu.cn/index/tzgg1.htm`], target: `/scss/tzgg` }],
    name: `网络空间安全学院 - 通知公告`,
    maintainers: [`ziri2004`],
    handler: o,
    url: `scss.bupt.edu.cn`,
};
async function o() {
    let a = `https://scss.bupt.edu.cn`,
        o = `${a}/index/tzgg1.htm`,
        s = i((await n({ method: `get`, url: o })).data),
        c = s(`.Newslist li`)
            .toArray()
            .map((e) => {
                let t = s(e),
                    n = t.find(`a`);
                if (n.length === 0 || !n.attr(`href`)) return null;
                let r = new URL(n.attr(`href`), a).href,
                    i = t.find(`span`).text().replace(`发布时间：`, ``).trim();
                return { title: n.text().trim(), link: r, pubDateRaw: i };
            })
            .filter(Boolean);
    return {
        title: `北京邮电大学网络空间安全学院 - 通知公告`,
        link: o,
        item: await Promise.all(
            c.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data),
                        o = e(`.v_news_content`);
                    return (
                        o.find(`p, span, strong`).each(function () {
                            let t = e(this),
                                n = t.text().trim();
                            n === `` ? t.remove() : t.replaceWith(n);
                        }),
                        (a.description = o.text()),
                        (a.pubDate = r(t(a.pubDateRaw), 8)),
                        a
                    );
                })
            )
        ),
    };
}
export { a as route };
