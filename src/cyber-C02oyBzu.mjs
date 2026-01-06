import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/cyber/tzgg`,
    categories: [`university`],
    example: `/seu/cyber/tzgg`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cyber.seu.edu.cn/tzgg/list.htm`, `cyber.seu.edu.cn/`] }],
    name: `网络空间安全学院 - 通知公告`,
    maintainers: [`shrugginG`],
    handler: a,
    description: `东南大学网络空间安全学院通知公告`,
};
async function a() {
    let i = `https://cyber.seu.edu.cn`,
        a = `${i}/tzgg/list.htm`,
        { data: o } = await n(a),
        s = r(o),
        c = s(`#wp_news_w6 ul.wp_article_list li.list_item`)
            .toArray()
            .map((e) => {
                let n = s(e),
                    r = n.find(`.Article_Title a`),
                    a = r.text().trim(),
                    o = r.attr(`href`),
                    c = n.find(`.Article_PublishDate`).text().trim();
                return { title: a, link: new URL(o || ``, i).href, pubDate: t(c), description: `` };
            });
    return {
        link: a,
        title: `东南大学网络空间安全学院 - 通知公告`,
        description: `东南大学网络空间安全学院通知公告RSS`,
        item: await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    try {
                        let e = r((await n(t.link)).data);
                        return ((t.description = e(`.wp_articlecontent`).html() || e(`.article-content`).html() || e(`.main-text`).html() || e(`article`).html() || ``), t);
                    } catch {
                        return t;
                    }
                })
            )
        ),
    };
}
export { i as route };
