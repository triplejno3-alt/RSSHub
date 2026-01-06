import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/lib/:category?`,
    name: `图书馆`,
    url: `lib.hrbust.edu.cn`,
    maintainers: [`cscnk52`],
    handler: s,
    example: `/hrbust/lib`,
    parameters: { category: `栏目标识，默认为 3421（公告消息）` },
    description: `| 公告消息 | 资源动态 | 参考中心 | 常用工具 | 外借服务 | 报告厅及研讨间服务 | 外文引进数据库 | 外文电子图书 | 外文试用数据库 | 中文引进数据库 | 中文电子图书 | 中文试用数据库 |
|----------|----------|----------|----------|----------|--------------------|----------------|--------------|----------------|----------------|--------------|----------------|
| 3421     | 3422     | ckzx     | cygj     | wjfw     | ytjfw              | yw             | yw_3392      | yw_3395        | zw             | zw_3391      | zw_3394        |`,
    categories: [`university`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, supportRadar: !0 },
    radar: [
        { source: [`lib.hrbust.edu.cn/:category/list.htm`], target: `/lib/:category` },
        { source: [`lib.hrbust.edu.cn`], target: `/lib` },
    ],
    view: i.Notifications,
};
async function s(i) {
    let o = `https://lib.hrbust.edu.cn/`,
        { category: s = 3421 } = i.req.param(),
        c = `${o}${s}/list.htm`,
        l = a(await e(c)),
        u = l(`span.Column_Anchor`).text(),
        d = l(`ul.tu_b3 li:not([class])`)
            .toArray()
            .map((e) => {
                let t = l(e),
                    i = new URL(t.find(`a`).attr(`href`), o).href,
                    a = t.find(`span`).text().trim(),
                    s = a ? r(n(a), 8) : null;
                return { title: t.find(`a`).text().trim(), pubDate: s, link: i };
            }),
        f = await Promise.all(
            d.map((n) =>
                t.tryGet(n.link, async () => {
                    if (!n.link.startsWith(o)) return ((n.description = `本文需跳转，请点击原文链接后阅读`), n);
                    let t = a(await e(n.link))(`div.wp_articlecontent`);
                    return (
                        t.find(`[style]`).removeAttr(`style`),
                        t.find(`font`).contents().unwrap(),
                        t.html(t.html()?.replaceAll(`&nbsp;`, ``)),
                        t.find(`[align]`).removeAttr(`align`),
                        { title: n.title, link: n.link, pubDate: n.pubDate, description: t.html() }
                    );
                })
            )
        );
    return { title: `${u} - 哈尔滨理工大学图书馆`, link: c, language: `zh-CN`, item: f };
}
export { o as route };
