import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = (e, t) =>
        e.posts.map((e) => {
            let r, i, a, o, s;
            switch (e.type) {
                case `ORIGINAL_POST`:
                    ((o = e.content), (s = `https://m.okjike.com/originalPosts/${e.id}`));
                    break;
                default:
                    ((o = `未知类型，请前往GitHub提交issue`), (s = `https://github.com/DIYgod/RSSHub/issues`));
            }
            let c = ``,
                l = ``;
            if ((e.user && ((l = e.user.screenName), t.req.param(`showUid`) && (c += `<span>用户昵称：${l} <br> Username：${e.user.username}</span><br>`)), e.linkInfo)) {
                let t = e.linkInfo.originalLinkUrl || e.linkInfo.linkUrl;
                new URL(t).host === `mp.weixin.qq.com` && (s = t);
                let n = e.linkInfo.audio || e.audio;
                if (n) {
                    let e = n.image.picUrl || n.image.thumbnailUrl,
                        i = t;
                    ((r = `${n.title} - ${n.author}`),
                        (c += `
            <img src="${e}">
            <a href="${i}">${r}</a>
        `));
                }
                let o = e.linkInfo.video || e.video;
                if (o) {
                    let n = o.image.picUrl || o.image.thumbnailUrl,
                        r = t,
                        a = Math.floor(o.duration / 6e4);
                    ((i = e.linkInfo.title),
                        (c += `
            <img src="${n}">
            <a href="${r}">${i || `观看视频`} - 约${a}分钟</a>
        `));
                }
                if (!n && !o && t) {
                    a = e.linkInfo.title;
                    let n = a || `访问原文`,
                        r = e.linkInfo.pictureUrl,
                        i = `<img src="${r}">`;
                    c += `
            ${r ? i : ``}
            <a href="${t}">${n}</a>
        `;
                }
            }
            if (((c += c ? `<br>${o}` : o), e.pictures))
                for (let t of e.pictures)
                    if (t.format === `gif`) c += `<img src="${t.picUrl.split(`?imageMogr2/`)[0]}">`;
                    else {
                        let e = /\.[\da-z]+?\?imageMogr2/.test(t.picUrl) ? t.picUrl.split(`?imageMogr2/`)[0] : t.picUrl.replace(/thumbnail\/.+/, ``);
                        c += `<br><img src="${e}">`;
                    }
            return (
                e.video && (c += `<br><video src="${e.video.url}" controls></video>`),
                {
                    title: r || i || o || a || `无题`,
                    description: c.trim().replaceAll(
                        `
`,
                        `<br>`
                    ),
                    pubDate: n(e.createdAt),
                    author: l,
                    link: s,
                }
            );
        }),
    o = async (n, a) => {
        let o = await t.tryGet(
            a,
            async () => {
                let e = (await r(a)).data,
                    t = i(e)(`[type = "application/json"]`).html(),
                    n = JSON.parse(t).props.pageProps;
                return ((n.posts = await Promise.all(n.posts.map(async (e) => ((e.video &&= (await r(`https://api.ruguoapp.com/1.0/mediaMeta/play?type=ORIGINAL_POST&id=${e.id}`)).data), e)))), n);
            },
            !1,
            e.cache.routeExpire
        );
        if (o.length === 0) return { title: `主题 ID 不存在，或该主题暂无内容` };
        let s = o.topic;
        return ((o.result = { title: `${s.content} - 即刻圈子`, link: a, description: s.briefIntro, image: s.squarePicture.picUrl || s.squarePicture.middlePicUrl || s.squarePicture.thumbnailUrl }), o);
    };
export { a as n, o as t };
