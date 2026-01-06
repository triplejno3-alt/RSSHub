import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { jsx as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = {
    path: `/column/:id?`,
    categories: [`traditional-media`],
    example: `/nmtv/column/877`,
    parameters: { id: `栏目 id，可在对应栏目 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `点播`,
    maintainers: [`nczitzk`],
    handler: o,
    description:
        '::: tip\n  如 [蒙古语卫视新闻联播](http://www.nmtv.cn/folder292/folder663/folder301/folder830/folder877) 的 URL 为 `http://www.nmtv.cn/folder292/folder663/folder301/folder830/folder877`，其栏目 id 为末尾数字编号，即 `877`。可以得到其对应路由为 [`/nmtv/column/877`](https://rsshub.app/nmtv/column/877)\n:::',
};
async function o(a) {
    let o = a.req.param(`id`) ?? `877`,
        s = (await t({ method: `get`, url: `https://mapi.m2oplus.nmtv.cn/api/v1/contents.php?offset=0&count=${a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 100}&column_id=${o}` })).data,
        c = s.map((t) => {
            let a = `https://vod.m2oplus.nmtv.cn/${t.target_path}${t.target_filename}`,
                o = `${t.type}/${a.match(/\.(\w+)$/)[1]}`;
            return {
                title: t.title,
                link: t.content_url,
                author: t.column_name,
                pubDate: n(e(t.publish_time), 8),
                description: i(
                    t.type === `audio`
                        ? r(`audio`, { controls: `controls`, children: r(`source`, { src: a, type: `audio/mp3` }) })
                        : t.type === `video`
                          ? r(`video`, { controls: !0, poster: t.index_pic, children: r(`source`, { src: a, type: `video/mp4` }) })
                          : null
                ),
                enclosure_url: a,
                enclosure_type: o,
                itunes_duration: t.video.duration,
                itunes_item_image: t.index_pic,
            };
        }),
        l = s[0].column_name,
        u = s[0].column_info.indexpic;
    return { title: `内蒙古广播电视台 - ${l}`, link: c[0].link.split(/\/\d{4}-\d{2}-\d{2}\//)[0], item: c, image: `${u.host}${u.filepath}${u.filename}`, itunes_author: l };
}
export { a as route };
