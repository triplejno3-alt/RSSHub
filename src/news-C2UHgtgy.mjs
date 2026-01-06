import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/gzic/news`,
    categories: [`university`],
    example: `/scut/gzic/news`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `广州国际校区 - 新闻聚焦`,
    maintainers: [`gdzhht`],
    handler: o,
    description: `::: warning
由于学校网站对非大陆 IP 的访问存在限制，可能需自行部署。
:::`,
};
async function o() {
    let a = `https://www2.scut.edu.cn`,
        o = `https://www2.scut.edu.cn/gzic/30279/list.htm`,
        { data: s } = await r(o),
        c = i(s),
        l = c(`.right-nr .row .col-lg-4`)
            .toArray()
            .map((e) => {
                e = c(e);
                let t = e.find(`.li-img a`),
                    r = e.find(`.li-img a span`);
                return {
                    title: e.find(`.li-img a p`).text(),
                    link: t.attr(`href`)?.startsWith(`http`) ? t.attr(`href`) : `${a}${t.attr(`href`)}`,
                    pubDate: n(r.text().replaceAll(/年|月/g, `-`).replaceAll(`日`, ``)),
                    itunes_item_image: `${a}${e.find(`.li-img img`).attr(`src`)}`,
                };
            });
    return {
        title: `华南理工大学广州国际校区 - 新闻聚焦`,
        link: o,
        item: await Promise.all(
            l.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = i(await e(n.link));
                    return ((n.description = n.link.startsWith(`https://mp.weixin.qq.com/`) ? t(`div.rich_media_content section`).html() : t(`div.wp_articlecontent`).html()), n);
                })
            )
        ),
    };
}
export { a as route };
