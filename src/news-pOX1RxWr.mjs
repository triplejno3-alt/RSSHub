import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.dykszx.com`,
    o = async (e) => {
        let t = `${a}${e}`,
            r = i((await n.get(t)).data),
            o =
                r(`body > div:nth-child(3) > div.page.w > div.shuxing.w`)
                    .text()
                    .trim()
                    .match(/时间：(.*?)点击/g)?.[0] || ``;
        return (r(`.sjlook`).remove(), { newsTime: o, content: r(`#show-body`).html() || ``, newsPage: t });
    },
    s = {
        all: { selector: `#nrs > li > b`, name: `新闻中心` },
        gwy: { selector: `body > div:nth-child(3) > div:nth-child(8) > ul > li`, name: `公务员考试` },
        sydw: { selector: `body > div:nth-child(3) > div:nth-child(9) > ul > li`, name: `事业单位考试` },
        zyzc: { selector: `body > div:nth-child(3) > div:nth-child(10) > ul > li`, name: `执（职）业资格、职称考试` },
        other: { selector: `body > div:nth-child(3) > div:nth-child(11) > ul > li`, name: `其他考试` },
    };
async function c(c) {
    let l = c.req.param(`newsType`) || `all`,
        u = (await n(a)).data,
        d = i(u)(s[l].selector).toArray(),
        f = await Promise.all(
            d.map((n) => {
                let i = n.children[0].attribs.href;
                return e.tryGet(i, async () => {
                    let e = await o(i);
                    return { title: n.children[0].children[0].data, description: e.content, link: e.newsPage, pubDate: r(t(e.newsTime, `时间：YYYY-MM-DD HH:mm:ss`), 8) };
                });
            })
        );
    return { title: `考试新闻发布(${s[l].name})`, link: a, description: `德阳人事考试网 考试新闻发布 (${s[l].name})`, item: f };
}
const l = {
    path: `/news/:newsType?`,
    categories: [`government`],
    example: `/dykszx/news`,
    parameters: { newsType: `考试类型。默认新闻中心(all)` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.dykszx.com/`], target: `/news/all` }],
    name: `考试新闻发布`,
    maintainers: [`zytomorrow`],
    handler: c,
    url: `www.dykszx.com`,
    description: `| 新闻中心 | 公务员考试 | 事业单位 | （职）业资格、职称考试 | 其他 |
| :------: | :------: | :------: |:------: |:------: |
|   all   |   gwy   |  sydw | zyzc  | other |`,
};
export { l as route };
