import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = `http://acg17.com`,
    r = {
        path: `/post/all`,
        categories: [`anime`],
        example: `/acg17/post/all`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`acg17.com/post`] }],
        name: `全部文章`,
        maintainers: [`SunBK201`],
        handler: i,
        url: `acg17.com/post`,
    };
async function i() {
    let r = (await t(`${n}/wp-json/wp/v2/posts?per_page=30`)).data;
    return { title: `ACG17 - 全部文章`, link: `${n}/blog`, description: `ACG17 - 全部文章`, item: r.map((t) => ({ title: t.title.rendered, link: t.link, pubDate: e(t.date_gmt), description: t.content.rendered })) };
}
export { r as route };
