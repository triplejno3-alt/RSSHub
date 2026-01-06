import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './description-B57_U9sP.mjs';
const r = {
    path: `/post/:id`,
    categories: [`bbs`],
    example: `/douyu/post/631737151576473201`,
    parameters: { id: `帖子 id，可在帖子页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yuba.douyu.com/p/:id`, `yuba.douyu.com/`] }],
    name: `鱼吧跟帖`,
    maintainers: [`nczitzk`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`id`),
        a = `https://yuba.douyu.com`,
        o = `${a}/p/${i}`,
        s = (await t({ method: `get`, url: `${a}/wbapi/web/post/detail/${i}` })).data.data,
        c = `${a}/wbapi/web/post/comments/${i}?group_id=${s.group_id}&sink=1&page=1`,
        l = await t({ method: `get`, url: c });
    ((c = `${a}/wbapi/web/post/comments/${i}?group_id=${s.group_id}&sink=1&page=${l.data.page_total}`), (l = await t({ method: `get`, url: c })));
    let u = l.data.data.map((t) => ({
        title: `${t.nick_name}: ${t.content}`,
        link: `${o}#${t.comment_id}${t.sub_replies.length > 0 ? `+${t.sub_replies.map((e) => e.comment_id).join(`+`)}` : ``}`,
        pubDate: e(t.created_ts * 1e3),
        description: n({
            content: t.content,
            images: t.imglist.map((e) => ({ size: e.size, url: e.url })),
            replies: t.sub_replies.map((e) => ({ nickname: e.nickname, content: e.content, time: new Date(e.created_ts * 1e3).toLocaleString() })) ?? void 0,
        }),
    }));
    return { title: `斗鱼鱼吧 - ${s.title}`, link: o, item: u, description: s.content };
}
export { r as route };
