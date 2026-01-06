import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = `https://research.google`,
    a = {
        path: `/research`,
        categories: [`blog`],
        example: `/google/research`,
        name: `Research Blog`,
        maintainers: [`Levix`, `cscnk52`],
        radar: [{ source: [`research.google`] }],
        handler: async () => {
            let a = r(await e(`${i}/blog`)),
                o = a(`div.js-configurable-list .blog-posts-grid__cards .glue-grid__col`)
                    .toArray()
                    .map((e) => {
                        let t = a(e),
                            r = t.find(`a`).first();
                        return {
                            title: r.find(`.headline-5`).text(),
                            link: `${i}${r.attr(`href`)}`,
                            pubDate: n(t.find(`.glue-label.glue-spacer-1-bottom`).text()),
                            author: `Google`,
                            category: t
                                .find(`.not-glue.caption`)
                                .toArray()
                                .map((e) => a(e).text().replace(`·`, ``).trim()),
                        };
                    }),
                s = await Promise.all(o.map((n) => t.tryGet(n.link, async () => ((n.description = r(await e(n.link))(`.blog-detail-wrapper.js-gt-blog-detail-wrapper`).html()), n))));
            return { title: `Google Research Blog`, link: `${i}/blog`, item: s };
        },
    };
export { a as route };
