import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './utils-CPfirWwl.mjs';
import r from 'markdown-it';
async function i(e) {
    return (await t({ method: `get`, url: `https://www.lanqiao.cn/api/v2/users/${e}/`, headers: { Referer: `https://www.lanqiao.cn/users/${e}/` } })).data.name;
}
const a = {
    path: `/author/:uid`,
    categories: [`programming`],
    example: `/lanqiao/author/1701267`,
    parameters: { uid: '作者 `uid` 可在作者主页 URL 中找到' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`lanqiao.cn/users/:uid`] }],
    name: `作者发布的课程`,
    maintainers: [`huhuhang`],
    handler: o,
};
async function o(a) {
    let o = a.req.param(`uid`),
        s = await i(o),
        c = (await t({ method: `get`, url: `https://www.lanqiao.cn/api/v2/users/${o}/courses/?type=published`, headers: { Referer: `https://www.lanqiao.cn/users/${o}/` } })).data.results,
        l = new r(),
        u = await Promise.all(
            c.map((r) =>
                e.tryGet(`https://www.lanqiao.cn/api/v2/courses/${r.id}/`, async () => {
                    let e = (await t({ method: `get`, url: `https://www.lanqiao.cn/api/v2/courses/${r.id}/` })).data;
                    return ((r.title = e.name), (r.description = n.courseDesc(e.picture_url, l.render(e.long_description))), (r.author = e.teacher.name), (r.link = `https://www.lanqiao.cn/courses/${e.id}/`), r);
                })
            )
        );
    return { title: `${s} 发布的课程`, link: `https://www.lanqiao.cn/users/${o}`, description: `${s} 发布的课程`, item: u };
}
export { a as route };
