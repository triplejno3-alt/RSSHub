import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { jsx as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = {
    path: `/:type?`,
    categories: [`new-media`],
    example: `/mittrchina/index`,
    parameters: { type: `类型，见下表，默认为首页资讯` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `首页`,
    maintainers: [`EsuRt`, `queensferryme`],
    handler: o,
    description: `| 快讯     | 本周热文 | 首页资讯 | 视频  |
| -------- | -------- | -------- | ----- |
| breaking | hot      | index    | video |`,
};
async function o(a) {
    let o = { breaking: { title: `快讯`, apiPath: `/flash` }, hot: { title: `本周热榜`, apiPath: `/information/hot` }, index: { title: `首页资讯`, apiPath: `/information/index` }, video: { title: `视频`, apiPath: `/movie/index` } },
        { type: c = `index` } = a.req.param(),
        l = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 10,
        u = `https://apii.web.mittrchina.com${o[c].apiPath}`,
        { data: d } = c === `breaking` ? await n.post(u, { form: { page: 1, size: l } }) : await n(u, { searchParams: { limit: l } }),
        f = (c === `hot` ? d.data : d.data.items).map((e) => ({
            title: e.name || e.title,
            author: (e.authors || e.author || []).map((e) => e.username).join(`, `),
            category: e.typeName,
            description: c === `video` ? i(r(s, { poster: e.img, video: { address: e.address, type: e.address.split(`.`).pop() } })) : c === `breaking` ? e.content : e.summary,
            pubDate: e.start_time ? t(e.start_time, `X`) : e.push_time ? t(e.push_time, `X`) : void 0,
            id: e.id,
            link: `https://www.mittrchina.com/news/detail/${e.id}`,
        })),
        p = f;
    return (
        c !== `video` &&
            c !== `breaking` &&
            (p = await Promise.all(
                f.map((r) =>
                    e.tryGet(r.link, async () => {
                        let {
                            data: { data: e },
                        } = await n(`https://apii.web.mittrchina.com/information/details?id=${r.id}`);
                        return (
                            (r.description = e.content),
                            (r.author ||= e.authors.map((e) => e.username).join(`, `)),
                            (r.pubDate ||= t(e.start_time, `X`)),
                            e.cover && ((r.enclosure_url = e.cover), (r.enclosure_type = `image/${e.cover.split(`.`).pop()}`)),
                            r
                        );
                    })
                )
            )),
        { title: `MIT 科技评论 - ${o[c].title}`, link: `https://www.mittrchina.com/${c}`, item: p }
    );
}
const s = ({ poster: e, video: t }) => (t ? r(`video`, { poster: e, controls: !0, children: r(`source`, { src: t.address, type: t.type }) }) : null);
export { a as route };
