import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = {
    path: `/matrix`,
    categories: [`new-media`],
    example: `/sspai/matrix`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sspai.com/matrix`] }],
    name: `Matrix`,
    maintainers: [`feigaoxyz`],
    handler: i,
    url: `sspai.com/matrix`,
};
async function i() {
    let r = (await n({ method: `get`, url: `https://sspai.com/api/v1/articles?offset=0&limit=20&is_matrix=1&sort=matrix_at&include_total=false` })).data.list;
    return {
        title: `少数派 -- Matrix`,
        link: `https://sspai.com/matrix`,
        description: `少数派 -- Matrix`,
        item: await Promise.all(
            r.map((r) => {
                let i = `https://sspai.com/api/v1/article/info/get?id=${r.id}&view=second&support_webp=true`,
                    a = ``,
                    o = `sspai: ${r.id}`;
                return e.tryGet(o, async () => {
                    let e = (await n(i)).data.data,
                        o = e.promote_image;
                    return (
                        o && (a = `<img src="${o}" alt="Article Cover Image" style="display: block; margin: 0 auto;"><br>`),
                        (a += e.body),
                        { title: r.title.trim(), description: a, link: `https://sspai.com/post/${r.id}`, pubDate: t(r.released_at * 1e3), author: r.author.nickname }
                    );
                });
            })
        ),
    };
}
export { r as route };
