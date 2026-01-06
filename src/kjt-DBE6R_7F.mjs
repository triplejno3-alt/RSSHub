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
    path: `/shaanxi/kjt/:id?`,
    categories: [`government`],
    example: `/gov/shaanxi/kjt`,
    parameters: { id: `分类，见下表，默认为通知公告` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `省科学技术厅`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| 科技头条 | 工作动态 | 基层科技 | 科技博览 | 媒体聚焦 | 通知公告 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 1061     | 24       | 27       | 25       | 28       | 221      |`,
};
async function o(a) {
    let o = a.req.param(`id`) ?? `221`,
        s = `https://kjt.shaanxi.gov.cn`,
        c = `${s}/view/iList.jsp?cat_id=${o}`,
        l = i((await n({ method: `get`, url: c })).data),
        u = l(`.textlist li a`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.text(), link: `${s}${e.attr(`href`)}`, pubDate: t(e.prev().text()) }));
    return (
        (u = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data);
                    return ((a.description = e(`.info_content`).html()), (a.author = e(`meta[name="Author"]`).attr(`content`)), (a.pubDate = r(t(e(`meta[name="PubDate"]`).attr(`content`)), 8)), a);
                })
            )
        )),
        { title: `陕西省科学技术厅 - ${l(`.catnm`).text()}`, link: c, item: u }
    );
}
export { a as route };
