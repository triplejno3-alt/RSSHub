import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = {
    path: `/live`,
    categories: [`new-media`],
    example: `/kepu/live`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !0, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`live.kepu.net.cn/replay/index`] }],
    name: `直播回看`,
    maintainers: [`nczitzk`],
    handler: l,
    url: `live.kepu.net.cn/replay/index`,
};
async function l(c) {
    let l = c.req.query(`limit`) ? Number.parseInt(c.req.query(`limit`), 10) : 50,
        u = `https://live.kepu.net.cn`,
        d = `https://live.kepu.net.cn:8089`,
        f = new URL(`replay/index`, u).href,
        p = new URL(`index.php/front/index/replay_list`, d).href,
        { data: m } = await n.post(p, { form: { page: 1, size: l } }),
        h = m.data.data
            .slice(0, l)
            .map((e) => ({
                title: e.title,
                link: new URL(`live/index?id=${e.id}`, u).href,
                description: e.desc,
                author: e.company,
                guid: e.id,
                pubDate: r(t(e.live_start_time ?? e.start_time), 8),
                updated: r(t(e.live_end_time ?? e.end_time), 8),
                itunes_item_image: new URL(e.cover, d).href,
                comments: e.display_comment ?? 0,
            }));
    h = await Promise.all(
        h.map((t) =>
            e.tryGet(t.link, async () => {
                let e = new URL(`index.php/front/live/replay_url`, d).href,
                    { data: r } = await n.post(e, { form: { id: t.guid } });
                ((t.guid = `kepu-live#${t.guid}`), (t.enclosure_url = r.data.RecordIndexInfoList.RecordIndexInfo.pop()?.RecordUrl), t.enclosure_url && (t.enclosure_type = `video/${t.enclosure_url.split(/\./).pop()}`));
                let c = t.itunes_item_image;
                return (
                    (t.description = s(
                        o(i, {
                            children: [
                                t.itunes_item_image ? a(`figure`, { children: a(`img`, { src: t.itunes_item_image, alt: t.title }) }) : null,
                                t.enclosure_url
                                    ? o(`video`, {
                                          poster: c,
                                          controls: !0,
                                          children: [a(`source`, { src: t.enclosure_url, type: t.enclosure_type }), a(`object`, { data: t.enclosure_url, children: a(`embed`, { src: t.enclosure_url }) })],
                                      })
                                    : null,
                                t.description ? a(`p`, { children: t.description }) : null,
                            ],
                        })
                    )),
                    t
                );
            })
        )
    );
    let g = new URL(`favicon.ico`, u).href,
        _ = `中国科普博览`,
        v = `直播回看`;
    return { item: h, title: `${_} - ${v}`, link: f, description: `科学直播(live.kepu.net.cn)`, language: `zh`, icon: g, logo: g, subtitle: v, author: _, itunes_author: _, itunes_category: `Science`, allowEmpty: !0 };
}
export { c as route };
