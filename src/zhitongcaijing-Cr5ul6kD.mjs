import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
        recommend: { url: `content/recommend`, title: `推荐` },
        hkstock: { url: `content/hkstock`, title: `港股` },
        meigu: { url: `content/meigu`, title: `美股` },
        agu: { url: `content/agu`, title: `沪深` },
        ct: { url: `content/ct`, title: `创投` },
        esg: { url: `content/esg`, title: `ESG` },
        aqs: { url: `content/aqs`, title: `券商` },
        ajj: { url: `content/ajj`, title: `基金` },
        focus: { url: `focus`, title: `要闻` },
        announcement: { url: `announcement`, title: `公告` },
        research: { url: `research`, title: `研究` },
        shares: { url: `shares`, title: `新股` },
        bazaar: { url: `bazaar`, title: `市场` },
        company: { url: `company`, title: `公司` },
    },
    u = {
        path: `/:id?/:category?`,
        categories: [`finance`],
        view: r.Articles,
        example: `/zhitongcaijing`,
        parameters: { id: `栏目 id，可在对应栏目页 URL 中找到，默认为 recommend，即推荐`, category: `分类 id，可在对应栏目子分类页 URL 中找到，默认为全部` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `推荐`,
        maintainers: [`nczitzk`],
        handler: d,
        description: `| id           | 栏目 |
| ------------ | ---- |
| recommend    | 推荐 |
| hkstock      | 港股 |
| meigu        | 美股 |
| agu          | 沪深 |
| ct           | 创投 |
| esg          | ESG  |
| aqs          | 券商 |
| ajj          | 基金 |
| focus        | 要闻 |
| announcement | 公告 |
| research     | 研究 |
| shares       | 新股 |
| bazaar       | 市场 |
| company      | 公司 |`,
    };
async function d(r) {
    let u = r.req.param(`id`) ?? `recommend`,
        d = r.req.param(`category`) ?? ``,
        f = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 20,
        p = `https://www.zhitongcaijing.com`,
        m = `${p}/${l[u].url}.html${d === `` ? `` : `?category_key=${d}`}`,
        h = (await n({ method: `get`, url: `${p}/${l[u].url}.html?data_type=1&page=1${d === `` ? `` : `&category_key=${d}`}` })).data.data
            .slice(0, f)
            .map((e) => ({
                title: e.title,
                link: `${p}${e.url}`,
                description: e.digest,
                author: e.author_info.author_name,
                pubDate: t((e.create_time ?? Number.parseInt(e.original_time)) * 1e3),
                category: [...(e.keywords?.split(`,`) ?? []), e.category_name ?? e.type_tag],
            }));
    return (
        (h = await Promise.all(
            h.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = o((await n({ method: `get`, url: t.link })).data);
                    (e(`#subscribe-vip-box`).remove(), e(`#news-content`).remove());
                    let r = e(`.digetst-box`).html() || e(`.telegram-origin-contentn`).html(),
                        l = e(`.news-body-content`).html();
                    return ((t.description = s(a(i, { children: [r ? c(r) : null, l ? c(l) : null] }))), t);
                })
            )
        )),
        { title: `智通财经 - ${l[u].title}`, link: m, item: h }
    );
}
export { u as route };
