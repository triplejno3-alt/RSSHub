import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
    path: `/qk/:id/:needContent?`,
    categories: [`reading`],
    example: `/chaoxing/qk/6b5c39b3dd84352be512e29df0297437`,
    parameters: { id: `期刊 id，可在期刊页 URL 中找到`, needContent: `需要获取文章全文，填写 true/yes 表示需要，默认需要` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `期刊`,
    maintainers: [`nczitzk`],
    handler: c,
    description:
        '::: tip\n  全部期刊可以在 [这里](http://qk.chaoxing.com/space/index) 找到，你也可以从 [学科分类](https://qikan.chaoxing.com/jourclassify) 和 [期刊导航](https://qikan.chaoxing.com/search/openmag) 中发现更多期刊。\n\n  如订阅 [**上海文艺**](http://m.chaoxing.com/mqk/list?sw=&mags=6b5c39b3dd84352be512e29df0297437&isort=20&from=space)，其 URL 为 `http://m.chaoxing.com/mqk/list?mags=6b5c39b3dd84352be512e29df0297437`。`6b5c39b3dd84352be512e29df0297437` 即为期刊 id，所得路由为 [`/chaoxing/qk/6b5c39b3dd84352be512e29df0297437`](https://rsshub.app/chaoxing/qk/6b5c39b3dd84352be512e29df0297437)\n:::\n\n::: warning\n  你可以设置参数 **需要获取文章全文** 为 `true` `yes` `t` `y` 等值（或者忽略这个参数），RSS 的条目会携带期刊中的 **文章全文**，而不仅仅是 **文章概要**。但因为发起访问请求过多会被该网站屏蔽，你可以将其关闭（设置该参数为 `false` `no` `f` `n` 等值），这将会大大减少请求次数从而更难触发网站的反爬机制。\n\n  路由默认会获取 **30** 个条目。在路由后指定 `?limit=<条目数量>` 减少或增加单次获取条目数量，同样可以减少请求次数，如设置为一次获取 **10** 个条目，路由可以更改为 [`/chaoxing/qk/6b5c39b3dd84352be512e29df0297437?limit=10`](https://rsshub.app/chaoxing/qk/6b5c39b3dd84352be512e29df0297437?limit=10)\n\n  在根据上文设置 **需要获取文章全文** 为不需要时，你可以将 `limit` 值增大，从而获取更多的条目，此时因为不获取全文也不会触发反爬机制，如 [`/chaoxing/qk/6b5c39b3dd84352be512e29df0297437/false?limit=100`](https://rsshub.app/chaoxing/qk/6b5c39b3dd84352be512e29df0297437/false?limit=100)\n:::',
};
async function c(s) {
    let c = s.req.param(`id`),
        l = /t|y/i.test(s.req.param(`needContent`) ?? `true`),
        u = `http://m.chaoxing.com`,
        d = `${u}/mqk/json?size=${s.req.query(`limit`) ?? 30}&mags=${c}&isort=20`,
        f = { cookie: `duxiu=userName_dsr%2C%3Dmmxy%2C!userid_dsr%2C%3D837%2C!enc_dsr%2C%3D7EDE234634FC80D554A7F6D1AA0D3629; AID_dsr=665; msign_dsr=1638170006420;` },
        p = await n({ method: `get`, url: d, headers: f }),
        m = p.data.list.map((e) => ({
            title: e.infos.C301,
            author: e.infos.C303,
            link: e.infos.read,
            category: [e.infos.C314, e.infos.C031],
            pubDate: t(e.infos.C103, `YYYYMMDD`),
            description: o(i(r, { children: (e.infos.M305 ?? e.infos.C305 ?? ``).trim() ? i(`p`, { children: (e.infos.M305 ?? e.infos.C305 ?? ``).trim() }) : null })),
        }));
    return (
        (m = await Promise.all(
            m.map((t) =>
                e.tryGet(t.link, async () => {
                    if (l) {
                        let e = a((await n({ method: `get`, url: t.link, headers: f })).data);
                        t.description = e(`#article_content`).html() ?? e(`body`).html();
                    }
                    return t;
                })
            )
        )),
        { title: p.data.list[0].infos.C307, link: `${u}/mqk/list?mags=${c}&isort=20&from=space`, item: m }
    );
}
export { s as route };
