import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/nic/:category?`,
    name: `网络信息中心`,
    url: `nic.hrbust.edu.cn`,
    maintainers: [`cscnk52`],
    handler: s,
    example: `/hrbust/nic`,
    parameters: { category: `栏目标识，默认为 3988（新闻动态）` },
    description: `| 服务指南 | 常见问题 | 新闻动态 | 通知公告 | 国家政策法规 | 学校规章制度 | 部门规章制度 | 宣传教育 | 安全法规 |
|----------|----------|----------|----------|--------------|--------------|--------------|----------|----------|
| 3982     | 3983     | 3988     | 3989     | 3990         | 3991         | 3992         | 3993     | 3994     |`,
    categories: [`university`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, supportRadar: !0 },
    radar: [
        { source: [`nic.hrbust.edu.cn/:category/list.htm`], target: `/nic/:category` },
        { source: [`nic.hrbust.edu.cn/`], target: `/nic/` },
    ],
    view: i.Notifications,
};
async function s(i) {
    let o = `https://nic.hrbust.edu.cn/`,
        { category: s = 3988 } = i.req.param(),
        c = `${o}${s}/list.htm`,
        l = a(await e(c)),
        u = l(`li.col_title`).text(),
        d = l(`ul.news_list.list2 li`)
            .toArray()
            .map((e) => {
                let t = l(e),
                    i = t.find(`a`).text().trim(),
                    a = new URL(t.find(`a`).attr(`href`), o).href,
                    s = t.find(`span.news_meta`).text().trim();
                return { title: i, pubDate: s ? r(n(s), 8) : null, link: a };
            }),
        f = await Promise.all(
            d.map((n) =>
                t.tryGet(n.link, async () => {
                    if (!n.link.startsWith(o)) return ((n.description = `本文需跳转，请点击原文链接后阅读`), n);
                    let t = a(await e(n.link));
                    n.author = t(`span.arti_publisher`).text().replace(`发布者：`, ``).trim();
                    let r = t(`div.wp_articlecontent`);
                    return (r.find(`[style]`).removeAttr(`style`), r.find(`font`).contents().unwrap(), r.html(r.html()?.replaceAll(`&nbsp;`, ``)), r.find(`[align]`).removeAttr(`align`), (n.description = r.html()), n);
                })
            )
        );
    return { title: `${u} - 哈尔滨理工大学网络信息中心`, link: c, language: `zh-CN`, item: f };
}
export { o as route };
