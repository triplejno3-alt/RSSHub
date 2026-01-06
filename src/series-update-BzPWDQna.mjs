import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/series/:id`,
    categories: [`new-media`],
    example: `/sspai/series/77`,
    parameters: { id: `专栏 id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sspai.com/series/:id`, `sspai.com/series/:id/list`, `sspai.com/series/:id/metadata`] }],
    name: `付费专栏文章更新`,
    maintainers: [`TonyRL`],
    handler: r,
    url: `sspai.com/series`,
};
async function r(n) {
    let r = n.req.param(`id`),
        i = await t.get(`https://sspai.com/api/v1/series/info/get?id=${r}&view=second`),
        a = await t(`https://sspai.com/api/v1/series/article/search/page/get?series_id=${r}&weight=0&sort=desc&title=&limit=${n.req.query(`limit`) ? Number(n.req.query(`limit`)) : 40}&offset=0`),
        o = await Promise.all(
            a.data.data.map(async (n) => {
                let r = ``;
                return (
                    (r = n.probation ? (await t(`https://sspai.com/api/v1/article/info/get?id=${n.id}&view=second&support_webp=true`)).data.data.body : `<img src="https://cdn.sspai.com/${n.banner}">`),
                    { title: n.title_prefix + ` - ` + n.title, description: r, author: i.data.data.author.nickname, link: `https://sspai.com/post/${n.id}`, pubDate: e(n.created_at * 1e3) }
                );
            })
        );
    return { title: `${i.data.data.title} - 少数派`, description: `${i.data.data.description} - 少数派`, link: `https://sspai.com/series/${r}`, item: o };
}
export { n as route };
