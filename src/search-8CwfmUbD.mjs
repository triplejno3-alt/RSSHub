import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/search/:keyword/:language?`,
    categories: [`other`],
    example: `/google/search/rss/zh-CN,zh`,
    parameters: { keyword: `Keyword`, language: 'Accept-Language. Example: `zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Search`,
    maintainers: [`CaoMeiYouRen`],
    handler: a,
};
async function a(i) {
    let { keyword: a, language: o = `en` } = i.req.param(),
        s = new URLSearchParams({ q: a }),
        c = new URL(`https://www.google.com/search`);
    c.search = s.toString();
    let l = c.toString(),
        u = `google:search:${o}:${l}`,
        d = await n.tryGet(
            u,
            async () => {
                let t = r(await e(l, { headers: { 'Accept-Language': o, 'User-Agent': `Lynx/2.9.2 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/3.5.0` } }));
                return t(`body > div > div > div > div > div > div > a`)
                    .toArray()
                    .map((e) => {
                        let n = t(e),
                            r = n.attr(`href`),
                            i = n.find(`span`).first().text().trim(),
                            a = n.parent().next().find(`span > span`).last().text().trim().replaceAll(`�`, ``) || ``,
                            o = n.find(`span > span`).text().trim() || ``;
                        return { link: new URL(r, `https://www.google.com`).searchParams.get(`q`) || r, title: i, description: a, author: o };
                    });
            },
            t.cache.routeExpire,
            !1
        );
    return { title: `${a} - Google Search`, description: `${a} - Google Search`, link: l, item: d };
}
export { i as route };
