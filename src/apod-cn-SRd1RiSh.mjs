import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/apod-cn`,
    categories: [`picture`],
    example: `/nasa/apod-cn`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`apod.nasa.govundefined`] }],
    name: `NASA 中文`,
    maintainers: [`nczitzk`, `williamgateszhao`],
    handler: r,
    url: `apod.nasa.govundefined`,
    description: `::: tip
  [NASA 中文](https://www.nasachina.cn/) 提供了每日天文图的中英双语图文说明，但在更新上偶尔略有一两天的延迟。
:::`,
};
async function r(n) {
    let { data: r } = await t({ method: `get`, url: `https://www.nasachina.cn/wp-json/wp/v2/posts?categories=2&per_page=${n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 10}` });
    return { title: `NASA中文 - 天文·每日一图`, link: `https://www.nasachina.cn/nasa-image-of-the-day`, item: r.map((t) => ({ title: t.title.rendered, description: t.content.rendered, pubDate: e(t.date_gmt), link: t.link })) };
}
export { n as route };
