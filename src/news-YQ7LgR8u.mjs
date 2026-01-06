import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/news`,
    categories: [`programming`],
    example: `/duckdb/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `新闻`,
    maintainers: [`mocusez`],
    handler: o,
};
async function o() {
    let a = `https://duckdb.org/news/`,
        { data: o } = await n(a),
        s = i(o),
        c = s(`.postpreview`)
            .toArray()
            .map(
                (e) => (
                    (e = s(e)),
                    { title: e.find(`h3`).text().trim(), link: `https://duckdb.org${e.find(`a.blocklink`).attr(`href`)}`, pubDate: r(t(e.find(`.date`).text(), `YYYY-MM-DD`), 0), author: e.find(`.author`).text().trim() }
                )
            );
    return {
        title: `DuckDB News`,
        link: a,
        item: await Promise.all(
            c.map((t) =>
                e.tryGet(
                    t.link,
                    async () => (
                        (t.description = i((await n(t.link)).body)(`.contentwidth`)
                            .find(`h1, .infoline`)
                            .remove()
                            .end()
                            .html()),
                        t
                    )
                )
            )
        ),
    };
}
export { a as route };
