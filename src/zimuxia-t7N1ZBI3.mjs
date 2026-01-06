import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/:category?`,
    categories: [`multimedia`],
    example: `/zimuxia`,
    parameters: { category: `分类，见下表，默认为 ALL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `分类`,
    maintainers: [`nczitzk`],
    handler: i,
    description: `| ALL | FIX 德语社 | 欧美剧集 | 欧美电影 | 综艺 & 纪录 | FIX 日语社 | FIX 韩语社 | FIX 法语社 |
| --- | ---------- | -------- | -------- | ----------- | ---------- | ---------- | ---------- |
|     | 昆仑德语社 | 欧美剧集 | 欧美电影 | 综艺纪录    | fix 日语社 | fix 韩语社 | fix 法语社 |`,
};
async function i(r) {
    let i = r.req.param(`category`),
        a = await t({ method: `get`, url: `https://www.zimuxia.cn/我们的作品`, searchParams: { cat: i ?? void 0 }, https: { rejectUnauthorized: !1 } }),
        o = n(a.data),
        s = o(`.pg-item a`)
            .toArray()
            .map((e) => ((e = o(e)), { title: e.find(`h2`).text(), link: e.attr(`href`) })),
        c = await Promise.all(
            s.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = await t({ method: `get`, url: r.link, https: { rejectUnauthorized: !1 } }),
                        i = n(e.data),
                        a = e.data.match(/<a href="magnet:(.*?)" target="_blank">磁力下载<\/a>/g);
                    return (
                        a && ((r.enclosure_type = `application/x-bittorrent`), (r.enclosure_url = decodeURIComponent(a.pop().match(/<a href="(.*)" target="_blank">磁力下载<\/a>/)[1]))),
                        (r.description = i(`.content-box`).html()),
                        r
                    );
                })
            )
        );
    return { title: `${i || `ALL`} - FIX字幕侠`, link: a.url, item: c };
}
export { r as route };
