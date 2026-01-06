import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:category?/:id?`,
    categories: [`new-media`],
    example: `/storm`,
    parameters: { category: `分类，见下表，默认为新聞總覽`, id: `子分类 ID，可在 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`storm.mg/:category/:id`] }],
    name: `分类`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| 新聞總覽 | 地方新聞      | 歷史頻道 | 評論總覽    |
| -------- | ------------- | -------- | ----------- |
| articles | localarticles | history  | all-comment |

::: tip
  支持形如 \`https://www.storm.mg/category/118\` 的路由，即 [\`/storm/category/118\`](https://rsshub.app/storm/category/118)

  支持形如 \`https://www.storm.mg/localarticle-category/s149845\` 的路由，即 [\`/storm/localarticle-category/s149845\`](https://rsshub.app/storm/localarticle-category/s149845)
:::`,
};
async function a(i) {
    let a = i.req.param(`category`) ?? `articles`,
        o = i.req.param(`id`) ?? ``,
        s = `https://www.storm.mg/${a}${o ? `/${o}` : ``}`,
        c = r((await n({ method: `get`, url: s })).data),
        l = c(`.link_title`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.text(), link: e.attr(`href`) })),
        u = await Promise.all(
            l.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n({ method: `get`, url: i.link })).data);
                    return (
                        e(`.notify_wordings`).remove(),
                        e(`#premium_block`).remove(),
                        (i.description = e(`#CMS_wrapper`).html()),
                        (i.author = e(`meta[property="dable:author"]`).attr(`content`)),
                        (i.pubDate = t(e(`meta[itemprop="datePublished"]`).attr(`content`))),
                        i
                    );
                })
            )
        );
    return { title: c(`title`).text(), link: s, item: u };
}
export { i as route };
