import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
import r from 'iconv-lite';
const i = {
    path: `/:id`,
    categories: [`anime`],
    example: `/laimanhua/tiandikangzhanjiVERSUS`,
    parameters: { id: `漫画 ID，可在 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`www.laimanhua8.com/kanmanhua/:id`] }],
    name: `漫画列表`,
    maintainers: [`TonyRL`],
    handler: a,
};
async function a(i) {
    let a = i.req.param(`id`),
        o = `https://www.laimanhua8.com`,
        s = `${o}/kanmanhua/${a}/`,
        { data: c } = await t(s, { responseType: `buffer` }),
        l = n(r.decode(c, `utf-8`)),
        u = l(`meta[http-equiv="Content-Type"]`)
            .attr(`content`)
            ?.match(/charset=(.*)/)?.[1];
    u?.toLowerCase() !== `utf-8` && (l = n(r.decode(c, u ?? `utf-8`)));
    let d = l(`.plist a`)
        .toArray()
        .map(
            (t, n) => (
                (t = l(t)),
                {
                    title: t.attr(`title`),
                    link: `${o}${t.attr(`href`)}`,
                    pubDate: n === 0 ? e(l(`head meta[property="og:novel:update_time"]`).attr(`content`)) : null,
                    author: l(`head meta[property="og:novel:author"]`).attr(`content`),
                }
            )
        );
    return { title: `${l(`head meta[property="og:novel:book_name"]`).attr(`content`)} - 来漫画`, description: l(`.introduction`).text(), image: l(`head meta[property="og:image"]`).attr(`content`), link: s, item: d };
}
export { i as route };
