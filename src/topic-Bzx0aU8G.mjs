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
    path: `/topic/:category?`,
    categories: [`new-media`],
    example: `/chiculture/topic`,
    parameters: { category: `分类，见下表，默认为全部` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `議題熱話`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| 全部 | 現代中國 | 今日香港 | 全球化 | 一周時事通識 |
| ---- | -------- | -------- | ------ | ------------ |
|      | 76       | 479      | 480    | 379          |`,
};
async function o(a) {
    let o = a.req.param(`category`) || ``,
        s = `https://ls.chiculture.org.hk`,
        c = (await n({ method: `get`, url: `${s}/api/general-listing?lang=zh-hant&type=ssrh&category=${o}&page=1` })).data.data.map((e) => ({ title: e.title, pubDate: e.tags, link: `${s}${e.url}` })),
        l = await Promise.all(
            c.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = await n({ method: `get`, url: a.link }),
                        o = i(e.data),
                        s = e.data.match(/上載日期：(.*)<\/p>/);
                    if (s) a.pubDate = t(s[1]);
                    else if (a.title.includes(`一周時事通識`)) {
                        for (let e of a.pubDate)
                            if (/^\d{4}年$/.test(e.title)) {
                                a.pubDate = r(t(a.title.split(`- `)[1] ?? a.title.split(`-`)[1], `D/M`), 8);
                                break;
                            }
                    } else /^\d{4}年新聞回顧$/.test(a.title) ? (a.pubDate = t(`${a.title.split(`年`)[0]}-12-31`)) : (a.pubDate = ``);
                    return ((a.description = o(`#article_main_content`).html()), a);
                })
            )
        );
    return { title: `議題熱話 | 通識·現代中國`, link: `${s}/tc/hot-topics${o ? `?category=${o}` : ``}`, item: l };
}
export { a as route };
