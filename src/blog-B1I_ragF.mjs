import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/blog/:category?`,
    categories: [`bbs`],
    example: `/1point3acres/blog`,
    parameters: { category: `分类，见下表，可在对应分类页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`blog.1point3acres.com/:category`] }],
    name: `博客`,
    maintainers: [`nczitzk`],
    handler: i,
    description: `| 留学申请   | 找工求职 | 生活攻略  | 投资理财 | 签证移民 | 时政要闻 |
| ---------- | -------- | --------- | -------- | -------- | -------- |
| studyinusa | career   | lifestyle | invest   | visa     | news     |`,
};
async function i(r) {
    let i = {
            studyinusa: { title: `留学申请`, id: 18 },
            career: { title: `找工求职`, id: 200 },
            lifestyle: { title: `生活攻略`, id: 370 },
            invest: { title: `投资理财`, id: 371 },
            visa: { title: `签证移民`, id: 194 },
            news: { title: `时政要闻`, id: 366 },
        },
        a = r.req.param(`category`),
        o = `https://blog.1point3acres.com`,
        s = `${o}/${a}/`,
        { data: c } = await t(`${o}/wp-json/wp/v2/posts`, { searchParams: { categories: a ? i[a].id : void 0, per_page: r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 100 } }),
        l = c.map((t) => {
            let r = n(t.content.rendered, null, !1);
            return (
                r(`h2`).nextAll().remove(),
                r(`[powered-by="1p3a"], h2`).remove(),
                r(`img`).each((e, t) => {
                    /wp-content\/uploads/.test(t.attribs.src) && (t.attribs.src = t.attribs.src.replace(/(-\d+x\d+)/, ``));
                }),
                { title: t.title.rendered, description: r.html(), link: t.link, pubDate: e(t.date_gmt) }
            );
        });
    return { title: `${a ? `${i[a].title} | ` : ``}美国留学就业生活攻略`, link: s, item: l };
}
export { r as route };
