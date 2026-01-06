import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = `https://www.ixigua.com`,
    c = {
        path: `/user/video/:uid/:disableEmbed?`,
        categories: [`multimedia`],
        example: `/ixigua/user/video/4234740937`,
        parameters: { uid: `用户 id, 可在用户主页中找到`, disableEmbed: `默认为开启内嵌视频, 任意值为关闭` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`ixigua.com/home/:uid`], target: `/user/video/:uid` }],
        name: `用户视频投稿`,
        maintainers: [`FlashWingShadow`, `Fatpandac`, `pseudoyu`],
        handler: l,
    };
async function l(n) {
    let i = n.req.param(`uid`),
        c = n.req.param(`disableEmbed`),
        l = `${s}/home/${i}/?wid_try=1`,
        { data: d } = await t(l),
        f = a(d)(`#SSR_HYDRATED_DATA`).html();
    if (!f) throw Error(`Failed to find SSR_HYDRATED_DATA`);
    let {
        AuthorVideoList: { videoList: p },
        AuthorDetailInfo: m,
    } = JSON.parse(f.match(/var\s+data\s*=\s*({.*?});/s)?.[1].replaceAll(`undefined`, `null`) || `{}`);
    if (!p || !m) throw Error(`Failed to extract required data from JSON`);
    return {
        title: `${m.name} 的西瓜视频`,
        link: l,
        description: m.introduce,
        item: p.map((t) => ({ title: t.title, description: o(r(u, { i: t, disableEmbed: c })), link: `${s}/${t.groupId}`, pubDate: e(t.publishTime * 1e3), author: m.name })),
    };
}
const u = ({ i: e, disableEmbed: t }) =>
    i(n, {
        children: [
            t
                ? null
                : i(n, {
                      children: [
                          r(`iframe`, { width: `720`, height: `405`, frameborder: `0`, allowfullscreen: !0, src: `https://www.ixigua.com/iframe/${e.groupId}?autoplay=0`, referrerpolicy: `unsafe-url`, allowfullscreen: !0 }),
                          r(`br`, {}),
                      ],
                  }),
            r(`img`, { src: e.coverUrl }),
            r(`p`, { children: e.abstract }),
        ],
    });
export { c as route };
