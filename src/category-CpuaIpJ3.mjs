import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/category/:category?`,
    categories: [`blog`],
    example: `/ddosi/category/黑客工具`,
    parameters: { category: `N` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ddosi.org/category/:category/`], target: `/category/:category` }],
    name: `分类`,
    maintainers: [],
    handler: a,
    url: `ddosi.org/`,
};
async function a(i) {
    let a = `https://www.ddosi.org/category`,
        o = e.ua || `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`,
        s = i.req.param(`category`),
        c = r((await n({ method: `get`, url: `${a}/${s}/`, headers: { 'User-Agent': o, Referer: a } })).data),
        l = c(`main>article`)
            .toArray()
            .map((e) => {
                let n = c(e),
                    r = n.find(`a:first-child`).attr(`href`),
                    i = n.find(`.entry-title a`).text(),
                    a = n.find(`.entry-content p`).text(),
                    o = t(n.find(`.meta-date a time`).attr(`datetime`));
                return { title: String(i), description: String(a), pubDate: o, link: String(r) };
            });
    return { title: `雨苁-${s}`, link: `${a}/${s}/`, item: l };
}
export { i as route };
