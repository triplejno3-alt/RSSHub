import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/news/:category`,
    categories: [`government`],
    example: `/scpta/news/33`,
    parameters: { category: { description: '分类ID，默认为`33`(工作动态)', default: `33` } },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.scpta.com.cn/front/News/List`], target: `/news` }],
    name: `通知公告`,
    maintainers: [`Yeye-0426`],
    handler: a,
    description: `| 分类                 | category_id |
|----------------------|-------------|
| 工作动态             | 33          |
| 公务员考试           | 56          |
| 专业技术人员资格考试 | 57          |
| 事业单位考试         | 67          |
| 其它                 | 72          |`,
};
async function a(i) {
    let a = i.req.param(`category`),
        o = `https://www.scpta.com.cn`,
        s = `${o}/front/News/List/${a}`,
        c = r((await n(s)).data),
        l = c(`div.wrap-content li`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.find(`a`).attr(`title`), link: `${o}${e.find(`a`).attr(`href`)}`, pubDate: t(e.find(`span`).text().trim()) })),
        u = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = ``;
                    try {
                        e = r((await n(t.link)).data)(`div.wrap-content.news-content`).html();
                    } catch {
                        e = `公告内容获取失败`;
                    }
                    return ((t.description = e), t);
                })
            )
        );
    return { title: `通知公告 - ${{ 33: `工作动态`, 56: `公务员考试`, 57: `专业技术人员资格考试`, 67: `事业单位考试`, 72: `其它` }[a] || `未知分类`}`, link: s, item: u };
}
export { i as route };
