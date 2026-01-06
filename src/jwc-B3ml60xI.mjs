import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `http://www.jwc.zjut.edu.cn/`,
    o = {
        path: `/jwc/:type`,
        categories: [`university`],
        example: `/zjut/jwc/1839`,
        parameters: { type: `分类，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `浙江工业大学教务处`,
        maintainers: [`zhullyb`],
        url: `www.jwc.zjut.edu.cn`,
        handler: s,
        radar: [{ source: [`www.jwc.zjut.edu.cn/:type/list.htm`], target: `/jwc/:type` }],
        description: `| 板块 | 参数 |
| ------- | ------- |
| 新闻动态 | 1838 |
| 课程思政 | 1842 |
| 校内动态 | 2613 |
| 学习思考 | 2614 |
| 成果展示 | 2615 |
| 媒体聚焦 | 2616 |
| 制度文件 | 2617 |
| 教学运行 | 1849 |
| 实践竞赛 | 1850 |
| 留学生Notice | 1851 |
| 项目申报 | 1852 |
| 学籍管理 | 1853 |
| 办事指南 | 1839 |`,
    };
async function s(o) {
    let s = Number.parseInt(o.req.param(`type`)),
        c = i(await e(a + s + `/list.htm`)),
        l = c(`.news.clearfix`)
            .toArray()
            .map((e) => {
                let t = c(e),
                    i = t.find(`a`);
                try {
                    let e = i.attr(`title`) || ``,
                        o = i.attr(`href`);
                    o ? o.startsWith(`http`) || (o = a.slice(0, -1) + o) : (o = ``);
                    let s = r(n(t.find(`.news_meta`).text()), 8);
                    return { title: e, link: o, pubDate: s };
                } catch {
                    return { title: ``, link: ``, pubDate: Date.now() };
                }
            })
            .filter((e) => e.title && e.link),
        u = await Promise.all(
            l.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = { ...n, description: `` };
                    return (
                        new URL(n.link).hostname === `www.jwc.zjut.edu.cn`
                            ? new URL(n.link).pathname.startsWith(`/_upload`)
                                ? (t.description = n.link)
                                : (t.description = i(await e(n.link))(`.wp_articlecontent`).html() || ``)
                            : (t.description = n.link),
                        t
                    );
                })
            )
        );
    return { title: c(`head > title`).text() + ` - 浙江工业大学教务处`, link: a + s + `/list.htm`, item: u };
}
export { o as route };
