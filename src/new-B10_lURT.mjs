import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { n as t, t as n } from './utils-attYqd7n.mjs';
const r = ({ moreToken: n = `` }) => e({ method: `post`, url: `https://srv-mp.app.ikea.cn/content/search/products/advanced`, headers: t(), searchParams: { keyword: `新品`, moreToken: n }, json: {} }),
    i = {
        path: `/cn/new`,
        categories: [`shopping`],
        example: `/ikea/cn/new`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`ikea.cn/cn/zh/new/`, `ikea.cn/`] }],
        name: `中国 - 当季新品推荐`,
        maintainers: [`jzhangdev`],
        handler: a,
        url: `ikea.cn/cn/zh/new/`,
    };
async function a() {
    let e = [],
        t = async ({ moreToken: n }) => {
            let { data: i } = await r({ moreToken: n });
            (e.push(i.productSummaries), i.moreToken && (await t({ moreToken: i.moreToken })));
        };
    return (await t({}), { title: `IKEA 宜家 - 当季新品推荐`, link: `https://www.ikea.cn/cn/zh/new/`, description: `当季新品推荐`, item: e.flat().map((e) => n(e)) });
}
export { i as route };
