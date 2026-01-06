import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = { path: `/latest`, categories: [`blog`], example: `/latest`, radar: [{ source: [`towardsdatascience.com/`] }], name: `Towards Data Science`, maintainers: [`mintyfrankie`], url: `towardsdatascience.com/latest`, handler: a };
async function a() {
    let i = await e(`https://medium.com/towards-data-science/latest?posts=true`, { headers: { accept: `application/json` } }),
        a = JSON.parse(i.slice(16)),
        o = a.payload.posts.map((e) => ({
            title: e.title,
            link: `https://towardsdatascience.com/${e.uniqueSlug}`,
            freediumLink: `https://freedium.cfd/https://towardsdatascience.com/${e.uniqueSlug}`,
            author: a.payload.references.User[e.creatorId].name,
            pubDate: n(e.createdAt),
        }));
    return {
        title: `Towards Data Science - Latest`,
        language: `en`,
        description: `Latest articles from Towards Data Science`,
        link: `https://towardsdatascience.com/latest`,
        item: await Promise.all(
            o.map((n) =>
                t.tryGet(
                    n.freediumLink,
                    async () => (
                        (n.description = r(await e(n.freediumLink))(`div.main-content`)
                            .first()
                            .html()),
                        n
                    )
                )
            )
        ),
    };
}
export { i as route };
