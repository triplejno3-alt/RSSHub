import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { r as t } from './common-utils-uYpL50sT.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: [`/aggsite/topdiggs`, `/aggsite/topviews`, `/aggsite/headline`, `/cate/:type`, `/pick`],
    categories: [`blog`],
    example: `/cnblogs/aggsite/topdiggs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.cnblogs.com/aggsite/topdiggs`] }],
    name: `10 天推荐排行榜`,
    maintainers: [`hujingnb`],
    handler: o,
    url: `www.cnblogs.com/pick`,
    description: '在博客园主页的分类出可查看所有类型。例如，go 的分类地址为: `https://www.cnblogs.com/cate/go/`, 则: [`/cnblogs/cate/go`](https://rsshub.app/cnblogs/cate/go)',
};
async function o(a) {
    let o = `https://www.cnblogs.com${t(a)}`,
        s = (await n(o)).data,
        c = i(s),
        l = c(`#post_list article`)
            .toArray()
            .map(
                (t) => (
                    (t = c(t)),
                    {
                        title: t.find(`.post-item-title`).text(),
                        link: t.find(`.post-item-title`).attr(`href`),
                        pubDate: r(e(t.find(`.post-item-foot .post-meta-item span`).text() || t.find(`.editorpick-item-meta`).text(), [`YYYY-MM-DD HH:mm`, `YYYY-MM-DD`]), 8),
                        description: t.find(`.post-item-summary`).text(),
                        author: t.find(`.post-item-author span`).text(),
                    }
                )
            );
    return { title: c(`title`).text(), link: o, item: l };
}
export { a as route };
