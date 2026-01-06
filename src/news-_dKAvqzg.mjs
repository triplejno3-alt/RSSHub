import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/news/:language?`,
    categories: [`new-media`],
    example: `/kaopu/news/zh-hans`,
    parameters: { language: `语言` },
    radar: [{ source: [`kaopu.news/`] }],
    name: `全部`,
    maintainers: [`fashioncj`],
    description: `| 简体中文    | 繁体中文     |
| ------- | -------- |
| zh-hans | zh-hant | `,
    handler: r,
};
async function r(n) {
    let { language: r } = n.req.param(),
        i = `https://kaopu.news/${r === `zh-hant` ? `zh-hant` : `index`}.html`,
        a = (await t({ method: `get`, url: `https://kaopustorage.blob.core.windows.net/jsondata/news_list_beta_han${r === `zh-hant` ? `t` : `s`}_0.json` })).data.map((t) => ({
            link: t.link,
            title: t.title,
            author: t.publisher,
            pubDate: e(t.pubDate),
            description: `<p>${t.description}</p>`,
        }));
    return { title: r === `zh-hant` ? `靠譜新聞` : `靠谱新闻`, link: i, item: a };
}
export { n as route };
