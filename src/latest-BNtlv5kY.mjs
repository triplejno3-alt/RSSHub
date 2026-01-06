import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
import a from 'iconv-lite';
const o = {
    path: `/latest`,
    categories: [`other`],
    example: `/iqnew/latest`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`iqnew.com/post/new_100/`, `iqnew.com/`] }],
    name: `最近更新`,
    maintainers: [`nczitzk`],
    handler: s,
    url: `iqnew.com/post/new_100/`,
};
async function s(o) {
    let s = `https://www.iqnew.com`,
        c = s + `/post/new_100/`,
        l = await n({ method: `get`, url: c, responseType: `buffer` }),
        u = i(a.decode(l.data, `gb2312`)),
        d = u(`.page-main-list .list-item a`)
            .slice(0, o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 50)
            .toArray()
            .map((e) => ((e = u(e)), { link: s + e.attr(`href`) }));
    return {
        title: `爱Q生活网 - 最近更新`,
        link: c,
        item: await Promise.all(
            d.map((o) =>
                e.tryGet(o.link, async () => {
                    let e = await n({ method: `get`, url: o.link, responseType: `buffer` }),
                        s = i(a.decode(e.data, `gb2312`));
                    return (
                        (o.title = s(`.main-article .title`).text()),
                        (o.pubDate = r(t(s(`.time`).eq(0).text()), 8)),
                        (o.description = s(`.content-intro`).html()),
                        (o.author = s(`.author a`).text()),
                        (o.category = s(`.keyword > a`)
                            .toArray()
                            .map((e) => u(e).text())),
                        o
                    );
                })
            )
        ),
    };
}
export { o as route };
