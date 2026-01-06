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
    path: `/forum/:id?`,
    categories: [`bbs`],
    example: `/right/forum/31`,
    parameters: { id: `板块 id，可在板块页 URL 中找到，默认为新手入门及其它(硬件)` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `板块`,
    maintainers: [`nczitzk`],
    handler: o,
};
async function o(a) {
    let o = a.req.param(`id`) ?? `31`,
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 20,
        c = `https://www.right.com.cn`,
        l = `${c}/forum/forum-${o}-1.html`,
        u = i((await n({ method: `get`, url: l })).data);
    u(`a[title="隐藏置顶帖"]`).each(function () {
        u(this).parents(`tbody`).remove();
    });
    let d = u(`.s`)
        .slice(0, s)
        .toArray()
        .map((e) => ((e = u(e)), { title: e.text(), link: `${c}/forum/${e.attr(`href`)}` }));
    return (
        (d = await Promise.all(
            d.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data);
                    return (
                        e(`.pstatus`).remove(),
                        (a.author = e(`.authi`).first().text()),
                        (a.description = e(`.t_f`).first().html()),
                        (a.pubDate = r(t(e(`.authi em`).first().text().replace(`发表于 `, ``)), 8)),
                        (a.category = e(`.ptg a`)
                            .toArray()
                            .map((t) => e(t).text())),
                        a
                    );
                })
            )
        )),
        { title: `${u(`.xs2 a`).text()} - 恩山无线论坛`, link: l, item: d }
    );
}
export { a as route };
