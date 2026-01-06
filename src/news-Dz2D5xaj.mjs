import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `http://www.rodong.rep.kp`,
    a = {
        path: `/news/:language?`,
        categories: [`traditional-media`],
        example: `/rodong/news`,
        parameters: { language: 'Language, see below, `ko` by default' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`rodong.rep.kp/cn/index.php`, `rodong.rep.kp/en/index.php`, `rodong.rep.kp/ko/index.php`, `rodong.rep.kp/cn`, `rodong.rep.kp/en`, `rodong.rep.kp/ko`], target: `/news` }],
        name: `News`,
        maintainers: [`TonyRL`],
        handler: o,
        url: `rodong.rep.kp/cn/index.php`,
        description: `| 조선어 | English | 中文 |
| ------ | ------- | ---- |
| ko     | en      | cn   |`,
    };
async function o(a) {
    let { language: o = `ko` } = a.req.param(),
        s = `${i}/${o}/index.php?MkBAMkAxQA==`,
        { data: c } = await n(s),
        l = r(c),
        u = l(`.date_news_list .row`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`.media-body`).text(), link: `${i}/${o}/${e.find(`.media-body a`).attr(`href`)}`, author: e.find(`.col-sm-3`).text(), pubDate: t(e.find(`.news_date`).text(), `YYYY.M.D.`) })),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link),
                        i = r(e);
                    return (i(`.news_Title, .NewsDetail, .News_Detail, #moveNews`).remove(), (t.description = i(`.col-sm-8`).html()), t);
                })
            )
        );
    return { title: l(`head title`).text(), description: l(`head meta[name="description"]`).attr(`content`), link: s, item: d };
}
export { a as route };
