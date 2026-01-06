import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = new URL(`https://tailwindcss.com/`),
    i = async (t) => n(await e(t, { responseType: `text` }))(`article.prose`).html() ?? ``,
    a = async (a) => {
        let o = new URL(`/feeds/atom.xml`, r).href,
            s = n(await e(o, { responseType: `text` }), { xml: !0 }),
            c = await Promise.all(
                s(`entry`)
                    .toArray()
                    .slice(0, a)
                    .map((e) => {
                        let n = s(e).find(`title`).text(),
                            r = s(e).find(`id`).text(),
                            a = s(e).find(`link[href]`).attr(`href`),
                            o = s(e).find(`link[rel="enclosure"]`).attr(`href`);
                        if (a === void 0) throw Error(`No article URL found for article with id ${r}`);
                        return t.tryGet(`tailwindcss:${r}`, async () => ({
                            title: n,
                            link: a,
                            image: o,
                            description: await i(a),
                            author: s(e)
                                .find(`author`)
                                .toArray()
                                .map((e) => ({ name: s(e).find(`name`).text(), url: s(e).find(`url`).text() })),
                            pubDate: s(e).find(`updated`).text(),
                            guid: s(e).find(`id`).text(),
                        }));
                    })
            );
        return {
            title: s(`feed > title`).text(),
            item: c,
            author: s(`feed > author > name`).text(),
            logo: s(`feed > logo`).text(),
            icon: s(`feed > icon`).text(),
            description: s(`feed > subtitle`).text(),
            link: s(`feed > link[rel="alternate"]`).attr(`href`),
        };
    },
    o = (e) => a(Number.parseInt(e.req.query(`limit`) || `10`)),
    s = {
        path: `/blog`,
        categories: [`programming`],
        example: `/tailwindcss/blog`,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Blog`,
        maintainers: [`goestav`],
        handler: o,
    };
export { o as handler, s as route };
