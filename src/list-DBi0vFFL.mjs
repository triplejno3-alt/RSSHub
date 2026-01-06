import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `http://cec.hrbeu.edu.cn`,
    a = {
        path: `/cec/:id`,
        categories: [`university`],
        example: `/hrbeu/cec/tzgg`,
        parameters: { id: '栏目编号，由 `URL` 中获取。' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`cec.hrbeu.edu.cn/:id/list.htm`] }],
        name: `航天与建筑工程学院`,
        maintainers: [`tsinglinrain`],
        handler: o,
        description: `汉语拼音和中文不对应，猜测后三个为：教务工作、科研成果、学生工作的拼音。

| 新闻动态 | 通知公告 | 综合办公 | 教务动态 | 科研动态 | 学工动态 |
| :------: | :------: |:------: | :------: | :------: | :------: |
|   xwdt   |   tzgg   |  zhbg   |   jxgz   |   kycg   |   xsgz   |`,
    };
async function o(a) {
    let o = a.req.param(`id`),
        s = r((await n(`${i}/${o}/list.htm`, { headers: { Referer: i } })).data),
        c = s(`div.column-news-box`).find(`h2.column-title`).text().replaceAll(/[\s·]/g, ``).trim(),
        l = s(`a.column-news-item`)
            .toArray()
            .map((e) => {
                let n = s(e).attr(`href`);
                return (n && n.includes(`page.htm`) && (n = `${i}${n}`), { title: s(e).find(`span.column-news-title`).text().trim(), pubDate: t(s(e).find(`span.column-news-date`).text()), link: n });
            }),
        u = await Promise.all(
            l.map((t) => e.tryGet(t.link, async () => (t.link.includes(`page.htm`) ? (t.description = r((await n(t.link)).data)(`div.wp_articlecontent`).html()) : (t.description = `本文需跳转，请点击标题后阅读`), t)))
        );
    return { title: `航天与建筑工程学院 - ` + c, link: `${i}/${o}/list.htm`, item: u };
}
export { a as route };
