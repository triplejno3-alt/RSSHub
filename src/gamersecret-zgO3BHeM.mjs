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
    path: `/:type?/:category?`,
    categories: [`game`],
    example: `/gamersecret`,
    parameters: { type: `Type, see below, Latest News by default`, category: `Category, see below` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gamersecret.com/:type`, `gamersecret.com/:type/:category`, `gamersecret.com/`] }],
    name: `Category`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| Latest News | PC | Playstation | Nintendo | Xbox | Moblie |
| ----------- | -- | ----------- | -------- | ---- | ------ |
| latest-news | pc | playstation | nintendo | xbox | moblie |

  Or

| GENERAL          | GENERAL EN         | MOBILE          | MOBILE EN         |
| ---------------- | ------------------ | --------------- | ----------------- |
| category/general | category/generalen | category/mobile | category/mobileen |

| NINTENDO          | NINTENDO EN         | PC          | PC EN         |
| ----------------- | ------------------- | ----------- | ------------- |
| category/nintendo | category/nintendoen | category/pc | category/pcen |

| PLAYSTATION          | PLAYSTATION EN         | REVIEWS          |
| -------------------- | ---------------------- | ---------------- |
| category/playstation | category/playstationen | category/reviews |

| XBOX          | XBOX EN         |
| ------------- | --------------- |
| category/xbox | category/xboxen |`,
};
async function o(a) {
    let o = a.req.param(`type`) ?? `latest-news`,
        s = a.req.param(`category`) ?? ``,
        c = `https://www.gamersecret.com/${o}${s ? `/${s}` : ``}`,
        l = i((await n({ method: `get`, url: c })).data),
        u = l(`.jeg_post_title a`)
            .slice(0, a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 20)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.text(), link: e.attr(`href`) }));
    return (
        (u = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = await n({ method: `get`, url: a.link }),
                        o = i(e.data);
                    return (
                        o(`img`).each(function () {
                            o(this).attr(`src`, o(this).attr(`data-src`));
                        }),
                        (a.author = o(`.jeg_meta_author`).text().replace(/by/, ``)),
                        (a.pubDate = r(t(e.data.match(/datePublished":"(.*)","dateModified/)[1]), 8)),
                        (a.description = o(`.thumbnail-container`).html() + o(`.elementor-text-editor, .content-inner`).html()),
                        a
                    );
                })
            )
        )),
        { title: l(`title`).text(), link: c, item: u }
    );
}
export { a as route };
