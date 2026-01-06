import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: [`/search/:filter?/:needDetails?`, `/:filter?/:needDetails?`],
    categories: [`picture`],
    example: `/wallhaven/search/categories=110&purity=110&sorting=date_added&order=desc`,
    parameters: { filter: `Filter, empty by default`, needDetails: 'Need Details, `true`/`yes` as yes, no by default' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`wallhaven.cc/`] }],
    name: `Search`,
    maintainers: [`nczitzk`, `Fatpandac`],
    handler: a,
    url: `wallhaven.cc/`,
    description:
        '::: tip\n  Subscribe pages starting with `https://wallhaven.cc/search`, fill the text after `?` as `filter` in the route. The following is an example:\n\n  The text after `?` is `q=id%3A711&sorting=random&ref=fp&seed=8g0dgd` for [Wallpaper Search: #landscape - wallhaven.cc](https://wallhaven.cc/search?q=id%3A711&sorting=random&ref=fp&seed=8g0dgd), so the route is [/wallhaven/q=id%3A711&sorting=random&ref=fp&seed=8g0dgd](https://rsshub.app/wallhaven/q=id%3A711&sorting=random&ref=fp&seed=8g0dgd)\n:::',
};
async function a(i) {
    let a = i.req.param(`filter`) ?? `latest`,
        o = /t|y/i.test(i.req.param(`needDetails`) ?? `false`),
        s = `https://wallhaven.cc/${a.indexOf(`=`) > 0 ? `search?${a.replaceAll(/page=\d+/g, `page=1`)}` : a}`,
        c = r((await n.get(s)).data),
        l = c(`li > figure.thumb`)
            .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 24)
            .toArray()
            .map((e) => ({
                title: c(e).find(`img.lazyload`).attr(`data-src`).split(`/`).pop(),
                description: c(e)
                    .html()
                    .match(/<img.*?>/)[0],
                link: c(e).find(`a.preview`).attr(`href`),
            }));
    return (
        o &&
            (l = await Promise.all(
                l.map((i) =>
                    e.tryGet(i.link, async () => {
                        let e = r((await n({ method: `get`, url: i.link })).data);
                        return (
                            (i.title = e(`meta[name="title"]`).attr(`content`)),
                            (i.author = e(`.username`).text()),
                            (i.pubDate = t(e(`time`).attr(`datetime`))),
                            (i.category = e(`.tagname`)
                                .toArray()
                                .map((t) => e(t).text())),
                            (i.description = e(`div.scrollbox`).html()),
                            i
                        );
                    })
                )
            )),
        { title: c(`title`).text(), link: s, item: l }
    );
}
export { i as route };
