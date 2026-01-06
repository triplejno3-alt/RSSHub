import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
const r = { name: `News`, example: `/dataguidance/news`, path: `/news`, radar: [{ source: [`www.dataguidance.com/info`] }], maintainers: [`harveyqiu`], handler: i, url: `https://www.dataguidance.com/info?article_type=news_post` };
async function i() {
    let r = (await e(`https://www.dataguidance.com/api/v1/kb/content/articles?news_types=510&news_types=511&news_types=512&news_types=513&order=DESC_publishedOn&limit=25&article_types=news_post`)).data.map((e) => ({
        title: e.title.en,
        link: `https://www.dataguidance.com${e.url}`,
        url: e.url,
        pubDate: n(e.publishedOn),
    }));
    return (
        (r = await Promise.all(
            r.map((n) =>
                t.tryGet(
                    n.link,
                    async () => (
                        (n.description = (await e(`https://www.dataguidance.com/api/v1/kb/content/articles/by_path?path=${n.url}`)).contentBody?.html.en.replaceAll(
                            `
`,
                            `<br>`
                        )),
                        delete n.url,
                        n
                    )
                )
            )
        )),
        { title: `Data Guidance News`, link: `https://www.dataguidance.com/info?article_type=news_post`, item: r }
    );
}
export { r as route };
