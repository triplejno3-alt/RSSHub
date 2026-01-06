import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/bbs/hot`,
    categories: [`university`],
    example: `/pku/bbs/hot`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bbs.pku.edu.cn/v2/hot-topic.php`, `bbs.pku.edu.cn/`] }],
    name: `北大未名 BBS 全站十大`,
    maintainers: [`wooddance`],
    handler: s,
    url: `bbs.pku.edu.cn/v2/hot-topic.php`,
    description: `::: warning
  论坛部分帖子正文内容的获取需要用户登录后的 Cookie 值，详情见部署页面的配置模块。
:::`,
};
async function s() {
    let o = e.pkubbs.cookie,
        s = {};
    o && (s.cookie = o);
    let c = a((await r(`https://bbs.pku.edu.cn/v2/hot-topic.php`, { headers: s })).body),
        l = c(`#list-content .list-item`)
            .toArray()
            .map((e) => ({ url: new URL(c(e).find(`> a.link`).attr(`href`), `https://bbs.pku.edu.cn/v2/`).href, title: c(e).find(`.title`).text() }))
            .slice(0, 10);
    return {
        title: `北大未名BBS 全站十大`,
        link: `https://bbs.pku.edu.cn/v2/hot-topic.php`,
        description: `北大未名BBS 全站热门话题前十名`,
        item: await Promise.all(
            l.map(({ url: e, title: o }) =>
                t.tryGet(e, async () => {
                    try {
                        let t = a((await r(e, { headers: s })).body),
                            c = t(`.post-card:first-child .sl-triangle-container .down-list span`).text() || t(`.post-card:first-child .sl-triangle-container .title span`).text();
                        return { title: o, description: t(`.post-card:first-child .content`).html(), link: e, guid: e, pubDate: i(n(c, `发表于YYYY-MM-DD HH:mm:ss`), 8) };
                    } catch {
                        return { title: o, link: e, guid: e };
                    }
                })
            )
        ),
    };
}
export { o as route };
