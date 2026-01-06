import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://library.gxmzu.edu.cn/news/news_list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1010`,
    o = {
        path: `/libzxxx`,
        categories: [`university`],
        example: `/gxmzu/libzxxx`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`library.gxmzu.edu.cn/news/news_list.jsp`, `library.gxmzu.edu.cn/`] }],
        name: `图书馆最新消息`,
        maintainers: [`real-jiakai`],
        handler: s,
        url: `library.gxmzu.edu.cn/news/news_list.jsp`,
    };
async function s() {
    let o = await e(a);
    if (!o) return;
    let s = i(o),
        c = s(`#newslist ul li`)
            .toArray()
            .map((e) => ((e = s(e)), { title: e.find(`a`).text(), link: new URL(e.find(`a`).attr(`href`), `https://library.gxmzu.edu.cn`).href, pubDate: r(n(e.find(`span`).text(), `YYYY-MM-DD`), 8) }));
    return {
        title: `广西民族大学图书馆 -- 最新消息`,
        link: a,
        item: await Promise.all(
            c.map((n) =>
                t.tryGet(n.link, async () => {
                    if (n.link && !n.link.startsWith(`https://library.gxmzu.edu.cn/`)) return ((n.description = `该通知无法直接预览，请点击原文链接↑查看`), n);
                    let t = await e(n.link);
                    if (!t || (t.status >= 300 && t.status < 400)) n.description = `该通知无法直接预览，请点击原文链接↑查看`;
                    else {
                        let e = i(t);
                        ((n.title = e(`h2`).text()), (n.description = e(`.v_news_content`).html()));
                    }
                    return n;
                })
            )
        ),
    };
}
export { o as route };
