import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { n as t, t as n } from './utils-DS_1vX2H.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/reviews/:type?`,
    categories: [`new-media`],
    example: `/dcfever/reviews/cameras`,
    parameters: { type: '分類，預設為 `cameras`' },
    radar: [{ source: [`dcfever.com/:type/reviews.php`], target: `/reviews/:type` }],
    name: `測試報告`,
    maintainers: [`TonyRL`],
    handler: a,
    description: `| 相機及鏡頭 | 手機平板 | 試車報告 |
| ---------- | -------- | -------- |
| cameras    | phones   | cars     |`,
};
async function a(i) {
    let { type: a = `cameras` } = i.req.param(),
        o = `${n}/${a}/reviews.php`,
        s = r(await e(o)),
        c = s(`.col-md-left .title a`)
            .toArray()
            .map((e) => ((e = s(e)), { title: e.text(), link: new URL(e.attr(`href`), o).href })),
        l = await Promise.all(c.map((e) => t(e)));
    return { title: s(`head title`).text(), link: o, image: `https://cdn10.dcfever.com/images/android_192.png`, item: l };
}
export { i as route };
