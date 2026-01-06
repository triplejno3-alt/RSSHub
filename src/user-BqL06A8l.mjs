import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/user/:id`,
    categories: [`social-media`],
    view: n.SocialMedia,
    example: `/jike/user/3EE02BC9-C5B3-4209-8750-4ED1EE0F67BB`,
    parameters: { id: `用户 id, 可在即刻分享出来的单条动态页点击用户头像进入个人主页，然后在个人主页的 URL 中找到，或者在单条动态页使用 RSSHub Radar 插件` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`web.okjike.com/u/:uid`], target: `/user/:uid` }],
    name: `用户动态`,
    maintainers: [`DIYgod`, `prnake`],
    handler: a,
};
async function a(n) {
    let i = n.req.param(`id`),
        a = (await t({ method: `get`, url: `https://m.okjike.com/users/${i}`, headers: { Referer: `https://m.okjike.com/users/${i}` } })).data,
        o = r(a)(`[type = "application/json"]`).html(),
        s = JSON.parse(o).props.pageProps,
        c = (e, t) => {
            switch (t) {
                case `REPOST`:
                    return `https://m.okjike.com/reposts/${e}`;
                case `MEDIUM`:
                    return `https://www.okjike.com/medium/${e}`;
                default:
                    return `https://m.okjike.com/originalPosts/${e}`;
            }
        },
        l = await Promise.all(
            s.posts.map(async (n) => {
                let a = { ORIGINAL_POST: `发布`, REPOST: `转发`, ANSWER: `回答`, QUESTION: `提问`, PERSONAL_UPDATE: `创建新主题` },
                    o = ``;
                n.linkInfo && n.linkInfo.linkUrl && (o = `<a href="${n.linkInfo.linkUrl}">${n.linkInfo.title}</a><br>`);
                let s = ``;
                if (n.pictures) for (let e of n.pictures) s += `<br><img src="${e.picUrl}">`;
                let l = n.content || (n.linkInfo && n.linkInfo.title) || (n.question && n.question.title) || n.title || ``;
                l = l.replaceAll(/\r\n|\n|\r/g, `<br>`);
                let u = `一条动态`;
                l &&= ((u = l.replaceAll(/(<br>)+/g, ` `)), `${l}<br><br>`);
                let d;
                if (n.type === `REPOST`) {
                    let e = n.target.user ? `<a href="https://m.okjike.com/users/${n.target.user.username}" target="_blank">@${n.target.user.screenName}</a>` : ``,
                        t = ``;
                    if (n.target.pictures) for (let e of n.target.pictures) t += `<br><img src="${e.thumbnailUrl}">`;
                    ((d = `<div class="rsshub-quote">转发 ${e}: ${n.target.content}${t}</div>`.replaceAll(/\r\n|\n|\r/g, `<br>`)), (l = `${l}${d}`));
                }
                let f = {
                    title: `${a[n.type]}了: ${u}`,
                    description: `${l}${o}${s}`.replace(/(<br>|\s)+$/, ``),
                    pubDate: e(n.createdAt),
                    link: c(n.id, n.type),
                    _extra: d && { links: [{ url: c(n.target.id, n.target.type), type: `quote` }] },
                };
                if (i === `wenhao1996` && n.topic.id === `553870e8e4b0cafb0a1bef68`) {
                    f.link = n.urlsInText[0].url;
                    let { data: e } = await t({ method: `get`, url: f.link, headers: { Referer: `https://m.okjike.com/users/${i}` } }),
                        a = r(e);
                    (a(`span.num,span.arrow`).remove(),
                        (f.title = `一觉醒来世界发生了什么 ${a(`title`).text()}`),
                        (f.description = ``),
                        a(`div.container`)
                            .find(`li.item`)
                            .map((e, t) => {
                                f.description += `<a href="${a(t).find(`a`).attr(`href`)}">${a(t).find(`a`).text()}</a><br>`;
                            }));
                }
                return f;
            })
        );
    return { title: `${s.user.screenName}的即刻动态`, description: s.user.bio, link: `https://m.okjike.com/users/${i}`, image: s.user.avatarImage.picUrl, item: l };
}
export { i as route };
