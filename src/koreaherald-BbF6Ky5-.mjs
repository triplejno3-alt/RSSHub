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
    path: `/:category{.+}?`,
    categories: [`traditional-media`],
    example: `/koreaherald/National`,
    parameters: { category: 'Category from the path of the URL of the corresponding site, `National` by default' },
    features: { requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, requireConfig: !1 },
    name: `News`,
    maintainers: [`quiniapiezoelectricity`],
    handler: o,
    description: `
::: tip
For example, the category for the page https://www.koreaherald.com/Business and https://www.koreaherald.com/Business/Market would be \`/Business\` and \`/Business/Market\` respectively. 
:::
`,
    radar: [{ source: [`www.koreaherald.com/:category`], target: `/:category` }],
};
async function o(a) {
    let o = a.req.param(`category`) ?? `National`,
        s = `https://www.koreaherald.com/`,
        c = i((await n(new URL(o, s).href)).data),
        l = c(`ul.gnb`).find(`[class="on"]`).length > 0 ? c(`ul.gnb`).find(`[class="on"]`).text() : c(`div.nav_area > a.category`).text(),
        u = c(`article.recent_news > ul.news_list > li`)
            .toArray()
            .map((e) => new URL(c(e).find(`a`).attr(`href`), s).href),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a, async () => {
                    let e = i((await n(a)).data),
                        o = JSON.parse(e(`[type="application/ld+json"]`).text());
                    return { title: o.headline, link: a, pubDate: r(t(o.datePublished), 9), author: o.author.name, description: e(`article.article-body`).html() };
                })
            )
        );
    return { title: `The Korea Herald - ${l}`, link: new URL(o, s).href, item: d };
}
export { a as route };
