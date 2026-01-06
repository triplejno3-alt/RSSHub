import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:site/:grouping/:name`,
    categories: [`other`],
    example: `/clickme/default/category/beauty`,
    parameters: { site: '站点，`default`为普通站，`r18`为成人站，其它值默认为普通站', grouping: '分组方式，`category`为分类，`tag`为标签，其他值默认为分类', name: `分类名或标签名，分类名为英文，可以在分类 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `文章`,
    maintainers: [`hoilc`],
    handler: a,
};
async function a(i) {
    let a = i.req.param(`site`) === `r18` ? `r18` : ``,
        o = i.req.param(`grouping`) === `tag` ? `tag` : `category`,
        s = i.req.param(`name`),
        c = `https://${a ? `r18.` : ``}clickme.net/${o.slice(0, 1)}/${encodeURIComponent(s)}`,
        { data: l } = await n.post(`https://api.clickme.net/article/list`, {
            headers: { Referer: c },
            searchParams: { key: `clickme` },
            form: { articleType: a ? `r18` : `article`, subtype: o, subtypeSlug: s, device: ``, limit: 18, page: 1 },
        }),
        u = s === `new` ? `最新` : l.data.items[0].categoryName[0].name,
        d = o === `tag` ? s : u,
        f = l.data.items.map((e) => ({ title: e.title, link: e.url.replace(`http://`, `https://`), author: e.userNick, pubDate: t(e.date, `X`), category: [...e.categoryName.map((e) => e.name), ...e.tags] })),
        p = await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n.get(t.link);
                    return ((t.description = r(e)(`.article-detail-content`).html()), t);
                })
            )
        );
    return { title: `ClickMe ${a ? `R18 ` : ``}- ${d}`, link: c, item: p };
}
export { i as route };
