import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/release/:version?`,
    categories: [`programming`],
    example: `/mysql/release/8.0`,
    parameters: { version: `Version, see below, 8.0 by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Release Notes`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| 8.0 | 5.7 | 5.6 |
| --- | --- | --- |`,
};
async function a(i) {
    let a = `https://dev.mysql.com/doc/relnotes/mysql/${i.req.param(`version`) ?? `8.0`}/en/`,
        o = r((await n({ method: `get`, url: a, headers: { 'user-agent': e.trueUA } })).data),
        s = o(`dt span a`)
            .slice(1, -1)
            .toArray()
            .map((e) => ((e = o(e)), { title: e.text(), link: `${a}${e.attr(`href`)}` }));
    return (
        (s = await Promise.all(
            s.map((i) =>
                t.tryGet(i.link, async () => {
                    let t = r((await n({ method: `get`, url: i.link, headers: { 'user-agent': e.trueUA } })).data);
                    return (t(`.indexterm`).remove(), t(`.titlepage`).first().remove(), t(`.itemizedlist`).first().remove(), (i.description = t(`#docs-body .section`).html()), i);
                })
            )
        )),
        { title: o(`title`).text(), link: a, item: s }
    );
}
export { i as route };
