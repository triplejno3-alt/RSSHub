import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './md5-DQN6cWFb.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = {
    path: `/radios/:category?`,
    categories: [`new-media`],
    example: `/gcores/radios/45`,
    parameters: { category: `分类名，默认为全部，可在分类页面的 URL 中找到，如 Gadio News -- 45` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !0, supportScihub: !1 },
    radar: [{ source: [`gcores.com/categories/:category`], target: `/radios/:category` }],
    name: `播客`,
    maintainers: [`eternasuno`],
    handler: l,
    url: `gcores.com/radios`,
};
async function l(n) {
    let r = n.req.param(`category`) || `all`,
        i = Number.parseInt(n.req.query(`limit`)) || 12,
        a = f(r),
        s = o(await d(a)),
        c = s(`head>title`).text(),
        l = s(`head>meta[name="description"]`).attr(`content`),
        m = s(`head>link[rel="apple-touch-icon"]`).attr(`href`),
        h = p(r);
    (h.searchParams.set(`include`, `media`),
        h.searchParams.set(`page[limit]`, i.toString()),
        h.searchParams.set(`sort`, `-published-at`),
        h.searchParams.set(`filter[list-all]`, `0`),
        h.searchParams.set(`filter[is-require-privilege]`, `0`),
        h.searchParams.set(`fields[radios]`, `title,cover,published-at,duration,content,media`));
    let { data: g, included: _ } = await d(h),
        v = {};
    for (let e of _) v[e.id] = e.attributes.audio;
    let y = g.map((n) => {
        let { id: r, attributes: i, relationships: a } = n,
            o = `https://www.gcores.com/radios/${r}`,
            s = `https://image.gcores.com/${i.cover}`,
            c = a.media.data.id,
            l = new URL(v[c], `https://alioss.gcores.com/uploads/audio/`).toString(),
            d = u(JSON.parse(i.content));
        return { title: i.title, author: `机核 GCORES`, description: d, pubDate: t(i[`published-at`]), guid: e(o), link: o, itunes_item_image: s, itunes_duration: i.duration, enclosure_url: l, enclosure_type: `audio/mpeg` };
    });
    return { title: c, link: a, description: l, language: `zh-cn`, itunes_author: `机核 GCORES`, image: `https://www.gcores.com/${m}`, item: y };
}
const u = (e) =>
        s(
            e
                ? a(r, {
                      children: [
                          e.blocks?.map((e, t) => (e.type === `unstyled` ? i(`p`, { children: e.text }, `block-${t}`) : null)),
                          Object.values(e.entityMap ?? {}).map((e, t) => (e.type === `WIDGET` ? i(`p`, { children: i(`a`, { href: e.data.url, children: e.data.title }) }, `widget-${t}`) : null)),
                      ],
                  })
                : a(r, {
                      children: [
                          i(`p`, { children: `机核从2010年开始一直致力于分享游戏玩家的生活，以及深入探讨游戏相关的文化。我们开发原创的播客以及视频节目，一直在不断寻找民间高质量的内容创作者。` }),
                          i(`p`, { children: `我们坚信游戏不止是游戏，游戏中包含的科学，文化，历史等各个层面的知识和故事，它们同时也会辐射到二次元甚至电影的领域，这些内容非常值得分享给热爱游戏的您。` }),
                      ],
                  })
        ),
    d = async (e) => (await n({ method: `get`, url: new URL(e, `https://www.gcores.com`) })).data,
    f = (e) => (e === `all` ? `https://www.gcores.com/radios` : `https://www.gcores.com/categories/${e}`),
    p = (e) => (e === `all` ? new URL(`https://www.gcores.com/gapi/v1/radios`) : new URL(`https://www.gcores.com/gapi/v1/categories/${e}/radios`));
export { c as route };
