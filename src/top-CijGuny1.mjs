import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { n as i, t as a } from './utils-CCkTzzSZ.mjs';
import { load as o } from 'cheerio';
const s = {
    path: `/top/:type`,
    categories: [`design`],
    view: r.Pictures,
    example: `/zcool/top/design`,
    parameters: {
        type: {
            description: `推荐类型`,
            options: [
                { value: `design`, label: `作品榜单` },
                { value: `article`, label: `文章榜单` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `作品总榜单`,
    maintainers: [`yuuow`],
    handler: c,
};
async function c(r) {
    let s = `https://www.zcool.com.cn/top/${r.req.param(`type`) === `design` ? `index.do` : `article.do?rankType=8`}`,
        { data: c } = await n(s),
        l = o(c),
        u = JSON.parse(l(`script#__NEXT_DATA__`).text()),
        d = u.props.pageProps.listResult.data.map((e) => ({ title: e.rankingTitle, author: e.member.name, category: [e.productCategoryStr, e.productSubCateStr, ...e.tags], link: e.pageUrl, pubDate: t(e.rankingPublishTime) })),
        f = await Promise.all(
            d.map((r) =>
                e.tryGet(r.link, async () => {
                    let { data: e } = await n(r.link),
                        s = o(e),
                        c = JSON.parse(s(`script#__NEXT_DATA__`).text());
                    return (
                        (r.pubDate = t(c.props.pageProps.data.publishTime, `x`)),
                        r.link.startsWith(`https://www.zcool.com.cn/article/`) ? (r.description = a(c)) : r.link.startsWith(`https://www.zcool.com.cn/work/`) && (r.description = i(c)),
                        r
                    );
                })
            )
        );
    return { title: u.props.pageProps.seo.title, description: u.props.pageProps.seo.description, link: s, item: f };
}
export { s as route };
