import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as t, t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { load as c } from 'cheerio';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
const d = {
    path: `/all/:id?`,
    categories: [`bbs`],
    example: `/hupu/all/topic-daily`,
    parameters: { id: `编号，可在对应热帖版面 URL 中找到，默认为步行街每日话题` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`m.hupu.com/:category`, `m.hupu.com/`], target: `/:category` }],
    name: `热帖`,
    maintainers: [`nczitzk`],
    handler: f,
    description: `::: tip
  更多热帖版面参见 [论坛](https://bbs.hupu.com)
:::`,
};
async function f(d) {
    let f = `https://bbs.hupu.com/${d.req.param(`id`) ?? `topic-daily`}`,
        p = c((await r({ method: `get`, url: f })).data),
        m = p(`div.t-info > a, a.p-title`)
            .toArray()
            .map((e) => ((e = p(e)), { title: e.text(), link: `https://m.hupu.com/bbs${e.attr(`href`)}`, pubDate: i(n(e.parent().parent().find(`.post-time`).text(), `MM-DD HH:mm`), 8) }));
    return (
        (m = await Promise.all(
            m.map((n) =>
                e.tryGet(n.link, async () => {
                    try {
                        let e = c((await r({ method: `get`, url: n.link })).data),
                            d = [];
                        (e(`.hupu-post-video`).each(function () {
                            d.push({ source: e(this).attr(`src`), poster: e(this).attr(`poster`) });
                        }),
                            (n.author = e(`.bbs-user-wrapper-content-name-span`).first().text()),
                            (n.pubDate = n.pubDate ?? i(t(e(`.second-line-user-info`).first().text()), 8)));
                        let f = e(`.bbs-content`).first().html();
                        n.description = l(s(a, { children: [d.length ? d.map((e) => o(`video`, { poster: e.poster, controls: !0, children: o(`source`, { src: e.source, type: `video/mp4` }) })) : null, f ? u(f) : null] }));
                    } catch {}
                    return n;
                })
            )
        )),
        { title: `虎扑社区 - ${p(`.middle-title, .bbs-sl-web-intro-detail-title`).text()}`, link: f, item: m }
    );
}
export { d as route };
