import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/ygafz/:type?`,
    categories: [`university`],
    example: `/sysu/ygafz`,
    parameters: { type: '分类，见下表，默认为 `notice`' },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ygafz.sysu.edu.cn/:type?`] }],
    name: `粤港澳发展研究院`,
    description: `| 人才招聘   | 人才培养      | 新闻动态 | 通知公告 | 专家观点 |
| ---------- | ------------- | -------- | -------- | -------- |
| jobopening | personnelplan | news     | notice   | opinion  |

| 研究成果 | 研究论文 | 学术著作 | 形势政策 |
| -------- | -------- | -------- | -------- |
| results  | papers   | writings | policy   |`,
    maintainers: [`TonyRL`],
    handler: a,
};
async function a(i) {
    let { type: a = `notice` } = i.req.param(),
        o = `https://ygafz.sysu.edu.cn`,
        s = `${o}/${a}`,
        c = r(await e(s)),
        l = c(`.list-content a`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.find(`p`).text(), link: `${o}${e.attr(`href`)}`, pubDate: n(e.find(`.date`).text()) })),
        u = await Promise.all(
            l.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link));
                    return (
                        (n.author = t(`.article-submit`)
                            .text()
                            .match(/发布人：(.*)/)[1]),
                        (n.description = t(`div[data-block-plugin-id="entity_field:node:body"]`).html() + (t(`div[data-block-plugin-id="entity_field:node:attachments"]`).html() ?? ``)),
                        n
                    );
                })
            )
        );
    return { title: c(`title`).text(), link: s, item: u };
}
export { i as route };
