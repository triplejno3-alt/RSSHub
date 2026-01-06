import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './description-A7ochmEt.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/topic/:id`,
    categories: [`finance`],
    example: `/futunn/topic/1267`,
    parameters: { id: `Topic ID, can be found in URL` },
    features: { supportRadar: !0 },
    radar: [{ source: [`news.futunn.com/news-topics/:id/*`, `news.futunn.com/:lang/news-topics/:id/*`], target: `/topic/:id` }],
    name: `专题`,
    maintainers: [`kennyfong19931`],
    handler: s,
};
async function o(e, t, r = ``) {
    let { hasMore: i, seqMark: a, list: s } = (await n({ method: `get`, url: `${e}/news-site-api/main/get-topics-list?pageSize=48&seqMark=${r}` })).data.data.data,
        c = s.find((e) => e.idx === t);
    return c ? { topicTitle: c.title, topicDescription: c.detail } : i === 1 ? o(e, t, a) : { topicTitle: ``, topicDescription: `` };
}
async function s(a) {
    let s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 48,
        c = a.req.param(`id`),
        l = `https://news.futunn.com`,
        u = `${l}/news-topics/${c}/`,
        d = `${l}/news-site-api/topic/get-topics-news-list?topicsId=${c}&pageSize=${s}`,
        { topicTitle: f, topicDescription: p } = await e.tryGet(u, async () => await o(l, c)),
        m = (await n({ method: `get`, url: d })).data.data.data.map((e) => ({ title: e.title, link: e.url, author: e.source, pubDate: t(e.time * 1e3), description: r({ abs: e.abstract, pic: e.pic }) }));
    return (
        (m = await Promise.all(
            m.map((t) =>
                e.tryGet(t.link, async () => {
                    if (/news\.futunn\.com/.test(t.link)) {
                        let e = i((await n({ method: `get`, url: t.link })).data);
                        (e(`.futu-news-time-stamp`).remove(),
                            e(`.nnstock`).each(function () {
                                e(this).replaceWith(`<a href="${e(this).attr(`href`)}">${e(this).text().replaceAll(`$`, ``)}</a>`);
                            }),
                            (t.description = e(`.origin_content`).html()),
                            (t.category = [
                                ...e(`.news__from-topic__title`)
                                    .toArray()
                                    .map((t) => e(t).text().trim()),
                                ...e(`#relatedStockWeb .stock-name`)
                                    .toArray()
                                    .map((t) => e(t).text().trim()),
                            ]));
                    }
                    return t;
                })
            )
        )),
        { title: `富途牛牛 - 专题 - ${f}`, link: u, description: p, item: m }
    );
}
export { a as route };
