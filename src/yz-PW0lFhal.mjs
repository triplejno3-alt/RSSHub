import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/yz/:category?`,
    categories: [`university`],
    example: `/xjtu/yz/zsdt`,
    parameters: { category: '栏目类型，默认请求`zsdt`，详见下方表格' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yz.xjtu.edu.cn/index/:category.htm`], target: `/yz/:category` }],
    name: `研究生招生信息网`,
    maintainers: [`YoghurtGuy`],
    handler: s,
    description: `栏目类型

| 招生动态 | 通知公告 | 政策法规 | 招生统计 | 历年复试线 | 博士招生 | 硕士招生 | 推免生 | 其他招生 |
| -------- | -------- | -------- | -------- | ---------- | -------- | -------- | ------ | -------- |
| zsdt     | tzgg     | zcfg     | zstj     | lnfsx      | bszs     | sszs     | tms    | qtzs     |`,
};
async function s(o) {
    let { category: s = `zsdt` } = o.req.param(),
        c = `https://yz.xjtu.edu.cn`,
        l = a(await e(`${c}/index/${s}.htm`)),
        u = l(`div.list-con ul li`)
            .toArray()
            .map((e) => {
                let t = l(e),
                    n = t.find(`a`);
                return { title: n.attr(`title`), link: new URL(n.attr(`href`), c).href, pubDate: i(r(t.find(`span.date.fr`).text()), 8) };
            });
    return {
        title: `西安交通大学研究生招生信息网`,
        link: `https://yz.xjtu.edu.cn`,
        item: await Promise.all(
            u.map((r) =>
                n.tryGet(r.link, async () => {
                    try {
                        let t = a(await e(r.link));
                        return ((r.description = t(`#vsb_content`).html() + (t(`form ul`).length > 0 ? t(`form ul`).html() : ``)), r);
                    } catch (e) {
                        return (t.error(`Fetch failed for ${r.link}:`, e), r);
                    }
                })
            )
        ),
    };
}
export { o as route };
