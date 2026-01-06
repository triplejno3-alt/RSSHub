import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './config-not-found-DGyG6Tbz.mjs';
import { r as i } from './utils-CAAmnNMo.mjs';
const a = {
    path: `/timeline`,
    categories: [`social-media`],
    example: `/zhihu/timeline`,
    parameters: {},
    features: { requireConfig: [{ name: `ZHIHU_COOKIES`, description: `` }], requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `用户关注时间线`,
    maintainers: [`SeanChao`],
    handler: o,
    description: `::: warning
  用户关注动态需要登录后的 Cookie 值，所以只能自建，详情见部署页面的配置模块。
:::`,
};
async function o(a) {
    let o = e.zhihu.cookies;
    if (o === void 0) throw new r(`缺少知乎用户登录后的 Cookie 值`);
    let s = (await n({ method: `get`, url: `https://www.zhihu.com/api/v3/moments`, headers: { Cookie: o }, searchParams: { desktop: !0, limit: a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 15 } })).data.data,
        c = `https://zhihu.com`,
        l = (e) => {
            if (!e || !e.target || !e.target.type) return ``;
            let t = e.target.id;
            switch (e.target.type) {
                case `answer`:
                    return `${c}/question/${e.target.question.id}/answer/${t}`;
                case `pin`:
                case `article`:
                    return e.target.url;
                case `question`:
                    return `${c}/question/${t}`;
                default:
                    return;
            }
        },
        u = (e) => e.find((e) => e != null),
        d = (e) => {
            let t = e.actors;
            return t ? t.map((e) => e.name).join(`, `) : ``;
        },
        f = (e) =>
            !e || !Array.isArray(e)
                ? e
                : e
                      .map((e) => e.content)
                      .filter((e) => !!e && typeof e == `string`)
                      .map((e) => `<div>${e}</div>`)
                      .join(``),
        p = (e) => {
            if (!e || !e.target) return {};
            let n = l(e);
            return {
                title: `${e.action_text_tpl.replace(`{}`, d(e))}: ${u([e.target.title, e.target.question ? e.target.question.title : ``])}`,
                description: i(`<div>${u([e.target.content_html, f(e.target.content), e.target.detail, e.target.excerpt, ``])}</div>`),
                pubDate: t(e.updated_time * 1e3),
                link: n,
                author: e.target.author ? e.target.author.name : ``,
                guid: n,
                category: [e.verb],
            };
        };
    return {
        title: `知乎关注动态`,
        link: `https://www.zhihu.com/follow`,
        item: s
            .filter((e) => e.verb)
            .map((e) =>
                e && e.type && e.type === `feed_group`
                    ? {
                          title: e.group_text.replace(`{LIST_COUNT}`, e.list.length),
                          description:
                              e.list && Array.isArray(e.list)
                                  ? e.list
                                        .map((e) => p(e))
                                        .map((e) => `<a href="${e.link}"><b>${e.title}</b></a><br><p>${e.description}</p><br>`)
                                        .join(``)
                                  : ``,
                          pubDate: e.list && Array.isArray(e.list) && e.list.length > 0 ? t(e.list[0].updated_time * 1e3) : new Date(),
                          guid: e.link,
                          category: [e.verb],
                      }
                    : p(e)
            ),
    };
}
export { a as route };
