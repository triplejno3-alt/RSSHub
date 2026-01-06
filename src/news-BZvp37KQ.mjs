import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = { domestic: `domestic`, international: `international`, social: `social`, news100: `news100` },
    i = {
        path: `/news/:category?`,
        categories: [`new-media`],
        example: `/china/news`,
        parameters: { category: `Category of news. See the form below for details, default is china news.` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`news.china.com/:category`] }],
        name: `News and current affairs 时事新闻`,
        maintainers: [`jiaaoMario`],
        handler: a,
        description: `Category of news

| China News | International News | Social News | Breaking News |
| ---------- | ------------------ | ----------- | ------------- |
| domestic   | international      | social      | news100       |`,
    };
async function a(i) {
    let a = `https://news.china.com/${r[i.req.param(`category`)] ?? r.domestic}`,
        o = (await t(a)).data,
        s = n(o),
        c = s(`.wp_title`).text(),
        l = s(`.item_list li`);
    return {
        title: `中华网-${c}新闻`,
        link: a,
        item: l
            .toArray()
            .map(
                (t) => (
                    (t = s(t)),
                    {
                        title: t.find(`.item_title a`).text(),
                        author: t.find(`.item_source`).text(),
                        category: `${c}新闻`,
                        pubDate: e(t.find(`.item_time`).text()),
                        description: t.find(`.item_title a`).text(),
                        link: t.find(`li a`).attr(`href`),
                    }
                )
            ),
    };
}
export { i as route };
