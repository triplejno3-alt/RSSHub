import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.aac.moj.gov.tw`,
    o = {
        path: `/moj/aac/news/:type?`,
        categories: [`government`],
        example: `/gov/moj/aac/news`,
        parameters: { type: `資料大類，留空為全部` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `最新消息`,
        maintainers: [`TonyRL`],
        handler: s,
        description: `| 全部 | 其他 | 採購公告 | 新聞稿 | 肅貪 | 預防 | 綜合 | 防疫專區 |
| ---- | ---- | -------- | ------ | ---- | ---- | ---- | -------- |
|      | 02   | 01       | 06     | 05   | 04   | 03   | 99       |`,
    };
async function s(o) {
    let s = o.req.param(`type`),
        c = `${a}/7204/7246/?Page=1&PageSize=40${s ? `&type=${s}` : ``}`,
        l = i((await n(c)).data);
    l(`.num`).remove();
    let u = l(`.list ul li a`)
            .toArray()
            .map((e) => {
                e = l(e);
                let t = /檔案下載/.test(e.attr(`title`));
                return { title: t ? e.text().trim() : e.attr(`title`), link: new URL(e.attr(`href`), a).href, isDownload: t };
            }),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    if (!a.isDownload) {
                        let e = i((await n(a.link)).data);
                        ((a.pubDate = r(t(e(`.info time`).attr(`datetime`), `YYYY-MM-DD HH:mm:ss`), 8)),
                            e(`.info, button`).remove(),
                            (a.description = e(`.cp`).html() + (e(`.lightbox_slider`).length ? e(`.lightbox_slider`).html() : ``) + (e(`.file_download`).length ? e(`.file_download`).html() : ``)));
                    }
                    return (delete a.isDownload, a);
                })
            )
        );
    return { title: l(`head title`).text(), link: c, item: d, language: `zh-TW` };
}
export { o as route };
