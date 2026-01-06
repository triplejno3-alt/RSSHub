import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
async function a() {
    try {
        let t = (await r.get(`https://scupi.scu.edu.cn/activities/notice`, { headers: { 'User-Agent': e.ua } })).body,
            a = i(t);
        return a(`body > div.wrapper > main > section > div > div > div.news > div > ul`)
            .find(`article`)
            .toArray()
            .map((e) => {
                let t = a(e).find(`li > div > div.news-text > h4 > a`),
                    r = a(e).find(`li > div > div.news-text > span`),
                    i = a(e).find(`li > div > div.news-img > a > img`),
                    o = t.attr(`href`),
                    s = t.attr(`title`),
                    c = r.text().trim();
                return { title: s, link: o, itunes_item_image: i.attr(`src`), pubDate: n(c, `YYYY-MM-DD`) };
            });
    } catch {}
    return [];
}
async function o(t) {
    try {
        let n = (await r.get(t.link, { headers: { 'User-Agent': e.ua } })).body;
        return ((t.description = i(n)(`body > div > main > section > div > div > div.post-content-contaier > div`).html()), t);
    } catch {}
    return t;
}
const s = {
    path: `/scupi`,
    categories: [`university`],
    example: `/scu/scupi`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `匹兹堡学院通知`,
    maintainers: [`sitdownkevin`],
    url: `scupi.scu.edu.cn/activities/notice`,
    handler: c,
    description: ``,
};
async function c() {
    let e = await a();
    return {
        title: `四川大学匹兹堡学院`,
        description: `四川大学匹兹堡学院官网通知`,
        language: `zh-cn`,
        image: `https://upload.wikimedia.org/wikipedia/zh/4/45/Sichuan_University_logo.svg`,
        logo: `https://upload.wikimedia.org/wikipedia/zh/4/45/Sichuan_University_logo.svg`,
        link: `https://scupi.scu.edu.cn/`,
        item: await Promise.all(e.map((e) => t.tryGet(e.link, () => o(e)))),
    };
}
export { s as route };
