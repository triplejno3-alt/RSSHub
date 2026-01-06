import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as n } from './util-GgHyLnNT.mjs';
const r = { path: `/interactive-graphics`, categories: [`traditional-media`], example: `/zaobao/interactive-graphics`, name: `互动新闻`, maintainers: [`shunf4`], handler: i };
async function i() {
    let r = `https://www.zaobao.com.sg`,
        i = await e(`${r}/_plat/api/v2/page-content/interactive-graphics`),
        a = i.response.articles.map((e) => ({ title: e.title, description: e.summary, link: new URL(e.href, r).href, pubDate: t(e.timestamp, `X`), image: e.thumbnail }));
    return { title: i.seoMetaInfo.seoTitle, link: r + `/interactive-graphics`, description: i.seoMetaInfo.seoDescription, image: n, item: a };
}
export { r as route };
