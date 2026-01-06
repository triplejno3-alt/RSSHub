import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/zx/xingnew`,
    categories: [`travel`],
    example: `/zx/xingnew`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`chnmuseum.cn/zx/xingnew`], target: `/zx/xingnew` }],
    name: `资讯要闻`,
    maintainers: [`ShabbyWhineYear`],
    handler: async () => {
        let a = i(await e(`https://www.chnmuseum.cn/zx/xingnew/`)),
            o = a(`ul.cj_xushuliebao_list li`)
                .toArray()
                .map((e) => {
                    e = a(e);
                    let t = e.find(`a`),
                        i = e.find(`span.date`).text();
                    return { title: t.attr(`title`) || t.text(), link: new URL(t.attr(`href`), `https://www.chnmuseum.cn/zx/xingnew/`).href, pubDate: r(n(i, `YYYY/MM/DD`), 8) };
                });
        return {
            title: `中国国家博物馆资讯要闻`,
            link: `https://www.chnmuseum.cn/zx/xingnew/`,
            item: await Promise.all(
                o.map((n) =>
                    t.tryGet(
                        n.link,
                        async () => (
                            (n.description = i(await e(n.link))(`.cj_xw_cong`)
                                .first()
                                .html()),
                            n
                        )
                    )
                )
            ),
        };
    },
};
export { a as route };
