import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/bs/:category?`,
    categories: [`university`],
    example: `/bnu/bs`,
    parameters: { category: `分类，见下表，默认为学院新闻` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bs.bnu.edu.cn/:category/index.html`], target: `/bs/:category` }],
    name: `经济与工商管理学院`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| 学院新闻 | 通知公告 | 学术成果 | 学术讲座 | 教师观点 | 人才招聘 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| xw       | zytzyyg  | xzcg     | xzjz     | xz       | bshzs    |`,
};
async function a(i) {
    let a = i.req.param(`category`) ?? `xw`,
        o = `http://bs.bnu.edu.cn`,
        s = `${o}/${a}/index.html`,
        c = r((await n({ method: `get`, url: s })).data),
        l = c(`a[title]`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.attr(`title`), pubDate: t(e.prev().text()), link: `${o}/${a}/${e.attr(`href`)}` })),
        u = await Promise.all(l.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n({ method: `get`, url: t.link })).data)(`.right-c-content-con`).html()), t))));
    return { title: `${c(`.right-c-title`).text()} - ${c(`title`).text()}`, link: s, item: u };
}
export { i as route };
