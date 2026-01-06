import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './timezone-CrV-DT8S.mjs';
import { load as n } from 'cheerio';
async function r(r) {
    let i = r.req.param(`type`) ?? `5`,
        a = `https://infonews.nycu.edu.tw/index.php?SuperType=${i}&action=more&pagekey=1&categoryid=all`,
        o = await e(a, { parseResponse: n }),
        s =
            Object.fromEntries(
                o(`#masterMenu1 #option li a`)
                    .toArray()
                    .slice(1, -1)
                    .map((e) => [new URLSearchParams((o(e).attr(`href`) || ``).replace(`index.php`, ``)).get(`SuperType`), o(e).text().replaceAll(/\s+/g, ``)])
            )[i] || `未知分類`,
        c = o(`.category-style tr .style2`)
            .toArray()
            .map((e) => {
                let n = o(e).parent().next().find(`td`).text().split(`-`)[0]?.trim();
                return { title: o(e).attr(`title`)?.trim() || ``, link: o(e).find(`a`).attr(`href`) || ``, pubDate: n ? t(n, 8) : void 0 };
            });
    return { title: `陽明交大交大校園公告 - ${s}`, description: `國立陽明交通大學校園公告 - ${s}`, language: `zh-TW`, link: a, item: c };
}
const i = {
    name: `校園公告`,
    categories: [`university`],
    maintainers: [`simbafs`],
    description: `|   名稱   | :type |
| :------: | :---: |
| 行政公告 |   5   |
| 演講課程 |   6   |
| 藝文體育 |   7   |
| 校園徵才 |   9   |
| 其他活動 |   8   |
| 電子公文 |   3   |
| 校外訊息 |  10   |`,
    path: `/announcement/:type`,
    parameters: { type: `類型，見下表` },
    example: `/nycu/announcement/5`,
    handler: r,
};
export { i as route };
